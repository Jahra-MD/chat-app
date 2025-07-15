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
```
gemini-frontend/
└── src/
    ├── components/
    │   ├── ChatroomList.jsx      # Sidebar: chatroom list, create/delete chatroom
    │   ├── ChatroomList.css
    │   ├── ChatWindow.jsx        # Main chat UI: messages, input, image upload, infinite scroll
    │   ├── ChatWindow.css
    │   ├── Login.jsx             # OTP login/signup form
    │   ├── Login.css
    │   ├── Toast.jsx             # Toast notification system
    │   └── Toast.css
    ├── store.js                  # Zustand store for chatrooms, messages, user state
    ├── App.jsx                   # App layout, routing, dark mode support
    ├── App.css
    ├── main.jsx                  # React app entry point
    └── index.css                 # Global styles
```
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

Screenshot
login page
<img width="940" height="423" alt="image" src="https://github.com/user-attachments/assets/b48ff0c7-e76c-4d91-866e-94531f6559f9" />

otp based login
<img width="940" height="471" alt="image" src="https://github.com/user-attachments/assets/76f371a3-1844-4df6-890f-8f65a2ee0b9f" />

otp validation
<img width="940" height="496" alt="image" src="https://github.com/user-attachments/assets/696fb45b-7e2d-4a6b-9ab0-0934d71ff4f5" />

chatroom page after login
<img width="940" height="420" alt="image" src="https://github.com/user-attachments/assets/d33c8daf-319b-407c-9cc7-04c461e86634" />

toggle button for dark mode
<img width="940" height="428" alt="image" src="https://github.com/user-attachments/assets/51589dcb-aa6f-4889-8928-c9a9ff98532a" />

chatroom creation
<img width="940" height="418" alt="image" src="https://github.com/user-attachments/assets/a4366d18-6231-433b-aa2a-8e08854ac3fd" />

chatroom message sending
<img width="940" height="424" alt="image" src="https://github.com/user-attachments/assets/e15a1478-7612-42bf-ad05-913a3cb47f56" />

infinite reverse scrolling
<img width="940" height="413" alt="image" src="https://github.com/user-attachments/assets/6f965a54-188e-4590-bbaf-8c94b0a346a0" />

image sending to chatroom
<img width="940" height="295" alt="image" src="https://github.com/user-attachments/assets/6aa1fdbd-23e7-43a4-a13b-5c2a18f5c6e6" />

copy to clipboard on message section
<img width="940" height="424" alt="image" src="https://github.com/user-attachments/assets/05070db5-8b60-4e7c-b0d7-0bdc74952715" />















