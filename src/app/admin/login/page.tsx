"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./login.module.scss";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        setLoading(false);
        if (res?.ok) {
            router.push("/admin");
            router.refresh();
        } else {
            setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>تسجيل الدخول</h1>
                <p className={styles.subtitle}>لوحة تحكم إيرتو</p>

                {error && <p className={styles.error}>{error}</p>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="email">البريد الإلكتروني</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@airtwo.com"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password">كلمة المرور</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <button type="submit" className={styles.btn} disabled={loading}>
                        {loading ? "جارٍ الدخول..." : "دخول"}
                    </button>
                </form>
            </div>
        </div>
    );
}
