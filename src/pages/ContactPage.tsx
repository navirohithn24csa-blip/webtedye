import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, MapPin, Clock, MessageCircle, User, Sparkles, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings } = useStore();

  const contacts = [
    {
      name: 'UDHAYA DHARSAN',
      role: 'Operations & Customer Inquiries',
      phone: '+91 90877 04111',
      cleanPhone: '919087704111',
      whatsapp: '+91 90877 04111',
      email: undefined,
      badge: 'Manufacturing & Operations Lead',
      initials: 'UD',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      color: 'bg-[#171717]',
    },
    {
      name: 'BALA SRI',
      role: 'Sales & Bulk Inquiries',
      phone: '+91 90877 04111',
      cleanPhone: '919087704111',
      whatsapp: '+91 90877 04111',
      email: 'balasri3333@gmail.com',
      badge: 'Wholesale & Client Relations Lead',
      initials: 'BS',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      color: 'bg-[#171717]',
    },
  ];

  return (
    <div className="bg-transparent min-h-screen text-slate-900 pb-20">
      {/* 1. Header (Open Layout) */}
      <div className="pt-8 pb-8 sm:pt-12 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>DIRECT ENQUIRY DESK</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-black text-slate-900 uppercase tracking-tight">
              Contact & Enquiries
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Choose your enquiry type below or connect directly with our representatives for immediate WhatsApp assistance, wholesale catalogues, or custom sampling.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-16 lg:space-y-24">
        
        {/* 2. Three Dedicated Quick Enquiry Option Cards */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              // CHOOSE YOUR ENQUIRY TYPE
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              Quick WhatsApp Enquiry Channels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Wholesale Enquiry */}
            <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                  Bulk & B2B
                </span>
                <h3 className="text-xl font-display font-black text-slate-900">
                  Wholesale Enquiry
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bulk tier pricing, low MOQ catalog supply, and ready stock distribution for retailers.
                </p>
              </div>
              <a
                href={`https://wa.me/919087704111?text=${encodeURIComponent(
                  'Hello Bala Sri, I am reaching out for Wholesale / Bulk orders for SD TRENDYZ. Please share catalog and pricing.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Enquire Wholesale</span>
              </a>
            </div>

            {/* Retail Enquiry */}
            <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                  Single Pieces
                </span>
                <h3 className="text-xl font-display font-black text-slate-900">
                  Retail & Sizing Help
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct assistance for single piece orders, size recommendations, and order tracking.
                </p>
              </div>
              <a
                href={`https://wa.me/919087704111?text=${encodeURIComponent(
                  'Hello Udhaya Dharsan, I would like assistance with a Retail order / sizing for SD TRENDYZ.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire Retail</span>
              </a>
            </div>

            {/* Custom Orders Enquiry */}
            <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 uppercase">
                  Custom & Sampling
                </span>
                <h3 className="text-xl font-display font-black text-slate-900">
                  Custom Orders Desk
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Custom GSM knitting (180–320 GSM), pantone tie-dye, printing, and private brand tagging.
                </p>
              </div>
              <a
                href={`https://wa.me/919087704111?text=${encodeURIComponent(
                  'Hello SD TRENDYZ, I would like to discuss a Custom Order (Custom GSM / Dyeing / Printing).'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-amber-400" />
                <span>Start Custom Order</span>
              </a>
            </div>
          </div>
        </section>

        {/* 3. Direct Representative Profile Cards */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
              // WORKSHOP REPRESENTATIVES
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              Direct Contact Person Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contacts.map((contact) => {
              const whatsappLink = `https://wa.me/${contact.cleanPhone}?text=${encodeURIComponent(
                `Hello ${contact.name}, I am reaching out regarding SD TRENDYZ product catalogue and enquiries.`
              )}`;

              return (
                <div
                  key={contact.name}
                  className="rounded-3xl bg-white/95 backdrop-blur-md p-7 sm:p-9 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6 text-slate-900"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs shrink-0 bg-slate-100">
                          {contact.image ? (
                            <img
                              src={contact.image}
                              alt={contact.name}
                              className="w-full h-full object-cover object-center"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-display font-black text-lg text-slate-900">
                              {contact.initials}
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
                            {contact.badge}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight uppercase">
                            {contact.name}
                          </h3>
                          <p className="text-xs font-semibold text-slate-600">
                            {contact.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info List */}
                    <div className="space-y-3.5 text-xs sm:text-sm">
                      {/* Phone */}
                      <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-900 shadow-2xs">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                              Phone Number
                            </p>
                            <p className="font-bold text-slate-900">{contact.phone}</p>
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp */}
                      <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-2xs">
                            <MessageCircle className="w-4 h-4 fill-current" />
                          </div>
                          <div>
                            <p className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                              WhatsApp
                            </p>
                            <p className="font-bold text-emerald-950">{contact.whatsapp}</p>
                          </div>
                        </div>
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider flex items-center gap-1"
                        >
                          <span>Chat</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {/* Email */}
                      {contact.email && (
                        <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-900 shadow-2xs">
                              <Mail className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                                Email Address
                              </p>
                              <p className="font-bold text-slate-900 break-all">{contact.email}</p>
                            </div>
                          </div>
                          <a
                            href={`mailto:${contact.email}`}
                            className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider"
                          >
                            Email
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Primary Action Button */}
                  <div className="pt-2">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Physical Workshop Location & Map Section */}
        <section className="rounded-3xl bg-white/95 backdrop-blur-md p-7 sm:p-10 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-slate-900">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
                // WORKSHOP LOCATION
              </span>
              <h2 className="text-2xl font-display font-black text-slate-900 uppercase tracking-tight mt-1">
                Office & Manufacturing Unit
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Visit our office for direct catalogue viewing, fabric sample inspections, and order pickups.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Address</p>
                  <p className="text-slate-600 leading-relaxed mt-0.5">
                    {settings.contact.address || '12/152, Erappanaickanpalayam, Mylambadi, Bhavani, Tamil Nadu - 638314'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Working Hours</p>
                  <p className="text-slate-600 mt-0.5">
                    {settings.contact.businessHours || 'Monday – Saturday: 10:00 AM – 8:00 PM IST'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Official Email</p>
                  <a
                    href="mailto:balasri3333@gmail.com"
                    className="text-slate-900 hover:underline font-semibold mt-0.5 inline-block"
                  >
                    balasri3333@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xs border border-slate-200 h-72 sm:h-80 bg-slate-100">
              <iframe
                title="SD TRENDYZ Location"
                src={
                  settings.contact.mapEmbedUrl ||
                  'https://maps.google.com/maps?q=12%2F152+Erappanaickanpalayam,+Mylambadi,+Bhavani,+Tamil Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed'
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
