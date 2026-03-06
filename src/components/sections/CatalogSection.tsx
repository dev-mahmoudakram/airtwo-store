import { prisma } from "@/lib/prisma";
import CatalogClient from "./CatalogClient";

interface Props {
    limit?: number; // if set, only show this many cards + a View All button
}

export default async function CatalogSection({ limit }: Props) {
    const products = await prisma.product.findMany({
        include: { brand: { select: { name: true } } },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        ...(limit ? { take: limit } : {}),
    });

    const allBrands = limit
        ? (await prisma.brand.findMany({ orderBy: { name: "asc" } })).map((b) => b.name)
        : [...new Set(products.map((p) => p.brand.name))].sort();

    const hpOptions = [...new Set(products.map((p) => p.hp))].sort((a, b) => a - b);

    return (
        <CatalogClient
            products={products.map((p) => ({
                id: p.id,
                brand: p.brand.name,
                model: p.model,
                hp: p.hp,
                inverter: p.inverter,
                image: p.image,
                featured: p.featured,
            }))}
            brands={allBrands}
            hpOptions={hpOptions}
            viewAllHref={limit ? "/products" : undefined}
        />
    );
}
