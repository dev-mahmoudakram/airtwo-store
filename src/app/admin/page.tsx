import { prisma } from "@/lib/prisma";
import styles from "./admin.module.scss";

export default async function AdminDashboard() {
    const [brandsCount, productsCount, featuredCount] = await Promise.all([
        prisma.brand.count(),
        prisma.product.count(),
        prisma.product.count({ where: { featured: true } }),
    ]);

    const stats = [
        { label: "الماركات", value: brandsCount },
        { label: "المنتجات", value: productsCount },
        { label: "منتجات مميزة", value: featuredCount },
    ];

    return (
        <div>
            <div className={styles.pageHeader}>
                <h1>لوحة التحكم</h1>
                <p>مرحباً بك في لوحة تحكم إيرتو</p>
            </div>

            <div className={styles.statsRow}>
                {stats.map((s) => (
                    <div key={s.label} className={styles.statCard}>
                        <span className={styles.statValue}>{s.value}</span>
                        <span className={styles.statLabel}>{s.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
