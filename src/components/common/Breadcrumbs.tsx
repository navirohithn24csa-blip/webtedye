import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-xs text-slate-400 py-3 mb-4 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1.5 md:space-x-2">
        <li className="inline-flex items-center">
          <Link to="/" className="text-slate-400 hover:text-cyan-300 inline-flex items-center transition-colors">
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 mx-1 shrink-0" />
              {isLast || !item.link ? (
                <span className="font-medium text-white truncate max-w-[200px] md:max-w-xs">{item.label}</span>
              ) : (
                <Link to={item.link} className="text-slate-400 hover:text-cyan-300 transition-colors truncate max-w-[150px]">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
