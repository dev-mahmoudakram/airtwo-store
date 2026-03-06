"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faWrench,
    faScrewdriverWrench,
    faFileContract,
    faCommentDots,
    faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import styles from "./ServicesSection.module.scss";

const services: { icon: IconDefinition; title: string; desc: string }[] = [
    {
        icon: faBoxOpen,
        title: "بيع أجهزة أصلية",
        desc: "نوفر أجهزة تكييف أصلية ١٠٠٪ من كبرى الماركات العالمية مع ضمان المصنّع.",
    },
    {
        icon: faWrench,
        title: "تركيب تكييفات",
        desc: "فريق متخصص لتركيب الأجهزة بدقة واحترافية مع ضمان سلامة التمديدات الكهربائية.",
    },
    {
        icon: faScrewdriverWrench,
        title: "صيانة",
        desc: "خدمة صيانة شاملة لجميع الأعطال بسرعة وكفاءة مع قطع غيار أصلية معتمدة.",
    },
    {
        icon: faFileContract,
        title: "عقود صيانة دورية",
        desc: "وفّر وقتك وأمّن جهازك بعقود صيانة دورية تشمل الكشف والتنظيف والمتابعة طوال العام.",
    },
    {
        icon: faCommentDots,
        title: "استشارات قبل الشراء",
        desc: "خبراؤنا يساعدونك في اختيار الجهاز الأنسب لمساحتك واحتياجاتك قبل اتخاذ أي قرار.",
    },
    {
        icon: faShieldHalved,
        title: "ضمان ما بعد البيع",
        desc: "نلتزم بدعمك بعد الشراء — متابعة، ضمان ممتد، وخدمة عملاء دائمة الاستعداد.",
    },
];

export default function ServicesSection() {
    return (
        <section className={styles.section} id="services">
            <div className={styles.container}>

                <div className={styles.header}>
                    <span className={styles.eyebrow}>خدماتنا</span>
                    <h2 className={styles.title}>كل ما تحتاجه في مكان واحد</h2>
                    <p className={styles.lead}>
                        من الاستشارة حتى التركيب والصيانة — نحن معك في كل خطوة.
                    </p>
                </div>

                <div className={styles.grid}>
                    {services.map((s) => (
                        <div key={s.title} className={styles.card}>
                            <div className={styles.iconWrap}>
                                <FontAwesomeIcon icon={s.icon} className={styles.icon} />
                            </div>
                            <h3 className={styles.cardTitle}>{s.title}</h3>
                            <p className={styles.cardDesc}>{s.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
