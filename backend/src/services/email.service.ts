import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = `"${process.env.FROM_NAME || 'DIVYAJOT'}" <${process.env.FROM_EMAIL || 'noreply@divyajotfoundation.org'}>`;

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body  { font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 0; }
    .wrap { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.08); }
    .header { background: linear-gradient(135deg,#0F766E,#0a5954); padding: 32px 40px; text-align: center; }
    .header h1 { color: #fff; font-size: 22px; margin: 0; }
    .header p  { color: rgba(255,255,255,.8); margin: 6px 0 0; font-size: 13px; }
    .body { padding: 36px 40px; }
    .body h2 { color: #1f2937; font-size: 20px; margin-bottom: 12px; }
    .body p  { color: #6b7280; line-height: 1.7; font-size: 14px; }
    .highlight { background: #e6f5f4; border-radius: 8px; padding: 16px 20px; margin: 20px 0; }
    .highlight strong { color: #0F766E; }
    .btn { display: inline-block; background: #0F766E; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-top: 20px; }
    .footer { background: #f3f4f6; padding: 20px 40px; text-align: center; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>DIVYAJOT</h1>
      <p>Empowering Change, Transforming Lives</p>
    </div>
    <div class="body">${content}</div>
    <div class="footer">
      © 2024 DIVYAJOT · 80G Certified · PAN: AABTS1234Z<br/>
      123, Navrangpura, Ahmedabad – 380009, Gujarat, India
    </div>
  </div>
</body>
</html>`;

interface DonationData {
  donorName: string;
  donorEmail: string;
  amount: number | string;
  receiptNumber?: string | null;
  cause?: string | null;
  frequency?: string;
}

interface VolunteerData {
  fullName: string;
  email: string;
}

interface ContactData {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}

export const emailService = {
  async sendDonationReceipt(donation: DonationData) {
    const html = baseTemplate(`
      <h2>Thank You for Your Generous Donation! ❤️</h2>
      <p>Dear ${donation.donorName},</p>
      <p>Your donation has been received and processed successfully. Your generosity directly impacts the lives of thousands of people across Gujarat.</p>
      <div class="highlight">
        <p><strong>Receipt Number:</strong> ${donation.receiptNumber || 'Pending'}</p>
        <p><strong>Donation Amount:</strong> ₹${Number(donation.amount).toLocaleString('en-IN')}</p>
        <p><strong>Cause:</strong> ${donation.cause || 'Where needed most'}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric' })}</p>
        <p><strong>80G Benefit:</strong> This donation is eligible for tax deduction under Section 80G.</p>
      </div>
      <p>We will send your official 80G receipt within 3–5 working days.</p>
      <a href="${process.env.FRONTEND_URL}/donate" class="btn">View Donation History</a>
    `);

    await transporter.sendMail({
      from:    FROM,
      to:      donation.donorEmail,
      subject: `Donation Receipt – ₹${Number(donation.amount).toLocaleString('en-IN')} | DIVYAJOT`,
      html,
    });
  },

  async sendVolunteerConfirmation({ fullName, email }: VolunteerData) {
    const html = baseTemplate(`
      <h2>Welcome to the DIVYAJOT Family! 🎉</h2>
      <p>Dear ${fullName},</p>
      <p>Thank you for registering as a volunteer with DIVYAJOT! We are thrilled to have you join our community of 800+ changemakers.</p>
      <div class="highlight">
        <p><strong>Application Status:</strong> Under Review</p>
        <p><strong>Expected Response:</strong> Within 48 hours</p>
        <p><strong>Next Steps:</strong> Our volunteer coordinator will reach out to schedule an orientation call.</p>
      </div>
      <p>In the meantime, explore our activities and upcoming events on our website.</p>
      <a href="${process.env.FRONTEND_URL}/activities" class="btn">View Activities</a>
    `);

    await transporter.sendMail({
      from:    FROM,
      to:      email,
      subject: 'Volunteer Registration Received – DIVYAJOT',
      html,
    });
  },

  async sendVolunteerApproval({ fullName, email }: VolunteerData) {
    const html = baseTemplate(`
      <h2>Congratulations! Your Application is Approved 🏆</h2>
      <p>Dear ${fullName},</p>
      <p>We are excited to officially welcome you as a <strong>DIVYAJOT Volunteer!</strong></p>
      <div class="highlight">
        <p><strong>Status:</strong> Approved ✅</p>
        <p><strong>Next Step:</strong> Our coordinator will contact you within 24 hours to discuss your first assignment.</p>
      </div>
      <p>Your certificate of appreciation will be issued after your first 10 volunteer hours.</p>
      <a href="${process.env.FRONTEND_URL}/volunteer" class="btn">View Volunteer Portal</a>
    `);

    await transporter.sendMail({
      from:    FROM,
      to:      email,
      subject: '🎉 You\'re now a DIVYAJOT Volunteer!',
      html,
    });
  },

  async sendContactNotification({ name, email, subject, message }: ContactData) {
    const html = baseTemplate(`
      <h2>New Contact Query</h2>
      <div class="highlight">
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject || 'General Query'}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString('en-IN')}</p>
      </div>
      <a href="${process.env.FRONTEND_URL}/admin/contacts" class="btn">View in Admin Panel</a>
    `);

    await transporter.sendMail({
      from:    FROM,
      to:      process.env.SMTP_USER!,
      subject: `New Contact: ${subject || 'General Query'} from ${name}`,
      html,
    });
  },

  async sendContactAutoReply({ name, email }: { name: string; email: string }) {
    const html = baseTemplate(`
      <h2>We've Received Your Message!</h2>
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to DIVYAJOT. We have received your message and our team will reply within <strong>24 hours</strong>.</p>
      <p>If your query is urgent, please call us at <strong>+91 98765 43210</strong> (Mon–Sat, 9AM–6PM).</p>
      <a href="${process.env.FRONTEND_URL}" class="btn">Visit Our Website</a>
    `);

    await transporter.sendMail({
      from:    FROM,
      to:      email,
      subject: 'We received your message – DIVYAJOT',
      html,
    });
  },
};
