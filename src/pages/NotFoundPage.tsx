import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-block px-4 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-full">
          Error 404
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-950 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          The page you're looking for doesn't exist, has been removed, or has had its name changed.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <Link
            to="/tshirts"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>View Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
