"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

const navLinks = [
    { label: "الرئيسية", href: "/#home" },
    { label: "من نحن", href: "/#about" },
    { label: "منتجاتنا", href: "/#products" },
    { label: "خدماتنا", href: "/#services" },
    { label: "الماركات", href: "/#brands" },
    { label: "آراء العملاء", href: "/#testimonials" },
    { label: "تواصل معنا", href: "/#contact" },
];

export default function Header() {
    const pathname = usePathname();
    const isProductsPage = pathname === "/products";
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Only intercept if it's a hash link and we are on the home page
        if (href.startsWith("/#") && pathname === "/") {
            e.preventDefault();
            const id = href.replace("/#", "");
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setMenuOpen(false);
            }
        }
    };

    return (
        <header className={`${styles.header} ${scrolled || isProductsPage ? styles.scrolled : ""} ${isProductsPage ? styles.staticHeader : ""}`}>
            <div className={styles.mainHeader}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    {/* Desktop Logo */}
                    <Image
                        src="/assets/logo-1.png"
                        alt="AirTwo Logo"
                        width={160}
                        height={64}
                        priority
                        className={`${styles.logoImg} ${styles.desktopLogo}`}
                    />
                    {/* Mobile Logo */}
                    <Image
                        src="/assets/logo-3.png"
                        alt="AirTwo Logo"
                        width={200}
                        height={80}
                        priority
                        className={`${styles.logoImg} ${styles.mobileLogo}`}
                    />
                </Link>

                {/* Desktop nav — inline with logo */}
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={styles.navLink}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
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
                                    onClick={(e) => handleNavClick(e, link.href)}
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
