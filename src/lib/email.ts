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
            <div dir="rtl" style="background-color: #f3f4f6; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                    <!-- Header -->
                    <div style="background-color: #0284c7; padding: 30px; text-align: center;">
                        <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">رسالة تواصل جديدة 📨</h2>
                    </div>
                    
                    <!-- Content -->
                    <div style="padding: 30px;">
                        <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 25px; border: 1px solid #e2e8f0;">
                            <h3 style="margin-top: 0; color: #334155; font-size: 16px; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">معلومات المرسل</h3>
                            
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b; width: 120px; font-weight: 500;">الاسم:</td>
                                    <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${data.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b; font-weight: 500;">البريد الإلكتروني:</td>
                                    <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${data.email}</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b; font-weight: 500;">رقم الهاتف:</td>
                                    <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #0284c7; text-decoration: none; font-weight: 600;" dir="ltr" style="display: inline-block;">${data.phone}</a></td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style="margin-bottom: 10px;">
                            <h3 style="color: #334155; font-size: 16px; margin-bottom: 10px;">محتوى الرسالة:</h3>
                            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; border-right: 4px solid #0284c7; color: #334155; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${data.message}</div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0; color: #64748b; font-size: 13px;">هذه الرسالة تم إرسالها تلقائياً من نموذج التواصل في متجر ايرتو.</p>
                    </div>
                </div>
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
