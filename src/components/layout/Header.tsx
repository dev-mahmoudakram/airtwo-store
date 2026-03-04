"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Header.module.scss";

const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "المنتجات", href: "/products" },
    { label: "العروض", href: "/offers" },
    { label: "من نحن", href: "/about" },
    { label: "تواصل معنا", href: "/contact" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.mainHeader}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/assets/logo-1.png"
                        alt="AirTwo Logo"
                        width={160}
                        height={64}
                        priority
                        className={styles.logoImg}
                    />
                </Link>

                {/* Desktop nav — inline with logo */}
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={styles.navLink}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile hamburger */}
                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="القائمة"
                    aria-expanded={menuOpen}
                >
                    <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`} />
                    <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`} />
                    <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`} />
                </button>
            </div>

            {/* Mobile nav dropdown */}
            {menuOpen && (
                <nav className={styles.mobileNav}>
                    <ul className={styles.mobileNavList}>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={styles.navLink}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}
