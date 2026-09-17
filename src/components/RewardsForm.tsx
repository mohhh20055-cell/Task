import React from 'react';
import { AppConfig, FormSubmission } from '../types';
import { GoogleFormFooter } from './GoogleFormFooter';
import { ExternalLink, Smartphone, Monitor, Apple } from 'lucide-react';

interface Props {
  config: AppConfig;
  onSubmit: (submission: FormSubmission) => void;
  onAdminClick: () => void;
}

export const RewardsForm: React.FC<Props> = ({ config, onSubmit, onAdminClick }) => {
  const handleOfferClick = (type: 'ios' | 'android' | 'pc', url: string) => {
    // Log submission/click
    const submission: FormSubmission = {
      id: Date.now().toString(),
      formType: 'rewards',
      date: new Date().toISOString(),
      data: {
        clickedOffer: `${type.toUpperCase()} User Offer: ${url}`,
      },
    };
    onSubmit(submission);

    // Open target url
    if (url && url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submission: FormSubmission = {
      id: Date.now().toString(),
      formType: 'rewards',
      date: new Date().toISOString(),
      data: {
        clickedOffer: 'Submit button clicked on Rewards form',
      },
    };
    onSubmit(submission);
  };

  return (
    <div className="w-full min-h-screen bg-[#ede7f6] py-4 px-2 sm:px-4 font-['Roboto',sans-serif] text-[#202124]">
      <div className="w-full max-w-[640px] mx-auto space-y-3">
        {/* Header Card */}
        <div className="bg-white rounded-lg border border-[#dadce0] shadow-[0_1px_3px_0_rgba(60,64,67,0.15)] overflow-hidden">
          {/* Top accent bar */}
          <div className="h-2.5 bg-[#673ab7] w-full" />

          <div className="p-4 sm:p-6 space-y-2">
            <h1 className="text-[28px] sm:text-[32px] font-normal leading-tight text-[#202124]">
              {config.rewardsForm.title}
            </h1>
          </div>
        </div>

        {/* Card 1: Main Offer Details and iPhone / iOS CTA */}
        <div className="bg-white rounded-lg border border-[#dadce0] shadow-[0_1px_3px_0_rgba(60,64,67,0.15)] p-5 sm:p-6 space-y-4 text-center">
          <div className="text-base sm:text-lg font-bold text-[#202124] tracking-wide">
            {config.rewardsForm.programTitle}
          </div>

          <div className="text-sm font-semibold text-[#c5221f]">
            {config.rewardsForm.importantReq}
          </div>

          <div className="text-sm text-[#3c4043] leading-relaxed">
            {config.rewardsForm.deviceInfo}
          </div>

          <div className="text-sm font-bold text-[#1a73e8]">
            {config.rewardsForm.howToClaimTitle}
          </div>

          <p className="text-sm text-[#3c4043] leading-relaxed text-left sm:text-center">
            {config.rewardsForm.instructions}
          </p>

          {/* iPhone / iOS Button / Link */}
          <div className="pt-3 pb-1">
            <button
              type="button"
              id="ios-offer-btn"
              onClick={() => handleOfferClick('ios', config.rewardsForm.iosUrl || 'https://example.com/ios-offer')}
              className="w-full py-3.5 px-4 rounded-lg bg-[#f8f9fa] border-2 border-[#1a73e8] hover:bg-[#e8f0fe] active:bg-[#d2e3fc] text-[#1a73e8] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm group cursor-pointer"
            >
              <Apple className="w-5 h-5 text-[#1a73e8] group-hover:scale-110 transition-transform" />
              <span>{config.rewardsForm.iosButtonText || '👉 CLICK HERE FOR IPHONE / IOS USERS 👈 📱'}</span>
              <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
            </button>
            <div className="text-[11px] text-[#70757a] mt-1.5 text-center truncate">
              {config.rewardsForm.iosUrl || 'https://example.com/ios-offer'}
            </div>
          </div>
        </div>

        {/* Card 2: Android CTA */}
        <div className="bg-white rounded-lg border border-[#dadce0] shadow-[0_1px_3px_0_rgba(60,64,67,0.15)] p-5 sm:p-6 text-center">
          <button
            type="button"
            id="android-offer-btn"
            onClick={() => handleOfferClick('android', config.rewardsForm.androidUrl)}
            className="w-full py-3.5 px-4 rounded-lg bg-[#f8f9fa] border-2 border-[#1a73e8] hover:bg-[#e8f0fe] active:bg-[#d2e3fc] text-[#1a73e8] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm group cursor-pointer"
          >
            <Smartphone className="w-5 h-5 text-[#1a73e8] group-hover:scale-110 transition-transform" />
            <span>{config.rewardsForm.androidButtonText}</span>
            <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
          </button>
          <div className="text-[11px] text-[#70757a] mt-1.5 text-center truncate">
            {config.rewardsForm.androidUrl}
          </div>
        </div>

        {/* Card 3: PC / Desktop CTA */}
        <div className="bg-white rounded-lg border border-[#dadce0] shadow-[0_1px_3px_0_rgba(60,64,67,0.15)] p-5 sm:p-6 text-center">
          <button
            type="button"
            id="pc-offer-btn"
            onClick={() => handleOfferClick('pc', config.rewardsForm.pcUrl)}
            className="w-full py-3.5 px-4 rounded-lg bg-[#f8f9fa] border-2 border-[#1a73e8] hover:bg-[#e8f0fe] active:bg-[#d2e3fc] text-[#1a73e8] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm group cursor-pointer"
          >
            <Monitor className="w-5 h-5 text-[#1a73e8] group-hover:scale-110 transition-transform" />
            <span>{config.rewardsForm.pcButtonText}</span>
            <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
          </button>
          <div className="text-[11px] text-[#70757a] mt-1.5 text-center truncate">
            {config.rewardsForm.pcUrl}
          </div>
        </div>

        {/* Card 4: Terms & Conditions Disclaimer */}
        <div className="bg-white rounded-lg border border-[#dadce0] shadow-[0_1px_3px_0_rgba(60,64,67,0.15)] p-4 sm:p-5">
          <p className="text-xs text-[#5f6368] italic leading-relaxed text-center">
            {config.rewardsForm.termsText}
          </p>
        </div>

        {/* Bottom Form Actions */}
        <form onSubmit={handleSubmit} className="flex items-center justify-start pt-2 pb-6">
          <button
            type="submit"
            id="submit-rewards-btn"
            className="bg-[#673ab7] hover:bg-[#5e35b1] active:bg-[#512da8] text-white text-[14px] font-medium px-8 py-2.5 rounded-[4px] shadow-sm transition-colors cursor-pointer"
          >
            Submit
          </button>
        </form>

        <GoogleFormFooter onAdminClick={onAdminClick} />
      </div>
    </div>
  );
};
