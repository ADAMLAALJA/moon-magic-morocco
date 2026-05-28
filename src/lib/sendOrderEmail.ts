import { createServerFn } from '@tanstack/react-start';
import { Resend } from 'resend';

export interface OrderPayload {
  name: string;
  phone: string;
  city: string;
  address: string;
  offerLabel: string;
  quantity: number;
  date: string;
}

export const sendOrderEmail = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as OrderPayload)
  .handler(async ({ data }) => {
    // NOTE: On Resend's free plan, the recipient email (02Hungry.brothers@gmail.com)
    // MUST be verified at https://resend.com/audiences before emails will deliver.
    // Without verification, Resend silently accepts the request but does not send.
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const result = await resend.emails.send({
        from: 'Moon Luxe Orders <onboarding@resend.dev>',
        to: '02Hungry.brothers@gmail.com',
        subject: `🛒 طلب جديد - ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #c9a84c;">طلب جديد - Moon Luxe</h1>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr><td style="padding:8px;border:1px solid #eee;"><strong>الاسم</strong></td><td style="padding:8px;border:1px solid #eee;">${data.name}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;"><strong>الهاتف</strong></td><td style="padding:8px;border:1px solid #eee;">${data.phone}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;"><strong>المدينة</strong></td><td style="padding:8px;border:1px solid #eee;">${data.city}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;"><strong>العنوان</strong></td><td style="padding:8px;border:1px solid #eee;">${data.address}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;"><strong>العرض</strong></td><td style="padding:8px;border:1px solid #eee;">${data.offerLabel}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;"><strong>الكمية</strong></td><td style="padding:8px;border:1px solid #eee;">${data.quantity}</td></tr>
              <tr><td style="padding:8px;border:1px solid #eee;"><strong>التاريخ</strong></td><td style="padding:8px;border:1px solid #eee;">${data.date}</td></tr>
            </table>
          </div>
        `,
      });
      console.log('[Resend] Email send result:', JSON.stringify(result));
    } catch (err) {
      console.error('[Resend] Failed to send order notification email:', err);
      // Do NOT throw — a Resend failure should never block the customer's order confirmation
    }
    return { ok: true };
  });
