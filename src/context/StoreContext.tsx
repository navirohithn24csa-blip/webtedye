import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Collection,
  HomepageConfig,
  WebsiteSettings,
  Enquiry
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_COLLECTIONS,
  INITIAL_HOMEPAGE_CONFIG,
  INITIAL_WEBSITE_SETTINGS,
  INITIAL_ENQUIRIES
} from '../data/mockData';

interface StoreContextType {
  // Products
  products: Product[];
  activeProducts: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => Product | null;
  toggleProductVisibility: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;

  // Categories
  categories: Category[];
  activeCategories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Collections
  collections: Collection[];
  activeCollections: Collection[];
  addCollection: (collection: Omit<Collection, 'id'>) => Collection;
  updateCollection: (id: string, collection: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;

  // Enquiries
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => Enquiry;
  updateEnquiryStatus: (id: string, status: 'new' | 'contacted' | 'completed') => void;
  deleteEnquiry: (id: string) => void;

  // Homepage Config
  homepageConfig: HomepageConfig;
  updateHomepageConfig: (config: Partial<HomepageConfig>) => void;

  // Website Settings
  settings: WebsiteSettings;
  updateSettings: (settings: Partial<WebsiteSettings>) => void;

  // Recently Viewed Products
  recentlyViewedSlugs: string[];
  addRecentlyViewed: (slug: string) => void;

  // Global Search Modal State
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Admin Auth State
  isAdminAuthenticated: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;

  // Backup / Reset
  resetToDefaults: () => void;
  exportDatabaseJson: () => string;
  importDatabaseJson: (jsonData: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'sd_trendyz_products_v5',
  CATEGORIES: 'sd_trendyz_categories_v5',
  COLLECTIONS: 'sd_trendyz_collections_v5',
  HOMEPAGE: 'sd_trendyz_homepage_v5',
  SETTINGS: 'sd_trendyz_settings_v5',
  ENQUIRIES: 'sd_trendyz_enquiries_v5',
  RECENTLY_VIEWED: 'sd_trendyz_recently_viewed_v5',
  ADMIN_AUTH: 'sd_trendyz_admin_auth_session_v5'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse products from storage', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  // 2. Categories State
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse categories', e);
      }
    }
    return INITIAL_CATEGORIES;
  });

  // 3. Collections State
  const [collections, setCollections] = useState<Collection[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse collections', e);
      }
    }
    return INITIAL_COLLECTIONS;
  });

  // 4. Homepage Config State
  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HOMEPAGE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse homepage config', e);
      }
    }
    return INITIAL_HOMEPAGE_CONFIG;
  });

  // 5. Settings State
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed.contact &&
          (!parsed.contact.address ||
            parsed.contact.address.includes('Coimbatore') ||
            parsed.contact.address.includes('Fashion Street'))
        ) {
          parsed.contact.address = INITIAL_WEBSITE_SETTINGS.contact.address;
          parsed.contact.mapEmbedUrl = INITIAL_WEBSITE_SETTINGS.contact.mapEmbedUrl;
        }
        parsed.logoUrl = parsed.logoUrl || '/logo.png';
        return parsed;
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
    return INITIAL_WEBSITE_SETTINGS;
  });

  // 6. Enquiries State
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse enquiries', e);
      }
    }
    return INITIAL_ENQUIRIES;
  });

  // 7. Recently Viewed
  const [recentlyViewedSlugs, setRecentlyViewedSlugs] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse recently viewed', e);
      }
    }
    return [];
  });

  // 8. Search Overlay state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 9. Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HOMEPAGE, JSON.stringify(homepageConfig));
  }, [homepageConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(recentlyViewedSlugs));
  }, [recentlyViewedSlugs]);

  // Derived Active Lists
  const activeProducts = products.filter(p => p.status === 'active');
  const activeCategories = categories.filter(c => c.status === 'active');
  const activeCollections = collections.filter(c => c.status === 'active');

  // Product Actions
  const addProduct = (newProdData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: now,
      updatedAt: now
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev =>
      prev.map(prod => {
        if (prod.id === id) {
          return {
            ...prod,
            ...updatedFields,
            updatedAt: new Date().toISOString()
          };
        }
        return prod;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const duplicateProduct = (id: string): Product | null => {
    const existing = products.find(p => p.id === id);
    if (!existing) return null;
    const now = new Date().toISOString();
    const duplicated: Product = {
      ...existing,
      id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: `${existing.name} (Copy)`,
      slug: `${existing.slug}-copy-${Math.random().toString(36).substr(2, 4)}`,
      sku: `${existing.sku}-CP`,
      status: 'draft',
      createdAt: now,
      updatedAt: now
    };
    setProducts(prev => [duplicated, ...prev]);
    return duplicated;
  };

  const toggleProductVisibility = (id: string) => {
    setProducts(prev =>
      prev.map(prod => {
        if (prod.id === id) {
          const nextStatus = prod.status === 'active' ? 'hidden' : 'active';
          return { ...prod, status: nextStatus, updatedAt: new Date().toISOString() };
        }
        return prod;
      })
    );
  };

  const getProductBySlug = (slug: string) => {
    return products.find(p => p.slug === slug || p.id === slug);
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  // Category Actions
  const addCategory = (categoryData: Omit<Category, 'id'>): Category => {
    const newCategory: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, ...category } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Collection Actions
  const addCollection = (collectionData: Omit<Collection, 'id'>): Collection => {
    const newCollection: Collection = {
      ...collectionData,
      id: `col-${Date.now()}`
    };
    setCollections(prev => [...prev, newCollection]);
    return newCollection;
  };

  const updateCollection = (id: string, collection: Partial<Collection>) => {
    setCollections(prev =>
      prev.map(c => (c.id === id ? { ...c, ...collection } : c))
    );
  };

  const deleteCollection = (id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  // Enquiry Actions
  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const updateEnquiryStatus = (id: string, status: 'new' | 'contacted' | 'completed') => {
    setEnquiries(prev =>
      prev.map(e => (e.id === id ? { ...e, status } : e))
    );
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
  };

  // Homepage Config Actions
  const updateHomepageConfig = (newConfig: Partial<HomepageConfig>) => {
    setHomepageConfig(prev => ({
      ...prev,
      ...newConfig
    }));
  };

  // Settings Actions
  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  // Recently Viewed Actions
  const addRecentlyViewed = (slug: string) => {
    setRecentlyViewedSlugs(prev => {
      const filtered = prev.filter(s => s !== slug);
      return [slug, ...filtered].slice(0, 8);
    });
  };

  // Admin Auth
  const adminLogin = (password: string): boolean => {
    // Default admin passcode "admin123" or any custom credential
    if (password === 'admin123' || password === 'admin@bala2026') {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setCollections(INITIAL_COLLECTIONS);
    setHomepageConfig(INITIAL_HOMEPAGE_CONFIG);
    setSettings(INITIAL_WEBSITE_SETTINGS);
    setEnquiries(INITIAL_ENQUIRIES);
    setRecentlyViewedSlugs([]);
  };

  // Export and Import JSON
  const exportDatabaseJson = (): string => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      products,
      categories,
      collections,
      homepageConfig,
      settings,
      enquiries
    };
    return JSON.stringify(data, null, 2);
  };

  const importDatabaseJson = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.categories) setCategories(parsed.categories);
      if (parsed.collections) setCollections(parsed.collections);
      if (parsed.homepageConfig) setHomepageConfig(parsed.homepageConfig);
      if (parsed.settings) setSettings(parsed.settings);
      if (parsed.enquiries) setEnquiries(parsed.enquiries);
      return true;
    } catch (e) {
      console.error('Invalid JSON file imported', e);
      return false;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        activeProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        toggleProductVisibility,
        getProductBySlug,
        getProductById,

        categories,
        activeCategories,
        addCategory,
        updateCategory,
        deleteCategory,

        collections,
        activeCollections,
        addCollection,
        updateCollection,
        deleteCollection,

        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,

        homepageConfig,
        updateHomepageConfig,

        settings,
        updateSettings,

        recentlyViewedSlugs,
        addRecentlyViewed,

        isSearchOpen,
        setIsSearchOpen,

        isAdminAuthenticated,
        adminLogin,
        adminLogout,

        resetToDefaults,
        exportDatabaseJson,
        importDatabaseJson
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
