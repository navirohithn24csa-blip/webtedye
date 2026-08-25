import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { WebsiteSettings } from '../../types';
import {
  Settings,
  Save,
  CheckCircle2,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  AlertTriangle
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const {
    settings,
    updateSettings,
    exportDatabaseJson,
    importDatabaseJson,
    resetToDefaults
  } = useStore();

  const [formData, setFormData] = useState<WebsiteSettings>(settings);
  const [isSaved, setIsSaved] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleExport = () => {
    const jsonStr = exportDatabaseJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `catalog-database-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!jsonInput.trim()) return;
    const success = importDatabaseJson(jsonInput);
    if (success) {
      setImportStatus('success');
      setJsonInput('');
      setTimeout(() => setImportStatus('idle'), 3000);
    } else {
      setImportStatus('error');
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Website & Contact Settings</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure brand placeholders, WhatsApp channel numbers, business details, and announcement bar.
          </p>
        </div>
        {isSaved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Brand Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            1. Brand Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Brand Name *
              </label>
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Tagline / Subheading
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Top Announcement Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              2. Top Announcement Bar
            </h2>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.announcement.enabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    announcement: { ...formData.announcement, enabled: e.target.checked }
                  })
                }
                className="rounded border-slate-300 text-slate-900 w-4 h-4"
              />
              <span>Enable Announcement Bar</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Announcement Message
            </label>
            <input
              type="text"
              value={formData.announcement.text}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  announcement: { ...formData.announcement, text: e.target.value }
                })
              }
              placeholder="e.g. Explore Our Latest Collection • New Heavyweight Tees Available Now"
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
            />
          </div>
        </div>

        {/* Contact Channels */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            3. Contact Channels & WhatsApp
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                WhatsApp Phone Number *
              </label>
              <input
                type="text"
                required
                value={formData.contact.whatsappNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, whatsappNumber: e.target.value }
                  })
                }
                placeholder="+91 90877 04111"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">Used for customer WhatsApp enquiries</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Primary Phone Number
              </label>
              <input
                type="text"
                value={formData.contact.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, phone: e.target.value }
                  })
                }
                placeholder="+91 90877 04111"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Secondary Phone Number
              </label>
              <input
                type="text"
                value={formData.contact.secondaryPhone || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, secondaryPhone: e.target.value }
                  })
                }
                placeholder="+91 90877 04111"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Business Email Address
              </label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, email: e.target.value }
                  })
                }
                placeholder="hello@yourbrand.com"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Business Hours
              </label>
              <input
                type="text"
                value={formData.contact.businessHours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, businessHours: e.target.value }
                  })
                }
                placeholder="Mon - Sat: 10:00 AM - 8:00 PM"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Physical Business Address
            </label>
            <input
              type="text"
              value={formData.contact.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, address: e.target.value }
                })
              }
              placeholder="Plot 42, Fashion Hub Avenue, Bengaluru, Karnataka"
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Embedded Google Maps Iframe URL
            </label>
            <input
              type="text"
              value={formData.contact.mapEmbedUrl || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, mapEmbedUrl: e.target.value }
                })
              }
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            4. Social Media Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.socials.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, instagram: e.target.value }
                  })
                }
                placeholder="https://instagram.com/yourbrand"
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.socials.facebook}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, facebook: e.target.value }
                  })
                }
                placeholder="https://facebook.com/yourbrand"
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Link
              </label>
              <input
                type="url"
                value={formData.socials.whatsapp}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, whatsapp: e.target.value }
                  })
                }
                placeholder="https://wa.me/919876543210"
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Footer & Copyright */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            5. Footer & Copyright
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Footer Description
            </label>
            <textarea
              rows={2}
              value={formData.footerDescription}
              onChange={(e) => setFormData({ ...formData, footerDescription: e.target.value })}
              className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Copyright Notice
            </label>
            <input
              type="text"
              value={formData.copyrightText}
              onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Database Backup, Export & Reset Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          6. Catalog Data Backup, Export & Restore
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Export JSON */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Export Full Database Backup
            </h3>
            <p className="text-[11px] text-slate-500">
              Download a complete JSON snapshot of all products, categories, collections, and enquiries.
            </p>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          {/* Reset to Factory Defaults */}
          <div className="p-4 bg-rose-50/70 rounded-xl border border-rose-100 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900">
              Reset Catalog to Default
            </h3>
            <p className="text-[11px] text-rose-700">
              Restore initial seed catalog of 16+ products and default demo settings.
            </p>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all catalog data to defaults? Any custom products will be reverted.')) {
                  resetToDefaults();
                  alert('Catalog restored to default demo data.');
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>

        {/* Import JSON */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Import Database JSON Backup
          </h3>
          <textarea
            rows={3}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste exported JSON content here..."
            className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
          />
          {importStatus === 'success' && (
            <p className="text-xs font-semibold text-emerald-600">✓ Database imported successfully!</p>
          )}
          {importStatus === 'error' && (
            <p className="text-xs font-semibold text-rose-600">⚠ Invalid JSON structure.</p>
          )}
          <button
            type="button"
            onClick={handleImport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Restore from JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
};
