import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Enquiry } from '../../types';
import {
  MessageSquareText,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Trash2,
  X,
  Send,
  ExternalLink
} from 'lucide-react';

export const AdminEnquiries: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry, settings } = useStore();

  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchSearch =
        e.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.phone.includes(searchTerm) ||
        (e.productName && e.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.productCode && e.productCode.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchStatus = statusFilter === 'all' || e.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [enquiries, searchTerm, statusFilter]);

  const handleStatusChange = (id: string, newStatus: 'new' | 'contacted' | 'completed') => {
    updateEnquiryStatus(id, newStatus);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Customer Enquiries Hub</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review sizing queries, product availability requests, and bulk catalogue messages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-full border border-rose-200">
            {enquiries.filter((e) => e.status === 'new').length} New Uncontacted
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer, phone, or product code..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['all', 'new', 'contacted', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st as any)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors capitalize ${
                statusFilter === st
                  ? 'bg-slate-950 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Phone / WhatsApp</th>
                  <th className="py-3.5 px-4">Product Interest</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredEnquiries.map((enquiry) => {
                  const cleanPhone = enquiry.phone.replace(/[^0-9]/g, '');
                  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${enquiry.customerName}, this is ${settings.brandName}. Regarding your enquiry for ${
                      enquiry.productName || 'our products'
                    }:`
                  )}`;

                  return (
                    <tr key={enquiry.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{enquiry.customerName}</p>
                        {enquiry.email && <p className="text-[11px] text-slate-400">{enquiry.email}</p>}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-700">{enquiry.phone}</td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="font-semibold text-slate-900 truncate">
                          {enquiry.productName || 'General Enquiry'}
                        </p>
                        <div className="flex gap-2 text-[11px] text-slate-500">
                          {enquiry.productCode && <span>Code: {enquiry.productCode}</span>}
                          {enquiry.selectedColor && <span>· {enquiry.selectedColor}</span>}
                          {enquiry.selectedSize && <span>· Size {enquiry.selectedSize}</span>}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusChange(enquiry.id, e.target.value as any)}
                          className={`text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full border cursor-pointer ${
                            enquiry.status === 'new'
                              ? 'bg-rose-100 text-rose-800 border-rose-200'
                              : enquiry.status === 'contacted'
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          <option value="new">● New</option>
                          <option value="contacted">● Contacted</option>
                          <option value="completed">● Completed</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(enquiry)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-md"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteEnquiry(enquiry.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                            title="Delete"
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
          <div className="p-12 text-center text-slate-500 space-y-2">
            <p className="text-sm font-semibold">No enquiries found.</p>
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setSelectedEnquiry(null)} />
          <div className="min-h-screen px-4 text-center flex items-center justify-center py-6">
            <div className="inline-block w-full max-w-lg bg-white rounded-2xl p-6 text-left shadow-2xl relative z-10 border border-slate-100 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Enquiry Details</h3>
                  <p className="text-xs text-slate-400">Received {new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => setSelectedEnquiry(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Customer Box */}
              <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer Name:</span>
                  <strong className="text-slate-900">{selectedEnquiry.customerName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone / WhatsApp:</span>
                  <strong className="text-slate-900 font-mono">{selectedEnquiry.phone}</strong>
                </div>
                {selectedEnquiry.email && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email:</span>
                    <strong className="text-slate-900">{selectedEnquiry.email}</strong>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Status:</span>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value as any)}
                    className="text-xs font-bold uppercase py-1 px-2 rounded-lg bg-white border border-slate-300"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Product Reference */}
              {selectedEnquiry.productName && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <p className="font-bold text-slate-900">{selectedEnquiry.productName}</p>
                  <p className="text-slate-500">
                    SKU: {selectedEnquiry.productCode || 'N/A'} · Color: {selectedEnquiry.selectedColor || 'N/A'} · Size: {selectedEnquiry.selectedSize || 'N/A'}
                  </p>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Customer Message:
                </label>
                <div className="p-3.5 bg-slate-100/70 rounded-xl text-xs text-slate-800 leading-relaxed">
                  {selectedEnquiry.message || 'No additional message provided.'}
                </div>
              </div>

              {/* Reply actions */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedEnquiry.customerName}, regarding your enquiry at ${settings.brandName}:`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Reply on WhatsApp</span>
                </a>
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="py-2.5 px-4 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
