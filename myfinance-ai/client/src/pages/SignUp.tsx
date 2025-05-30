import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import '../style/signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate('/login');
    } catch (err: any) {
      setError(err?.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <div className="signup-body">
      <div className="bg-deco top-right"></div>
      <div className="bg-deco bottom-left"></div>

      <div className="signup-wrapper">
        <div className="signup-card">
          <h2>회원가입</h2>
          <p>계정을 생성하여 시작해보세요</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>이름</label>
              <input
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="error-msg">{error}</div>}

            <button type="submit" className="signup-btn">회원가입</button>

            <div className="login-link">
              <p>이미 계정이 있으신가요? <a href="/login">로그인하기</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
