import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  Star,
  Check,
  Upload,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Product, ProductCategory, ProductBadge, ProductImage, ProductColor, ProductSize } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const DEFAULT_SIZES: ProductSize[] = [
  { size: 'S', available: true },
  { size: 'M', available: true },
  { size: 'L', available: true },
  { size: 'XL', available: true },
  { size: 'XXL', available: false }
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  productToEdit
}) => {
  const { addProduct, updateProduct, categories, collections } = useStore();

  // Form State
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<ProductCategory>('tshirts');
  const [subcategory, setSubcategory] = useState('');
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>([]);

  // Pricing
  const [sellingPrice, setSellingPrice] = useState<number>(799);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(999);
  const [discountPercentage, setDiscountPercentage] = useState<number | undefined>(20);

  // Descriptions
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');

  // Images
  const [images, setImages] = useState<ProductImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAngle, setNewImageAngle] = useState<'front' | 'back' | 'side' | 'detail' | 'lifestyle'>('front');

  // Colors
  const [colors, setColors] = useState<ProductColor[]>([]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#111827');

  // Sizes
  const [sizes, setSizes] = useState<ProductSize[]>(DEFAULT_SIZES);

  // Specifications
  const [fit, setFit] = useState('Oversized');
  const [fabric, setFabric] = useState('100% Combed Cotton');
  const [gsm, setGsm] = useState('220 GSM');
  const [sleeve, setSleeve] = useState('Half Sleeve');
  const [neck, setNeck] = useState('Round Neck');
  const [length, setLength] = useState('Above Knee (7")');
  const [pattern, setPattern] = useState('Solid');
  const [stretch, setStretch] = useState('Comfort Stretch');
  const [occasion, setOccasion] = useState('Casual / Streetwear');
  const [gender, setGender] = useState('Men');
  const [countryOfOrigin, setCountryOfOrigin] = useState('India');

  // Care instructions
  const [careInstructions, setCareInstructions] = useState<string[]>([
    'Machine wash cold with like colors',
    'Do not bleach',
    'Iron on reverse at low temperature',
    'Dry in shade'
  ]);
  const [newCareItem, setNewCareItem] = useState('');

  // Visibility & Badges
  const [status, setStatus] = useState<'active' | 'hidden' | 'draft'>('active');
  const [badge, setBadge] = useState<ProductBadge | undefined>(undefined);
  const [featured, setFeatured] = useState(false);
  const [newArrival, setNewArrival] = useState(false);

  // SEO
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Active Tab in Editor
  const [activeTab, setActiveTab] = useState<'general' | 'images' | 'variants' | 'specs' | 'seo'>('general');

  // Auto-calculate discount percentage when prices change
  useEffect(() => {
    if (originalPrice && sellingPrice && originalPrice > sellingPrice) {
      const disc = Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
      setDiscountPercentage(disc);
    } else {
      setDiscountPercentage(undefined);
    }
  }, [sellingPrice, originalPrice]);

  // Auto-generate slug when name changes (if not manually editing existing slug)
  const handleNameChange = (val: string) => {
    setName(val);
    if (!productToEdit) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  // Populate data when editing an existing product
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setSku(productToEdit.sku);
      setSlug(productToEdit.slug);
      setCategory(productToEdit.category);
      setSubcategory(productToEdit.subcategory);
      setSelectedCollectionIds(productToEdit.collectionIds || []);
      setSellingPrice(productToEdit.sellingPrice);
      setOriginalPrice(productToEdit.originalPrice);
      setDiscountPercentage(productToEdit.discountPercentage);
      setShortDescription(productToEdit.shortDescription || '');
      setDescription(productToEdit.description || '');
      setImages(productToEdit.images || []);
      setColors(productToEdit.colors || []);
      setSizes(productToEdit.sizes || DEFAULT_SIZES);

      if (productToEdit.specifications) {
        setFit(productToEdit.specifications.fit || '');
        setFabric(productToEdit.specifications.fabric || '');
        setGsm(productToEdit.specifications.gsm || '');
        setSleeve(productToEdit.specifications.sleeve || '');
        setNeck(productToEdit.specifications.neck || '');
        setLength(productToEdit.specifications.length || '');
        setPattern(productToEdit.specifications.pattern || 'Solid');
        setStretch(productToEdit.specifications.stretch || 'Comfort Stretch');
        setOccasion(productToEdit.specifications.occasion || 'Casual');
        setGender(productToEdit.specifications.gender || 'Men');
        setCountryOfOrigin(productToEdit.specifications.countryOfOrigin || 'India');
      }

      setCareInstructions(productToEdit.careInstructions || []);
      setStatus(productToEdit.status);
      setFeatured(productToEdit.featured ?? false);
      setNewArrival(productToEdit.newArrival ?? false);
      setSeoTitle(productToEdit.seoTitle || '');
      setMetaDescription(productToEdit.metaDescription || '');
    } else {
      // Reset to fresh product defaults
      setName('');
      setSku(`AP-${Math.floor(100 + Math.random() * 900)}`);
      setSlug('');
      setCategory('tshirts');
      setSubcategory('Oversized T-Shirt');
      setSelectedCollectionIds(['col-everyday']);
      setSellingPrice(799);
      setOriginalPrice(999);
      setShortDescription('');
      setDescription('');
      setImages([
        {
          id: `img-${Date.now()}-1`,
          url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
          altText: 'Primary Front View',
          isPrimary: true,
          angle: 'front'
        },
        {
          id: `img-${Date.now()}-2`,
          url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
          altText: 'Secondary Hover View',
          isPrimary: false,
          angle: 'back'
        }
      ]);
      setColors([
        { id: 'c-black', name: 'Black', hex: '#111827' },
        { id: 'c-white', name: 'Off White', hex: '#F9FAFB' }
      ]);
      setSizes(DEFAULT_SIZES);
      setStatus('active');
      setBadge('New');
      setFeatured(true);
      setNewArrival(true);
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  // Add Image handler
  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    const newImg: ProductImage = {
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      url: newImageUrl.trim(),
      altText: `${name} ${newImageAngle} view`,
      isPrimary: images.length === 0,
      angle: newImageAngle
    };
    setImages((prev) => [...prev, newImg]);
    setNewImageUrl('');
  };

  const handleSetPrimaryImage = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.id === id
      }))
    );
  };

  const handleDeleteImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      if (filtered.length > 0 && !filtered.some((img) => img.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  // Add Color handler
  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    const newCol: ProductColor = {
      id: `c-${Date.now()}`,
      name: newColorName.trim(),
      hex: newColorHex
    };
    setColors((prev) => [...prev, newCol]);
    setNewColorName('');
  };

  const handleDeleteColor = (id: string) => {
    setColors((prev) => prev.filter((c) => c.id !== id));
  };

  // Toggle Size availability
  const handleToggleSize = (sizeKey: 'S' | 'M' | 'L' | 'XL' | 'XXL') => {
    setSizes((prev) =>
      prev.map((s) => (s.size === sizeKey ? { ...s, available: !s.available } : s))
    );
  };

  // Add Care Instruction
  const handleAddCare = () => {
    if (!newCareItem.trim()) return;
    setCareInstructions((prev) => [...prev, newCareItem.trim()]);
    setNewCareItem('');
  };

  // Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !sku.trim()) {
      alert('Product Name and SKU are required.');
      return;
    }

    const payload = {
      name: name.trim(),
      sku: sku.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      subcategory: subcategory.trim() || (category === 'tshirts' ? 'Round Neck' : 'Cotton Shorts'),
      collectionIds: selectedCollectionIds,
      sellingPrice: Number(sellingPrice) || 0,
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      discountPercentage: discountPercentage ? Number(discountPercentage) : undefined,
      shortDescription: shortDescription.trim() || `${name} designed for everyday comfort and premium style.`,
      description: description.trim() || `${name} crafted from high-quality fabrics with a clean fit.`,
      images: images.length > 0 ? images : [
        {
          id: `img-${Date.now()}`,
          url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
          altText: name,
          isPrimary: true,
          angle: 'front' as const
        }
      ],
      colors: colors.length > 0 ? colors : [{ id: 'c-1', name: 'Black', hex: '#111827' }],
      sizes,
      specifications: {
        fit,
        fabric,
        gsm,
        sleeve: category === 'tshirts' ? sleeve : undefined,
        neck: category === 'tshirts' ? neck : undefined,
        length: category === 'shorts' ? length : undefined,
        pattern,
        stretch,
        occasion,
        gender,
        countryOfOrigin
      },
      careInstructions,
      status,
      badge,
      featured,
      newArrival,
      seoTitle: seoTitle.trim() || `${name} | ${category === 'tshirts' ? 'T-Shirt' : 'Shorts'} Catalog`,
      metaDescription: metaDescription.trim() || shortDescription
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, payload);
    } else {
      addProduct(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-6">
        <div className="inline-block w-full max-w-4xl bg-white rounded-2xl text-left shadow-2xl transform transition-all relative z-10 overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
          {/* Modal Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {productToEdit ? `Edit Product: ${productToEdit.name}` : 'Add New Apparel Product'}
              </h3>
              <p className="text-xs text-slate-500">Configure imagery, prices, swatches, and garment specs</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Tabs */}
          <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto">
            {[
              { id: 'general', label: '1. Basic & Pricing' },
              { id: 'images', label: '2. Multi-Photos' },
              { id: 'variants', label: '3. Colors & Sizes' },
              { id: 'specs', label: '4. Fabric & Specs' },
              { id: 'seo', label: '5. Status & SEO' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-slate-950 text-slate-950 font-extrabold'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Body (Scrollable) */}
          <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* TAB 1: GENERAL & PRICING */}
            {activeTab === 'general' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. Essential Oversized T-Shirt"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Product SKU / Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      placeholder="e.g. TS-001"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Main Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ProductCategory)}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-950"
                    >
                      <option value="tshirts">T-Shirts</option>
                      <option value="shorts">Shorts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Subcategory / Style
                    </label>
                    <input
                      type="text"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      placeholder="e.g. Oversized T-Shirt, Gym Shorts"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="essential-oversized-tshirt"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-950 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Collections check */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Include in Collections
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {collections.map((col) => {
                      const isChecked = selectedCollectionIds.includes(col.id);
                      return (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() => {
                            setSelectedCollectionIds((prev) =>
                              isChecked ? prev.filter((id) => id !== col.id) : [...prev, col.id]
                            );
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            isChecked
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {col.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pricing Fields */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Pricing & Offers (INR ₹)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Selling Price (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(Number(e.target.value))}
                        className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg font-bold text-slate-950"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Original / Strike-through Price (₹)
                      </label>
                      <input
                        type="number"
                        value={originalPrice || ''}
                        onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="Optional e.g. 999"
                        className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Discount % (Auto-calculated)
                      </label>
                      <div className="px-3.5 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg font-bold text-emerald-800">
                        {discountPercentage ? `${discountPercentage}% OFF` : 'None'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descriptions */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Brief 1-sentence product summary"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Detailed craftsmanship and product story..."
                    className="w-full p-3 text-sm bg-white border border-slate-200 rounded-lg leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: MULTI-IMAGE MANAGEMENT */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                {/* Add image bar */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Add Product Image
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="Paste image URL (Unsplash or direct image link)"
                      className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                    <select
                      value={newImageAngle}
                      onChange={(e) => setNewImageAngle(e.target.value as any)}
                      className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-medium"
                    >
                      <option value="front">Front Angle</option>
                      <option value="back">Back Angle</option>
                      <option value="side">Side Angle</option>
                      <option value="detail">Fabric Detail</option>
                      <option value="lifestyle">Lifestyle / Model</option>
                    </select>
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Image</span>
                    </button>
                  </div>
                </div>

                {/* Image Grid with Drag/Reorder/Delete & Primary Badge */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <div
                      key={img.id}
                      className={`relative group aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 border-2 transition-all ${
                        img.isPrimary ? 'border-slate-950 shadow-md ring-2 ring-slate-950/20' : 'border-slate-200'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.altText || `Angle ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                      />

                      {/* Primary tag */}
                      {img.isPrimary ? (
                        <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold uppercase bg-slate-950 text-white rounded shadow-xs">
                          Primary Cover
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetPrimaryImage(img.id)}
                          className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold uppercase bg-white/90 hover:bg-white text-slate-800 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Make Primary
                        </button>
                      )}

                      {/* Angle tag */}
                      <span className="absolute bottom-2 left-2 px-1.5 py-0.5 text-[9px] font-medium bg-black/60 text-white rounded">
                        {img.angle || 'angle'}
                      </span>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img.id)}
                        className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-md shadow-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700"
                        title="Delete Image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: COLORS & SIZES */}
            {activeTab === 'variants' && (
              <div className="space-y-6">
                {/* Colors Manager */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Product Colors
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="text"
                      value={newColorName}
                      onChange={(e) => setNewColorName(e.target.value)}
                      placeholder="Color Name (e.g. Navy Blue)"
                      className="px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg flex-1 min-w-[140px]"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={newColorHex}
                        onChange={(e) => setNewColorHex(e.target.value)}
                        className="w-9 h-9 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white"
                      />
                      <span className="text-xs font-mono text-slate-500">{newColorHex}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddColor}
                      className="px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Color</span>
                    </button>
                  </div>

                  {/* List of current colors */}
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {colors.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs text-xs"
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="font-semibold text-slate-800">{c.name}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteColor(c.id)}
                          className="text-slate-400 hover:text-rose-600 ml-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Size Availability */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Available Sizes Matrix
                    </h4>
                    <span className="text-[11px] text-slate-500">Toggle stock availability</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {sizes.map((s) => (
                      <button
                        key={s.size}
                        type="button"
                        onClick={() => handleToggleSize(s.size)}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                          s.available
                            ? 'bg-white border-emerald-300 text-emerald-950 shadow-xs'
                            : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'
                        }`}
                      >
                        <span className="text-sm font-bold">{s.size}</span>
                        <span className="text-[10px] font-semibold">
                          {s.available ? '✓ In Stock' : 'Out of Stock'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SPECIFICATIONS & CARE */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Fit Type
                    </label>
                    <input
                      type="text"
                      value={fit}
                      onChange={(e) => setFit(e.target.value)}
                      placeholder="e.g. Oversized, Regular Fit"
                      className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Fabric Composition
                    </label>
                    <input
                      type="text"
                      value={fabric}
                      onChange={(e) => setFabric(e.target.value)}
                      placeholder="e.g. 100% Combed Cotton"
                      className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Fabric Weight / GSM
                    </label>
                    <input
                      type="text"
                      value={gsm}
                      onChange={(e) => setGsm(e.target.value)}
                      placeholder="e.g. 220 GSM"
                      className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Sleeve / Length
                    </label>
                    <input
                      type="text"
                      value={category === 'tshirts' ? sleeve : length}
                      onChange={(e) => (category === 'tshirts' ? setSleeve(e.target.value) : setLength(e.target.value))}
                      placeholder={category === 'tshirts' ? 'Half Sleeve' : 'Above Knee (7")'}
                      className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Neckline
                    </label>
                    <input
                      type="text"
                      value={neck}
                      onChange={(e) => setNeck(e.target.value)}
                      placeholder="Round Neck, Polo Placket"
                      className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Occasion
                    </label>
                    <input
                      type="text"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      placeholder="Casual / Active Sport"
                      className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                {/* Wash & Care List */}
                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Wash & Care Instructions
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newCareItem}
                      onChange={(e) => setNewCareItem(e.target.value)}
                      placeholder="Add care instruction..."
                      className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleAddCare}
                      className="px-3.5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {careInstructions.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <span>• {item}</span>
                        <button
                          type="button"
                          onClick={() => setCareInstructions((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 5: VISIBILITY, BADGES & SEO */}
            {activeTab === 'seo' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Publication Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                    >
                      <option value="active">Active (Visible)</option>
                      <option value="hidden">Hidden (Unpublished)</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Product Badge
                    </label>
                    <select
                      value={badge || ''}
                      onChange={(e) => setBadge((e.target.value || undefined) as any)}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg"
                    >
                      <option value="">None</option>
                      <option value="New">New</option>
                      <option value="Featured">Featured</option>
                      <option value="Bestseller">Bestseller</option>
                      <option value="Limited">Limited</option>
                      <option value="Sale">Sale</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4 pt-6">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="rounded border-slate-300 text-slate-900"
                      />
                      <span>Featured Pick</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newArrival}
                        onChange={(e) => setNewArrival(e.target.checked)}
                        className="rounded border-slate-300 text-slate-900"
                      />
                      <span>New Arrival</span>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    SEO Metadata
                  </h4>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="Product SEO Title for Google"
                      className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      rows={2}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="Meta description for search previews..."
                      className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                Cancel
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setStatus('draft');
                    handleFormSubmit({ preventDefault: () => {} } as any);
                  }}
                  className="px-4 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                >
                  {productToEdit ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
