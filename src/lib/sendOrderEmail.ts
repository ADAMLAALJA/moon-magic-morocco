import { createServerFn } from '@tanstack/react-start';
import { Resend } from 'resend';
// [resend-patch-applied]

export interface OrderPayload {
  name: string; phone: string; city: string;
  address: string; offerLabel: string; quantity: number; date: string;
}

export const sendOrderEmail = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => data as OrderPayload)
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY || 'Pre_XnJGbMYy_P9gZFaJXRU8LSDe44R9a2bkd');
    try {
      const result = await resend.emails.send({
        from: 'Moon Luxe <onboarding@resend.dev>',
        to: 'kroumirihab@gmail.com',
        subject: `🛒 طلب جديد - ${data.name}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
          <h1 style="color:#c9a84c">طلب جديد - Moon Luxe</h1>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr><td style="padding:8px;border:1px solid #eee"><strong>الاسم</strong></td><td style="padding:8px;border:1px solid #eee">${data.name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>الهاتف</strong></td><td style="padding:8px;border:1px solid #eee">${data.phone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>المدينة</strong></td><td style="padding:8px;border:1px solid #eee">${data.city}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>العنوان</strong></td><td style="padding:8px;border:1px solid #eee">${data.address}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>العرض</strong></td><td style="padding:8px;border:1px solid #eee">${data.offerLabel}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>الكمية</strong></td><td style="padding:8px;border:1px solid #eee">${data.quantity}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee"><strong>التاريخ</strong></td><td style="padding:8px;border:1px solid #eee">${data.date}</td></tr>
          </table></div>`,
      });
      if ((result as any)?.error) throw new Error(JSON.stringify((result as any).error));
      return { ok: true };
    } catch (err) {
      console.error('[Resend] error:', err);
      throw err;
    }
  });
