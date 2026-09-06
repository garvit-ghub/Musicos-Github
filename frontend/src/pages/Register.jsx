import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

const OTP_LENGTH = 6;

const Register = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (step === 2 && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [step]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
        setCountdown(10);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const newOtp = Array(OTP_LENGTH).fill('');
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    otpRefs.current[focusIndex].focus();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    const otpString = otp.join('');
    if (otpString.length !== OTP_LENGTH) {
      setError('Please enter the complete 6-digit code.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data);
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setCountdown(10);
        setOtp(Array(OTP_LENGTH).fill(''));
        otpRefs.current[0]?.focus();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to resend OTP.');
    }
  };

  return (
    <div className="auth-container">
      {step === 1 ? (
        <form onSubmit={handleRegister} className="auth-form">
          <h2>Register</h2>
          {error && <p className="auth-error">{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Register'}
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="auth-form">
          <h2>Verify OTP</h2>
          <p className="otp-subtitle">
            A 6-digit code was sent to<br />
            <strong>{email}</strong>
          </p>
          {error && <p className="auth-error">{error}</p>}
          <div className="otp-input-group">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="otp-input"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                onPaste={index === 0 ? handleOtpPaste : undefined}
                required
              />
            ))}
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
          <p className="otp-resend">
            {countdown > 0 ? (
              <>Resend OTP in {countdown}s</>
            ) : (
              <button type="button" className="otp-resend-btn" onClick={handleResendOtp}>
                Resend OTP
              </button>
            )}
          </p>
          <p className="otp-back">
            <button type="button" className="otp-back-btn" onClick={() => { setStep(1); setError(''); }}>
              ← Back to Registration
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Register;
