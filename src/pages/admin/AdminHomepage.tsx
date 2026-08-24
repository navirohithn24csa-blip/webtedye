import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { HomepageConfig, LookbookItem } from '../../types';
import { Sliders, Save, CheckCircle2, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

export const AdminHomepage: React.FC = () => {
  const { homepageConfig, updateHomepageConfig } = useStore();

  const [heroHeadline, setHeroHeadline] = useState(homepageConfig.hero.headline);
  const [heroSubtext, setHeroSubtext] = useState(homepageConfig.hero.subtext);
  const [heroPrimaryBtnText, setHeroPrimaryBtnText] = useState(homepageConfig.hero.primaryButtonText);
  const [heroPrimaryBtnLink, setHeroPrimaryBtnLink] = useState(homepageConfig.hero.primaryButtonLink);
  const [heroSecondaryBtnText, setHeroSecondaryBtnText] = useState(homepageConfig.hero.secondaryButtonText);
  const [heroSecondaryBtnLink, setHeroSecondaryBtnLink] = useState(homepageConfig.hero.secondaryButtonLink);
  const [heroBgImage, setHeroBgImage] = useState(homepageConfig.hero.backgroundImage);

  // New Collection Banner
  const [bannerHeadline, setBannerHeadline] = useState(homepageConfig.newCollectionBanner.headline);
  const [bannerSubtext, setBannerSubtext] = useState(homepageConfig.newCollectionBanner.subtext);
  const [bannerBtnText, setBannerBtnText] = useState(homepageConfig.newCollectionBanner.buttonText);
  const [bannerBtnLink, setBannerBtnLink] = useState(homepageConfig.newCollectionBanner.buttonLink);
  const [bannerImageUrl, setBannerImageUrl] = useState(homepageConfig.newCollectionBanner.imageUrl);

  // Lookbook items
  const [lookbook, setLookbook] = useState<LookbookItem[]>(homepageConfig.lookbook || []);

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateHomepageConfig({
      hero: {
        headline: heroHeadline,
        subtext: heroSubtext,
        primaryButtonText: heroPrimaryBtnText,
        primaryButtonLink: heroPrimaryBtnLink,
        secondaryButtonText: heroSecondaryBtnText,
        secondaryButtonLink: heroSecondaryBtnLink,
        backgroundImage: heroBgImage
      },
      newCollectionBanner: {
        headline: bannerHeadline,
        subtext: bannerSubtext,
        buttonText: bannerBtnText,
        buttonLink: bannerBtnLink,
        imageUrl: bannerImageUrl
      },
      lookbook
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddLookbookItem = () => {
    const newItem: LookbookItem = {
      id: `lb-${Date.now()}`,
      title: 'New Editorial Look',
      subtitle: 'Modern Fit',
      combination: 'Oversized Tee + Cotton Shorts',
      imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      categoryLink: '/collections'
    };
    setLookbook([...lookbook, newItem]);
  };

  const handleUpdateLookbookItem = (id: string, fields: Partial<LookbookItem>) => {
    setLookbook(lookbook.map((item) => (item.id === id ? { ...item, ...fields } : item)));
  };

  const handleDeleteLookbookItem = (id: string) => {
    setLookbook(lookbook.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Homepage Content CMS</h1>
          <p className="text-xs text-slate-500 mt-1">
            Customize hero banners, headlines, promotional sections, and editorial lookbooks.
          </p>
        </div>
        {isSaved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Changes Saved Live!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Hero Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            1. Hero Showcase Banner
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Headline *
              </label>
              <input
                type="text"
                required
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Subtext / Description *
              </label>
              <textarea
                rows={2}
                value={heroSubtext}
                onChange={(e) => setHeroSubtext(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Hero Background Image URL
              </label>
              <input
                type="url"
                value={heroBgImage}
                onChange={(e) => setHeroBgImage(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Button Text & Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={heroPrimaryBtnText}
                    onChange={(e) => setHeroPrimaryBtnText(e.target.value)}
                    className="w-1/2 px-3 py-1.5 text-xs border rounded-lg"
                    placeholder="Explore T-Shirts"
                  />
                  <input
                    type="text"
                    value={heroPrimaryBtnLink}
                    onChange={(e) => setHeroPrimaryBtnLink(e.target.value)}
                    className="w-1/2 px-3 py-1.5 text-xs border rounded-lg font-mono"
                    placeholder="/tshirts"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secondary Button Text & Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={heroSecondaryBtnText}
                    onChange={(e) => setHeroSecondaryBtnText(e.target.value)}
                    className="w-1/2 px-3 py-1.5 text-xs border rounded-lg"
                    placeholder="Explore Shorts"
                  />
                  <input
                    type="text"
                    value={heroSecondaryBtnLink}
                    onChange={(e) => setHeroSecondaryBtnLink(e.target.value)}
                    className="w-1/2 px-3 py-1.5 text-xs border rounded-lg font-mono"
                    placeholder="/shorts"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: New Collection Promotional Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            2. Mid-Page Collection Banner
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Banner Headline
              </label>
              <input
                type="text"
                value={bannerHeadline}
                onChange={(e) => setBannerHeadline(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Banner Subtext
              </label>
              <textarea
                rows={2}
                value={bannerSubtext}
                onChange={(e) => setBannerSubtext(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={bannerImageUrl}
                  onChange={(e) => setBannerImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Button Text & Target Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={bannerBtnText}
                    onChange={(e) => setBannerBtnText(e.target.value)}
                    className="w-1/2 px-3 py-1.5 text-xs border rounded-lg"
                  />
                  <input
                    type="text"
                    value={bannerBtnLink}
                    onChange={(e) => setBannerBtnLink(e.target.value)}
                    className="w-1/2 px-3 py-1.5 text-xs border rounded-lg font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Style Inspiration Lookbook Items */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              3. Style Inspiration Lookbook Pairs
            </h2>
            <button
              type="button"
              onClick={handleAddLookbookItem}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-slate-600"
            >
              <Plus className="w-4 h-4" />
              <span>Add Look</span>
            </button>
          </div>

          <div className="space-y-4">
            {lookbook.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
              >
                <div className="sm:col-span-3">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full aspect-[4/3] object-cover rounded-lg bg-slate-200"
                  />
                </div>

                <div className="sm:col-span-8 space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleUpdateLookbookItem(item.id, { title: e.target.value })}
                      placeholder="Title (e.g. Modern Streetwear Fit)"
                      className="px-2.5 py-1.5 bg-white border rounded-md"
                    />
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) => handleUpdateLookbookItem(item.id, { subtitle: e.target.value })}
                      placeholder="Subtitle (e.g. Relaxed & Effortless)"
                      className="px-2.5 py-1.5 bg-white border rounded-md"
                    />
                  </div>
                  <input
                    type="text"
                    value={item.combination}
                    onChange={(e) => handleUpdateLookbookItem(item.id, { combination: e.target.value })}
                    placeholder="Combination (e.g. Oversized Tee + Cotton Shorts)"
                    className="w-full px-2.5 py-1.5 bg-white border rounded-md"
                  />
                  <input
                    type="url"
                    value={item.imageUrl}
                    onChange={(e) => handleUpdateLookbookItem(item.id, { imageUrl: e.target.value })}
                    placeholder="Image URL"
                    className="w-full px-2.5 py-1.5 bg-white border rounded-md text-[11px]"
                  />
                </div>

                <div className="sm:col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => handleDeleteLookbookItem(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Homepage Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
