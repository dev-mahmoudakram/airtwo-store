"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";

const socialLinks = [
    {
        label: "فيسبوك",
        href: "https://facebook.com",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        label: "إنستغرام",
        href: "https://instagram.com",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
    },
    {
        label: "البريد الإلكتروني",
        href: "mailto:info@airtwo.com",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/assets/logo-2.png"
                        alt="AirTwo Logo"
                        width={120}
                        height={120}
                        className={styles.logoImg}
                    />
                </Link>

                <p className={styles.tagline}>
                    وجهتك الأولى للتسوق الإلكتروني — منتجات أصيلة، أسعار تنافسية، وتوصيل سريع.
                </p>

                <div className={styles.socials}>
                    {socialLinks.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            className={styles.socialIcon}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div>

            <p className={styles.copy}>
                © {new Date().getFullYear()} AirTwo Store. جميع الحقوق محفوظة.
            </p>
        </footer>
    );
}
