import React, { useState } from 'react';
import { supabase } from '../supabase';
import Icon from '/icons/icon-512x512.png';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        onLogin(data.user);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async e => {
    alert('회원가입 기능이 제한되었습니다. 관리자에게 문의 바랍니다.');
    // e.preventDefault();
    // setLoading(true);
    // setError(null);
    // try {
    //   const { data, error } = await supabase.auth.signUp({
    //     email,
    //     password,
    //   });
    //   if (error) throw error;
    //   if (data.user) {
    //     setError('가입 확인 이메일을 확인해주세요.');
    //   }
    // } catch (error) {
    //   setError(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className='notion-login-container'>
      <div className='notion-login-card'>
        <div className='notion-login-header'>
          <img style={{ width: '120px' }} src={Icon} />
          <h1 className='notion-login-title'>Jiktam App</h1>
          <p className='notion-login-subtitle'>계정에 로그인하여 시작하세요</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className='notion-form-group'>
            <label htmlFor='email' className='notion-form-label'>
              이메일
            </label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              className='notion-form-input'
              placeholder='your@email.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className='notion-form-group'>
            <label htmlFor='password' className='notion-form-label'>
              비밀번호
            </label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              className='notion-form-input'
              placeholder='비밀번호를 입력하세요'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && <div className='notion-error-message'>{error}</div>}

          <div className='notion-button-group'>
            <button
              type='submit'
              onClick={handleLogin}
              disabled={loading}
              className='notion-button notion-button-primary'
            >
              {loading ? (
                <>
                  <span className='notion-loading'></span>
                  로그인
                </>
              ) : (
                '로그인'
              )}
            </button>
            <button
              type='button'
              onClick={handleSignUp}
              disabled={loading}
              className='notion-button notion-button-secondary'
            >
              {loading ? (
                <>
                  <span className='notion-loading'></span>
                  가입
                </>
              ) : (
                '가입'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
