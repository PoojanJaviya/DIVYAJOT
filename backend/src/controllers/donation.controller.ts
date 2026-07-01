import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import prisma from '../config/prisma';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { emailService } from '../services/email.service';
import { AuthRequest } from '../middleware/auth.middleware';

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const generateReceiptNumber = () =>
  `SSF-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, frequency, donorName, donorEmail, donorPhone, cause, message } = req.body;

    if (!amount || amount < 1) { sendError(res, 'Invalid donation amount', 400); return; }

    const order = await razorpay.orders.create({
      amount:   Math.round(amount * 100), // Razorpay needs paise
      currency: 'INR',
      receipt:  generateReceiptNumber(),
    });

    // Create pending donation record
    await prisma.donation.create({
      data: {
        donorName,
        donorEmail,
        donorPhone,
        amount,
        frequency: frequency || 'ONE_TIME',
        status: 'PENDING',
        razorpayOrderId: order.id,
        cause,
        message,
      },
    });

    sendSuccess(res, {
      orderId:  order.id,
      amount:   order.amount,
      currency: order.currency,
    }, 'Order created');
  } catch (err) {
    console.error('Razorpay order error:', err);
    sendError(res, 'Failed to create payment order', 500);
  }
};

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      sendError(res, 'Payment verification failed', 400);
      return;
    }

    const receiptNumber = generateReceiptNumber();

    const donation = await prisma.donation.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        status:             'SUCCESS',
        razorpayPaymentId:  razorpay_payment_id,
        razorpaySignature:  razorpay_signature,
        receiptNumber,
      },
    });

    // Send thank-you email with receipt
    await emailService.sendDonationReceipt(donation);

    sendSuccess(res, { donation, receiptNumber }, 'Payment verified successfully');
  } catch {
    sendError(res, 'Payment verification error', 500);
  }
};

export const getAllDonations = async (req: Request, res: Response): Promise<void> => {
  try {
    const page   = parseInt(req.query.page as string)  || 1;
    const limit  = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const skip   = (page - 1) * limit;

    const where = status ? { status: status as 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED' } : {};

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.donation.count({ where }),
    ]);

    sendPaginated(res, donations, total, page, limit, 'donations');
  } catch {
    sendError(res, 'Failed to fetch donations', 500);
  }
};

export const getMyDonations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const donations = await prisma.donation.findMany({
      where: { donorEmail: req.user!.email },
      orderBy: { createdAt: 'desc' },
    });
    sendSuccess(res, { donations });
  } catch {
    sendError(res, 'Failed to fetch donations', 500);
  }
};
