-- ============================================================
-- SUPABASE DATABASE SCHEMA FOR TASK / REWARDS LANDING APP
-- Copy and paste this script into Supabase SQL Editor:
-- https://supabase.com/dashboard/project/dqjinpglmymfyvzovfht/sql/new
-- ============================================================

-- 1. Create table 'app_config' for storing application settings
CREATE TABLE IF NOT EXISTS public.app_config (
    id INT PRIMARY KEY,
    config JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security) on 'app_config'
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read & write access to 'app_config'
DROP POLICY IF EXISTS "Allow public select on app_config" ON public.app_config;
CREATE POLICY "Allow public select on app_config" 
    ON public.app_config FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Allow public insert/update on app_config" ON public.app_config;
CREATE POLICY "Allow public insert/update on app_config" 
    ON public.app_config FOR ALL 
    USING (true)
    WITH CHECK (true);


-- 2. Create table 'form_submissions' for storing user leads/responses
CREATE TABLE IF NOT EXISTS public.form_submissions (
    id TEXT PRIMARY KEY,
    form_type TEXT NOT NULL,
    date TIMESTAMPTZ DEFAULT NOW(),
    data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on 'form_submissions'
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read, insert, delete on 'form_submissions'
DROP POLICY IF EXISTS "Allow public select on form_submissions" ON public.form_submissions;
CREATE POLICY "Allow public select on form_submissions" 
    ON public.form_submissions FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Allow public insert on form_submissions" ON public.form_submissions;
CREATE POLICY "Allow public insert on form_submissions" 
    ON public.form_submissions FOR INSERT 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete on form_submissions" ON public.form_submissions;
CREATE POLICY "Allow public delete on form_submissions" 
    ON public.form_submissions FOR DELETE 
    USING (true);


-- 3. Insert initial default configuration row into 'app_config' (if not already exists)
INSERT INTO public.app_config (id, config)
VALUES (
    1,
    '{
        "activeMode": "dog_products",
        "accountEmail": "iry00043@gmail.com",
        "adminPassword": "admin",
        "dogForm": {
            "title": "Dog Products Offers Form",
            "description": "Please fill out this form if you are interested in our dog products offer",
            "requiredNotice": "* Indicates required question",
            "question1Title": "Are you interested in dog products offers ?",
            "agreeText": "I agree to share this information for the purpose of supporting dog products offers"
        },
        "rewardsForm": {
            "title": "Complete the task to receive the reward",
            "programTitle": "🎁 EXCLUSIVE NIKE REWARDS PROGRAM 🎁",
            "importantReq": "⚠️ IMPORTANT REQUIREMENTS BEFORE YOU PROCEED ⚠️",
            "deviceInfo": "📱 Devices Allowed: iOS / iPhone, Android & Desktop | Country: United States (US) Only | ⏱️ Time Required: Less than 15 minutes",
            "howToClaimTitle": "🚀 HOW TO CLAIM YOUR REWARD",
            "instructions": "1. Click the official link below that matches your device type.\n2. Enter your valid US Email address and Zip Code on the sponsor page.\n3. Complete the quick verification process to unlock your prize.\n4. Take a screenshot of the final success page to verify your registration and secure your prize.",
            "iosButtonText": "👉 CLICK HERE FOR IPHONE / IOS USERS 👈 📱",
            "iosUrl": "https://example.com/ios-offer",
            "androidButtonText": "👉 CLICK HERE FOR ANDROID USERS 👈 📱",
            "androidUrl": "https://example.com/android-offer",
            "pcButtonText": "👉 CLICK HERE FOR PC / DESKTOP USERS 👈 💻",
            "pcUrl": "https://example.com/pc-offer",
            "termsText": "Terms & Conditions Apply. This promotional giveaway is sponsored independently and is open to legal residents of the United States. One entry per user."
        }
    }'::jsonb
)
ON CONFLICT (id) DO NOTHING;
