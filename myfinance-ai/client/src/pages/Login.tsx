import { useState } from 'react';
import { login } from '../api/auth';
import { Eye, EyeOff, TrendingUp, Shield, Wallet, Banknote } from 'lucide-react';
import '../style/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email && password) {
        // 로그인 API 호출
        login( email, password);
        console.log('로그인 성공');
      } else {
        setError('이메일과 비밀번호를 입력해주세요');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-body">
      <div className="bg-deco top-right"></div>
      <div className="bg-deco bottom-left"></div>

      <div className="login-wrapper">
        <div className="login-logo">
          <div className="login-logo-icon">
            <Banknote style={{ width: '2rem', height: '2rem', color: 'white' }} />
          </div>
          <h1 className="login-logo-title">SpendSmart AI</h1>
          <p className="login-logo-subtitle">똑똑한 소비 습관을 위한 AI 코치</p>
        </div>

        <div className="login-card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2>로그인</h2>
            <p>계속하려면 계정에 로그인하세요</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="input-group">
              <label>이메일</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>비밀번호</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} /> : <Eye style={{ width: '1.25rem', height: '1.25rem' }} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-msg">
                <p>{error}</p>
              </div>
            )}

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '0.5rem'
                  }}></div>
                  로그인 중...
                </div>
              ) : (
                '로그인'
              )}
            </button>

            <div className="options">
              <label>
                <input type="checkbox" />
                로그인 상태 유지
              </label>
              <a href="#">비밀번호 찾기</a>
            </div>

            <div className="divider">
              <div className="divider-line"></div>
              <span>또는</span>
              <div className="divider-line"></div>
            </div>

            <div className="signup">
              <p>
                계정이 없으신가요? <a href="/signup">무료로 시작하기</a>
              </p>
            </div>
          </form>
        </div>

        <div className="features">
          <div className="feature-item">
            <div className="feature-icon" style={{ background: '#e0e7ff' }}>
              <Shield style={{ width: '1.25rem', height: '1.25rem', color: '#4f46e5' }} />
            </div>
            <p>안전한 보안</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon" style={{ background: '#f3e8ff' }}>
              <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: '#7c3aed' }} />
            </div>
            <p>스마트 분석</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon" style={{ background: '#dbeafe' }}>
              <Wallet style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb' }} />
            </div>
            <p>맞춤 조언</p>
          </div>
        </div>
      </div>
    </div>
  );
}
