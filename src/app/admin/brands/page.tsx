"use client";

import { useEffect, useState } from "react";
import styles from "../admin.module.scss";
import ImageUpload from "../ImageUpload";

interface Brand { id: number; name: string; logo: string | null; }

export default function BrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState<Brand | null>(null);
    const [name, setName] = useState("");
    const [logo, setLogo] = useState("");
    const [saving, setSaving] = useState(false);

    async function fetchBrands() {
        const res = await fetch("/api/admin/brands");
        setBrands(await res.json());
    }

    useEffect(() => { fetchBrands(); }, []);

    function openAdd() { setEditing(null); setName(""); setLogo(""); setModal(true); }
    function openEdit(b: Brand) { setEditing(b); setName(b.name); setLogo(b.logo ?? ""); setModal(true); }

    async function save() {
        setSaving(true);
        if (editing) {
            await fetch("/api/admin/brands", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, name, logo }) });
        } else {
            await fetch("/api/admin/brands", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, logo }) });
        }
        setSaving(false);
        setModal(false);
        fetchBrands();
    }

    async function deleteBrand(id: number) {
        if (!confirm("هل أنت متأكد من حذف هذه الماركة؟")) return;
        await fetch("/api/admin/brands", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        fetchBrands();
    }

    return (
        <div>
            <div className={styles.pageHeader}>
                <h1>الماركات</h1>
                <p>إدارة ماركات أجهزة التكييف</p>
            </div>

            <div className={styles.tableWrap}>
                <div className={styles.tableHead}>
                    <h2>قائمة الماركات ({brands.length})</h2>
                    <button className={styles.addBtn} onClick={openAdd}>+ إضافة ماركة</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>الاسم</th>
                            <th>الشعار</th>
                            <th>إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((b, i) => (
                            <tr key={b.id}>
                                <td>{i + 1}</td>
                                <td>{b.name}</td>
                                <td>
                                    {b.logo
                                        ? <img src={b.logo} alt={b.name} style={{ height: 32, objectFit: "contain", mixBlendMode: "multiply" }} />
                                        : "—"}
                                </td>
                                <td>
                                    <button className={styles.editBtn} onClick={() => openEdit(b)}>تعديل</button>
                                    <button className={styles.deleteBtn} onClick={() => deleteBrand(b.id)}>حذف</button>
                                </td>
                            </tr>
                        ))}
                        {brands.length === 0 && <tr><td colSpan={4} style={{ textAlign: "center", color: "#aaa" }}>لا توجد ماركات بعد</td></tr>}
                    </tbody>
                </table>
            </div>

            {modal && (
                <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && setModal(false)}>
                    <div className={styles.modal}>
                        <h3>{editing ? "تعديل ماركة" : "إضافة ماركة جديدة"}</h3>
                        <div className={styles.field}>
                            <label>اسم الماركة *</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="كاريير" />
                        </div>
                        <ImageUpload value={logo} onChange={setLogo} label="شعار الماركة (اختياري)" removeBg />
                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={() => setModal(false)}>إلغاء</button>
                            <button className={styles.saveBtn} onClick={save} disabled={saving || !name}>
                                {saving ? "جارٍ الحفظ..." : "حفظ"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
