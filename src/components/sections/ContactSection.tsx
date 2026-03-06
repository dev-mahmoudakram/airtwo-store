"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faClock,
    faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import styles from "./ContactSection.module.scss";

export default function ContactSection() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [phoneValue, setPhoneValue] = useState<string | undefined>();

    useEffect(() => {
        if (status === "success") {
            const timer = setTimeout(() => {
                setStatus("idle");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const target = e.target as typeof e.target & {
            name: { value: string };
            email: { value: string };
            message: { value: string };
        };

        if (!phoneValue) {
            alert("يرجى إدخال رقم الهاتف");
            setStatus("idle");
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: target.name.value,
                    email: target.email.value,
                    phone: phoneValue,
                    message: target.message.value,
                }),
            });

            if (!res.ok) throw new Error("Failed to submit");
            setStatus("success");

            // Clear form
            (e.target as HTMLFormElement).reset();
            setPhoneValue(undefined);
        } catch (error) {
            console.error(error);
            setStatus("error");
            alert("حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى.");
        }
    };



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
                                <div className={styles.phoneGroup}>
                                    <a href="tel:+201001803657" dir="ltr">01001803657</a>
                                    <span className={styles.divider}>•</span>
                                    <a href="tel:+201110051500" dir="ltr">01110051500</a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <div className={styles.iconWrap}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className={styles.itemDetail}>
                                <h4>البريد الإلكتروني</h4>
                                <p>airtwo.info@gmail.com</p>
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
                        href="https://wa.me/201001803657"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappBtn}
                    >
                        <FontAwesomeIcon icon={faWhatsapp} />
                        تواصل عبر واتساب
                    </a>
                </div>

                <div className={styles.formSide}>
                    {status === "success" ? (
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
                    ) : (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.field}>
                                <label htmlFor="name">الأسم بالكامل</label>
                                <input type="text" id="name" required placeholder="مثال: محمود أكرم" />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="email">البريد الإلكتروني</label>
                                <input type="email" id="email" required placeholder="name@example.com" dir="ltr" />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="phone">رقم الهاتف</label>
                                <PhoneInput
                                    id="phone"
                                    placeholder="أدخل رقم الهاتف"
                                    value={phoneValue}
                                    onChange={setPhoneValue}
                                    defaultCountry="EG"
                                    className={styles.phoneInputContainer}
                                />
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
                    )}
                </div>
            </div>
        </section>
    );
}
