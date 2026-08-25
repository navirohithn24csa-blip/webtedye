import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useStore } from '../context/StoreContext';
import { FileText, AlertCircle } from 'lucide-react';

export const TermsConditionsPage: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 space-y-6">
      <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E3DF] shadow-sm space-y-8 text-[#171717]">
        <div className="space-y-2 border-b border-[#EAE8E4] pb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#737373]">
            <FileText className="w-4 h-4 text-[#171717]" />
            <span>Catalog & Showcase Terms</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-[#171717]">Terms & Conditions</h1>
          <p className="text-xs text-[#737373]">Effective Date: August 2026</p>
        </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-6 leading-relaxed">
        {/* Highlight Alert */}
        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold text-amber-950">Product Catalog & Showcase Notice</p>
            <p>
              This website serves as an informational digital fashion catalog with indicative pricing. No automated online checkout, order placements, or online payment collections occur on this website.
            </p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Product Information & Pricing</h2>
          <p>
            All garments, imagery, GSM specifications, fabric compositions, and prices displayed on {settings.brandName} are presented for informational and enquiry purposes. While we strive to maintain accurate product descriptions and pricing, prices and catalog listings may be revised periodically without prior notice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Enquiries Are Not Confirmed Orders</h2>
          <p>
            Submitting a form via "Enquire About This Product" or connecting through WhatsApp does not constitute a legally binding order or an automatic reservation of inventory. Final product availability, lead times, batch quantities, and fulfillment details are confirmed directly with our representative during communication.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Sizing & Fit Indications</h2>
          <p>
            Our Size Guide provides general body measurements and standard garment dimensions. Due to manual fabric cutting and knit characteristics (such as loopback cotton terry and elastane stretch), slight manufacturing tolerances of 0.5 to 1 inch may occur.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Intellectual Property</h2>
          <p>
            All brand trademarks, product photography, editorial lookbooks, styling combinations, and website design assets are the property of {settings.brandName}. Unauthorized reproduction or commercial use is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Contact Information</h2>
          <p>
            For any clarifications regarding these Terms & Conditions, please contact us at <strong>{settings.contact.email}</strong> or <strong>{settings.contact.phone}</strong>.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
};
