"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface QuoteData {
  name: string;
  phone: string;
  make: string;
  model: string;
  rego: string;
  service: string;
  message: string;
}

export async function sendQuote(data: QuoteData): Promise<{ ok: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    return { ok: false, error: "Email service not configured." };
  }

  const subject = `Quote Request — ${data.make} ${data.model}${data.rego ? ` (${data.rego.toUpperCase()})` : ""}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
      <div style="background: #0A0A0A; padding: 24px 32px; border-top: 4px solid #DC2626;">
        <h1 style="color: #fff; margin: 0; font-size: 22px;">New Quote Request</h1>
        <p style="color: #999; margin: 4px 0 0; font-size: 14px;">Service Motors AU</p>
      </div>

      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr style="background: #f5f5f5;">
            <td style="padding: 10px 14px; font-weight: bold; width: 40%;">Name</td>
            <td style="padding: 10px 14px;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold;">Phone</td>
            <td style="padding: 10px 14px;">${data.phone}</td>
          </tr>
          <tr style="background: #f5f5f5;">
            <td style="padding: 10px 14px; font-weight: bold;">Make</td>
            <td style="padding: 10px 14px;">${data.make}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold;">Model</td>
            <td style="padding: 10px 14px;">${data.model}</td>
          </tr>
          ${data.rego ? `
          <tr style="background: #f5f5f5;">
            <td style="padding: 10px 14px; font-weight: bold;">Rego</td>
            <td style="padding: 10px 14px;">${data.rego.toUpperCase()}</td>
          </tr>` : ""}
          ${data.service ? `
          <tr>
            <td style="padding: 10px 14px; font-weight: bold;">Service</td>
            <td style="padding: 10px 14px;">${data.service}</td>
          </tr>` : ""}
          ${data.message ? `
          <tr style="background: #f5f5f5;">
            <td style="padding: 10px 14px; font-weight: bold; vertical-align: top;">Notes</td>
            <td style="padding: 10px 14px;">${data.message}</td>
          </tr>` : ""}
        </table>

        <div style="margin-top: 28px; padding: 16px; background: #FEE2E2; border-radius: 8px;">
          <p style="margin: 0; font-size: 13px; color: #991B1B;">
            Reply directly to this email or call ${data.phone} to follow up.
          </p>
        </div>
      </div>

      <div style="background: #f5f5f5; padding: 16px 32px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #999;">servicemotorsau.com · Sydney, NSW</p>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: "Service Motors AU <onboarding@resend.dev>",
      to:   "servicemotorsau@gmail.com",
      replyTo: data.phone ? undefined : undefined,
      subject,
      html,
    });

    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    console.error("Email error:", err);
    return { ok: false, error: "Failed to send. Please try WhatsApp instead." };
  }
}
