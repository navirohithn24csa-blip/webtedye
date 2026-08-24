import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import {
  Shirt,
  Layers,
  Sparkles,
  MessageSquareText,
  Eye,
  EyeOff,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Phone,
  MessageCircle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { products, categories, collections, enquiries, settings } = useStore();

  const totalProducts = products.length;
  const tshirtsCount = products.filter((p) => p.category === 'tshirts').length;
  const shortsCount = products.filter((p) => p.category === 'shorts').length;
  const activeCount = products.filter((p) => p.status === 'active').length;
  const hiddenCount = products.filter((p) => p.status !== 'active').length;
  const newEnquiries = enquiries.filter((e) => e.status === 'new').length;

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime())
    .slice(0, 5);

  const recentEnquiriesList = [...enquiries].slice(0, 5);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">
            Catalog Overview & Control Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage active apparel products, image galleries, customer enquiries, and catalog settings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products?action=new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Items</p>
          <p className="text-2xl font-extrabold text-slate-950">{totalProducts}</p>
          <p className="text-[10px] text-slate-500">In entire database</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">T-Shirts</p>
          <p className="text-2xl font-extrabold text-slate-950">{tshirtsCount}</p>
          <p className="text-[10px] text-slate-500">Catalog items</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Shorts</p>
          <p className="text-2xl font-extrabold text-slate-950">{shortsCount}</p>
          <p className="text-[10px] text-slate-500">Catalog items</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Active Public</p>
          <p className="text-2xl font-extrabold text-slate-950">{activeCount}</p>
          <p className="text-[10px] text-slate-500">Visible on website</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Collections</p>
          <p className="text-2xl font-extrabold text-slate-950">{collections.length}</p>
          <p className="text-[10px] text-slate-500">Active ranges</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Enquiries</p>
          <p className="text-2xl font-extrabold text-slate-950">{enquiries.length}</p>
          <p className="text-[10px] text-rose-600 font-semibold">{newEnquiries} new uncontacted</p>
        </div>
      </div>

      {/* Two-Column Grid: Recent Enquiries + Recently Updated Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MessageSquareText className="w-5 h-5 text-slate-900" />
              <h2 className="text-base font-bold text-slate-900">Recent Customer Enquiries</h2>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs font-semibold text-slate-700 hover:text-slate-950 inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentEnquiriesList.length > 0 ? (
              recentEnquiriesList.map((enq) => {
                const cleanPhone = enq.phone.replace(/[^0-9]/g, '');
                const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Hello ${enq.customerName}, regarding your enquiry for ${enq.productName || 'our products'} at ${
                    settings.brandName
                  }:`
                )}`;

                return (
                  <div key={enq.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{enq.customerName}</span>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                            enq.status === 'new'
                              ? 'bg-rose-100 text-rose-800'
                              : enq.status === 'contacted'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 truncate max-w-md">
                        {enq.productName ? `${enq.productName} (${enq.selectedColor || ''} ${enq.selectedSize || ''})` : enq.message}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {enq.phone} {enq.email && `· ${enq.email}`} · {new Date(enq.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      <Link
                        to="/admin/enquiries"
                        className="p-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-semibold"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="py-8 text-center text-xs text-slate-400">No enquiries received yet.</p>
            )}
          </div>
        </div>

        {/* Recently Updated Products (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Shirt className="w-5 h-5 text-slate-900" />
              <h2 className="text-base font-bold text-slate-900">Recently Updated Items</h2>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-semibold text-slate-700 hover:text-slate-950 inline-flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentProducts.map((p) => (
              <div key={p.id} className="py-3 flex items-center gap-3">
                <img
                  src={p.images[0]?.url}
                  alt={p.name}
                  className="w-12 h-14 object-cover rounded-lg bg-slate-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{p.name}</h4>
                  <p className="text-[11px] text-slate-500">
                    {p.sku} · ₹{p.sellingPrice} · {p.category}
                  </p>
                  <span
                    className={`inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase rounded mt-1 ${
                      p.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <Link
                  to={`/product/${p.slug}`}
                  target="_blank"
                  className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-50"
                  title="View on site"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
