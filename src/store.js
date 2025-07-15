import { create } from 'zustand';

const LOCAL_KEY = 'chatrooms';

const getInitialChatrooms = () => {
  const saved = localStorage.getItem(LOCAL_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { id: 'default', name: 'General', messages: [] },
  ];
};

export const useChatStore = create((set, get) => ({
  chatrooms: getInitialChatrooms(),
  currentChatroomId: 'default',
  addChatroom: (name) => set((state) => {
    const id = Date.now().toString();
    const chatrooms = [...state.chatrooms, { id, name, messages: [] }];
    saveChatrooms(chatrooms);
    return {
      chatrooms,
      currentChatroomId: id,
    };
  }),
  deleteChatroom: (id) => set((state) => {
    let chatrooms = state.chatrooms.filter((c) => c.id !== id);
    let currentChatroomId = state.currentChatroomId;
    if (currentChatroomId === id) {
      currentChatroomId = chatrooms.length ? chatrooms[0].id : null;
    }
    saveChatrooms(chatrooms);
    return { chatrooms, currentChatroomId };
  }),
  switchChatroom: (id) => set(() => ({ currentChatroomId: id })),
  addMessage: (chatroomId, message) => set((state) => {
    const chatrooms = state.chatrooms.map((c) =>
      c.id === chatroomId ? { ...c, messages: [...c.messages, message] } : c
    );
    saveChatrooms(chatrooms);
    return { chatrooms };
  }),
}));

function saveChatrooms(chatrooms) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(chatrooms));
} 