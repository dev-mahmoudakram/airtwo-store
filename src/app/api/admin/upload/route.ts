import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createAdminClient } from "@/lib/supabase";
import sharp from "sharp";

const BUCKET = "products";
const BG_THRESHOLD = 238; // pixels ≥ this value in all rgb channels are treated as "white background"

async function removeWhiteBackground(input: Buffer): Promise<Buffer<ArrayBuffer>> {
    const { data, info } = await sharp(input)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const pixels = new Uint8Array(data.buffer as ArrayBuffer);

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        if (r >= BG_THRESHOLD && g >= BG_THRESHOLD && b >= BG_THRESHOLD) {
            pixels[i + 3] = 0; // make transparent
        }
    }

    const out = await sharp(Buffer.from(pixels.buffer as ArrayBuffer), {
        raw: { width: info.width, height: info.height, channels: 4 },
    })
        .png()
        .toBuffer();

    return out as Buffer<ArrayBuffer>;
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const removeBg = req.nextUrl.searchParams.get("removeBg") === "true";

        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

        let arrayBuffer = await file.arrayBuffer();
        let buffer = Buffer.from(arrayBuffer);

        // Determine final extension/content-type
        let contentType = file.type;
        let ext = file.name.split(".").pop() ?? "jpg";

        if (removeBg) {
            buffer = await removeWhiteBackground(buffer);
            contentType = "image/png";
            ext = "png";
        }

        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const supabase = createAdminClient();
        const { error } = await supabase.storage
            .from(BUCKET)
            .upload(fileName, buffer, { contentType, upsert: false });

        if (error) {
            console.error("Supabase upload error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
        return NextResponse.json({ url: data.publicUrl });
    } catch (err) {
        console.error("Upload API Error:", err);
        return NextResponse.json({ error: (err as Error).message || "Internal Server Error during upload" }, { status: 500 });
    }
}
