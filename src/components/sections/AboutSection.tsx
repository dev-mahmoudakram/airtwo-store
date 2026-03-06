import styles from "./AboutSection.module.scss";

const stats = [
    { value: "25+", label: "سنوات خبرة" },
    { value: "5000+", label: "عميل راضٍ" },
    { value: "150+", label: "منتج متاح" },
    { value: "24/7", label: "دعم فني" },
];

const features = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: "جودة معتمدة",
        desc: "جميع منتجاتنا مرخصة وتحمل ضمان المصنّع.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        title: "توصيل سريع",
        desc: "نوصل لجميع المحافظات في أقل وقت ممكن.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
        title: "خدمة عملاء متميزة",
        desc: "فريقنا متاح على مدار الساعة للإجابة على استفساراتك.",
    },
];

export default function AboutSection() {
    return (
        <section className={styles.section} id="about">
            <div className={styles.container}>

                {/* ── Section header ── */}
                <div className={styles.header}>
                    <span className={styles.eyebrow}>من نحن</span>
                    <h2 className={styles.title}>
                        رواد التكييف والتبريد في مصر
                    </h2>
                    <p className={styles.lead}>
                        نحن متجر إيرتو — وجهتك الأولى لأفضل أجهزة التكييف والتبريد المنزلية والتجارية.
                        نؤمن بأن الراحة حق للجميع، لذا نقدم منتجات عالية الجودة بأسعار تنافسية مع خدمة ما بعد البيع.
                    </p>
                </div>

                {/* ── Stats row ── */}
                <div className={styles.stats}>
                    {stats.map((s) => (
                        <div key={s.label} className={styles.statCard}>
                            <span className={styles.statValue}>{s.value}</span>
                            <span className={styles.statLabel}>{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* ── Feature cards ── */}
                <div className={styles.features}>
                    {features.map((f) => (
                        <div key={f.title} className={styles.featureCard}>
                            <div className={styles.featureIcon}>{f.icon}</div>
                            <h3 className={styles.featureTitle}>{f.title}</h3>
                            <p className={styles.featureDesc}>{f.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
