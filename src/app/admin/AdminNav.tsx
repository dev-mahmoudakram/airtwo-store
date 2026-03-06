"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import styles from "./admin.module.scss";

export default function AdminNav() {
    const pathname = usePathname();
    const { data: session } = useSession();

    if (!session || pathname === "/admin/login") return null;

    const links = [
        { href: "/admin", label: "📊 لوحة التحكم" },
        { href: "/admin/messages", label: "📨 رسائل التواصل" },
        { href: "/admin/brands", label: "🏷️ الماركات" },
        { href: "/admin/products", label: "📦 المنتجات" },
        { href: "/admin/testimonials", label: "💬 آراء العملاء" },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarLogo}>
                <Image
                    src="/assets/logo-1.png"
                    alt="AirTwo Logo"
                    width={130}
                    height={52}
                    style={{ objectFit: "contain" }}
                />
            </div>
            <nav className={styles.sidebarNav}>
                {links.map((l) => (
                    <Link
                        key={l.href}
                        href={l.href}
                        className={`${styles.sidebarLink} ${pathname === l.href ? styles.active : ""}`}
                    >
                        {l.label}
                    </Link>
                ))}
            </nav>
            <button className={styles.sidebarLogout} onClick={() => signOut({ callbackUrl: "/admin/login" })}>
                🚪 تسجيل الخروج
            </button>
        </aside>
    );
}
