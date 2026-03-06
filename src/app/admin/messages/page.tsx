"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../admin.module.scss";

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/messages");
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
            alert("فشل في تحميل الرسائل");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const markAsRead = async (id: number) => {
        try {
            const res = await fetch(`/api/admin/messages/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isRead: true })
            });
            if (res.ok) fetchMessages();
        } catch (error) {
            console.error("Failed to mark as read:", error);
            alert("حدث خطأ");
        }
    };

    const deleteMessage = async (id: number) => {
        if (!confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return;
        try {
            const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
            if (res.ok) fetchMessages();
        } catch (error) {
            console.error("Failed to delete message:", error);
            alert("فشل الحذف");
        }
    };

    const totalMessages = messages.length;
    const unreadMessages = messages.filter(m => !m.isRead).length;
    const readMessages = totalMessages - unreadMessages;

    const filteredMessages = messages.filter(msg => {
        if (filter === "unread") return !msg.isRead;
        if (filter === "read") return msg.isRead;
        return true;
    });

    return (
        <div className={styles.page}>
            <div className={styles.header} style={{ marginBottom: "1.5rem" }}>
                <div>
                    <h1 className={styles.title} style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>رسائل التواصل</h1>
                    <p style={{ color: "#64748b", margin: 0 }}>إدارة ومتابعة رسائل العملاء وزوار الموقع</p>
                </div>
                <button className={styles.btnOutline} onClick={fetchMessages} disabled={loading} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    {loading ? "جاري التحديث..." : "🔄 تحديث"}
                </button>
            </div>

            {!loading && (
                <div className={styles.statsRow} style={{ marginBottom: "2rem" }}>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>إجمالي الرسائل</span>
                        <span className={styles.statValue}>{totalMessages}</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>رسائل غير مقروءة</span>
                        <span className={styles.statValue} style={{ color: "#eab308" }}>{unreadMessages}</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>رسائل مقروءة</span>
                        <span className={styles.statValue} style={{ color: "#22c55e" }}>{readMessages}</span>
                    </div>
                </div>
            )}

            {loading ? (
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <p>جاري تحميل الرسائل...</p>
                </div>
            ) : messages.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <h3>صندوق الوارد فارغ</h3>
                    <p>لا توجد رسائل تواصل حالياً. ستظهر الرسائل الجديدة هنا.</p>
                </div>
            ) : (
                <>
                    <div className={styles.filterGroup}>
                        <button
                            className={`${styles.filterBtn} ${filter === "all" ? styles.activeFilter : ''}`}
                            onClick={() => setFilter("all")}
                        >
                            الكل ({totalMessages})
                        </button>
                        <button
                            className={`${styles.filterBtn} ${filter === "unread" ? styles.activeFilter : ''}`}
                            onClick={() => setFilter("unread")}
                        >
                            غير مقروءة ({unreadMessages})
                        </button>
                        <button
                            className={`${styles.filterBtn} ${filter === "read" ? styles.activeFilter : ''}`}
                            onClick={() => setFilter("read")}
                        >
                            مقروءة ({readMessages})
                        </button>
                    </div>

                    {filteredMessages.length === 0 ? (
                        <div className={styles.emptyState} style={{ padding: "3rem 1rem", marginTop: "1rem" }}>
                            <p style={{ margin: 0 }}>لا توجد رسائل تطابق الفلتر الحالي.</p>
                        </div>
                    ) : (
                        <div className={styles.messagesGrid}>
                            {filteredMessages.map((msg) => (
                                <div key={msg.id} className={`${styles.messageCard} ${!msg.isRead ? styles.messageCardUnread : ''}`}>
                                    <div className={styles.messageHeader}>
                                        <div className={styles.senderInfo}>
                                            <h3>{msg.name} {!msg.isRead && <span className={styles.unreadDot} title="غير مقروءة"></span>}</h3>
                                        </div>
                                        <span className={styles.messageDate}>
                                            {new Date(msg.createdAt).toLocaleString("ar-EG", {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </span>
                                    </div>

                                    <div className={styles.messageContact}>
                                        <div className={styles.contactRow}>
                                            <div className={styles.contactIconWrap}><FontAwesomeIcon icon={faPhone} /></div>
                                            <a href={`tel:${msg.phone}`} dir="ltr">{msg.phone}</a>
                                        </div>
                                        <div className={styles.contactRow}>
                                            <div className={styles.contactIconWrap}><FontAwesomeIcon icon={faEnvelope} /></div>
                                            <a href={`mailto:${msg.email}`}>{msg.email}</a>
                                        </div>
                                    </div>

                                    <div className={styles.messageBody}>
                                        {msg.message}
                                    </div>

                                    <div className={styles.messageFooter}>
                                        {!msg.isRead && (
                                            <button
                                                className={styles.btnMarkRead}
                                                onClick={() => markAsRead(msg.id)}
                                                title="تحديد كمقروء"
                                            >
                                                <FontAwesomeIcon icon={faCheck} />
                                                مقروء
                                            </button>
                                        )}
                                        <button
                                            className={styles.btnDelete}
                                            onClick={() => deleteMessage(msg.id)}
                                            title="حذف الرسالة"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            حذف
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
