export type FormMode = 'dog_products' | 'rewards';

export interface FormSubmission {
  id: string;
  formType: FormMode;
  date: string;
  data: {
    interested?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    agree?: boolean;
    clickedOffer?: string;
  };
}

export interface AppConfig {
  activeMode: FormMode;
  accountEmail: string;
  adminPassword: string;
  dogForm: {
    title: string;
    description: string;
    requiredNotice: string;
    question1Title: string;
    agreeText: string;
  };
  rewardsForm: {
    title: string;
    programTitle: string;
    importantReq: string;
    deviceInfo: string;
    howToClaimTitle: string;
    instructions: string;
    iosButtonText: string;
    iosUrl: string;
    androidButtonText: string;
    androidUrl: string;
    pcButtonText: string;
    pcUrl: string;
    termsText: string;
  };
}
