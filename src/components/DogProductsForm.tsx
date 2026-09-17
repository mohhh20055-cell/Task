import React, { useState } from 'react';
import { AppConfig, FormSubmission } from '../types';
import { GoogleFormFooter } from './GoogleFormFooter';

interface Props {
  config: AppConfig;
  onSubmit: (submission: FormSubmission) => void;
  onAdminClick: () => void;
}

export const DogProductsForm: React.FC<Props> = ({ config, onSubmit, onAdminClick }) => {
  const [interested, setInterested] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [agree, setAgree] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};

    if (!interested) newErrors.interested = true;
    if (!firstName.trim()) newErrors.firstName = true;
    if (!lastName.trim()) newErrors.lastName = true;
    if (!phoneNumber.trim()) newErrors.phoneNumber = true;
    if (!email.trim() || !email.includes('@')) newErrors.email = true;
    if (!agree) newErrors.agree = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // scroll to first error
      const firstError = Object.keys(newErrors)[0];
      const elem = document.getElementById(`field-${firstError}`);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const submission: FormSubmission = {
      id: Date.now().toString(),
      formType: 'dog_products',
      date: new Date().toISOString(),
      data: {
        interested,
        firstName,
        lastName,
        phoneNumber,
        email,
        agree,
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
              {config.dogForm.title}
            </h1>
            <p className="text-[14px] text-[#202124] leading-relaxed">
              {config.dogForm.description}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Question 1: Are you interested in dog products offers ? */}
          <div
            id="field-interested"
            className={`bg-white rounded-lg border ${
              errors.interested ? 'border-[#d93025]' : 'border-[#dadce0]'
            } shadow-[0_1px_3px_0_rgba(60,64,67,0.15)] p-4 sm:p-6 transition-colors`}
          >
            <div className="text-[16px] text-[#202124] mb-4 flex items-start gap-1">
              <span className="text-[#d93025] font-bold">*</span>
              <span className="font-normal">{config.dogForm.question1Title}</span>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group select-none py-1">
                <input
                  type="radio"
                  name="interested"
                  value="Yes"
                  checked={interested === 'Yes'}
                  onChange={(e) => {
                    setInterested(e.target.value);
                    if (errors.interested) setErrors((prev) => ({ ...prev, interested: false }));
                  }}
                  className="w-5 h-5 text-[#673ab7] focus:ring-[#673ab7] border-[#70757a] accent-[#673ab7] cursor-pointer"
                />
                <span className="text-[14px] text-[#202124]">Yes</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group select-none py-1">
                <input
                  type="radio"
                  name="interested"
                  value="No"
                  checked={interested === 'No'}
                  onChange={(e) => {
                    setInterested(e.target.value);
                    if (errors.interested) setErrors((prev) => ({ ...prev, interested: false }));
                  }}
                  className="w-5 h-5 text-[#673ab7] focus:ring-[#673ab7] border-[#70757a] accent-[#673ab7] cursor-pointer"
                />
                <span className="text-[14px] text-[#202124]">No</span>
              </label>
            </div>

            {errors.interested && (
              <div className="mt-2 text-xs text-[#d93025]">This question is required</div>
            )}
          </div>

          {/* Question 2: First Name */}
          <div
            id="field-firstName"
            className={`bg-white rounded-lg border ${
              errors.firstName ? 'border-[#d93025]' : 'border-[#dadce0]'
            } shadow-[0_1px_3px_0_rgba(60,64,67,0.15)] p-4 sm:p-6 transition-colors`}
          >
            <div className="text-[16px] text-[#202124] mb-4 flex items-start gap-1">
              <span className="text-[#d93025] font-bold">*</span>
              <span className="font-normal">First Name</span>
            </div>

            <div className="w-full max-w-[320px]">
              <input
                type="text"
                placeholder="Your answer"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: false }));
                }}
                className="w-full pb-1 text-[14px] text-[#202124] placeholder-[#80868b] border-b border-[#dadce0] focus:border-[#673ab7] focus:border-b-2 outline-none transition-all duration-200"
              />
            </div>

            {errors.firstName && (
              <div className="mt-2 text-xs text-[#d93025]">This question is required</div>
            )}
          </div>

          {/* Question 3: Last Name */}
          <div
            id="field-lastName"
            className={`bg-white rounded-lg border ${
              errors.lastName ? 'border-[#d93025]' : 'border-[#dadce0]'
            } shadow-[0_1px_3px_0_rgba(60,64,67,0.15)] p-4 sm:p-6 transition-colors`}
          >
            <div className="text-[16px] text-[#202124] mb-4 flex items-start gap-1">
              <span className="text-[#d93025] font-bold">*</span>
              <span className="font-normal">Last Name</span>
            </div>

            <div className="w-full max-w-[320px]">
              <input
                type="text"
                placeholder="Your answer"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: false }));
                }}
                className="w-full pb-1 text-[14px] text-[#202124] placeholder-[#80868b] border-b border-[#dadce0] focus:border-[#673ab7] focus:border-b-2 outline-none transition-all duration-200"
              />
            </div>

            {errors.lastName && (
              <div className="mt-2 text-xs text-[#d93025]">This question is required</div>
            )}
          </div>

          {/* Question 4: Phone Number */}
          <div
            id="field-phoneNumber"
            className={`bg-white rounded-lg border ${
              errors.phoneNumber ? 'border-[#d93025]' : 'border-[#dadce0]'
            } shadow-[0_1px_3px_0_rgba(60,64,67,0.15)] p-4 sm:p-6 transition-colors`}
          >
            <div className="text-[16px] text-[#202124] mb-4 flex items-start gap-1">
              <span className="text-[#d93025] font-bold">*</span>
              <span className="font-normal">Phone Number</span>
            </div>

            <div className="w-full max-w-[320px]">
              <input
                type="tel"
                placeholder="Your answer"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: false }));
                }}
                className="w-full pb-1 text-[14px] text-[#202124] placeholder-[#80868b] border-b border-[#dadce0] focus:border-[#673ab7] focus:border-b-2 outline-none transition-all duration-200"
              />
            </div>

            {errors.phoneNumber && (
              <div className="mt-2 text-xs text-[#d93025]">This question is required</div>
            )}
          </div>

          {/* Question 5: Email */}
          <div
            id="field-email"
            className={`bg-white rounded-lg border ${
              errors.email ? 'border-[#d93025]' : 'border-[#dadce0]'
            } shadow-[0_1px_3px_0_rgba(60,64,67,0.15)] p-4 sm:p-6 transition-colors`}
          >
            <div className="text-[16px] text-[#202124] mb-4 flex items-start gap-1">
              <span className="text-[#d93025] font-bold">*</span>
              <span className="font-normal">Email</span>
            </div>

            <div className="w-full max-w-[320px]">
              <input
                type="email"
                placeholder="Your answer"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: false }));
                }}
                className="w-full pb-1 text-[14px] text-[#202124] placeholder-[#80868b] border-b border-[#dadce0] focus:border-[#673ab7] focus:border-b-2 outline-none transition-all duration-200"
              />
            </div>

            {errors.email && (
              <div className="mt-2 text-xs text-[#d93025]">Must be a valid email address</div>
            )}
          </div>

          {/* Question 6: Agreement Checkbox/Radio */}
          <div
            id="field-agree"
            className={`bg-white rounded-lg border ${
              errors.agree ? 'border-[#d93025]' : 'border-[#dadce0]'
            } shadow-[0_1px_3px_0_rgba(60,64,67,0.15)] p-4 sm:p-6 transition-colors`}
          >
            <div className="text-[15px] sm:text-[16px] text-[#202124] mb-4 flex items-start gap-1">
              <span className="text-[#d93025] font-bold">*</span>
              <span className="font-normal">{config.dogForm.agreeText}</span>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <input
                  type="radio"
                  name="agree"
                  checked={agree}
                  onChange={() => {
                    setAgree(true);
                    if (errors.agree) setErrors((prev) => ({ ...prev, agree: false }));
                  }}
                  className="w-5 h-5 text-[#673ab7] focus:ring-[#673ab7] border-[#70757a] accent-[#673ab7] cursor-pointer"
                />
                <span className="text-[14px] text-[#202124]">I agree</span>
              </label>
            </div>

            {errors.agree && (
              <div className="mt-2 text-xs text-[#d93025]">You must agree to continue</div>
            )}
          </div>

          {/* Bottom Action Row: Submit */}
          <div className="flex items-center justify-start pt-2 pb-6">
            <button
              type="submit"
              id="submit-dog-form-btn"
              className="bg-[#673ab7] hover:bg-[#5e35b1] active:bg-[#512da8] text-white text-[14px] font-medium px-8 py-2.5 rounded-[4px] shadow-sm transition-colors cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>

        <GoogleFormFooter onAdminClick={onAdminClick} />
      </div>
    </div>
  );
};
