import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import {
  Layers,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  Droplets,
  Sliders,
  Scissors
} from 'lucide-react';

interface FabricDetail {
  id: string;
  name: string;
  gsm: string;
  yarnCount: string;
  composition: string;
  bestFor: string;
  drape: string;
  feel: string;
  features: string[];
  image: string;
}

interface FabricCategory {
  categoryTitle: string;
  categorySubtitle: string;
  badge: string;
  badgeColor: string;
  items: FabricDetail[];
}

export const FabricsPage: React.FC = () => {
  const { settings } = useStore();
  const cleanWhatsApp = (settings.contact.whatsappNumber || '+919087704111').replace(/[^0-9]/g, '');

  const fabricCategories: FabricCategory[] = [
    {
      categoryTitle: 'Heavyweight Streetwear Knits',
      categorySubtitle: 'Structured, high-density fabrics engineered for modern boxy streetwear and oversized drop-shoulder silhouettes.',
      badge: '220 – 260 GSM',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      items: [
        {
          id: 'hw-single-jersey',
          name: '240 GSM Heavyweight Super-Combed Single Jersey',
          gsm: '240 GSM (±5%)',
          yarnCount: '16s / 20s Super-Combed Long-Staple Cotton',
          composition: '100% Cotton (Double Compacted)',
          bestFor: 'Oversized Streetwear Tees, Boxy Drop-Shoulder Drops, Acid Wash Tees',
          drape: 'Structured, boxy silhouette retention with zero cling',
          feel: 'Substantial, dense, premium soft-matte cotton hand feel',
          features: [
            'Zero transparency under harsh direct lighting',
            'Double-compacted to prevent lateral fabric twist',
            'Reinforced 2x2 Lycra ribbed collar retention',
            'Pre-shrunk with silicone wash for smooth surface'
          ],
          image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 'hw-french-terry-top',
          name: '260 GSM Summer-Weight French Terry Jersey',
          gsm: '260 GSM',
          yarnCount: '20s + 24s Combed Cotton Knit',
          composition: '100% Breathable Loopback Cotton',
          bestFor: 'Luxury Streetwear Drop-Shoulder Tees & Relaxed Sweats',
          drape: 'Heavy structural fall with relaxed luxury drape',
          feel: 'Smooth exterior surface with breathable mini-loops inside',
          features: [
            'Mini loopback knit interior for climate regulation',
            'Heavyweight feel with high airflow breathability',
            'Maintains crisp shoulders and boxy hem drape'
          ],
          image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop'
        }
      ]
    },
    {
      categoryTitle: 'Classic & Everyday Essential Knits',
      categorySubtitle: 'Ultra-soft, bio-washed combed cottons designed for classic daily tees, normal fit shirts, and casual wardrobe essentials.',
      badge: '180 – 200 GSM',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      items: [
        {
          id: 'daily-bio-wash',
          name: '180 GSM Bio-Washed Ring-Spun Cotton Jersey',
          gsm: '180 – 190 GSM',
          yarnCount: '24s / 30s Ring-Spun Combed Cotton',
          composition: '100% Bio-Washed Combed Cotton',
          bestFor: 'Normal Fit Daily T-Shirts, Base Layers & Classic Tees',
          drape: 'Fluid, natural contouring drape with high breathability',
          feel: 'Silky smooth, enzyme bio-polished against the skin',
          features: [
            'Bio-enzyme treated for zero surface fuzz and anti-pilling',
            'Optimized for hot and tropical climate daily wear',
            'Color-fast reactive dyeing resistant to fading'
          ],
          image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 'daily-pique',
          name: '200 GSM Honeycomb Cotton Piqué Knit',
          gsm: '200 GSM',
          yarnCount: '26s Double Yarn Combed Cotton',
          composition: '100% Breathable Honeycomb Cotton',
          bestFor: 'Smart Casual Shirts, Collar Polos & Textured Essentials',
          drape: 'Structured vertical hold with flexible stretch',
          feel: 'Textured micro-waffle honeycomb weave for air circulation',
          features: [
            'Micro-waffle knit architecture for ventilation',
            'Crisp collar stand retention for smart casual looks',
            'Superior moisture wicking for all-day comfort'
          ],
          image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop'
        }
      ]
    },
    {
      categoryTitle: 'Bottomwear & Loopback Fleece Knits',
      categorySubtitle: 'Durable, heavy-duty loopback and interlock cottons tailored for French Terry shorts, loungewear, and athletic leisure.',
      badge: '280 – 320 GSM',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      items: [
        {
          id: 'loopback-french-terry',
          name: '300 GSM Heavyweight 3-Thread French Terry',
          gsm: '300 – 320 GSM',
          yarnCount: '20s Face + 10s Loopback Heavy Yarn',
          composition: '100% Unbrushed Loopback Cotton Fleece',
          bestFor: 'Everyday Shorts, Heavyweight Lounge Shorts, Track Pants',
          drape: 'Robust, non-clinging silhouette with reinforced structure',
          feel: 'Plush exterior with absorbent, breathable interior loops',
          features: [
            '3-thread loopback construction for maximum abrasion resistance',
            'Heavy-duty rib waistband with reinforced metallic eyelets',
            'Deep pocket bag anchoring to prevent pocket sagging'
          ],
          image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 'compact-interlock',
          name: '280 GSM Compact Cotton Interlock Double Knit',
          gsm: '280 GSM',
          yarnCount: '30s/2 Double Knit Combed Yarn',
          composition: '100% Compact Combed Interlock',
          bestFor: 'Tailored Casual Shorts, Cargo Shorts & Athletic Wear',
          drape: 'Smooth two-faced finish with structured flexibility',
          feel: 'Ultra-smooth on both interior and exterior surfaces',
          features: [
            'Identical smooth finish on both sides with zero curling',
            'Natural mechanical stretch without synthetic elastane',
            'Heavyweight density with superior color depth'
          ],
          image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop'
        }
      ]
    },
    {
      categoryTitle: 'Artisanal & Handcrafted Fabric Washes',
      categorySubtitle: 'Specialized dyeing and finishing techniques executed by textile artisans in our Bhavani workshops.',
      badge: 'Specialty Finishes',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      items: [
        {
          id: 'tie-dye-craft',
          name: 'Artisanal Reactive-Dyed Tie & Dye Cotton',
          gsm: '220 – 240 GSM',
          yarnCount: '20s Super-Combed Single Jersey',
          composition: '100% Combed Cotton with Non-Bleed Reactive Dyes',
          bestFor: 'Handcrafted Tie & Dye Streetwear, Resort Shirts',
          drape: 'Relaxed, pre-softened organic drape',
          feel: 'Ultra-soft, pre-shrunk and garment-washed touch',
          features: [
            'Handcrafted pattern: Spiral, Marble, Sunburst & Nebula swirls',
            'Colorfastness grade 4+ certified with zero wash bleeding',
            'Pre-shrunk garment wash process for instant wearability'
          ],
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 'acid-wash-finish',
          name: 'Vintage Mineral Acid Wash & Stone Enzymed Cotton',
          gsm: '240 GSM',
          yarnCount: '16s Heavyweight Combed Cotton',
          composition: '100% Mineral-Treated Combed Cotton',
          bestFor: 'Vintage Streetwear Drops, Grunge Oversized Tees',
          drape: 'Heavyweight drop with soft vintage distressed drape',
          feel: 'Buttery soft pumice-stone washed lived-in hand feel',
          features: [
            'Pumice stone and enzyme treated for authentic vintage patina',
            'Subtle seam fading and marble tonal contrasts',
            'Pre-distressed texture with reinforced structural seam integrity'
          ],
          image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop'
        }
      ]
    },
    {
      categoryTitle: 'Performance Polyester & Poly-Blends (All GSM)',
      categorySubtitle: 'Technical moisture-wicking micro-polyesters, sublimation dry-fits, poly-cotton blends, and thermal fleece from 140 GSM to 320 GSM.',
      badge: '140 – 320 GSM Poly',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      items: [
        {
          id: 'poly-140-mesh',
          name: '140–160 GSM Micro-Poly Birdseye Mesh & Dot Knit',
          gsm: '140 – 160 GSM',
          yarnCount: '75D / 72F Micro-Filament Polyester Yarn',
          composition: '100% Micro-Polyester Quick-Dry',
          bestFor: 'Activewear, Sports Running Jerseys, Gym & Training Tees',
          drape: 'Ultralight, breathable athletic drape with maximum airflow',
          feel: 'Silky smooth, cooling, non-abrasive micro-perforated feel',
          features: [
            'Engineered micro-perforations for rapid sweat evaporation',
            'Hydrophilic moisture-wicking treatment for zero sweat cling',
            'Anti-odor & anti-bacterial fabric treatment',
            'Ideal for full-body digital dye-sublimation graphics'
          ],
          image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 'poly-180-interlock',
          name: '180–200 GSM Dry-Fit Interlock Performance Polyester',
          gsm: '180 – 200 GSM',
          yarnCount: '100D / 144F High-Density Spun Polyester',
          composition: '100% Interlock High-Filament Polyester',
          bestFor: 'Sublimation Printed T-Shirts, Sports Teamwear, Corporate Uniforms',
          drape: 'Smooth fluid fall with structured athletic silhouette',
          feel: 'Double-face smooth texture with soft matte finish',
          features: [
            'High-definition photo-quality heat transfer sublimation ready',
            'Wrinkle-free, crease-resistant and zero-shrinkage stability',
            'UV protection coating (UPF 30+) for outdoor sports',
            'Snag-resistant high-tensile double knit structure'
          ],
          image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 'poly-220-pc-blend',
          name: '220–240 GSM Heavyweight Poly-Cotton (PC) Jersey',
          gsm: '220 – 240 GSM',
          yarnCount: '20s Poly-Cotton Combed Blend Yarn',
          composition: '60% Super-Combed Cotton + 40% Micro-Polyester',
          bestFor: 'High-Durability Oversized Tees, Workwear & Commercial Uniforms',
          drape: 'Heavy structured boxy drape with long-term shape retention',
          feel: 'Cotton natural softness on skin with polyester high strength',
          features: [
            'Combines cotton natural breathability with polyester durability',
            'Zero color fading and superior resistance to harsh industrial laundry',
            'Eliminates garment twisting and seam torque after multiple washes',
            'Perfect for plastisol, DTF, and discharge screen printing'
          ],
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 'poly-300-polar-fleece',
          name: '280–320 GSM Heavyweight Poly Fleece & Polar Terry',
          gsm: '280 – 320 GSM',
          yarnCount: '150D / 288F Heavy Loopback & Polar Filament',
          composition: '100% Heavy Polyester Thermal Fleece',
          bestFor: 'Heavyweight Track Pants, Winter Zip Hoodies, Training Shorts',
          drape: 'Voluminous, ultra-durable thermal drape',
          feel: 'Brushed thermal plush insulation on interior',
          features: [
            'Maximum heat retention with minimal fabric weight',
            'Anti-pilling shear finish on both sides',
            'Hydrophobic fibers repel light moisture and dry 3x faster than cotton',
            'Reinforced heavy-duty elastic waistband anchoring'
          ],
          image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 'poly-220-spandex',
          name: '220 GSM 4-Way Stretch Poly-Spandex Performance Knit',
          gsm: '220 GSM',
          yarnCount: '75D Poly + 40D Spandex (Elastane)',
          composition: '88% Polyester + 12% Spandex',
          bestFor: 'Athletic Compression Wear, Fitness Leggings & Flexible Tops',
          drape: 'Second-skin contouring with high elastic recovery',
          feel: 'Silky smooth, cool-to-touch compression hand feel',
          features: [
            '4-way 360-degree omni-stretch for unrestricted body movement',
            'High recovery rate with zero knee or elbow sagging',
            'Flatlock friction-free seam construction',
            'Squat-proof non-sheer high density'
          ],
          image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop'
        }
      ]
    }
  ];

  return (
    <div className="bg-transparent min-h-screen text-slate-900 pb-20">
      {/* 1. Header (Open Antigravity Layout) */}
      <div className="pt-8 pb-8 sm:pt-12 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Fabrics' }]} />

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold uppercase tracking-widest shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>TEXTILE ARCHITECTURE • BHAVANI ATELIER</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-black text-slate-900 uppercase tracking-tight">
              Fabric Engineering & Specs
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl">
              From 100% combed cottons and artisanal tie-dyes to technical micro-polyesters, dry-fit performance mesh, and thermal loopbacks across 140 to 320 GSM — explore our full textile architecture.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">
        
        {/* 2. Distinct Fabric Sections */}
        {fabricCategories.map((category, catIdx) => (
          <section key={catIdx} className="space-y-8">
            {/* Category Header */}
            <div className="border-b border-slate-200/90 pb-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    0{catIdx + 1} //
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 uppercase tracking-tight">
                    {category.categoryTitle}
                  </h2>
                </div>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${category.badgeColor}`}>
                  {category.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
                {category.categorySubtitle}
              </p>
            </div>

            {/* Fabric Detail Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {category.items.map((fabric) => (
                <div
                  key={fabric.id}
                  className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-400 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image & Badges */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={fabric.image}
                      alt={fabric.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/90 text-white text-xs font-mono font-bold rounded-full shadow-sm">
                      {fabric.gsm}
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-mono font-bold rounded-full border border-slate-200 shadow-sm">
                      {fabric.yarnCount.split(' ')[0]} YARN
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-600">
                          APPLICATION: {fabric.bestFor}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-1">
                          {fabric.name}
                        </h3>
                      </div>

                      {/* Technical Specs Matrix */}
                      <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                        <div>
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Yarn Count</p>
                          <p className="font-bold text-slate-900 mt-0.5">{fabric.yarnCount}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Composition</p>
                          <p className="font-bold text-slate-900 mt-0.5">{fabric.composition}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Silhouette Drape</p>
                          <p className="font-medium text-slate-700 mt-0.5">{fabric.drape}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Hand Feel</p>
                          <p className="font-medium text-slate-700 mt-0.5">{fabric.feel}</p>
                        </div>
                      </div>

                      {/* Bullet Highlights */}
                      <div className="space-y-2 pt-2">
                        <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                          Key Performance Highlights
                        </p>
                        <ul className="space-y-2">
                          {fabric.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Quick WhatsApp Sampling Action */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <a
                        href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                          `Hello SD TRENDYZ, I would like fabric swatch samples and pricing for: ${fabric.name} (${fabric.gsm}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all hover:scale-[1.02] text-center flex items-center justify-center gap-2 shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Enquire Swatch Sample</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* 3. Quality Standards & Engineering Pillars */}
        <section className="space-y-8 pt-6 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              // TEXTILE STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase tracking-tight">
              Bhavani Atelier Quality Commitments
            </h2>
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              Every batch of fabric knitted in our Tamil Nadu facilities is subjected to multi-point quality inspections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Transparency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                220–240 GSM single jersey guarantees 100% opacity with no underwear show-through even under direct flashlights.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Anti-Sag Rib Collars</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                2x2 Lycra infused collar ribs maintain strict circular collar tension without folding or baconing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Grade 4+ Colorfastness</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                European-certified reactive dyes ensure high color depth with zero wash fading or bleeding into other garments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Double Compacting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-shrunk fabric stabilization maintains exact fit with less than 3% post-wash residual shrinkage.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Bottom Custom Fabric Knitting & B2B Sampling Desk */}
        <section className="text-center space-y-6 py-12 border-t border-slate-200 max-w-4xl mx-auto">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              // CUSTOM FABRICATION & BULK SUPPLY
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 uppercase tracking-tight">
              Need Custom GSM or Bulk Fabric?
            </h2>
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              We provide custom GSM knitting (180 to 320 GSM), pantone reactive dye matching, private label branding, and bulk wholesale fabric rolls direct from Bhavani.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                'Hello SD TRENDYZ, I would like to request custom fabric swatch samples and discuss bulk knitting.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Request Swatches on WhatsApp</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-slate-200 text-slate-900 hover:bg-slate-100 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-2xs hover:scale-105"
            >
              <span>Contact Representative</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
