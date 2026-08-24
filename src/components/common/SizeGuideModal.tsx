import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { ProductCategory } from '../../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: ProductCategory;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'tshirts'
}) => {
  const [activeTab, setActiveTab] = useState<ProductCategory>(defaultCategory);

  if (!isOpen) return null;

  const tshirtSizes = [
    { size: 'S', chest: '38 in / 96 cm', length: '27 in / 68 cm', shoulder: '17.5 in' },
    { size: 'M', chest: '40 in / 101 cm', length: '28 in / 71 cm', shoulder: '18.5 in' },
    { size: 'L', chest: '42 in / 106 cm', length: '29 in / 74 cm', shoulder: '19.5 in' },
    { size: 'XL', chest: '44 in / 112 cm', length: '30 in / 76 cm', shoulder: '20.5 in' },
    { size: 'XXL', chest: '46 in / 117 cm', length: '31 in / 79 cm', shoulder: '21.5 in' },
  ];

  const shortsSizes = [
    { size: 'S', waist: '28 - 30 in', length: '16.5 in', hip: '38 in', inseam: '6.5 in' },
    { size: 'M', waist: '31 - 33 in', length: '17.5 in', hip: '40 in', inseam: '7.0 in' },
    { size: 'L', waist: '34 - 36 in', length: '18.5 in', hip: '43 in', inseam: '7.5 in' },
    { size: 'XL', waist: '37 - 39 in', length: '19.5 in', hip: '46 in', inseam: '8.0 in' },
    { size: 'XXL', waist: '40 - 42 in', length: '20.5 in', hip: '49 in', inseam: '8.5 in' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-8">
        <div className="inline-block w-full max-w-2xl bg-white rounded-2xl text-left shadow-2xl transform transition-all relative z-10 overflow-hidden border border-slate-100">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-slate-800" />
              <h3 className="text-lg font-bold text-slate-900">Garment Size Guide</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex border-b border-slate-100 px-6 pt-4 bg-slate-50/50">
            <button
              type="button"
              onClick={() => setActiveTab('tshirts')}
              className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                activeTab === 'tshirts'
                  ? 'text-slate-950 border-b-2 border-slate-950'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              T-Shirts Sizing Chart
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shorts')}
              className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                activeTab === 'shorts'
                  ? 'text-slate-950 border-b-2 border-slate-950'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Shorts Sizing Chart
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="overflow-x-auto">
              {activeTab === 'tshirts' ? (
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4 border-b border-slate-200">Size</th>
                      <th className="py-3 px-4 border-b border-slate-200">Chest Around</th>
                      <th className="py-3 px-4 border-b border-slate-200">Garment Length</th>
                      <th className="py-3 px-4 border-b border-slate-200">Shoulder Width</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {tshirtSizes.map((row) => (
                      <tr key={row.size} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-950">{row.size}</td>
                        <td className="py-3 px-4">{row.chest}</td>
                        <td className="py-3 px-4">{row.length}</td>
                        <td className="py-3 px-4">{row.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4 border-b border-slate-200">Size</th>
                      <th className="py-3 px-4 border-b border-slate-200">Waist Range</th>
                      <th className="py-3 px-4 border-b border-slate-200">Outseam Length</th>
                      <th className="py-3 px-4 border-b border-slate-200">Hip Around</th>
                      <th className="py-3 px-4 border-b border-slate-200">Inseam</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {shortsSizes.map((row) => (
                      <tr key={row.size} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-950">{row.size}</td>
                        <td className="py-3 px-4">{row.waist}</td>
                        <td className="py-3 px-4">{row.length}</td>
                        <td className="py-3 px-4">{row.hip}</td>
                        <td className="py-3 px-4">{row.inseam}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* How to Measure Guidelines */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-2">
              <h4 className="font-semibold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-slate-700" />
                How to find your ideal fit:
              </h4>
              <ul className="list-disc list-inside space-y-1 pl-1 text-slate-500">
                <li>For oversized T-shirts, select your standard size for a relaxed drop-shoulder drape.</li>
                <li>For regular fit T-shirts, measure around the fullest part of your chest.</li>
                <li>Shorts feature an elastic drawcord waistband that accommodates waist flexibility.</li>
              </ul>
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
