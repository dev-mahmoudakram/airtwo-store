import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import BrandsSection from "@/components/sections/BrandsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CatalogSection from "@/components/sections/CatalogSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <HeroSection />
      <AboutSection />
      <CatalogSection limit={6} />
      <ServicesSection />
      <BrandsSection />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
    </>
  );
}
