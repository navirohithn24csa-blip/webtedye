import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import {
  Palette,
  Droplets,
  Printer,
  Scissors,
  CheckCircle2,
  PackageCheck,
  Sparkles,
  ArrowDown,
  ArrowRight
} from 'lucide-react';

interface WorkflowStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  icon: React.ElementType;
  image: string;
  imageAlt: string;
}

export const AboutPage: React.FC = () => {
  const { settings } = useStore();

  const workflowSteps: WorkflowStep[] = [
    {
      number: '01',
      title: 'Tie & Dye',
      tagline: 'Artisanal Textile Dyeing',
      description:
        'Creative tie and dye techniques producing unique patterns, vibrant colors, and premium finishes.',
      details: [
        'Hand-swirled spiral, dip-dye, and cloud marble methods',
        'Color-fast reactive dyes ensuring vibrant longevity',
        'Every single garment features an authentic unique motif'
      ],
      icon: Palette,
      image:
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
      imageAlt: 'Tie and dye fabric textile processing at SD TRENDYZ'
    },
    {
      number: '02',
      title: 'Acid Wash',
      tagline: 'Vintage Enzyme & Stone Treatments',
      description:
        'Controlled acid wash processes create soft textures, faded effects, and fashionable vintage finishes.',
      details: [
        'Natural pumice stone and mineral enzyme washing',
        'Lived-in vintage aesthetics with soft distressed ribbing',
        'Pre-shrunk treatment ensuring zero dimensional shrinkage'
      ],
      icon: Droplets,
      image:
        'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000&auto=format&fit=crop',
      imageAlt: 'Acid wash and mineral enzyme washed textile finishing'
    },
    {
      number: '03',
      title: 'Printings',
      tagline: 'High-Definition Screen & Graphic Printing',
      description:
        'Modern printing methods deliver sharp designs, durable colors, and consistent results across garments.',
      details: [
        'High-density screen printing and soft-feel discharge inks',
        'Crack-resistant formulations that withstand repeated washes',
        'Precise alignment on oversized chest and back placements'
      ],
      icon: Printer,
      image:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      imageAlt: 'Modern textile printing and garment screen printing process'
    },
    {
      number: '04',
      title: 'Garments',
      tagline: 'Precision Cutting, Tailoring & Stitching',
      description:
        'Skilled garment production ensures accurate stitching, comfortable fits, clean finishing, and dependable quality.',
      details: [
        'Reinforced double-needle lockstitching on collars and hems',
        'Ergonomic pattern cuts for drop-shoulders and active shorts',
        'Heavyweight 220–240 GSM combed cotton and French terry fabrics'
      ],
      icon: Scissors,
      image:
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop',
      imageAlt: 'Skilled garment production, stitching machines, and tailoring'
    },
    {
      number: '05',
      title: 'Quality Checking',
      tagline: 'Multi-Point Inspection & Verification',
      description:
        'Every piece is carefully inspected for stitching, color, measurements, finishing, and overall consistency.',
      details: [
        '100% manual inspection for seam strength and tension',
        'Strict measurement tolerance validation across all sizes (S–XXL)',
        'Color consistency and surface defect screening'
      ],
      icon: CheckCircle2,
      image:
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
      imageAlt: 'Quality control checking, measurement, and garment inspection'
    },
    {
      number: '06',
      title: 'Shipping',
      tagline: 'Protective Packaging & Timely Dispatch',
      description:
        'Finished products are packed securely and dispatched carefully for safe, timely customer delivery.',
      details: [
        'Individual moisture-barrier poly packaging and tag attachment',
        'Carefully organized dispatch sorting for bulk and customer orders',
        'Dependable shipping partners ensuring fast transit across India'
      ],
      icon: PackageCheck,
      image:
        'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop',
      imageAlt: 'Finished garments folded, packed securely, and organized for dispatch'
    }
  ];

  return (
    <div className="bg-transparent min-h-screen text-[#171717] pb-20">
      {/* ========================================================================= */}
      {/* 1. ABOUT US HERO BANNER                                                   */}
      {/* ========================================================================= */}
      <div className="bg-[#EDE7DF]/80 backdrop-blur-md border-b border-[#E3DDD5] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'About Us' }]} />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF]/80 border border-[#E6E3DF] text-[#171717] text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{settings.brandName || 'SD TRENDYZ'} • Brand Story & Process</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-[#171717] uppercase tracking-tight">
              About SD TRENDYZ
            </h1>

            <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-2xl">
              Learn about our brand philosophy, fabric craftsmanship, and the dedicated manufacturing workflow that powers our everyday apparel collections.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-20 lg:space-y-28">
        {/* ========================================================================= */}
        {/* 2. COMPANY INTRODUCTION                                                   */}
        {/* ========================================================================= */}
        <section className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#737373]">
            Our Philosophy
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-[#171717] tracking-tight">
            Crafting Garments You Will Wear Repeatedly
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            At <strong>{settings.brandName || 'SD TRENDYZ'}</strong>, our focus is simple: refining everyday wardrobe staples with uncompromising fabric density, dependable stitching, and clean contemporary styles. From heavy 220–240 GSM combed cotton tees to artisanal tie-dye and acid wash shirts, our manufacturing ecosystem is built around precision, longevity, and comfort.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* 3. OUR TEAMS & MANUFACTURING WORKFLOW (ALTERNATING LAYOUT)                */}
        {/* ========================================================================= */}
        <section className="space-y-16 lg:space-y-24">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#737373] bg-[#EDE7DF] px-3.5 py-1 rounded-full border border-[#E3DDD5]">
              Manufacturing Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-[#171717] uppercase tracking-tight">
              OUR TEAMS
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              Explore our complete end-to-end production workflow — from raw fabric dyeing and enzyme washes to garment stitching and final dispatch.
            </p>
          </div>

          {/* Alternating Production Workflow List */}
          <div className="space-y-16 lg:space-y-24 relative">
            {/* Subtle Vertical Connector Line for Desktop */}
            <div className="hidden lg:block absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#D5CEC4] to-transparent pointer-events-none" />

            {workflowSteps.map((step, index) => {
              const isEven = index % 2 === 1; // Row 2, 4, 6 (0-indexed 1, 3, 5)
              const StepIcon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
                >
                  {/* Step Connecting Badge in the Center (Desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#FFFFFF] border-2 border-[#171717] shadow-sm items-center justify-center font-display font-black text-xs text-[#171717]">
                    {step.number}
                  </div>

                  {/* ---------------- IMAGE BLOCK ---------------- */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border border-[#E6E3DF] bg-[#F4F2EF] group">
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40" />

                      {/* Small floating badge */}
                      <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 px-3.5 py-1.5 bg-[#FFFFFF]/90 backdrop-blur-md rounded-xl border border-[#E6E3DF] flex items-center gap-2 shadow-xs">
                        <StepIcon className="w-3.5 h-3.5 text-[#171717]" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#171717]">
                          Stage {step.number} • {step.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ---------------- CONTENT BLOCK ---------------- */}
                  <div
                    className={`lg:col-span-6 space-y-4 sm:space-y-5 ${
                      isEven ? 'lg:order-1 lg:pr-6' : 'lg:order-2 lg:pl-6'
                    }`}
                  >
                    {/* Stage Number & Category Tag */}
                    <div className="flex items-center gap-3">
                      <span className="font-display font-black text-2xl sm:text-3xl text-[#737373]/80">
                        {step.number}
                      </span>
                      <span className="h-4 w-[1px] bg-[#D5CEC4]" />
                      <span className="text-xs font-bold uppercase tracking-widest text-[#737373]">
                        {step.tagline}
                      </span>
                    </div>

                    {/* Stage Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-[#171717] tracking-tight">
                      {step.title}
                    </h3>

                    {/* Short Description (10-15 words exact) */}
                    <p className="text-sm sm:text-base text-[#171717] font-semibold leading-relaxed">
                      {step.description}
                    </p>

                    {/* Production Highlights */}
                    <ul className="space-y-2 pt-1 border-t border-[#E6E3DF]">
                      {step.details.map((detail, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#555555]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#171717] shrink-0 mt-2" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CONTACT SD TRENDYZ BANNER                                              */}
        {/* ========================================================================= */}
        <section className="bg-[#EDE7DF] p-8 sm:p-12 lg:p-14 rounded-3xl border border-[#E3DDD5] text-center space-y-5">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#737373]">
              Partner With Us
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-[#171717] uppercase tracking-tight">
              Contact SD TRENDYZ
            </h2>
            <p className="text-xs sm:text-base text-[#555555] leading-relaxed">
              Have questions about fabric sampling, production lead times, custom dyeing, or bulk catalog enquiries? Connect directly with our team.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#171717] hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xs hover:scale-[1.02] active:scale-95"
            >
              <span>Contact Business</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-[#171717] text-[#171717] hover:bg-[#171717]/5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              <span>Explore Collections</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
