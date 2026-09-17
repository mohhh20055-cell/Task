import { supabase } from '../lib/supabase';
import { AppConfig, FormSubmission } from '../types';
import { DEFAULT_CONFIG, STORAGE_KEY_CONFIG, STORAGE_KEY_SUBMISSIONS } from '../constants/defaultConfig';

/**
 * Fetch application configuration from Supabase 'app_config' table.
 */
export async function fetchConfigFromDB(): Promise<AppConfig> {
  try {
    const { data, error } = await supabase
      .from('app_config')
      .select('config')
      .eq('id', 1)
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetchConfig warning:', error.message);
    }

    if (data && data.config) {
      const mergedConfig = { ...DEFAULT_CONFIG, ...data.config };
      // Cache locally
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(mergedConfig));
      return mergedConfig;
    }
  } catch (err) {
    console.warn('Error fetching config from Supabase:', err);
  }

  // Fallback to localStorage
  try {
    const local = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (local) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(local) };
    }
  } catch {
    // Ignore
  }

  return DEFAULT_CONFIG;
}

/**
 * Save application configuration to Supabase 'app_config' table.
 */
export async function saveConfigToDB(newConfig: AppConfig): Promise<{ success: boolean; error?: string }> {
  // Always update local cache first
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(newConfig));
  } catch (err) {
    console.error('Failed to update local storage:', err);
  }

  try {
    // 1. Try update row id = 1 first
    const { data: updateData, error: updateError } = await supabase
      .from('app_config')
      .update({
        config: newConfig,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1)
      .select();

    if (!updateError && updateData && updateData.length > 0) {
      return { success: true };
    }

    if (updateError) {
      console.warn('Update attempt warning, falling back to upsert:', updateError.message);
    }

    // 2. Fallback to upsert if row does not exist yet
    const { error: upsertError } = await supabase
      .from('app_config')
      .upsert({
        id: 1,
        config: newConfig,
        updated_at: new Date().toISOString(),
      });

    if (upsertError) {
      console.error('Supabase saveConfig error:', upsertError.message);
      return { success: false, error: upsertError.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error saving config to Supabase:', err);
    return { success: false, error: err?.message || 'Failed to communicate with Supabase database.' };
  }
}

/**
 * Fetch all form submissions from Supabase 'form_submissions' table.
 */
export async function fetchSubmissionsFromDB(): Promise<FormSubmission[]> {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchSubmissions warning:', error.message);
    }

    if (data && data.length > 0) {
      const formatted: FormSubmission[] = data.map((item) => ({
        id: item.id,
        formType: item.form_type,
        date: item.date || item.created_at,
        data: item.data || {},
      }));

      localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(formatted));
      return formatted;
    }
  } catch (err) {
    console.warn('Error fetching submissions from Supabase:', err);
  }

  // Fallback to localStorage
  try {
    const local = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
    if (local) {
      return JSON.parse(local);
    }
  } catch {
    // Ignore
  }

  return [];
}

/**
 * Add a new form submission to Supabase 'form_submissions' table.
 */
export async function addSubmissionToDB(submission: FormSubmission): Promise<boolean> {
  // Save to local cache first
  try {
    const local = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
    const existing: FormSubmission[] = local ? JSON.parse(local) : [];
    const updated = [submission, ...existing];
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(updated));
  } catch (err) {
    console.error('Local storage save submission failed:', err);
  }

  try {
    const { error } = await supabase
      .from('form_submissions')
      .insert([
        {
          id: submission.id,
          form_type: submission.formType,
          date: submission.date,
          data: submission.data,
        },
      ]);

    if (error) {
      console.error('Supabase addSubmission error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error adding submission to Supabase:', err);
    return false;
  }
}

/**
 * Clear all submissions from Supabase 'form_submissions' table.
 */
export async function clearSubmissionsFromDB(): Promise<boolean> {
  try {
    localStorage.removeItem(STORAGE_KEY_SUBMISSIONS);
  } catch {
    // Ignore
  }

  try {
    const { error } = await supabase
      .from('form_submissions')
      .delete()
      .neq('id', '0');

    if (error) {
      console.error('Supabase clearSubmissions error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error clearing submissions from Supabase:', err);
    return false;
  }
}
