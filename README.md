Gemini Frontend Clone
A modern, user-friendly chat application inspired by Gemini, built with React.

🚀 Live Demo
[View the Live App on Netlify](https://chat-app-using-react-frontend.netlify.app/)

📖 Project Overview
OTP-based login/signup with country code selection and validation
Create, delete, and search chatrooms
Real-time chat UI with simulated AI responses, typing indicator, and image upload
Infinite scroll, pagination, and message throttling for a realistic chat experience
Mobile responsive, dark mode, toast notifications, and localStorage persistence

🛠️ Setup & Run Instructions
1. Clone the repository:
 - git clone [https://github.com/your-username/your-repo-name.git](https://github.com/Jahra-MD/chat-app.git)
 - cd gemini-frontend
2. Install dependencies:
   - npm install
3. Start the development server:
 - npm run dev
Open the local address shown in your terminal (e.g., http://localhost:5173).

📁 Folder & Component Structure
gemini-frontend/
  src/
    components/
      ChatroomList.jsx      # Sidebar: chatroom list, search, create/delete
      ChatroomList.css
      ChatWindow.jsx        # Main chat UI: messages, input, image upload, infinite scroll
      ChatWindow.css
      Login.jsx             # OTP login/signup form
      Login.css
      Toast.jsx             # Toast notification system
      Toast.css
    store.js                # Zustand store for chatrooms/messages
    App.jsx                 # Main app, routing, dark mode, layout
    App.css
    main.jsx                # React entry point
    index.css

⚙️ Key Features & Implementation Details
1. Throttling (Simulated AI Thinking)
- When a user sends a message, the input is disabled and a “Gemini is typing...” indicator appears.
- After a delay (setTimeout), the AI response is shown.
- Prevents multiple AI replies at once.
2. Pagination & Infinite Scroll
- Only a limited number of messages (20 per page) are rendered at a time for performance.
- When the user scrolls to the top, a loading skeleton appears and a new page of older (dummy) messages is prepended.
- This simulates infinite scroll and client-side pagination.
3. Form Validation
- All forms use React Hook Form for state management and Zod for schema validation.
- Phone numbers must be 6–15 digits, codes are validated, and OTP must be 6 digits.
4. Other Features
- Image Upload: Users can upload and preview images in chat (base64, no backend).
- Copy-to-Clipboard: Click the copy icon on any message to copy its content.
- Toast Notifications: Feedback for OTP sent, message sent, chatroom created/deleted, etc.
- Dark Mode: Toggle in the navbar, persists via localStorage.
- Mobile Responsive: Layout adapts for mobile and desktop.
- LocalStorage: Auth and chat data are persisted for session continuity.


