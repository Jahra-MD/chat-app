import { useRef, useState, useEffect, useContext } from 'react';
import { useChatStore } from '../store';
import { ToastContext } from '../App';
import './ChatWindow.css';

const PAGE_SIZE = 20;

function getDummyMessages(count, beforeDate) {
  const now = beforeDate instanceof Date && !isNaN(beforeDate) ? beforeDate : new Date();
  const sampleTexts = [
    "Here's a fun fact!",
    "How can I help you today?",
    "Did you know React is awesome?",
    "This is a simulated old message.",
    "Try uploading an image!",
    "Ask me anything.",
    "Here's a random tip.",
    "Let's chat more.",
    "What would you like to know?",
    "I'm here to assist you."
  ];
  const sampleImages = [
    "https://placekitten.com/120/80",
    "https://placehold.co/120x80",
    "https://picsum.photos/120/80"
  ];
  return Array.from({ length: count }).map((_, i) => {
    const t = new Date(now.getTime() - (i + 1) * 60000);
    const isUser = i % 2 === 0;
    const isImage = Math.random() < 0.2; // 20% chance of image
    return {
      sender: isUser ? "User" : "Gemini AI",
      text: isImage ? undefined : sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
      image: isImage ? sampleImages[Math.floor(Math.random() * sampleImages.length)] : undefined,
      time: t.toLocaleTimeString(),
      type: isUser ? "user" : "ai"
    };
  });
}

export default function ChatWindow({ user }) {
  const { chatrooms, currentChatroomId, addMessage } = useChatStore();
  const showToast = useContext(ToastContext);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // Typing indicator
  const [aiPending, setAiPending] = useState(false); // Throttle AI
  const [loading, setLoading] = useState(true); // Loading skeletons
  const [page, setPage] = useState(1); // Pagination
  const [loadingOlder, setLoadingOlder] = useState(false); // Loading older messages
  const [olderMessages, setOlderMessages] = useState([]); // Dummy older messages
  const messagesEndRef = useRef(null);
  const messagesTopRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const currentRoom = chatrooms.find((c) => c.id === currentChatroomId);

  // Reset pagination and older messages on chatroom switch
  useEffect(() => {
    setLoading(true);
    setPage(1);
    setOlderMessages([]);
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, [currentChatroomId]);

  // Scroll to bottom on new message
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handle reverse infinite scroll
  useEffect(() => {
    const el = chatMessagesRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (el.scrollTop < 10 && !loadingOlder && !loading) {
        setLoadingOlder(true);
        setTimeout(() => {
          // Simulate fetching older messages
          const firstMsg = olderMessages[0] || currentRoom?.messages[0];
          let refDate = new Date();
          if (firstMsg && firstMsg.time) {
            // Try to parse as time string (e.g., '12:34:56 PM')
            const parsed = new Date(`1970-01-01T${firstMsg.time}`);
            if (!isNaN(parsed.getTime())) refDate = parsed;
          }
          const newOlder = getDummyMessages(PAGE_SIZE, refDate);
          setOlderMessages(prev => [...newOlder, ...prev]);
          setPage(p => p + 1);
          setLoadingOlder(false);
        }, 800);
      }
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [loadingOlder, loading, olderMessages, currentRoom]);

  // Combine older and current messages, show up to page*PAGE_SIZE
  const allMessages = [...olderMessages, ...(currentRoom?.messages || [])];
  const visibleMessages = allMessages.slice(-page * PAGE_SIZE);

  const handleCopy = (msg) => {
    const text = msg.text || msg.image || '';
    if (text) {
      navigator.clipboard.writeText(text);
      showToast('Copied!', 'info');
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if ((!input.trim() && !image) || aiPending) return;
    if (image) {
      // Send image message
      const reader = new FileReader();
      reader.onload = () => {
        const userMsg = {
          sender: user.phone,
          image: reader.result,
          time: new Date().toLocaleTimeString(),
          type: 'user',
        };
        addMessage(currentRoom.id, userMsg);
        setImage(null);
        setImagePreview(null);
        scrollToBottom();
        showToast('Image sent!', 'success');
        // Simulate AI response
        setIsTyping(true);
        setAiPending(true);
        setTimeout(() => {
          const aiMsg = {
            sender: 'Gemini AI',
            text: 'Nice image! (simulated AI response)',
            time: new Date().toLocaleTimeString(),
            type: 'ai',
          };
          addMessage(currentRoom.id, aiMsg);
          setIsTyping(false);
          setAiPending(false);
          scrollToBottom();
        }, 1500);
      };
      reader.readAsDataURL(image);
    } else {
      // Send text message
      const userMsg = {
        sender: user.phone,
        text: input,
        time: new Date().toLocaleTimeString(),
        type: 'user',
      };
      addMessage(currentRoom.id, userMsg);
      setInput('');
      scrollToBottom();
      showToast('Message sent!', 'success');
      // Simulate AI response
      setIsTyping(true);
      setAiPending(true);
      setTimeout(() => {
        const aiMsg = {
          sender: 'Gemini AI',
          text: 'This is a simulated AI response.',
          time: new Date().toLocaleTimeString(),
          type: 'ai',
        };
        addMessage(currentRoom.id, aiMsg);
        setIsTyping(false);
        setAiPending(false);
        scrollToBottom();
      }, 1500);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">{currentRoom?.name || 'Chatroom'}</div>
      <div className="chat-messages" ref={chatMessagesRef}>
        <div ref={messagesTopRef} />
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div className="message-bubble skeleton" key={i} />
          ))
        ) : (
          <>
            {loadingOlder && (
              <div className="message-bubble skeleton" style={{ minHeight: '2em', width: '40%' }} />
            )}
            {visibleMessages.map((msg, idx) => (
              <div key={idx} className={`message-bubble ${msg.type}`}
                tabIndex={0}
                aria-label="Copy message"
                onKeyDown={e => {
                  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === e.currentTarget) {
                    handleCopy(msg);
                  }
                }}
              >
                <div className="sender">{msg.sender}</div>
                {msg.text && <div className="text">{msg.text}</div>}
                {msg.image && (
                  <div className="image-msg">
                    <img src={msg.image} alt="sent" />
                  </div>
                )}
                <div className="time">{msg.time}</div>
                <button
                  className="copy-btn"
                  aria-label="Copy message"
                  tabIndex={0}
                  onClick={() => handleCopy(msg)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') handleCopy(msg);
                  }}
                >
                  📋
                </button>
              </div>
            ))}
            {isTyping && <div className="typing-indicator">Gemini is typing...</div>}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={aiPending}
        />
        <label className="image-upload-btn">
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
            disabled={aiPending}
          />
          📷
        </label>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="preview" />
            <button type="button" onClick={handleRemoveImage} title="Remove image">&times;</button>
          </div>
        )}
        <button type="submit" disabled={aiPending}>Send</button>
      </form>
    </div>
  );
} 