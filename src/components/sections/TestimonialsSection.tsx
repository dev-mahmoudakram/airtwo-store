import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./TestimonialsSection.module.scss";

interface Testimonial {
    id: number;
    name: string;
    content: string;
    rating: number;
}

interface Props {
    testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: Props) {
    if (!testimonials || testimonials.length === 0) return null;

    // Split testimonials into two groups for dual row marquee
    const mid = Math.ceil(testimonials.length / 2);
    const row1 = [...testimonials.slice(0, mid), ...testimonials.slice(0, mid)];
    const row2 = [...testimonials.slice(mid), ...testimonials.slice(mid)];

    // If there is only one testimonial, just use it for both but maybe with different animations
    // or just one row. For better visual effect, we need at least a few.

    const renderCard = (t: Testimonial, idx: number) => (
        <div key={`${t.id}-${idx}`} className={styles.card}>
            <div className={styles.cardTop}>
                <div className={styles.quoteIcon}>
                    <FontAwesomeIcon icon={faQuoteLeft} />
                </div>
                <div className={styles.stars}>
                    {"⭐".repeat(t.rating)}
                </div>
            </div>

            <p className={styles.content}>"{t.content}"</p>

            <div className={styles.footer}>
                <div className={styles.avatar}>
                    {t.name.charAt(0)}
                </div>
                <div className={styles.name}>{t.name}</div>
            </div>
        </div>
    );

    return (
        <section className={styles.section} id="testimonials">
            <div className={styles.bgGlow} />

            <div className={styles.header}>
                <span className={styles.eyebrow}>آراء عملائنا</span>
                <h2 className={styles.title}>ثقة عملائنا هي سر نجاحنا</h2>
            </div>

            <div className={styles.marqueeContainer}>
                <div className={styles.fadeLeft} />
                <div className={styles.fadeRight} />

                <div className={styles.marqueeRow}>
                    <div className={`${styles.row} ${styles.rowLeft}`}>
                        {row1.map((t, idx) => renderCard(t, idx))}
                    </div>
                </div>

                {row2.length > 0 && (
                    <div className={styles.marqueeRow}>
                        <div className={`${styles.row} ${styles.rowRight}`}>
                            {row2.map((t, idx) => renderCard(t, idx))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
