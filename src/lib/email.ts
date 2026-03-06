interface ContactEmailParams {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export async function sendContactEmail(data: ContactEmailParams) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;

    // Skip sending if email configuration is missing
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
        console.warn("⚠️ SMTP credentials missing. Skipping email notification.");
        console.log("📨 Message Data:", data);
        return;
    }

    try {
        const nodemailer = require("nodemailer");

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT) || 587,
            secure: Number(SMTP_PORT) === 465,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Airtwo Store Contact" <${SMTP_USER}>`,
            to: CONTACT_EMAIL,
            subject: `رسالة جديدة من: ${data.name}`,
            text: `
تلقيت رسالة جديدة من صفحة "تواصل معنا":

الاسم: ${data.name}
الهاتف: ${data.phone}
البريد: ${data.email}

الرسالة:
${data.message}
            `,
            html: `
            <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #0284c7;">رسالة تواصل جديدة 📨</h2>
                <p><strong>الاسم:</strong> ${data.name}</p>
                <p><strong>البريد الإلكتروني:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                <p><strong>الهاتف:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
                <hr style="border: 1px solid #eee; margin: 20px 0;" />
                <h3>محتوى الرسالة:</h3>
                <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-right: 4px solid #0284c7; white-space: pre-wrap;">${data.message}</p>
            </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent: %s", info.messageId);
    } catch (error) {
        console.error("❌ Error sending contact email:", error);
        throw error;
    }
}
