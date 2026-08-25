import { Product, Category, Collection, HomepageConfig, WebsiteSettings, Enquiry, LookbookItem } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-shirts',
    name: 'Shirts',
    slug: 'shirts',
    description: 'Oversized baggy cuts, normal fit essentials, resort cuban collars, vintage acid wash overshirts, and vibrant tie-dye button-downs.',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Oversized (Baggy)', 'Normal Fit', 'Tie & Dye', 'Acid Wash', 'Plain', 'Printed'],
    displayOrder: 1,
    status: 'active'
  },
  {
    id: 'cat-tshirts',
    name: 'T-Shirts',
    slug: 'tshirts',
    description: 'Oversized baggy streetwear tees, normal fit basics, vintage acid washes, artisanal tie-dye swirls, and minimal graphics.',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Oversized (Baggy)', 'Normal Fit', 'Acid Wash', 'Tie & Dye', 'Plain', 'Printed'],
    displayOrder: 2,
    status: 'active'
  },
  {
    id: 'cat-shorts',
    name: 'Shorts',
    slug: 'shorts',
    description: 'Ultra-comfortable shorts designed for training, travel, lounging, and everyday casual motion.',
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop',
    subcategories: ['Cotton Shorts', 'Training Shorts', 'Gym Shorts', 'Casual Chino Shorts'],
    displayOrder: 3,
    status: 'active'
  }
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-oversized-shirts',
    name: 'Oversized (Baggy) Shirts',
    slug: 'shirts/oversized',
    description: 'Drop-shoulder relaxed silhouettes, breezy oversized cuts, and contemporary boxy drape.',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
    displayOrder: 1,
    status: 'active'
  },
  {
    id: 'col-normalfit-shirts',
    name: 'Normal Fit Shirts',
    slug: 'shirts/normal-fit',
    description: 'Classic regular fit, structured everyday button-down shirts, and tailored essentials.',
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
    displayOrder: 2,
    status: 'active'
  },
  {
    id: 'col-tiedye-shirts',
    name: 'Tie & Dye Shirts',
    slug: 'shirts/tie-dye',
    description: 'Artisanal swirl, dip-dye, and marble-washed resort shirts tailored for vibrant casual styling.',
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
    displayOrder: 3,
    status: 'active'
  },
  {
    id: 'col-acidwash-shirts',
    name: 'Acid Wash Shirts',
    slug: 'shirts/acid-wash',
    description: 'Vintage mineral-washed, distressed twill, and stone-washed cotton overshirts with rich lived-in texture.',
    imageUrl: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000&auto=format&fit=crop',
    displayOrder: 4,
    status: 'active'
  },
  {
    id: 'col-plain-shirts',
    name: 'Plain Shirts',
    slug: 'shirts/plain',
    description: 'Clean solid oxford cotton, breathable linen-blend, and tailored poplin button-down shirts.',
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
    displayOrder: 5,
    status: 'active'
  },
  {
    id: 'col-printed-shirts',
    name: 'Printed Shirts',
    slug: 'shirts/printed',
    description: 'Bold botanical floral prints, retro geometric cuban collar shirts, and abstract artistic patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
    displayOrder: 6,
    status: 'active'
  },
  {
    id: 'col-oversized-tshirts',
    name: 'Oversized (Baggy) T-Shirts',
    slug: 'tshirts/oversized',
    description: 'Heavyweight drop-shoulder streetwear tees, boxy silhouettes, and relaxed drape.',
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
    displayOrder: 7,
    status: 'active'
  },
  {
    id: 'col-normalfit-tshirts',
    name: 'Normal Fit T-Shirts',
    slug: 'tshirts/normal-fit',
    description: 'Everyday regular fit, super-combed cotton crew tees, and timeless casual silhouettes.',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    displayOrder: 8,
    status: 'active'
  },
  {
    id: 'col-acidwash-tshirts',
    name: 'Acid Wash T-Shirts',
    slug: 'tshirts/acid-wash',
    description: 'Heavy 240 GSM stone-washed tees with vintage fades, soft distressed hems, and relaxed boxy cuts.',
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
    displayOrder: 9,
    status: 'active'
  },
  {
    id: 'col-tiedye-tshirts',
    name: 'Tie & Dye T-Shirts',
    slug: 'tshirts/tie-dye',
    description: 'Vibrant spiral patterns, muted pastel swirls, and indigo cloud tie-dye heavyweight tees.',
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
    displayOrder: 10,
    status: 'active'
  },
  {
    id: 'col-plain-tshirts',
    name: 'Plain T-Shirts',
    slug: 'tshirts/plain',
    description: 'Minimal solid colorways in 100% super-combed cotton, ribbed crew necks, and drop-shoulder silhouettes.',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    displayOrder: 11,
    status: 'active'
  },
  {
    id: 'col-printed-tshirts',
    name: 'Printed T-Shirts',
    slug: 'tshirts/printed',
    description: 'Understated typographic chest graphics, retro vintage art, and modern streetwear screen prints.',
    imageUrl: 'https://images.unsplash.com/photo-1507680434517-d4566d617327?q=80&w=1000&auto=format&fit=crop',
    displayOrder: 12,
    status: 'active'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // =========================================================================
  // 1. SHIRTS — TIE & DYE
  // =========================================================================
  {
    id: 'prod-sh-td-01',
    name: 'Resort Tie & Dye Cuban Shirt',
    slug: 'resort-tie-dye-cuban-shirt',
    sku: 'SHIRT-TD-01',
    category: 'shirts',
    subcategory: 'Tie & Dye',
    styleType: 'tie-dye',
    collectionIds: ['col-tiedye-shirts', 'col-oversized-shirts'],
    sellingPrice: 999,
    originalPrice: 1299,
    discountPercentage: 23,
    shortDescription: 'Relaxed cuban collar resort shirt in breathable cotton-rayon blend with hand-dyed swirl motifs.',
    description: 'Crafted for sunny weekend escapes and coastal evenings. Features a camp collar, breathable cotton-rayon weave that drapes effortlessly, and hand-finished artisanal tie-dye patterns ensuring each piece has a unique character.',
    images: [
      {
        id: 'img-sh-td-1',
        url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
        altText: 'Resort Tie & Dye Cuban Shirt - Front',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-sh-td-2',
        url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
        altText: 'Resort Tie & Dye Cuban Shirt - Detail View',
        isPrimary: false,
        angle: 'detail'
      }
    ],
    colors: [
      { id: 'c-pastel-swirl', name: 'Pastel Blue Swirl', hex: '#60A5FA' },
      { id: 'c-sage-swirl', name: 'Sage Marble', hex: '#6EE7B7' },
      { id: 'c-sunset', name: 'Sunset Amber', hex: '#F59E0B' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: false }
    ],
    specifications: {
      fit: 'Oversized (Baggy)',
      fabric: 'Cotton Rayon Blend',
      gsm: '160 GSM',
      sleeve: 'Half Sleeve',
      neck: 'Cuban / Camp Collar',
      pattern: 'Hand-Dyed Tie & Dye',
      stretch: 'Natural Comfort Drape',
      occasion: 'Resort / Casual / Beach',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Gentle hand wash cold', 'Wash separately for initial 2 washes', 'Dry in shade to preserve vibrant colors', 'Cool iron on reverse'],
    status: 'active',
    badge: 'Bestseller',
    featured: true,
    createdAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'prod-sh-td-02',
    name: 'Indigo Dip-Dye Casual Shirt',
    slug: 'indigo-dip-dye-casual-shirt',
    sku: 'SHIRT-TD-02',
    category: 'shirts',
    subcategory: 'Tie & Dye',
    styleType: 'tie-dye',
    collectionIds: ['col-tiedye-shirts', 'col-normalfit-shirts'],
    sellingPrice: 1099,
    originalPrice: 1399,
    discountPercentage: 21,
    shortDescription: 'Modern ombre gradient dip-dye button-down shirt in crisp premium cotton poplin.',
    description: 'Seamless ombre gradient flowing from deep marine indigo into soft off-white. Tailored with a clean point collar, mother-of-pearl buttons, and structured cuffs.',
    images: [
      {
        id: 'img-sh-td-2-1',
        url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
        altText: 'Indigo Dip-Dye Casual Shirt - Front View',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-sh-td-2-2',
        url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
        altText: 'Indigo Dip-Dye Casual Shirt - Cuff Detail',
        isPrimary: false,
        angle: 'detail'
      }
    ],
    colors: [
      { id: 'c-indigo-gradient', name: 'Indigo Ombre', hex: '#1E3A8A' },
      { id: 'c-charcoal-gradient', name: 'Smoke Charcoal', hex: '#374151' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: true }
    ],
    specifications: {
      fit: 'Normal Fit',
      fabric: '100% Combed Cotton Poplin',
      gsm: '170 GSM',
      sleeve: 'Full Sleeve / Roll-up Tabs',
      neck: 'Spread Collar',
      pattern: 'Dip-Dye Gradient',
      stretch: 'None',
      occasion: 'Casual / Evening Wear',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Machine wash cold inside out', 'Do not use bleach', 'Warm iron'],
    status: 'active',
    featured: true,
    createdAt: '2026-08-02T10:00:00Z'
  },

  // =========================================================================
  // 2. SHIRTS — ACID WASH
  // =========================================================================
  {
    id: 'prod-sh-aw-01',
    name: 'Vintage Acid Wash Denim Shirt',
    slug: 'vintage-acid-wash-denim-shirt',
    sku: 'SHIRT-AW-01',
    category: 'shirts',
    subcategory: 'Acid Wash',
    styleType: 'acid-wash',
    collectionIds: ['col-acidwash-shirts', 'col-oversized-shirts'],
    sellingPrice: 1299,
    originalPrice: 1599,
    discountPercentage: 19,
    shortDescription: 'Heavy-washed 6.5 oz denim shirt with authentic vintage stone fading and twin chest pockets.',
    description: 'Built from durable 6.5 oz cotton denim treated with intensive stone and acid enzyme washes to achieve a 90s vintage marbled fade. Features snap pearl buttons and reinforced yoke stitching.',
    images: [
      {
        id: 'img-sh-aw-1',
        url: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000&auto=format&fit=crop',
        altText: 'Vintage Acid Wash Denim Shirt - Front View',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-sh-aw-2',
        url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
        altText: 'Vintage Acid Wash Denim Shirt - Fabric Texture',
        isPrimary: false,
        angle: 'detail'
      }
    ],
    colors: [
      { id: 'c-acid-blue', name: 'Acid Wash Blue', hex: '#60A5FA' },
      { id: 'c-acid-black', name: 'Acid Washed Black', hex: '#27272A' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: true }
    ],
    specifications: {
      fit: 'Oversized (Baggy)',
      fabric: '100% Heavy Cotton Denim',
      gsm: '210 GSM',
      sleeve: 'Full Sleeve',
      neck: 'Point Collar',
      pattern: 'Acid Washed / Marbled',
      stretch: 'Rigid Cotton',
      occasion: 'Streetwear / Casual Layering',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Machine wash cold inside out', 'Wash with similar dark denim', 'Tumble dry low', 'Warm iron'],
    status: 'active',
    badge: 'Featured',
    featured: true,
    createdAt: '2026-08-03T10:00:00Z'
  },
  {
    id: 'prod-sh-aw-02',
    name: 'Charcoal Mineral Wash Overshirt',
    slug: 'charcoal-mineral-wash-overshirt',
    sku: 'SHIRT-AW-02',
    category: 'shirts',
    subcategory: 'Acid Wash',
    styleType: 'acid-wash',
    collectionIds: ['col-acidwash-shirts', 'col-normalfit-shirts'],
    sellingPrice: 1149,
    originalPrice: 1449,
    discountPercentage: 20,
    shortDescription: 'Heavyweight cotton twill overshirt with distressed mineral wash finish and utility pockets.',
    description: 'An essential layering piece. Made from 230 GSM rugged cotton twill softened through acid mineral wash processes. Features dual box-pleated chest pockets and matte black buttons.',
    images: [
      {
        id: 'img-sh-aw-2-1',
        url: 'https://images.unsplash.com/photo-1507680434517-d4566d617327?q=80&w=1000&auto=format&fit=crop',
        altText: 'Charcoal Mineral Wash Overshirt - Front',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-sh-aw-2-2',
        url: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000&auto=format&fit=crop',
        altText: 'Charcoal Mineral Wash Overshirt - Angle',
        isPrimary: false,
        angle: 'side'
      }
    ],
    colors: [
      { id: 'c-mineral-charcoal', name: 'Mineral Charcoal', hex: '#3F3F46' },
      { id: 'c-washed-olive', name: 'Washed Olive', hex: '#4D5D53' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: false }
    ],
    specifications: {
      fit: 'Normal Fit',
      fabric: '100% Cotton Twill',
      gsm: '230 GSM',
      sleeve: 'Full Sleeve',
      neck: 'Spread Collar',
      pattern: 'Mineral Acid Wash',
      stretch: 'None',
      occasion: 'Casual / Outdoor',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Machine wash cold', 'Line dry in shade', 'Warm iron'],
    status: 'active',
    createdAt: '2026-08-04T10:00:00Z'
  },

  // =========================================================================
  // 3. SHIRTS — PLAIN
  // =========================================================================
  {
    id: 'prod-sh-pl-01',
    name: 'Classic Oxford Cotton Shirt',
    slug: 'classic-oxford-cotton-shirt',
    sku: 'SHIRT-PL-01',
    category: 'shirts',
    subcategory: 'Plain',
    styleType: 'plain',
    collectionIds: ['col-plain-shirts', 'col-normalfit-shirts'],
    sellingPrice: 899,
    originalPrice: 1199,
    discountPercentage: 25,
    shortDescription: 'Timeless button-down Oxford shirt crafted from 100% combed cotton basketweave.',
    description: 'The foundation of versatile menswear. Built with authentic 100% cotton Oxford cloth, button-down collar that stays structured all day, single chest pocket, and curved hem suitable for tucked or untucked styling.',
    images: [
      {
        id: 'img-sh-pl-1',
        url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
        altText: 'Classic Oxford Cotton Shirt - Front Model',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-sh-pl-2',
        url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
        altText: 'Classic Oxford Cotton Shirt - Collar Detail',
        isPrimary: false,
        angle: 'detail'
      }
    ],
    colors: [
      { id: 'c-oxford-white', name: 'Pure White', hex: '#FFFFFF' },
      { id: 'c-oxford-blue', name: 'Sky Blue', hex: '#93C5FD' },
      { id: 'c-oxford-navy', name: 'Deep Navy', hex: '#1E3A8A' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: true }
    ],
    specifications: {
      fit: 'Normal Fit',
      fabric: '100% Combed Oxford Cotton',
      gsm: '180 GSM',
      sleeve: 'Full Sleeve with 2-Button Cuffs',
      neck: 'Button-Down Collar',
      pattern: 'Solid Plain',
      stretch: 'Natural Comfort',
      occasion: 'Everyday / Smart Casual / Office',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Machine wash warm', 'Warm iron with steam', 'Hang dry'],
    status: 'active',
    badge: 'Bestseller',
    featured: true,
    createdAt: '2026-08-05T10:00:00Z'
  },
  {
    id: 'prod-sh-pl-02',
    name: 'Minimal Linen Blend Shirt',
    slug: 'minimal-linen-blend-shirt',
    sku: 'SHIRT-PL-02',
    category: 'shirts',
    subcategory: 'Plain',
    styleType: 'plain',
    collectionIds: ['col-plain-shirts', 'col-oversized-shirts'],
    sellingPrice: 999,
    originalPrice: 1299,
    discountPercentage: 23,
    shortDescription: 'Breathable linen-cotton blend shirt tailored with relaxed silhouette for warm weather.',
    description: 'Cooling 55% linen and 45% cotton blend engineered for maximum airflow. Features natural slub texture, mandarin band collar, and clean seamless front placket.',
    images: [
      {
        id: 'img-sh-pl-2-1',
        url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
        altText: 'Minimal Linen Blend Shirt - Front',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-sh-pl-2-2',
        url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
        altText: 'Minimal Linen Blend Shirt - Slub Texture',
        isPrimary: false,
        angle: 'detail'
      }
    ],
    colors: [
      { id: 'c-linen-sand', name: 'Sand Beige', hex: '#D6C7B2' },
      { id: 'c-linen-olive', name: 'Olive Green', hex: '#556B2F' },
      { id: 'c-linen-white', name: 'Off-White', hex: '#F9FAFB' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: false }
    ],
    specifications: {
      fit: 'Oversized (Baggy)',
      fabric: '55% Linen, 45% Cotton',
      gsm: '160 GSM',
      sleeve: 'Half Sleeve',
      neck: 'Mandarin / Band Collar',
      pattern: 'Solid Slub',
      stretch: 'None',
      occasion: 'Summer / Resort / Weekend',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Gentle machine wash cold', 'Line dry in shade', 'Warm iron while slightly damp'],
    status: 'active',
    featured: true,
    createdAt: '2026-08-06T10:00:00Z'
  },

  // =========================================================================
  // 4. SHIRTS — PRINTED
  // =========================================================================
  {
    id: 'prod-sh-pr-01',
    name: 'Botanical Floral Resort Shirt',
    slug: 'botanical-floral-resort-shirt',
    sku: 'SHIRT-PR-01',
    category: 'shirts',
    subcategory: 'Printed',
    styleType: 'printed',
    collectionIds: ['col-printed-shirts', 'col-oversized-shirts'],
    sellingPrice: 949,
    originalPrice: 1249,
    discountPercentage: 24,
    shortDescription: 'Contemporary botanical floral all-over print on ultra-soft breathable viscose twill.',
    description: 'Elevate your summer rotation with this vibrant tropical floral print. Designed with an open cuban collar, relaxed drop, and lightweight drapey viscose twill for effortless ease.',
    images: [
      {
        id: 'img-sh-pr-1',
        url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
        altText: 'Botanical Floral Resort Shirt - Front Model',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-sh-pr-2',
        url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
        altText: 'Botanical Floral Resort Shirt - Print Pattern',
        isPrimary: false,
        angle: 'detail'
      }
    ],
    colors: [
      { id: 'c-botanical-green', name: 'Forest Floral', hex: '#14532D' },
      { id: 'c-botanical-navy', name: 'Midnight Floral', hex: '#1E293B' },
      { id: 'c-botanical-cream', name: 'Cream Coral', hex: '#FDBA74' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: true }
    ],
    specifications: {
      fit: 'Oversized (Baggy)',
      fabric: '100% Viscose Twill',
      gsm: '150 GSM',
      sleeve: 'Half Sleeve',
      neck: 'Cuban Collar',
      pattern: 'Botanical Floral Print',
      stretch: 'Fluid Drape',
      occasion: 'Casual / Vacation / Party',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Machine wash cold delicate cycle', 'Do not tumble dry', 'Cool iron on reverse'],
    status: 'active',
    badge: 'New',
    featured: true,
    createdAt: '2026-08-07T10:00:00Z'
  },
  {
    id: 'prod-sh-pr-02',
    name: 'Retro Geometric Casual Shirt',
    slug: 'retro-geometric-casual-shirt',
    sku: 'SHIRT-PR-02',
    category: 'shirts',
    subcategory: 'Printed',
    styleType: 'printed',
    collectionIds: ['col-printed-shirts', 'col-normalfit-shirts'],
    sellingPrice: 899,
    originalPrice: 1199,
    discountPercentage: 25,
    shortDescription: '70s inspired retro geo tile print on lightweight combed cotton with clean camp collar.',
    description: 'Clean mid-century geometric repeating pattern crafted from breathable cotton poplin. Features wooden finish buttons and side split hem.',
    images: [
      {
        id: 'img-sh-pr-2-1',
        url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop',
        altText: 'Retro Geometric Casual Shirt - Front View',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-sh-pr-2-2',
        url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop',
        altText: 'Retro Geometric Casual Shirt - Print Angle',
        isPrimary: false,
        angle: 'detail'
      }
    ],
    colors: [
      { id: 'c-geo-terracotta', name: 'Terracotta Black', hex: '#9A3412' },
      { id: 'c-geo-olive', name: 'Olive Sage', hex: '#4D5D53' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: false }
    ],
    specifications: {
      fit: 'Normal Fit',
      fabric: '100% Combed Cotton',
      gsm: '160 GSM',
      sleeve: 'Half Sleeve',
      neck: 'Camp Collar',
      pattern: 'Geometric Tile Print',
      stretch: 'None',
      occasion: 'Casual / Weekend',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Normal machine wash', 'Do not bleach', 'Warm iron'],
    status: 'active',
    createdAt: '2026-08-08T10:00:00Z'
  },

  // =========================================================================
  // 5. T-SHIRTS — TIE & DYE
  // =========================================================================
  {
    id: 'prod-ts-td-01',
    name: 'Spiral Pastel Tie & Dye Tee',
    slug: 'spiral-pastel-tie-dye-tee',
    sku: 'TS-TD-01',
    category: 'tshirts',
    subcategory: 'Tie & Dye',
    styleType: 'tie-dye',
    collectionIds: ['col-tiedye-tshirts', 'col-oversized-tshirts'],
    sellingPrice: 799,
    originalPrice: 999,
    discountPercentage: 20,
    shortDescription: 'Heavyweight 220 GSM boxy tee with hand-crafted pastel swirl tie-dye patterns.',
    description: 'Each piece is individually hand-swirled in soft pastel hues. Made with 220 GSM heavyweight combed cotton, dropped shoulders, and a thick ribbed crew collar that holds its shape wash after wash.',
    images: [
      {
        id: 'img-ts-td-1',
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
        altText: 'Spiral Pastel Tie & Dye Tee - Front',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-ts-td-2',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
        altText: 'Spiral Pastel Tie & Dye Tee - Lifestyle',
        isPrimary: false,
        angle: 'lifestyle'
      }
    ],
    colors: [
      { id: 'c-pastel-rainbow', name: 'Pastel Multi Swirl', hex: '#93C5FD' },
      { id: 'c-sage-cloud', name: 'Sage Cloud Swirl', hex: '#6EE7B7' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: true }
    ],
    specifications: {
      fit: 'Oversized (Baggy)',
      fabric: '100% Combed Cotton',
      gsm: '220 GSM',
      sleeve: 'Half Sleeve (Drop Shoulder)',
      neck: 'Round Neck / Ribbed Collar',
      pattern: 'Hand-Dyed Tie & Dye',
      stretch: 'Comfort Stretch',
      occasion: 'Streetwear / Casual',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Wash cold inside out', 'Do not soak in hot water', 'Dry flat in shade'],
    status: 'active',
    badge: 'Bestseller',
    featured: true,
    createdAt: '2026-08-09T10:00:00Z'
  },
  {
    id: 'prod-ts-td-02',
    name: 'Indigo Cloud Tie & Dye Tee',
    slug: 'indigo-cloud-tie-dye-tee',
    sku: 'TS-TD-02',
    category: 'tshirts',
    subcategory: 'Tie & Dye',
    styleType: 'tie-dye',
    collectionIds: ['col-tiedye-tshirts', 'col-normalfit-tshirts'],
    sellingPrice: 849,
    originalPrice: 1049,
    discountPercentage: 19,
    shortDescription: 'Deep oceanic indigo cloud tie-dye pattern on relaxed organic cotton tee.',
    description: 'Subtle high-contrast cloud pattern created using authentic cold-reactive indigo dyeing methods. Soft bio-washed finish with reinforced shoulder tape.',
    images: [
      {
        id: 'img-ts-td-2-1',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
        altText: 'Indigo Cloud Tie & Dye Tee - Front',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-ts-td-2-2',
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
        altText: 'Indigo Cloud Tie & Dye Tee - Angle',
        isPrimary: false,
        angle: 'detail'
      }
    ],
    colors: [
      { id: 'c-indigo-storm', name: 'Indigo Cloud', hex: '#1E3A8A' },
      { id: 'c-charcoal-mist', name: 'Charcoal Mist', hex: '#374151' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: false }
    ],
    specifications: {
      fit: 'Normal Fit',
      fabric: '100% Organic Cotton',
      gsm: '200 GSM',
      sleeve: 'Half Sleeve',
      neck: 'Crew Neck',
      pattern: 'Cloud Tie & Dye',
      stretch: 'Natural Stretch',
      occasion: 'Casual / Streetwear',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Machine wash cold', 'Wash with similar colors', 'Medium iron'],
    status: 'active',
    createdAt: '2026-08-10T10:00:00Z'
  },

  // =========================================================================
  // 6. T-SHIRTS — ACID WASH
  // =========================================================================
  {
    id: 'prod-ts-aw-01',
    name: 'Heavyweight Acid Wash Tee',
    slug: 'heavyweight-acid-wash-tee',
    sku: 'TS-AW-01',
    category: 'tshirts',
    subcategory: 'Acid Wash',
    styleType: 'acid-wash',
    collectionIds: ['col-acidwash-tshirts', 'col-oversized-tshirts'],
    sellingPrice: 899,
    originalPrice: 1149,
    discountPercentage: 22,
    shortDescription: 'Heavy 240 GSM stone and mineral washed boxy tee with authentic vintage seam distressing.',
    description: 'Engineered for true streetwear purists. Constructed from ultra-dense 240 GSM combed cotton subjected to heavy pumice stone and enzyme wash treatments for a raw, marbled aesthetic.',
    images: [
      {
        id: 'img-ts-aw-1',
        url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
        altText: 'Heavyweight Acid Wash Tee - Front View',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-ts-aw-2',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
        altText: 'Heavyweight Acid Wash Tee - Detail Texture',
        isPrimary: false,
        angle: 'detail'
      }
    ],
    colors: [
      { id: 'c-washed-charcoal', name: 'Washed Charcoal', hex: '#27272A' },
      { id: 'c-washed-sage', name: 'Acid Washed Sage', hex: '#4D5D53' },
      { id: 'c-washed-navy', name: 'Acid Washed Navy', hex: '#1E293B' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: true }
    ],
    specifications: {
      fit: 'Oversized (Baggy)',
      fabric: '100% Heavy Combed Cotton',
      gsm: '240 GSM',
      sleeve: 'Half Sleeve (Drop Shoulder)',
      neck: 'Round Neck / Ribbed 1.25" Collar',
      pattern: 'Acid / Mineral Wash',
      stretch: 'Comfort Stretch',
      occasion: 'Streetwear / Everyday',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Machine wash cold inside out', 'Do not dry clean', 'Hang dry in shade'],
    status: 'active',
    badge: 'Featured',
    featured: true,
    createdAt: '2026-08-11T10:00:00Z'
  },
  {
    id: 'prod-ts-aw-02',
    name: 'Vintage Washed Charcoal Tee',
    slug: 'vintage-washed-charcoal-tee',
    sku: 'TS-AW-02',
    category: 'tshirts',
    subcategory: 'Acid Wash',
    styleType: 'acid-wash',
    collectionIds: ['col-acidwash-tshirts', 'col-normalfit-tshirts'],
    sellingPrice: 849,
    originalPrice: 1049,
    discountPercentage: 19,
    shortDescription: 'Distressed seam vintage washed t-shirt in soft 210 GSM jersey.',
    description: 'Subtly faded across shoulders and ribbing with a soft sueded hand-feel achieved through specialized acid enzyme processing.',
    images: [
      {
        id: 'img-ts-aw-2-1',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
        altText: 'Vintage Washed Charcoal Tee - Front',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-ts-aw-2-2',
        url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
        altText: 'Vintage Washed Charcoal Tee - Back',
        isPrimary: false,
        angle: 'back'
      }
    ],
    colors: [
      { id: 'c-faded-black', name: 'Faded Black', hex: '#18181B' },
      { id: 'c-faded-brown', name: 'Earthy Brown', hex: '#78350F' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: false }
    ],
    specifications: {
      fit: 'Normal Fit',
      fabric: '100% Bio-Washed Cotton',
      gsm: '210 GSM',
      sleeve: 'Half Sleeve',
      neck: 'Round Neck',
      pattern: 'Acid Mineral Wash',
      stretch: 'Natural 2-Way Stretch',
      occasion: 'Everyday / Casual',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Normal wash cold', 'Warm iron'],
    status: 'active',
    createdAt: '2026-08-12T10:00:00Z'
  },

  // =========================================================================
  // 7. T-SHIRTS — PLAIN
  // =========================================================================
  {
    id: 'prod-ts-pl-01',
    name: 'Essential Oversized Plain Tee',
    slug: 'essential-oversized-plain-tee',
    sku: 'TS-PL-01',
    category: 'tshirts',
    subcategory: 'Plain',
    styleType: 'plain',
    collectionIds: ['col-plain-tshirts', 'col-oversized-tshirts'],
    sellingPrice: 699,
    originalPrice: 899,
    discountPercentage: 22,
    shortDescription: 'Clean minimalist solid color tee in 220 GSM combed cotton with relaxed drop shoulders.',
    description: 'The definitive plain everyday tee. Made with premium 220 GSM heavyweight combed cotton, reinforced double-needle hem stitching, and pre-shrunk for consistent fit after every wash.',
    images: [
      {
        id: 'img-ts-pl-1',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
        altText: 'Essential Oversized Plain Tee - Front',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-ts-pl-2',
        url: 'https://images.unsplash.com/photo-1507680434517-d4566d617327?q=80&w=1000&auto=format&fit=crop',
        altText: 'Essential Oversized Plain Tee - Detail',
        isPrimary: false,
        angle: 'detail'
      }
    ],
    colors: [
      { id: 'c-solid-black', name: 'Stealth Black', hex: '#111827' },
      { id: 'c-solid-white', name: 'Clean White', hex: '#FFFFFF' },
      { id: 'c-solid-sage', name: 'Muted Sage', hex: '#708238' },
      { id: 'c-solid-navy', name: 'Classic Navy', hex: '#1E3A8A' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: true }
    ],
    specifications: {
      fit: 'Oversized (Baggy)',
      fabric: '100% Combed Cotton',
      gsm: '220 GSM',
      sleeve: 'Half Sleeve (Drop Shoulder)',
      neck: 'Round Neck',
      pattern: 'Solid Plain',
      stretch: 'Regular Comfort Stretch',
      occasion: 'Everyday / Casual',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Machine wash warm with like colors', 'Tumble dry low', 'Medium iron'],
    status: 'active',
    badge: 'Bestseller',
    featured: true,
    createdAt: '2026-08-13T10:00:00Z'
  },
  {
    id: 'prod-ts-pl-02',
    name: 'Classic Bio-Washed Round Neck',
    slug: 'classic-bio-washed-round-neck',
    sku: 'TS-PL-02',
    category: 'tshirts',
    subcategory: 'Plain',
    styleType: 'plain',
    collectionIds: ['col-plain-tshirts', 'col-normalfit-tshirts'],
    sellingPrice: 599,
    originalPrice: 749,
    discountPercentage: 20,
    shortDescription: 'Everyday standard fit crew neck tee in 180 GSM bio-washed soft combed cotton.',
    description: 'Tailored for effortless layering. Ultra-soft bio-washed cotton eliminates fuzz and pilling, providing a clean refined look under jackets or on its own.',
    images: [
      {
        id: 'img-ts-pl-2-1',
        url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop',
        altText: 'Classic Bio-Washed Round Neck - Front',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-ts-pl-2-2',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
        altText: 'Classic Bio-Washed Round Neck - Texture',
        isPrimary: false,
        angle: 'detail'
      }
    ],
    colors: [
      { id: 'c-navy-plain', name: 'Navy Blue', hex: '#1E3A8A' },
      { id: 'c-charcoal-plain', name: 'Charcoal Gray', hex: '#374151' },
      { id: 'c-sand-plain', name: 'Warm Sand', hex: '#D6C7B2' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: true }
    ],
    specifications: {
      fit: 'Normal Fit',
      fabric: '100% Bio-Washed Cotton',
      gsm: '180 GSM',
      sleeve: 'Half Sleeve',
      neck: 'Round Neck',
      pattern: 'Solid Plain',
      stretch: 'Natural 2-Way Stretch',
      occasion: 'Everyday / Lounge',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Normal machine wash', 'Do not use bleach', 'Warm iron'],
    status: 'active',
    createdAt: '2026-08-14T10:00:00Z'
  },

  // =========================================================================
  // 8. T-SHIRTS — PRINTED
  // =========================================================================
  {
    id: 'prod-ts-pr-01',
    name: 'Minimal Typo Screen Print Tee',
    slug: 'minimal-typo-screen-print-tee',
    sku: 'TS-PR-01',
    category: 'tshirts',
    subcategory: 'Printed',
    styleType: 'printed',
    collectionIds: ['col-printed-tshirts', 'col-oversized-tshirts'],
    sellingPrice: 749,
    originalPrice: 949,
    discountPercentage: 21,
    shortDescription: 'High-density typographic chest branding on 200 GSM organic cotton drop-shoulder tee.',
    description: 'Understated typographic chest emblem combined with a modern minimal back typography quote. Breathable screen printing ensures zero rubbery feel.',
    images: [
      {
        id: 'img-ts-pr-1',
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
        altText: 'Minimal Typo Screen Print Tee - Front Graphic',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-ts-pr-2',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
        altText: 'Minimal Typo Screen Print Tee - Back Graphic',
        isPrimary: false,
        angle: 'back'
      }
    ],
    colors: [
      { id: 'c-print-white', name: 'Chalk White', hex: '#F9FAFB' },
      { id: 'c-print-black', name: 'Vintage Black', hex: '#1F2937' },
      { id: 'c-print-sage', name: 'Sage Green', hex: '#708238' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: false }
    ],
    specifications: {
      fit: 'Oversized (Baggy)',
      fabric: '100% Organic Combed Cotton',
      gsm: '200 GSM',
      sleeve: 'Half Sleeve',
      neck: 'Round Neck',
      pattern: 'Minimal Screen Print',
      stretch: 'Comfort Stretch',
      occasion: 'Streetwear / Casual',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Wash inside out with cold water', 'Do not iron directly on print', 'Dry in shade'],
    status: 'active',
    badge: 'New',
    featured: true,
    createdAt: '2026-08-15T10:00:00Z'
  },
  {
    id: 'prod-ts-pr-02',
    name: 'Retro Sun Graphic Tee',
    slug: 'retro-sun-graphic-tee',
    sku: 'TS-PR-02',
    category: 'tshirts',
    subcategory: 'Printed',
    styleType: 'printed',
    collectionIds: ['col-printed-tshirts', 'col-normalfit-tshirts'],
    sellingPrice: 799,
    originalPrice: 999,
    discountPercentage: 20,
    shortDescription: 'Vintage 70s sunset circular artwork on heavy 220 GSM cotton boxy tee.',
    description: 'Artistic sunbeam graphic with cracked distress vintage look. Pre-washed for a soft broken-in feel right out of the package.',
    images: [
      {
        id: 'img-ts-pr-2-1',
        url: 'https://images.unsplash.com/photo-1507680434517-d4566d617327?q=80&w=1000&auto=format&fit=crop',
        altText: 'Retro Sun Graphic Tee - Front Art',
        isPrimary: true,
        angle: 'front'
      },
      {
        id: 'img-ts-pr-2-2',
        url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
        altText: 'Retro Sun Graphic Tee - Model Angle',
        isPrimary: false,
        angle: 'lifestyle'
      }
    ],
    colors: [
      { id: 'c-sand-art', name: 'Sand Cream', hex: '#D6C7B2' },
      { id: 'c-navy-art', name: 'Deep Ocean', hex: '#0F172A' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: true }
    ],
    specifications: {
      fit: 'Normal Fit',
      fabric: '100% Combed Cotton',
      gsm: '220 GSM',
      sleeve: 'Half Sleeve',
      neck: 'Round Neck',
      pattern: 'Graphic Screen Print',
      stretch: 'Natural Stretch',
      occasion: 'Casual / Outdoor',
      gender: 'Men',
      countryOfOrigin: 'India'
    },
    careInstructions: ['Machine wash cold', 'Iron inside out'],
    status: 'active',
    createdAt: '2026-08-16T10:00:00Z'
  },

  // =========================================================================
  // 9. SHORTS (Maintained for dedicated /shorts catalog)
  // =========================================================================
  {
    id: 'prod-sh-001',
    name: 'Active Training Shorts',
    slug: 'active-training-shorts',
    sku: 'SH-001',
    category: 'shorts',
    subcategory: 'Training Shorts',
    collectionIds: [],
    sellingPrice: 749,
    originalPrice: 949,
    discountPercentage: 21,
    shortDescription: 'High-performance 4-way stretch shorts with zippered pockets and reflective accents.',
    description: 'Designed for high-output training sessions. Built with lightweight moisture-wicking stretch fabric, perforated ventilation gusset, and dual secure zippered pockets.',
    images: [
      {
        id: 'img-sh-1',
        url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop',
        altText: 'Active Training Shorts - Front',
        isPrimary: true,
        angle: 'front'
      }
    ],
    colors: [
      { id: 'c-black-sh', name: 'Stealth Black', hex: '#111827' },
      { id: 'c-navy-sh', name: 'Navy Blue', hex: '#1E3A8A' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: true }
    ],
    specifications: {
      fit: 'Athletic Fit',
      fabric: '90% Polyester, 10% Spandex',
      gsm: '160 GSM',
      pattern: 'Solid',
      stretch: '4-Way Stretch',
      occasion: 'Gym / Running / Active',
      gender: 'Men',
      countryOfOrigin: 'India',
      length: '7 Inch Inseam'
    },
    careInstructions: ['Machine wash cold', 'Fast drying'],
    status: 'active',
    featured: true,
    createdAt: '2026-08-17T10:00:00Z'
  },
  {
    id: 'prod-sh-002',
    name: 'Cotton Casual Shorts',
    slug: 'cotton-casual-shorts',
    sku: 'SH-002',
    category: 'shorts',
    subcategory: 'Cotton Shorts',
    collectionIds: [],
    sellingPrice: 699,
    originalPrice: 899,
    discountPercentage: 22,
    shortDescription: 'Heavy loopback cotton French terry shorts with adjustable drawcord waistband.',
    description: 'Everyday comfort engineered for all-day lounging or weekend road trips. Made from 240 GSM loopback cotton terry with deep side slash pockets.',
    images: [
      {
        id: 'img-sh-2',
        url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop',
        altText: 'Cotton Casual Shorts - Front',
        isPrimary: true,
        angle: 'front'
      }
    ],
    colors: [
      { id: 'c-olive-sh', name: 'Olive Green', hex: '#4D5D53' },
      { id: 'c-charcoal-sh', name: 'Charcoal', hex: '#374151' }
    ],
    sizes: [
      { size: 'S', available: true },
      { size: 'M', available: true },
      { size: 'L', available: true },
      { size: 'XL', available: true },
      { size: 'XXL', available: true }
    ],
    specifications: {
      fit: 'Relaxed Fit',
      fabric: '100% Cotton French Terry',
      gsm: '240 GSM',
      pattern: 'Solid',
      stretch: 'Natural Comfort Stretch',
      occasion: 'Casual / Lounge',
      gender: 'Men',
      countryOfOrigin: 'India',
      length: '6.5 Inch Inseam'
    },
    careInstructions: ['Machine wash cold with like colors', 'Dry in shade'],
    status: 'active',
    featured: true,
    createdAt: '2026-08-18T10:00:00Z'
  }
];

export const INITIAL_HOMEPAGE_CONFIG: HomepageConfig = {
  hero: {
    headline: 'Everyday Style. Made Better.',
    subtext: 'Explore our latest collection designed for comfort, movement and everyday wear.',
    primaryButtonText: 'EXPLORE COLLECTIONS',
    primaryButtonLink: '/collections',
    secondaryButtonText: 'CONTACT US',
    secondaryButtonLink: '/contact',
    backgroundImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop'
  },
  newCollectionBanner: {
    headline: 'Made for Everyday Movement',
    subtext: 'Discover lightweight shirts and t-shirts designed for everyday comfort, travel and active routines.',
    buttonText: 'View Collection',
    buttonLink: '/collections',
    imageUrl: 'https://images.unsplash.com/photo-1507680434517-d4566d617327?q=80&w=1200&auto=format&fit=crop'
  },
  lookbook: []
};

export const INITIAL_WEBSITE_SETTINGS: WebsiteSettings = {
  brandName: 'SD TRENDYZ',
  tagline: 'Modern Shirts & T-Shirts Catalog',
  logoText: 'SD TRENDYZ',
  logoUrl: '/logo.png',
  announcement: {
    enabled: true,
    text: 'NEW ARRIVALS ARE HERE — Explore Our Latest Collection'
  },
  contact: {
    phone: '+91 90877 04111',
    secondaryPhone: '+91 97877 04111',
    whatsappNumber: '+919087704111',
    email: 'balasri3333@gmail.com',
    address: '12/152, Erappanaickanpalayam, Mylambadi, Bhavani, Tamil Nadu - 638314',
    businessHours: 'Monday – Saturday: 10:00 AM – 8:00 PM IST',
    mapEmbedUrl: 'https://maps.google.com/maps?q=12%2F152+Erappanaickanpalayam,+Mylambadi,+Bhavani,+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed'
  },
  socials: {
    instagram: 'https://instagram.com/sdtrendyz',
    facebook: 'https://facebook.com/sdtrendyz',
    whatsapp: 'https://wa.me/919087704111'
  },
  footerDescription: 'Modern T-shirts and shorts designed for comfort, quality and everyday style.',
  copyrightText: '© 2026 SD TRENDYZ. All Rights Reserved.'
};

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-001',
    customerName: 'Rahul Sharma',
    phone: '+91 98765 12340',
    email: 'rahul.sharma@example.com',
    productName: 'Resort Tie & Dye Cuban Shirt',
    productCode: 'SHIRT-TD-01',
    selectedColor: 'Pastel Blue Swirl',
    selectedSize: 'L',
    message: 'Hello, what is the bulk enquiry price for 30 units in L size?',
    status: 'new',
    createdAt: '2026-08-23T14:30:00Z'
  }
];
