"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faClock,
    faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import styles from "./ContactSection.module.scss";

export default function ContactSection() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
    };

    if (status === "success") {
        return (
            <section className={styles.section} id="contact">
                <div className={styles.container}>
                    <div className={styles.successMsg}>
                        <h3>شكراً لتواصلك معنا!</h3>
                        <p>سنقوم بالرد عليك في أقرب وقت ممكن.</p>
                        <button
                            onClick={() => setStatus("idle")}
                            className={styles.submitBtn}
                            style={{ marginTop: "1rem", width: "auto", paddingInline: "2rem" }}
                        >
                            إرسال رسالة أخرى
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section} id="contact">
            <div className={styles.container}>
                <div className={styles.infoSide}>
                    <div className={styles.header}>
                        <span className={styles.eyebrow}>تواصل معنا</span>
                        <h2 className={styles.title}>نحن هنا لمساعدتك</h2>
                        <p className={styles.desc}>
                            لديك استفسار؟ لا تتردد في التواصل معنا عبر الهاتف، واتساب، أو من خلال النموذج.
                        </p>
                    </div>

                    <div className={styles.contactList}>
                        <div className={styles.contactItem}>
                            <div className={styles.iconWrap}>
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div className={styles.itemDetail}>
                                <h4>رقم الهاتف</h4>
                                <a href="tel:+201000000000">0100 000 0000</a>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <div className={styles.iconWrap}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className={styles.itemDetail}>
                                <h4>البريد الإلكتروني</h4>
                                <p>info@airtwo.store</p>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <div className={styles.iconWrap}>
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            <div className={styles.itemDetail}>
                                <h4>مواعيد العمل</h4>
                                <p>يومياً: 10:00 صباحاً - 10:00 مساءً</p>
                                <p>الجمعة: 2:00 مساءً - 10:00 مساءً</p>
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://wa.me/201000000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappBtn}
                    >
                        <FontAwesomeIcon icon={faWhatsapp} />
                        تواصل عبر واتساب
                    </a>
                </div>

                <div className={styles.formSide}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="name">الأسم بالكامل</label>
                            <input type="text" id="name" required placeholder="مثال: محمود أكرم" />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="contact_info">رقم الهاتف أو البريد الإلكتروني</label>
                            <input type="text" id="contact_info" required placeholder="للتواصل معك" />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="message">رسالتك</label>
                            <textarea id="message" rows={5} required placeholder="كيف يمكننا مساعدتك؟"></textarea>
                        </div>
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "جاري الإرسال..." : "إرسال الرسالة"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
