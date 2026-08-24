import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Shirt,
  FolderTree,
  Sparkles,
  MessageSquareText,
  Sliders,
  Settings,
  Globe,
  LogOut,
  Menu,
  X,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminLayout: React.FC = () => {
  const { isAdminAuthenticated, adminLogout, settings, enquiries } = useStore();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Products', path: '/admin/products', icon: Shirt },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Collections', path: '/admin/collections', icon: Sparkles },
    { label: 'Enquiries', path: '/admin/enquiries', icon: MessageSquareText, badge: newEnquiriesCount },
    { label: 'Homepage CMS', path: '/admin/homepage', icon: Sliders },
    { label: 'Settings & Backup', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Mobile Admin Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="p-1 text-slate-300 hover:text-white"
          >
            {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-display font-bold text-base tracking-tight uppercase">
            {settings.brandName || 'SD TRENDYZ'} <span className="text-slate-400 font-normal text-xs">Admin</span>
          </span>
        </div>

        <Link
          to="/"
          target="_blank"
          className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
          title="Open public website"
        >
          <Globe className="w-4 h-4" />
        </Link>
      </div>

      {/* Admin Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 bg-slate-950 text-slate-300 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Brand & Portal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="font-display font-bold text-white text-base tracking-tight uppercase">
                {settings.brandName || 'SD TRENDYZ'}
              </h2>
              <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Catalog Control Hub</span>
              </p>
            </div>
            <button
              onClick={() => setIsMobileNavOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-white text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-rose-600 text-white rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4" />
              <span>View Public Store</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin View Content */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
