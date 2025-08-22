import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url_here') {
  throw new Error(
    'Supabase URL이 설정되지 않았습니다. .env.local 파일에 VITE_SUPABASE_URL을 설정해주세요.'
  );
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key_here') {
  throw new Error(
    'Supabase Anon Key가 설정되지 않았습니다. .env.local 파일에 VITE_SUPABASE_ANON_KEY를 설정해주세요.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'jiktam-auth',
    detectSessionInUrl: true,
    flowType: 'pkce',
    // 세션 유효 기간을 일주일로 설정 (7일 * 24시간 * 60분 * 60초)
    sessionExpiryMargin: 7 * 24 * 60 * 60,
  },
});
