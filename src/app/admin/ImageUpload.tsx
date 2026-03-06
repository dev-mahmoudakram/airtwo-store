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

        setError("");
        setUploading(true);

        const fd = new FormData();
        fd.append("file", file);

        try {
            const url = removeBg ? "/api/admin/upload?removeBg=true" : "/api/admin/upload";
            const res = await fetch(url, { method: "POST", body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Upload failed");
            onChange(data.url);
        } catch (err) {
            setError((err as Error).message);
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
