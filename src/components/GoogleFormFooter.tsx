import React from 'react';
import { Edit3 } from 'lucide-react';

interface Props {
  onAdminClick?: () => void;
}

export const GoogleFormFooter: React.FC<Props> = ({ onAdminClick }) => {
  return (
    <div className="w-full max-w-[640px] mx-auto mt-6 mb-8 text-center">
      {/* Floating pencil icon (Quick link to admin panel) */}
      <button
        type="button"
        id="admin-pencil-btn"
        onClick={onAdminClick}
        title="Admin Panel / Edit Form"
        className="fixed bottom-5 left-5 w-12 h-12 rounded-full bg-white shadow-lg border border-[#dadce0] flex items-center justify-center text-[#673ab7] hover:bg-[#f8f9fa] hover:scale-105 active:scale-95 transition-all z-40 group"
      >
        <Edit3 className="w-5 h-5 text-[#673ab7]" />
        <span className="absolute left-14 bg-[#202124] text-white text-xs px-2.5 py-1 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-sans font-medium">
          Admin Dashboard
        </span>
      </button>
    </div>
  );
};
