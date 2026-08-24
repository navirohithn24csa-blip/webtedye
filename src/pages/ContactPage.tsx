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
      phone: '+91 97877 04111',
      cleanPhone: '919787704111',
      whatsapp: '+91 97877 04111',
      email: undefined,
      badge: 'Direct Representative',
      initials: 'UD',
      color: 'bg-[#171717]',
    },
    {
      name: 'BALA SRI',
      role: 'Sales & Bulk Inquiries',
      phone: '+91 90877 04111',
      cleanPhone: '919087704111',
      whatsapp: '+91 90877 04111',
      email: 'balasri3333@gmail.com',
      badge: 'Sales & Inquiries',
      initials: 'BS',
      color: 'bg-[#171717]',
    },
  ];

  return (
    <div className="bg-[#F7F5F2] min-h-screen text-[#171717] pb-20">
      {/* Header Banner */}
      <div className="bg-[#EDE7DF] border-b border-[#E3DDD5] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF]/80 border border-[#E6E3DF] text-[#171717] text-[11px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Direct Channels</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-[#171717] uppercase tracking-tight">
            Contact SD TRENDYZ
          </h1>
          <p className="text-xs sm:text-base text-[#555555] max-w-2xl leading-relaxed">
            Reach out directly to our team representatives for product enquiries, fabric sampling, bulk catalog details, and order assistance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Two Contact Sections / Representative Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contacts.map((contact) => {
            const whatsappLink = `https://wa.me/${contact.cleanPhone}?text=${encodeURIComponent(
              `Hello ${contact.name}, I am reaching out regarding SD TRENDYZ product catalogue and enquiries.`
            )}`;

            return (
              <div
                key={contact.name}
                className="bg-[#FFFFFF] rounded-3xl p-7 sm:p-9 border border-[#E6E3DF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                {/* Header Profile */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-[#F4F2EF]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-13 h-13 rounded-2xl bg-[#171717] text-white flex items-center justify-center font-display font-black text-lg shadow-xs">
                        {contact.initials}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#737373]">
                          {contact.badge}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-display font-black text-[#171717] tracking-tight uppercase">
                          {contact.name}
                        </h2>
                        <p className="text-xs font-semibold text-[#555555]">
                          {contact.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info List */}
                  <div className="space-y-3.5 text-xs sm:text-sm">
                    {/* Phone Number */}
                    <div className="flex items-center justify-between p-3.5 bg-[#F7F5F2] rounded-2xl border border-[#EAE8E4]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#FFFFFF] flex items-center justify-center text-[#171717] shadow-2xs">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                            Phone Number
                          </p>
                          <p className="font-bold text-[#171717]">{contact.phone}</p>
                        </div>
                      </div>
                      <a
                        href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                        className="px-3.5 py-1.5 bg-[#171717] hover:bg-black text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider"
                      >
                        Call
                      </a>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center justify-between p-3.5 bg-[#F0FDF4] rounded-2xl border border-[#DCFCE7]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#FFFFFF] flex items-center justify-center text-emerald-600 shadow-2xs">
                          <MessageCircle className="w-4 h-4 fill-current" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                            WhatsApp
                          </p>
                          <p className="font-bold text-emerald-950">{contact.whatsapp}</p>
                        </div>
                      </div>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider flex items-center gap-1"
                      >
                        <span>Chat</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Email if available */}
                    {contact.email && (
                      <div className="flex items-center justify-between p-3.5 bg-[#F7F5F2] rounded-2xl border border-[#EAE8E4]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#FFFFFF] flex items-center justify-center text-[#171717] shadow-2xs">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">
                              Email Address
                            </p>
                            <p className="font-bold text-[#171717] break-all">{contact.email}</p>
                          </div>
                        </div>
                        <a
                          href={`mailto:${contact.email}`}
                          className="px-3.5 py-1.5 bg-[#171717] hover:bg-black text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-wider"
                        >
                          Email
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-2 py-3 bg-[#171717] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </section>

        {/* Business Office Details & Map Section */}
        <section className="bg-[#FFFFFF] rounded-3xl p-7 sm:p-10 border border-[#E6E3DF] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#737373]">
                Physical Location
              </span>
              <h2 className="text-2xl font-display font-black text-[#171717] uppercase tracking-tight mt-1">
                Office & Manufacturing Unit
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] mt-1 leading-relaxed">
                Visit our office for direct catalogue viewing, fabric sample inspections, and order pickups.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#EDE7DF] text-[#171717] flex items-center justify-center shrink-0 mt-0.5 border border-[#D5CEC4]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#171717]">Address</p>
                  <p className="text-[#555555] leading-relaxed mt-0.5">
                    {settings.contact.address || '12/152, Erappanaickanpalayam, Mylambadi, Bhavani, Tamil Nadu - 638314'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#EDE7DF] text-[#171717] flex items-center justify-center shrink-0 mt-0.5 border border-[#D5CEC4]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#171717]">Working Hours</p>
                  <p className="text-[#555555] mt-0.5">
                    {settings.contact.businessHours || 'Monday – Saturday: 10:00 AM – 8:00 PM IST'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#EDE7DF] text-[#171717] flex items-center justify-center shrink-0 mt-0.5 border border-[#D5CEC4]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#171717]">Official Email</p>
                  <a
                    href="mailto:balasri3333@gmail.com"
                    className="text-[#555555] hover:text-black font-semibold mt-0.5 inline-block"
                  >
                    balasri3333@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xs border border-[#E6E3DF] h-72 sm:h-80 bg-[#EDE7DF]">
              <iframe
                title="SD TRENDYZ Location"
                src={
                  settings.contact.mapEmbedUrl ||
                  'https://maps.google.com/maps?q=12%2F152+Erappanaickanpalayam,+Mylambadi,+Bhavani,+Tamil+Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed'
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
