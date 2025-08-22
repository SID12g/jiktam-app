-- Supabase 설정을 위한 SQL 스크립트
-- 이 스크립트를 Supabase SQL Editor에서 실행하세요

-- 1. app_config 테이블 생성
CREATE TABLE IF NOT EXISTS app_config (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  iframe_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. RLS (Row Level Security) 활성화
ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;

-- 3. 인증된 사용자만 읽을 수 있도록 정책 설정
CREATE POLICY "Authenticated users can read app_config" ON app_config
  FOR SELECT USING (auth.role() = 'authenticated');

-- 4. 관리자만 수정할 수 있도록 정책 설정 (선택사항)
CREATE POLICY "Admin users can modify app_config" ON app_config
  FOR ALL USING (auth.role() = 'authenticated' AND auth.email() = 'your-admin-email@example.com');

-- 5. Notion URL 데이터 삽입
INSERT INTO app_config (key, iframe_url) 
VALUES ('notion_url', 'https://notion.site')
ON CONFLICT (key) 
DO UPDATE SET 
  iframe_url = EXCLUDED.iframe_url,
  updated_at = NOW();

-- 6. 테이블 권한 확인
GRANT SELECT ON app_config TO authenticated;
GRANT ALL ON app_config TO service_role;

-- 7. 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_app_config_key ON app_config(key);
