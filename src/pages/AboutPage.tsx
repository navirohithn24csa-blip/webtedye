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
  ArrowRight,
  MessageCircle
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
  const cleanWhatsApp = (settings.contact.whatsappNumber || '+919087704111').replace(/[^0-9]/g, '');

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
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'Handcrafted tie and dye fabric immersion with vibrant reactive inks'
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
        'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'Vintage pumice stone and mineral enzyme washing drums for soft distressed texture'
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
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'High-density textile screen printing press with squeegee ink application'
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
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'Skilled garment tailors assembling drop-shoulder streetwear on industrial lockstitch machines'
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
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'Apparel quality inspection checking collar tension, stitch density, and measurements'
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
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'Finished garments folded, tagged, polybagged, and packed in cartons for dispatch'
    }
  ];

  return (
    <div className="bg-transparent min-h-screen text-slate-900 pb-20">
      {/* ========================================================================= */}
      {/* 1. ABOUT US HERO (NO ENCLOSING BOX)                                       */}
      {/* ========================================================================= */}
      <div className="pt-8 pb-8 sm:pt-12 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'About Us' }]} />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{settings.brandName || 'SD TRENDYZ'} • BRAND STORY & CRAFT</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-black text-slate-900 uppercase tracking-tight">
              About SD TRENDYZ
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Learn about our brand philosophy, fabric craftsmanship, and the dedicated manufacturing workflow that powers our everyday apparel collections.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-20 lg:space-y-28">
        
        {/* ========================================================================= */}
        {/* 2. COMPANY INTRODUCTION                                                   */}
        {/* ========================================================================= */}
        <section className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
            // OUR PHILOSOPHY
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight">
            Crafting Garments You Will Wear Repeatedly
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            At <strong>{settings.brandName || 'SD TRENDYZ'}</strong>, our focus is simple: refining everyday wardrobe staples with uncompromising fabric density, dependable stitching, and clean contemporary styles. From heavy 220–240 GSM combed cotton tees to artisanal tie-dye and acid wash shirts, our manufacturing ecosystem is built around precision, longevity, and comfort.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* 3. OUR MANUFACTURING WORKFLOW                                             */}
        {/* ========================================================================= */}
        <section className="space-y-14 lg:space-y-20 pt-6 border-t border-slate-200">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-700 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
              MANUFACTURING ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 uppercase tracking-tight">
              OUR WORKFLOW
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore our complete end-to-end production workflow — from raw fabric dyeing and enzyme washes to garment stitching and final dispatch.
            </p>
          </div>

          {/* Alternating Production Workflow List */}
          <div className="space-y-16 lg:space-y-24 relative">
            {/* Subtle Vertical Connector Line for Desktop */}
            <div className="hidden lg:block absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-slate-300 to-transparent pointer-events-none" />

            {workflowSteps.map((step, index) => {
              const isEven = index % 2 === 1; // Row 2, 4, 6
              const StepIcon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
                >
                  {/* Step Connecting Badge in the Center (Desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border-2 border-slate-900 shadow-md items-center justify-center font-display font-black text-xs text-slate-900">
                    {step.number}
                  </div>

                  {/* ---------------- IMAGE BLOCK ---------------- */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 group">
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                      {/* Small floating badge */}
                      <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 flex items-center gap-2 shadow-sm text-slate-900">
                        <StepIcon className="w-3.5 h-3.5 text-slate-900" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
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
                      <span className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                        {step.number}
                      </span>
                      <span className="h-4 w-[1px] bg-slate-200" />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
                        {step.tagline}
                      </span>
                    </div>

                    {/* Stage Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-slate-900 tracking-tight">
                      {step.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
                      {step.description}
                    </p>

                    {/* Production Highlights */}
                    <ul className="space-y-2 pt-1 border-t border-slate-200">
                      {step.details.map((detail, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0 mt-2" />
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
        {/* 5. CONTACT SD TRENDYZ BANNER (OPEN DESIGN)                                */}
        {/* ========================================================================= */}
        <section className="text-center space-y-5 py-8 border-t border-slate-200 max-w-4xl mx-auto">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              // PARTNER WITH US
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 uppercase tracking-tight">
              Contact SD TRENDYZ
            </h2>
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              Have questions about fabric sampling, production lead times, custom dyeing, or bulk catalog enquiries? Connect directly with our team on WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                'Hello SD TRENDYZ, I would like to connect with your team regarding manufacturing and enquiries.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat with Team on WhatsApp</span>
            </a>

            <Link
              to="/fabrics"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-slate-200 text-slate-900 hover:bg-slate-100 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-2xs hover:scale-105"
            >
              <span>Explore Fabrics & GSM</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
