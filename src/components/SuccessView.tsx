import React from 'react';
import { GoogleFormFooter } from './GoogleFormFooter';

interface Props {
  formTitle: string;
  onReset: () => void;
  onAdminClick: () => void;
}

export const SuccessView: React.FC<Props> = ({ formTitle, onReset, onAdminClick }) => {
  return (
    <div className="w-full min-h-screen bg-[#ede7f6] py-8 px-4 font-['Roboto',sans-serif] text-[#202124]">
      <div className="w-full max-w-[640px] mx-auto space-y-4">
        <div className="bg-white rounded-lg border border-[#dadce0] shadow-[0_1px_3px_0_rgba(60,64,67,0.15)] overflow-hidden">
          <div className="h-2.5 bg-[#673ab7] w-full" />
          <div className="p-6 sm:p-8 space-y-4">
            <h1 className="text-[28px] sm:text-[32px] font-normal leading-tight text-[#202124]">
              {formTitle}
            </h1>
            <p className="text-[14px] text-[#202124]">
              Your response has been recorded.
            </p>
            <div className="pt-2">
              <button
                type="button"
                id="submit-another-btn"
                onClick={onReset}
                className="text-[#1a73e8] hover:underline text-[14px] cursor-pointer"
              >
                Submit another response
              </button>
            </div>
          </div>
        </div>

        <GoogleFormFooter onAdminClick={onAdminClick} />
      </div>
    </div>
  );
};
