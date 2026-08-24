import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import {
  Plus,
  Search,
  SlidersHorizontal,
  Edit,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const [searchParams] = useSearchParams();
  const {
    products,
    deleteProduct,
    duplicateProduct,
    toggleProductVisibility
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'tshirts' | 'shorts'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'hidden' | 'draft'>('all');
  const [sortBy, setSortBy] = useState<'updated' | 'name' | 'price-asc' | 'price-desc'>('updated');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(searchParams.get('action') === 'new');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Delete Confirmation modal
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
        const matchesStat = statusFilter === 'all' || p.status === statusFilter;

        return matchesSearch && matchesCat && matchesStat;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'price-asc') return a.sellingPrice - b.sellingPrice;
        if (sortBy === 'price-desc') return b.sellingPrice - a.sellingPrice;
        return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime();
      });
  }, [products, searchTerm, categoryFilter, statusFilter, sortBy]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDuplicate = (id: string) => {
    duplicateProduct(id);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Products Catalog</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your fashion catalog, pricing, swatches, images, and live visibility.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingProduct(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, SKU, fit..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-900"
          >
            <option value="all">All Categories</option>
            <option value="tshirts">T-Shirts Only</option>
            <option value="shorts">Shorts Only</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-900"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active (Visible)</option>
            <option value="hidden">Hidden</option>
            <option value="draft">Draft</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-900"
          >
            <option value="updated">Sort: Recently Updated</option>
            <option value="name">Sort: Name (A-Z)</option>
            <option value="price-asc">Sort: Price (Low to High)</option>
            <option value="price-desc">Sort: Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Item</th>
                  <th className="py-3.5 px-4">SKU / Code</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Colors & Sizes</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredProducts.map((product) => {
                  const primaryImg = product.images[0]?.url;
                  return (
                    <tr key={product.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Product Image & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={primaryImg}
                            alt={product.name}
                            className="w-12 h-14 object-cover rounded-lg bg-slate-100 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900 text-xs">{product.name}</p>
                            <p className="text-[11px] text-slate-400 font-normal">
                              {product.subcategory || product.category}
                            </p>
                            {product.badge && (
                              <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-slate-900 text-white">
                                {product.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3.5 px-4 font-mono text-slate-600 font-semibold">{product.sku}</td>

                      {/* Category */}
                      <td className="py-3.5 px-4 capitalize text-slate-700">{product.category}</td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900">₹{product.sellingPrice}</span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through ml-1.5">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </td>

                      {/* Colors & Sizes preview */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 mb-1">
                          {product.colors.map((c) => (
                            <span
                              key={c.id}
                              title={c.name}
                              className="w-3 h-3 rounded-full border border-slate-300"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {product.sizes.filter((s) => s.available).map((s) => s.size).join(', ')}
                        </span>
                      </td>

                      {/* Status Toggle */}
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => toggleProductVisibility(product.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                            product.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : product.status === 'hidden'
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title="Click to toggle active/hidden"
                        >
                          {product.status === 'active' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{product.status}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            to={`/product/${product.slug}`}
                            target="_blank"
                            className="p-1.5 text-slate-400 hover:text-slate-900 rounded hover:bg-slate-100"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleEdit(product)}
                            className="p-1.5 text-slate-600 hover:text-slate-950 rounded hover:bg-slate-100"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicate(product.id)}
                            className="p-1.5 text-slate-600 hover:text-slate-950 rounded hover:bg-slate-100"
                            title="Duplicate as Draft"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setProductToDelete(product)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <p className="text-sm font-semibold">No products found matching your filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setStatusFilter('all');
              }}
              className="text-xs text-slate-900 underline font-medium"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Form Modal (Add / Edit) */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        productToEdit={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setProductToDelete(null)}
          />
          <div className="min-h-screen px-4 text-center flex items-center justify-center py-6">
            <div className="inline-block w-full max-w-md bg-white rounded-2xl p-6 text-left shadow-2xl relative z-10 border border-slate-100 space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Delete this product?</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Are you sure you want to delete <strong>{productToDelete.name}</strong> ({productToDelete.sku})? This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProductToDelete(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
