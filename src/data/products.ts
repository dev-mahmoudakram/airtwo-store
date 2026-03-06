export interface Product {
    id: number;
    brand: string;
    model: string;
    hp: number;
    inverter: boolean;
    image: string;
    featured?: boolean;
}

export const products: Product[] = [
    { id: 1, brand: "كاريير", model: "X-Power Gold 53QHC012", hp: 1, inverter: true, image: "/assets/products/placeholder.png", featured: true },
    { id: 2, brand: "كاريير", model: "Estrella 53QHC018", hp: 1.5, inverter: true, image: "/assets/products/placeholder.png" },
    { id: 3, brand: "كاريير", model: "Supreme 53QHC024", hp: 2, inverter: true, image: "/assets/products/placeholder.png" },
    { id: 4, brand: "يونيون اير", model: "Aura UST-12HRC", hp: 1, inverter: true, image: "/assets/products/placeholder.png" },
    { id: 5, brand: "يونيون اير", model: "Spectra UST-18HRC", hp: 1.5, inverter: true, image: "/assets/products/placeholder.png" },
    { id: 6, brand: "يونيون اير", model: "Titanium UST-24HRC", hp: 2, inverter: false, image: "/assets/products/placeholder.png" },
    { id: 7, brand: "LG", model: "Dualcool S4-W12JA3WA", hp: 1, inverter: true, image: "/assets/products/placeholder.png", featured: true },
    { id: 8, brand: "LG", model: "Art Cool S4-W18KL3WA", hp: 1.5, inverter: true, image: "/assets/products/placeholder.png" },
    { id: 9, brand: "LG", model: "Dualcool Plus S4-W24KL3WA", hp: 2, inverter: true, image: "/assets/products/placeholder.png" },
    { id: 10, brand: "ميديا", model: "Mission Pro MSM-12HR", hp: 1, inverter: false, image: "/assets/products/placeholder.png" },
    { id: 11, brand: "ميديا", model: "Blanc MSM-18HR", hp: 1.5, inverter: true, image: "/assets/products/placeholder.png" },
    { id: 12, brand: "ميديا", model: "Xtreme Save 2.25", hp: 2.25, inverter: true, image: "/assets/products/placeholder.png" },
];

export const brands = [...new Set(products.map((p) => p.brand))];
export const hpOptions = [...new Set(products.map((p) => p.hp))].sort((a, b) => a - b);
