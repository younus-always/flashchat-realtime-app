# ⚡ FlashChat – Realtime Chat Application

FlashChat is a modern **real-time chat application** built using a full-stack TypeScript monorepo architecture. It features instant messaging powered by WebSockets, secure authentication, responsive UI components, and scalable backend services.

The project is structured into two main applications:

- `client/` – Frontend (React + Vite + Tailwind)
- `server/` – Backend (Node.js + Express + Socket.IO + MongoDB)

---

## 📚 Table of Contents

- [Introduction](#introduction)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API & Real-time Communication](#api--real-time-communication)
- [Dependencies](#dependencies)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

---

## 🚀 Introduction

FlashChat is a full-stack real-time messaging platform designed for speed, scalability, and modern user experience. It uses **Socket.IO** for live communication and follows best practices in authentication, validation, and state management.

The monorepo setup ensures clean separation between frontend and backend while keeping development streamlined.

---

### Client

- React 18
- Vite
- TailwindCSS 4
- Zustand (state management)
- React Hook Form + Zod validation
- Socket.IO Client

### Server

- Express 5
- MongoDB (Mongoose)
- Socket.IO
- Passport JWT Authentication
- Cloudinary (media storage)
- Google AI SDK (AI integration support)

---

## ✨ Features

- 🔐 JWT-based Authentication
- ⚡ Real-time messaging via WebSockets
- 👤 User avatars (Cloudinary support)
- 📁 Media upload capability
- 🧠 AI-powered features (Google AI SDK integration)
- 📱 Responsive modern UI (Radix UI + Tailwind)
- 🌙 Dark/Light mode support
- 🧩 Form validation with Zod
- 🔔 Toast notifications
- 🧱 Modular & scalable architecture

---

## 🛠 Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- TailwindCSS 4
- Zustand
- React Router v7
- Socket.IO Client
- Axios

### Backend

- Node.js
- Express 5
- TypeScript
- MongoDB + Mongoose
- Socket.IO
- Passport + JWT
- Cloudinary
- Zod

---

## 📂 Project Structure

### Client

client/
├── src/
├── public/
├── package.json
└── vite.config.ts

### Server

server/
├── src/
├── dist/
├── package.json
└── tsconfig.json

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/younus-always/flashchat-realtime-app.git
cd flashchat-realtime-app
```

#### 2️⃣ Install Dependencies

##### Client

```bash
cd client
npm install
```

##### Server

```bash
cd server
npm install
```

### 🔧 Configuration

Create a .env file inside the server/ directory:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_AI_API_KEY=your_google_api_key
```

You may also configure environment variables for the client/ if required (e.g., API base URL).

### ▶️ Usage

#### Run Backend (Development)

```bash
cd server
npm run dev
```

#### Run Frontend (Development)

```bash
cd client
npm run dev
```

##### Frontend runs on:

```bash
http://localhost:5173
```

##### Backend runs on:

```bash
http://localhost:5000
```

### 🔌 API & Real-time Communication

### REST API

- Authentication routes (login/register)

- User management

- Message history

- Media upload

### WebSockets

- Real-time messaging

- Typing indicators

- Online status

- Room-based communication

Socket.IO ensures low-latency bi-directional communication between client and server.

### 📦 Dependencies

### Client Key Dependencies

- react

- react-router-dom

- socket.io-client

- zustand

- zod

- tailwindcss

- react-hook-form

- axios

### Server Key Dependencies

- express

- mongoose

- socket.io

- passport-jwt

- jsonwebtoken

- bcryptjs

- cloudinary

- @ai-sdk/google

### 🧪 Examples

### Sending a Message (Client-Side Socket Example)

```bash
socket.emit("send_message", {
  roomId,
  message,
  senderId
});
```

### Listening for Messages

```bash
socket.on("receive_message", (data) => {
  console.log(data);
});
```

### 🛑 Troubleshooting

### MongoDB Connection Errors

- Ensure MONGO_URI is valid

- Check MongoDB service is running

### CORS Issues

- Verify backend CORS configuration

- Confirm correct API base URL on client

### Socket Connection Fails

- Ensure backend server is running

- Check matching Socket.IO versions

- Verify correct socket endpoint

### 👥 Contributors

Project Author – MD. Younus Islam

### 📄 License

This project is licensed under the ISC License.

