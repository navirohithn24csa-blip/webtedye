import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Phone, User, Mail } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  selectedColor?: string;
  selectedSize?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  product,
  selectedColor = '',
  selectedSize = ''
}) => {
  const { addEnquiry, settings } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    product
      ? `Hello, I'm interested in the ${product.name} (${product.sku}), Color: ${selectedColor || 'Default'}, Size: ${
          selectedSize || 'Any'
        } priced at ₹${product.sellingPrice}. Please share availability and details.`
      : 'Hello, I have a query regarding your products.'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Please provide your name.');
      return;
    }

    if (!phone.trim() || phone.replace(/[^0-9]/g, '').length < 8) {
      setErrorMsg('Please enter a valid phone number with area code.');
      return;
    }

    setIsSubmitting(true);

    try {
      addEnquiry({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        productId: product?.id,
        productName: product?.name || 'General Product Enquiry',
        productCode: product?.sku,
        selectedColor: selectedColor || undefined,
        selectedSize: selectedSize || undefined,
        message: message.trim()
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('Failed to submit enquiry. Please try again or reach out on WhatsApp.');
    }
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={handleModalClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-8">
        <div className="inline-block w-full max-w-lg bg-white rounded-2xl text-left shadow-2xl transform transition-all relative z-10 overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Product Enquiry</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Send your enquiry directly to the {settings.brandName || 'SD TRENDYZ'} team
              </p>
            </div>
            <button
              onClick={handleModalClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success State */}
          {isSubmitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Enquiry Received!</h4>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Thanks! Your enquiry has been received. Our team will contact you shortly on {phone} with product availability and assistance.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Product Summary Preview */}
              {product && (
                <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-14 h-16 object-cover rounded-lg bg-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900 truncate">{product.name}</p>
                    <p className="text-[11px] text-slate-500">
                      Code: {product.sku} · ₹{product.sellingPrice}
                    </p>
                    <div className="flex gap-2 text-[11px] text-slate-600 mt-1">
                      {selectedColor && <span>Color: <strong className="text-slate-900">{selectedColor}</strong></span>}
                      {selectedSize && <span>· Size: <strong className="text-slate-900">{selectedSize}</strong></span>}
                    </div>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Form Inputs */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 XXXXX"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Message or Requirement
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify quantity, color preferences, custom questions..."
                    className="w-full p-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent leading-relaxed"
                  />
                </div>
              </div>

              {/* Notice */}
              <p className="text-[11px] text-slate-400 leading-normal">
                Note: This website is a fashion catalog showcase. Submitting this form sends an enquiry to the business team.
              </p>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
