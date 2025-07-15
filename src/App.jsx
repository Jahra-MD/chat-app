import { useState, useEffect, useCallback, createContext } from 'react';
import Login from './components/Login';
import ChatroomList from './components/ChatroomList';
import ChatWindow from './components/ChatWindow';
import Toast from './components/Toast';
import './App.css';

export const ToastContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('user');
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [isLoggedIn, user]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      <div className={`app-container${!isLoggedIn ? ' center-login' : ''}`}>
        <Toast toasts={toasts} removeToast={removeToast} />
        {!isLoggedIn ? (
          <Login onLogin={(user) => { setUser(user); setIsLoggedIn(true); showToast('OTP sent!', 'success'); }} />
        ) : (
          <>
            <div className="logout-bar">
              <button
                className="dark-toggle-btn"
                aria-label="Toggle dark mode"
                onClick={() => setDarkMode((d) => !d)}
                tabIndex={0}
              >
                {darkMode ? '🌙' : '☀️'}
              </button>
              <span>Logged in as: {user?.phone}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            <div className="main-chat-layout">
              <ChatroomList />
              <ChatWindow user={user} />
            </div>
          </>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export default App;
