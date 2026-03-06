import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const products = await prisma.product.findMany({
        include: { brand: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { brandId, model, hp, inverter, image, featured } = await req.json();
    if (!brandId || !model || !hp) return NextResponse.json({ error: "brandId, model, hp required" }, { status: 400 });
    const product = await prisma.product.create({
        data: { brandId: Number(brandId), model, hp: Number(hp), inverter: Boolean(inverter), image, featured: Boolean(featured) },
    });
    return NextResponse.json(product, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id, brandId, model, hp, inverter, image, featured } = await req.json();
    const product = await prisma.product.update({
        where: { id },
        data: { brandId: Number(brandId), model, hp: Number(hp), inverter: Boolean(inverter), image, featured: Boolean(featured) },
    });
    return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
}
