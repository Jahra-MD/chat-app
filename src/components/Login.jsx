import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './Login.css';

const STATIC_CODES = ['+91', '+1', '+44', '+61'];

const phoneSchema = z.object({
  code: z.enum(STATIC_CODES, { errorMap: () => ({ message: 'Select a valid code' }) }),
  phone: z.string()
    .min(6, 'Phone number must be at least 6 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  otp: z.string().length(6, 'OTP must be 6 digits').optional(),
});

export default function Login({ onLogin }) {
  const [step, setStep] = useState(1);
  const [sentOtp, setSentOtp] = useState('');
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: { code: '+91' },
  });

  const handlePhoneSubmit = (data) => {
    // Simulate sending OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(otp);
    setStep(2);
    setValue('otp', '');
    setError('');
    alert(`Simulated OTP: ${otp}`); // For demo only
  };

  const handleOtpSubmit = (data) => {
    if (data.otp === sentOtp) {
      onLogin({ phone: `${data.code}${data.phone}` });
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {step === 1 && (
        <form onSubmit={handleSubmit(handlePhoneSubmit)}>
          <label>Phone Number:</label>
          <div style={{ display: 'flex', gap: '0.5em' }}>
            <select {...register('code')} className="code-dropdown">
              {STATIC_CODES.map(code => (
                <option value={code} key={code}>{code}</option>
              ))}
            </select>
            <input type="text" {...register('phone')} placeholder="Enter phone number" style={{ flex: 1 }} />
          </div>
          {errors.code && <span className="error">{errors.code.message}</span>}
          {errors.phone && <span className="error">{errors.phone.message}</span>}
          <button type="submit">Send OTP</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit(handleOtpSubmit)}>
          <label>OTP:</label>
          <input type="text" {...register('otp')} placeholder="Enter OTP" />
          {errors.otp && <span className="error">{errors.otp.message}</span>}
          {error && <span className="error">{error}</span>}
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
} 