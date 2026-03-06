import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(brands);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { name, logo } = await req.json();
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    const brand = await prisma.brand.create({ data: { name, logo } });
    return NextResponse.json(brand, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id, name, logo } = await req.json();
    const brand = await prisma.brand.update({ where: { id }, data: { name, logo } });
    return NextResponse.json(brand);
}

export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await prisma.brand.delete({ where: { id } });
    return NextResponse.json({ ok: true });
}
