export type ProductCategory = 'shirts' | 'tshirts' | 'shorts' | string;

export type ProductBadge = 'New' | 'Featured' | 'Bestseller' | 'Limited' | 'Sale';

export type ProductStyleType = 'tie-dye' | 'acid-wash' | 'plain' | 'printed';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  imageUrl?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  isPrimary?: boolean;
  colorId?: string;
  angle?: 'front' | 'back' | 'side' | 'detail' | 'lifestyle';
}

export interface ProductSize {
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  available: boolean;
}

export interface ProductSpecifications {
  fit: string;
  fabric: string;
  gsm?: string;
  sleeve?: string;
  neck?: string;
  pattern: string;
  stretch: string;
  occasion: string;
  gender: string;
  countryOfOrigin: string;
  length?: string; // for shorts
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: ProductCategory;
  subcategory: string; // e.g. "Tie & Dye Shirt", "Acid Wash T-Shirt", "Plain Shirt"
  styleType?: 'tie-dye' | 'acid-wash' | 'plain' | 'printed' | string;
  collectionIds: string[];
  sellingPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  colors: ProductColor[];
  sizes: ProductSize[];
  specifications: ProductSpecifications;
  careInstructions: string[];
  status: 'active' | 'hidden' | 'draft';
  badge?: ProductBadge;
  featured?: boolean;
  newArrival?: boolean;
  seoTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  subcategories: string[];
  displayOrder: number;
  status: 'active' | 'hidden';
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  status: 'active' | 'hidden';
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  combination: string;
  imageUrl: string;
  categoryLink: string;
}

export interface Enquiry {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  productId?: string;
  productName?: string;
  productCode?: string;
  selectedColor?: string;
  selectedSize?: string;
  message: string;
  status: 'new' | 'contacted' | 'completed';
  createdAt: string;
}

export interface HomepageConfig {
  hero: {
    headline: string;
    subtext: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    backgroundImage: string;
  };
  newCollectionBanner: {
    headline: string;
    subtext: string;
    buttonText: string;
    buttonLink: string;
    imageUrl: string;
  };
  lookbook: LookbookItem[];
}

export interface WebsiteSettings {
  brandName: string;
  tagline: string;
  logoText: string;
  logoUrl?: string;
  announcement: {
    enabled: boolean;
    text: string;
  };
  contact: {
    phone: string;
    secondaryPhone?: string;
    whatsappNumber: string;
    email: string;
    address: string;
    businessHours: string;
    mapEmbedUrl?: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  footerDescription: string;
  copyrightText: string;
}

export interface CatalogFilterState {
  category?: ProductCategory | 'all';
  subcategory?: string;
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  fits: string[];
  fabrics: string[];
  sleeves?: string[];
  lengths?: string[];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name-asc';
  searchQuery?: string;
}
