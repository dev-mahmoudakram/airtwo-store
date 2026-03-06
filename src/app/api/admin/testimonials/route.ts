import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const data = await req.json();
        const { id, name, content, rating } = data;

        if (id) {
            // Update
            const updated = await prisma.testimonial.update({
                where: { id: Number(id) },
                data: { name, content, rating: Number(rating) },
            });
            return NextResponse.json(updated);
        } else {
            // Create
            const created = await prisma.testimonial.create({
                data: { name, content, rating: Number(rating) },
            });
            return NextResponse.json(created);
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to save testimonial" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        await prisma.testimonial.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
    }
}
