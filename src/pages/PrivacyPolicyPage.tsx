import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useStore } from '../context/StoreContext';
import { Shield } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="space-y-2 border-b border-slate-100 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          <Shield className="w-4 h-4 text-slate-900" />
          <span>Privacy & Data Protection</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-slate-950">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Overview</h2>
          <p>
            Welcome to {settings.brandName}. This website operates as a fashion product catalogue and direct business enquiry showcase. We respect your privacy and are committed to protecting the personal information you share when contacting us or making product enquiries.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Information We Collect</h2>
          <p>We only collect information voluntarily provided by visitors through our enquiry forms and direct communication channels:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Contact Details:</strong> Full name, phone/WhatsApp number, and optional email address.</li>
            <li><strong>Enquiry Details:</strong> Specific product codes, selected garment fits, sizes, colors, and your custom message.</li>
          </ul>
          <p className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-medium text-slate-700">
            Note: We do not process online transactions and therefore do not collect, process, or store credit/debit card numbers, UPI PINs, bank credentials, or payment data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. How Information Is Used</h2>
          <p>Information received is used solely for:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Responding to your product enquiries and checking real-time stock availability.</li>
            <li>Providing sizing advice, fabric details, and bulk order assistance.</li>
            <li>Communicating via phone or WhatsApp as requested.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Browser Local Storage & Cookies</h2>
          <p>
            Our website uses browser local storage strictly for functional, client-side preferences such as keeping track of your "Recently Viewed" products during your browsing session. We do not use third-party tracking pixels to sell your browsing habits.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Data Protection & Contact</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request removal of your enquiry details from our records, please reach out to us:
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs text-slate-700">
            <p><strong>Business Name:</strong> {settings.brandName}</p>
            <p><strong>Email:</strong> {settings.contact.email}</p>
            <p><strong>Phone:</strong> {settings.contact.phone}</p>
            <p><strong>Address:</strong> {settings.contact.address}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
