"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import styles from "./CatalogSection.module.scss";

const WHATSAPP_NUMBER = "201001803657";

function whatsappLink(product: CatalogProduct) {
    const inverterText = product.inverter ? "إنفرتر" : "عادي";
    const msg = `*استفسار عن جهاز تكييف*

*الماركة:* ${product.brand}
*الموديل:* ${product.model}
*القدرة:* ${product.hp} حصان
*النوع:* ${inverterText}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

interface CatalogProduct {
    id: number;
    brand: string;
    model: string;
    hp: number;
    inverter: boolean;
    image: string | null;
    featured: boolean;
}

interface Props {
    products: CatalogProduct[];
    brands: string[];
    hpOptions: number[];
    viewAllHref?: string; // when set: show "View All" button, hide filters
}

export default function CatalogClient({ products, brands, hpOptions, viewAllHref }: Props) {
    const [activeBrand, setActiveBrand] = useState<string>("الكل");
    const [activeHp, setActiveHp] = useState<number | "الكل">("الكل");
    const [onlyBestSellers, setOnlyBestSellers] = useState(false);

    const filtered = useMemo(() => {
        return products.filter((p) => {
            const brandMatch = activeBrand === "الكل" || p.brand === activeBrand;
            const hpMatch = activeHp === "الكل" || p.hp === activeHp;
            const bestSellerMatch = !onlyBestSellers || p.featured;
            return brandMatch && hpMatch && bestSellerMatch;
        });
    }, [products, activeBrand, activeHp, onlyBestSellers]);

    const hasFilters = activeBrand !== "الكل" || activeHp !== "الكل" || onlyBestSellers;

    function resetFilters() {
        setActiveBrand("الكل");
        setActiveHp("الكل");
        setOnlyBestSellers(false);
    }

    return (
        <section className={styles.section} id="products">
            <div className={styles.container}>

                {/* ── Header ── */}
                <div className={styles.header}>
                    <span className={styles.eyebrow}>كتالوج المنتجات</span>
                    <h2 className={styles.title}>تصفح أجهزتنا</h2>
                    <p className={styles.lead}>
                        اختر من بين مجموعة متنوعة من أجهزة التكييف سبليت بمختلف الماركات والأحجام.
                        جميع الأجهزة أصلية ١٠٠٪ مع ضمان المصنّع.
                    </p>
                </div>

                {/* ── Filters (only on full catalog page) ── */}
                {!viewAllHref && (
                    <div className={styles.filters}>
                        <div className={styles.filterGroup}>
                            <span className={styles.filterLabel}>المميزات</span>
                            <div className={styles.pills}>
                                <button
                                    className={`${styles.pill} ${styles.bestSellerPill} ${onlyBestSellers ? styles.pillActive : ""}`}
                                    onClick={() => setOnlyBestSellers(!onlyBestSellers)}
                                >
                                    ⭐ الأكثر مبيعاً
                                </button>
                            </div>
                        </div>
                        <div className={styles.filterGroup}>
                            <span className={styles.filterLabel}>الماركة</span>
                            <div className={styles.pills}>
                                {["الكل", ...brands].map((b) => (
                                    <button key={b} className={`${styles.pill} ${activeBrand === b ? styles.pillActive : ""}`} onClick={() => setActiveBrand(b)}>{b}</button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.filterGroup}>
                            <span className={styles.filterLabel}>الحصان</span>
                            <div className={styles.pills}>
                                {["الكل", ...hpOptions].map((h) => (
                                    <button key={h} className={`${styles.pill} ${activeHp === h ? styles.pillActive : ""}`} onClick={() => setActiveHp(h as number | "الكل")}>
                                        {h === "الكل" ? "الكل" : `${h} حصان`}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {hasFilters && <button className={styles.resetBtn} onClick={resetFilters}>✕ إزالة الفلاتر</button>}
                    </div>
                )}

                {!viewAllHref && <p className={styles.resultCount}>{filtered.length === 0 ? "لا توجد نتائج" : `عرض ${filtered.length} منتج`}</p>}

                {/* ── Grid ── */}
                {filtered.length > 0 ? (
                    <div className={styles.grid}>
                        {filtered.map((product) => (
                            <div key={product.id} className={`${styles.card} ${product.featured ? styles.cardFeatured : ""}`}>
                                {product.featured && <span className={styles.badge}>⭐ الأكثر مبيعاً</span>}

                                <div className={styles.cardImg}>
                                    {product.image && (
                                        <Image
                                            src={product.image}
                                            alt={`${product.brand} ${product.model}`}
                                            width={400}
                                            height={300}
                                            className={styles.img}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    )}
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.cardBrand}>{product.brand}</span>
                                        <span className={styles.cardType}>سبليت</span>
                                    </div>
                                    <h3 className={styles.cardModel}>{product.model}</h3>
                                    <ul className={styles.specs}>
                                        <li><span className={styles.specIcon}>⚡</span><span>{product.hp} حصان</span></li>
                                        <li><span className={styles.specIcon}>{product.inverter ? "✅" : "❌"}</span><span>إنفرتر</span></li>
                                    </ul>
                                    <a href={whatsappLink(product)} className={styles.waBtn} target="_blank" rel="noopener noreferrer">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                                        </svg>
                                        استفسر عبر واتساب
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <span>🔍</span>
                        <p>لا توجد منتجات تطابق الفلاتر المحددة</p>
                        <button className={styles.resetBtn} onClick={resetFilters}>إزالة الفلاتر</button>
                    </div>
                )}

                {/* ── View All button (home page only) ── */}
                {viewAllHref && (
                    <div className={styles.viewAllWrap}>
                        <a href={viewAllHref} className={styles.viewAllBtn}>
                            عرض جميع المنتجات ←
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
