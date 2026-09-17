import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://dqjinpglmymfyvzovfht.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxamlucGdsbXltZnl2em92Zmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2MTQwNTcsImV4cCI6MjEwNTE5MDA1N30.-tdbiaRbbPMPdRUVH5gx6xcRum4x4VTSG3WiPLzLFkI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
