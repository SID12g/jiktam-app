import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

function Content({ user, onLogout }) {
  const [iframeSrc, setIframeSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIframeUrl = async () => {
      try {
        // Supabase에서 iframe URL을 가져옴
        const { data, error } = await supabase
          .from('app_config')
          .select('iframe_url')
          .eq('key', 'notion_url')
          .single();

        if (error) {
          console.error('URL을 가져오는 중 오류 발생:', error);
          setError('콘텐츠를 불러올 수 없습니다.');
          setIsLoading(false);
          return;
        }

        if (data && data.iframe_url) {
          // URL을 동적으로 설정하여 개발자 도구에서 쉽게 보이지 않도록 함
          setTimeout(() => {
            setIframeSrc(data.iframe_url);
            setIsLoading(false);
          }, 200);
        } else {
          setError('콘텐츠 URL을 찾을 수 없습니다.');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('예상치 못한 오류:', err);
        setError('콘텐츠를 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };

    // 사용자가 로그인되어 있는지 확인
    if (user && user.id) {
      fetchIframeUrl();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  // 로그인 상태가 아니거나 로딩 중인 경우
  if (!user || !user.id) {
    return (
      <div className='notion-content-fullscreen'>
        <div className='notion-access-denied'>
          <h2>접근 권한이 없습니다</h2>
          <p>이 콘텐츠를 보려면 로그인이 필요합니다.</p>
        </div>
      </div>
    );
  }

  // 에러가 발생한 경우
  if (error) {
    return (
      <div className='notion-content-fullscreen'>
        <div className='notion-error-state'>
          <h2>오류가 발생했습니다</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='notion-button notion-button-primary'
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // iframe이 로딩 중인 경우
  if (isLoading) {
    return (
      <div className='notion-content-fullscreen'>
        <div className='notion-loading-iframe'>
          <div className='notion-loading-spinner'></div>
          <p>콘텐츠를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='notion-content-fullscreen'>
      {iframeSrc && (
        <iframe
          src={iframeSrc}
          className='notion-iframe-fullscreen'
          title='Jiktam Content'
          allowFullScreen
          sandbox='allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox'
        />
      )}
    </div>
  );
}

export default Content;
