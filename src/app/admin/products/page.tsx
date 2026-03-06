"use client";

import { useEffect, useState } from "react";
import styles from "../admin.module.scss";
import ImageUpload from "../ImageUpload";

interface Brand { id: number; name: string; }
interface Product {
    id: number;
    model: string;
    hp: number;
    inverter: boolean;
    image: string | null;
    featured: boolean;
    brand: { id: number; name: string };
}

const empty = { brandId: 0, model: "", hp: 1, inverter: false, image: "", featured: false };

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);

    async function fetchAll() {
        const [p, b] = await Promise.all([
            fetch("/api/admin/products").then((r) => r.json()),
            fetch("/api/admin/brands").then((r) => r.json()),
        ]);
        setProducts(p);
        setBrands(b);
    }

    useEffect(() => { fetchAll(); }, []);

    function openAdd() { setEditing(null); setForm(empty); setModal(true); }
    function openEdit(p: Product) {
        setEditing(p);
        setForm({ brandId: p.brand.id, model: p.model, hp: p.hp, inverter: p.inverter, image: p.image ?? "", featured: p.featured });
        setModal(true);
    }

    function setF(key: string, value: unknown) { setForm((f) => ({ ...f, [key]: value })); }

    async function save() {
        setSaving(true);
        const body = { ...form, hp: Number(form.hp), brandId: Number(form.brandId) };
        if (editing) {
            await fetch("/api/admin/products", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...body }) });
        } else {
            await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        }
        setSaving(false);
        setModal(false);
        fetchAll();
    }

    async function deleteProduct(id: number) {
        if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
        await fetch("/api/admin/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        fetchAll();
    }

    return (
        <div>
            <div className={styles.pageHeader}>
                <h1>المنتجات</h1>
                <p>إدارة كتالوج أجهزة التكييف</p>
            </div>

            <div className={styles.tableWrap}>
                <div className={styles.tableHead}>
                    <h2>قائمة المنتجات ({products.length})</h2>
                    <button className={styles.addBtn} onClick={openAdd}>+ إضافة منتج</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>الصورة</th>
                            <th>الماركة</th>
                            <th>الموديل</th>
                            <th>الحصان</th>
                            <th>إنفرتر</th>
                            <th>مميز</th>
                            <th>إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>
                                    {p.image
                                        ? <img src={p.image} alt={p.model} style={{ width: 48, height: 36, objectFit: "cover", borderRadius: 6 }} />
                                        : <span style={{ color: "#ccc" }}>—</span>}
                                </td>
                                <td>{p.brand.name}</td>
                                <td>{p.model}</td>
                                <td>{p.hp} حصان</td>
                                <td><span className={`${styles.badge} ${p.inverter ? styles.badgeYes : styles.badgeNo}`}>{p.inverter ? "نعم" : "لا"}</span></td>
                                <td><span className={`${styles.badge} ${p.featured ? styles.badgeYes : styles.badgeNo}`}>{p.featured ? "نعم" : "لا"}</span></td>
                                <td>
                                    <button className={styles.editBtn} onClick={() => openEdit(p)}>تعديل</button>
                                    <button className={styles.deleteBtn} onClick={() => deleteProduct(p.id)}>حذف</button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && <tr><td colSpan={7} style={{ textAlign: "center", color: "#aaa" }}>لا توجد منتجات بعد</td></tr>}
                    </tbody>
                </table>
            </div>

            {modal && (
                <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && setModal(false)}>
                    <div className={styles.modal}>
                        <h3>{editing ? "تعديل منتج" : "إضافة منتج جديد"}</h3>

                        <div className={styles.field}>
                            <label>الماركة *</label>
                            <select value={form.brandId} onChange={(e) => setF("brandId", e.target.value)}>
                                <option value={0} disabled>اختر ماركة</option>
                                {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label>اسم الموديل *</label>
                            <input value={form.model} onChange={(e) => setF("model", e.target.value)} placeholder="X-Power Gold 53QHC012" />
                        </div>
                        <div className={styles.field}>
                            <label>الحصان *</label>
                            <input type="number" step="0.25" min="0.5" value={form.hp} onChange={(e) => setF("hp", e.target.value)} />
                        </div>

                        <ImageUpload
                            value={form.image}
                            onChange={(url) => setF("image", url)}
                            label="صورة المنتج (اختياري)"
                        />

                        <label className={styles.checkboxField}>
                            <input type="checkbox" checked={form.inverter} onChange={(e) => setF("inverter", e.target.checked)} />
                            إنفرتر
                        </label>
                        <label className={styles.checkboxField}>
                            <input type="checkbox" checked={form.featured} onChange={(e) => setF("featured", e.target.checked)} />
                            منتج مميز (الأكثر مبيعاً)
                        </label>

                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={() => setModal(false)}>إلغاء</button>
                            <button className={styles.saveBtn} onClick={save} disabled={saving || !form.model || !form.brandId}>
                                {saving ? "جارٍ الحفظ..." : "حفظ"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
