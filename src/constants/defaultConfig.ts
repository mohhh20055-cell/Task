import { AppConfig } from '../types';

export const DEFAULT_CONFIG: AppConfig = {
  activeMode: 'dog_products',
  accountEmail: 'iry00043@gmail.com',
  adminPassword: 'admin',
  dogForm: {
    title: 'Dog Products Offers Form',
    description: 'Please fill out this form if you are interested in our dog products offer',
    requiredNotice: '* Indicates required question',
    question1Title: 'Are you interested in dog products offers ?',
    agreeText: 'I agree to share this information for the purpose of supporting dog products offers',
  },
  rewardsForm: {
    title: 'Complete the task to receive the reward',
    programTitle: '🎁 EXCLUSIVE NIKE REWARDS PROGRAM 🎁',
    importantReq: '⚠️ IMPORTANT REQUIREMENTS BEFORE YOU PROCEED ⚠️',
    deviceInfo: '📱 Devices Allowed: Android & Desktop | Country: United States (US) Only | ⏱️ Time Required: Less than 15 minutes',
    howToClaimTitle: '🚀 HOW TO CLAIM YOUR REWARD',
    instructions: '1. Click the official link below that matches your device type.\n2. Enter your valid US Email address and Zip Code on the sponsor page.\n3. Complete the quick verification process to unlock your prize.\n4. Take a screenshot of the final success page to verify your registration and secure your prize.',
    androidButtonText: '👉 CLICK HERE FOR ANDROID USERS 👈 📱',
    androidUrl: 'https://example.com/android-offer',
    pcButtonText: '👉 CLICK HERE FOR PC / DESKTOP USERS 👈 💻',
    pcUrl: 'https://example.com/pc-offer',
    termsText: 'Terms & Conditions Apply. This promotional giveaway is sponsored independently and is open to legal residents of the United States. One entry per user.',
  },
};

export const STORAGE_KEY_CONFIG = 'landing_app_config_v1';
export const STORAGE_KEY_SUBMISSIONS = 'landing_app_submissions_v1';
