import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/email";

// Force Node.js runtime to support nodemailer natively
export const runtime = "nodejs";
export const dynamic = "force-dynamic";


export async function POST(req: Request) {
    console.log("--> API /contact HIT");
    try {
        const body = await req.json();
        const { name, email, phone, message } = body;
        console.log("--> Received Body:", body);

        // 1. Validate input
        if (!name || !email || !phone || !message) {
            console.log("--> Validation Failed");
            return NextResponse.json(
                { error: "جميع الحقول مطلوبة" },
                { status: 400 }
            );
        }

        console.log("--> Saving to Prisma");
        // 2. Save to database
        const savedMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                phone,
                message,
            },
        });
        console.log("--> Prisma Save Success:", savedMessage.id);

        console.log("--> Sending Email");
        // 3. Send email (await it to prevent background socket crashes in Next.js)
        try {
            await sendContactEmail({ name, email, phone, message });
        } catch (err) {
            console.error("Failed to send email notification:", err);
            // We still return success to the user since it was saved to the DB
        }

        console.log("--> Returning Success");
        // 4. Return success
        return NextResponse.json({
            success: true,
            data: savedMessage,
            message: "تم استلام رسالتك بنجاح"
        });

    } catch (error) {
        console.error("====== API CONTACT ERROR ======");
        console.error(error);
        console.error("===============================");
        return NextResponse.json(
            { error: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى." },
            { status: 500 }
        );
    }
}
