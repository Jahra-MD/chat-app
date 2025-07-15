import { useEffect } from 'react';
import './Toast.css';

export default function Toast({ toasts, removeToast }) {
  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map(t => setTimeout(() => removeToast(t.id), 2500));
    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type || ''}`}>{t.message}</div>
      ))}
    </div>
  );
} 