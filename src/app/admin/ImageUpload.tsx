"use client";

import { useRef, useState } from "react";
import styles from "./ImageUpload.module.scss";

interface Props {
    value: string;          // current URL (from DB)
    onChange: (url: string) => void;
    label?: string;
    removeBg?: boolean;     // strip white background (for brand logos)
}

export default function ImageUpload({ value, onChange, label = "الصورة", removeBg }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 4 * 1024 * 1024) {
            setError("حجم الصورة كبير جداً (الأقصى 4 ميجابايت)");
            setUploading(false);
            return;
        }

        setError("");
        setUploading(true);

        const fd = new FormData();
        fd.append("file", file);

        try {
            const url = removeBg ? "/api/admin/upload?removeBg=true" : "/api/admin/upload";
            const res = await fetch(url, { method: "POST", body: fd });

            let data;
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await res.json();
            } else {
                throw new Error(`خطأ في الخادم (${res.status})`);
            }

            if (!res.ok) throw new Error(data.error ?? "فشل الرفع");
            onChange(data.url);
        } catch (err) {
            console.error("Upload error:", err);
            setError((err as Error).message === "Unexpected end of JSON input"
                ? "خطأ في معالجة البيانات من الخادم"
                : (err as Error).message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className={styles.wrap}>
            <label className={styles.label}>{label}</label>

            {/* Hidden file input */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFile}
            />

            {/* Preview + trigger */}
            <div className={styles.dropzone} onClick={() => inputRef.current?.click()}>
                {uploading ? (
                    <span className={styles.uploading}>⏳ جارٍ الرفع...</span>
                ) : value ? (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={value} alt="preview" className={styles.preview} style={{ mixBlendMode: "multiply" }} />
                        <span className={styles.change}>انقر للتغيير</span>
                    </>
                ) : (
                    <span className={styles.placeholder}>
                        📁 انقر لاختيار صورة
                    </span>
                )}
            </div>

            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
