"use client";

import { useEffect, useState } from "react";
import styles from "../admin.module.scss";

interface Testimonial {
    id: number;
    name: string;
    content: string;
    rating: number;
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState<Testimonial | null>(null);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);
    const [saving, setSaving] = useState(false);

    async function fetchTestimonials() {
        const res = await fetch("/api/admin/testimonials");
        setTestimonials(await res.json());
    }

    useEffect(() => { fetchTestimonials(); }, []);

    function openAdd() {
        setEditing(null);
        setName("");
        setContent("");
        setRating(5);
        setModal(true);
    }

    function openEdit(t: Testimonial) {
        setEditing(t);
        setName(t.name);
        setContent(t.content);
        setRating(t.rating);
        setModal(true);
    }

    async function save() {
        setSaving(true);
        const payload = { id: editing?.id, name, content, rating };
        await fetch("/api/admin/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        setSaving(false);
        setModal(false);
        fetchTestimonials();
    }

    async function deleteTestimonial(id: number) {
        if (!confirm("هل أنت متأكد من حذف هذا الرأي؟")) return;
        await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
        fetchTestimonials();
    }

    return (
        <div>
            <div className={styles.pageHeader}>
                <h1>آراء العملاء</h1>
                <p>إدارة الآراء والتقييمات التي تظهر في الصفحة الرئيسية</p>
            </div>

            <div className={styles.tableWrap}>
                <div className={styles.tableHead}>
                    <h2>قائمة الآراء ({testimonials.length})</h2>
                    <button className={styles.addBtn} onClick={openAdd}>+ إضافة رأي جديد</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>الاسم</th>
                            <th>التقييم</th>
                            <th>المحتوى</th>
                            <th>إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map((t, i) => (
                            <tr key={t.id}>
                                <td>{i + 1}</td>
                                <td>{t.name}</td>
                                <td>{"⭐".repeat(t.rating)}</td>
                                <td style={{ maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {t.content}
                                </td>
                                <td>
                                    <button className={styles.editBtn} onClick={() => openEdit(t)}>تعديل</button>
                                    <button className={styles.deleteBtn} onClick={() => deleteTestimonial(t.id)}>حذف</button>
                                </td>
                            </tr>
                        ))}
                        {testimonials.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ textAlign: "center", color: "#aaa" }}>
                                    لا توجد آراء بعد
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modal && (
                <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && setModal(false)}>
                    <div className={styles.modal}>
                        <h3>{editing ? "تعديل رأي" : "إضافة رأي جديد"}</h3>
                        <div className={styles.field}>
                            <label>اسم العميل *</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً: محمد المصرى" />
                        </div>
                        <div className={styles.field}>
                            <label>التقييم (1-5) *</label>
                            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                                <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                                <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                                <option value={3}>⭐⭐⭐ (3/5)</option>
                                <option value={2}>⭐⭐ (2/5)</option>
                                <option value={1}>⭐ (1/5)</option>
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label>المحتوى *</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="اكتب رأي العميل هنا..."
                                rows={4}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem",
                                    borderRadius: "0.5rem",
                                    border: "1px solid #ddd",
                                    fontFamily: "inherit"
                                }}
                            />
                        </div>
                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={() => setModal(false)}>إلغاء</button>
                            <button className={styles.saveBtn} onClick={save} disabled={saving || !name || !content}>
                                {saving ? "جارٍ الحفظ..." : "حفظ"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
