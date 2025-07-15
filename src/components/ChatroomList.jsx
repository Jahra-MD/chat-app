import { useState, useEffect, useContext } from 'react';
import { useChatStore } from '../store';
import { ToastContext } from '../App';
import './ChatroomList.css';

export default function ChatroomList() {
  const { chatrooms, currentChatroomId, addChatroom, deleteChatroom, switchChatroom } = useChatStore();
  const showToast = useContext(ToastContext);
  const [newRoom, setNewRoom] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  const filteredRooms = chatrooms.filter(room =>
    room.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="chatroom-list">
      <h3>Chatrooms</h3>
      <input
        className="chatroom-search"
        type="text"
        placeholder="Search chatrooms..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label="Search chatrooms"
      />
      <ul className="chatroom-scroll">
        {filteredRooms.map((room) => (
          <li key={room.id} className={room.id === currentChatroomId ? 'active' : ''}>
            <span
              tabIndex={0}
              role="button"
              aria-label={`Switch to chatroom ${room.name}`}
              onClick={() => switchChatroom(room.id)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  switchChatroom(room.id);
                }
              }}
            >
              {room.name}
            </span>
            {room.id !== 'default' && (
              <button
                onClick={() => { deleteChatroom(room.id); showToast('Chatroom deleted', 'error'); }}
                title="Delete"
                aria-label={`Delete chatroom ${room.name}`}
              >
                &times;
              </button>
            )}
          </li>
        ))}
      </ul>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (newRoom.trim()) {
            addChatroom(newRoom.trim());
            setNewRoom('');
            showToast('Chatroom created', 'success');
          }
        }}
      >
        <input
          type="text"
          value={newRoom}
          onChange={e => setNewRoom(e.target.value)}
          placeholder="New chatroom name"
          aria-label="New chatroom name"
        />
        <button type="submit" aria-label="Add chatroom">Add</button>
      </form>
    </div>
  );
} 