import Link from "next/link";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
    return (
        <section className={styles.hero} id="home">
            <div className={styles.inner}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        أفضل أجهزة <span className={styles.highlight}>التكييف والتبريد</span> بأسعار لا تُقاوَم
                    </h1>

                    <p className={styles.subtitle}>
                        تصفح أحدث مجموعاتنا من أجهزة التكييف والتبريد المنزلية والتجارية.
                        جودة عالية، ضمان معتمد، وتوصيل سريع لباب بيتك.
                    </p>

                    <div className={styles.actions}>
                        <Link href="/contact" className={styles.btnPrimary}>
                            تواصل معنا
                        </Link>
                        <Link href="/products" className={styles.btnOutline}>
                            تصفح منتجاتنا
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
