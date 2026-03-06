import { prisma } from "@/lib/prisma";
import styles from "./BrandsSection.module.scss";

export default async function BrandsSection() {
    const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });

    if (brands.length === 0) return null;

    const mid = Math.ceil(brands.length / 2);
    const group1 = brands.slice(0, mid);        // first half → row 1
    const group2 = brands.slice(mid);            // second half → row 2

    // Duplicate each group enough times for a seamless infinite loop
    const repeat1 = Math.max(2, Math.ceil(10 / group1.length));
    const repeat2 = group2.length > 0 ? Math.max(2, Math.ceil(10 / group2.length)) : 0;

    const strip1 = Array.from({ length: repeat1 }, () => group1).flat();
    const strip2 = group2.length > 0
        ? Array.from({ length: repeat2 }, () => group2).flat()
        : strip1; // fallback: show group1 reversed if only 1 brand total

    return (
        <section className={styles.section} id="brands" aria-label="الماركات">
            <div className={styles.header}>
                <span className={styles.eyebrow}>شركاؤنا</span>
                <h2 className={styles.title}>موزعون معتمدون لدي   </h2>
                <p className={styles.sub}>نوفر أفضل الماركات العالمية بأسعار تنافسية</p>
            </div>

            {/* Row 1 — first 5 brands, scrolls right */}
            <div className={styles.fadeWrap}>
                <div className={`${styles.row} ${styles.rowRight}`}>
                    {[...strip1, ...strip1].map((b, i) => (
                        <div key={`r1-${i}`} className={styles.item}>
                            {b.logo ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={b.logo} alt={b.name} className={styles.logo} />
                            ) : (
                                <span className={styles.fallback}>{b.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Row 2 — next 5 brands, scrolls left */}
            <div className={styles.fadeWrap}>
                <div className={`${styles.row} ${styles.rowLeft}`}>
                    {[...strip2, ...strip2].map((b, i) => (
                        <div key={`r2-${i}`} className={styles.item}>
                            {b.logo ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={b.logo} alt={b.name} className={styles.logo} />
                            ) : (
                                <span className={styles.fallback}>{b.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
