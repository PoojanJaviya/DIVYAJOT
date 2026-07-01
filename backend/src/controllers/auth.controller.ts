import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/prisma';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/response';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) { sendError(res, 'Email already registered', 409); return; }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, phone },
      select: { id: true, name: true, email: true, role: true },
    });

    const accessToken  = signAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = signRefreshToken({ userId: user.id, email: user.email, role: user.role });

    await prisma.refreshToken.create({
      data: {
        token:     refreshToken,
        userId:    user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    sendSuccess(res, { token: accessToken, refreshToken, user }, 'Registration successful', 201);
  } catch (err) {
    sendError(res, 'Registration failed', 500);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) { sendError(res, 'Invalid email or password', 401); return; }
    if (!user.isActive) { sendError(res, 'Account is deactivated', 403); return; }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) { sendError(res, 'Invalid email or password', 401); return; }

    await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });

    const payload     = { userId: user.id, email: user.email, role: user.role };
    const accessToken  = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await prisma.refreshToken.create({
      data: {
        token:     refreshToken,
        userId:    user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    sendSuccess(res, {
      token: accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    }, 'Login successful');
  } catch {
    sendError(res, 'Login failed', 500);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    }
    sendSuccess(res, {}, 'Logged out successfully');
  } catch {
    sendError(res, 'Logout failed', 500);
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) { sendError(res, 'Refresh token required', 400); return; }

    const stored = await prisma.refreshToken.findUnique({ where: { token } });
    if (!stored || stored.expiresAt < new Date()) {
      sendError(res, 'Invalid or expired refresh token', 401);
      return;
    }

    const payload = verifyRefreshToken(token);
    const newAccess  = signAccessToken({ userId: payload.userId, email: payload.email, role: payload.role });
    const newRefresh = signRefreshToken({ userId: payload.userId, email: payload.email, role: payload.role });

    await prisma.refreshToken.update({
      where: { token },
      data: {
        token:     newRefresh,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    sendSuccess(res, { token: newAccess, refreshToken: newRefresh }, 'Token refreshed');
  } catch {
    sendError(res, 'Token refresh failed', 401);
  }
};

export const getMe = async (req: Request & { user?: { userId: string } }, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: { id: true, name: true, email: true, phone: true, role: true, avatar: true, createdAt: true },
    });
    if (!user) { sendError(res, 'User not found', 404); return; }
    sendSuccess(res, { user });
  } catch {
    sendError(res, 'Failed to fetch user', 500);
  }
};
