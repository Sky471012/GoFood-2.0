# 🍕 GoFood – Full Stack Food Delivery Web App

**GoFood** is a full-stack food delivery web application where users can explore dishes, place orders, and enjoy a smooth online food ordering experience. This is my **first full-stack MERN project**, built with React, Express, MongoDB, and Node.js. GoFood features user authentication, dynamic UI, and secure data handling.

---

## ✨ Features

- 🔐 User Registration & Login (JWT-based)
- 🛍️ Add to Cart & Checkout
- 🍽️ Browse food categories & items
- 📜 View previous orders
- 📦 RESTful API integration (Express + MongoDB)
- ⚡ Fast frontend powered by Vite + React 19

---

## 🔧 Tech Stack

### Frontend:
- React 19 + Vite
- React Router DOM v7
- Bootstrap 5 + MUI (Material UI)
- Emotion (for styled components)

### Backend:
- Node.js + Express
- MongoDB with Mongoose
- JWT for Authentication
- bcryptjs for password hashing
- dotenv for environment variables
- express-validator for input validation

---

## 📁 Folder Structure
GoFood/
├── backend/                      # Backend (Express + MongoDB)
│   ├── controllers/             # Logic for handling routes
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # API endpoints
│   ├── middleware/              # Auth, validation middlewares
│   ├── config/                  # DB connection, config files
│   ├── .env                     # Environment variables
│   ├── index.js                 # Main server file (entry point)
│   ├── package.json             # Backend dependencies
│
├── public/                      # Public assets
│   └── favicon.ico              # App icon
│
├── src/                         # Frontend (React + Vite)
│   ├── components/             # Reusable UI elements (e.g., Navbar, Cards)
│   ├── screens/                # Pages (e.g., Home, Login, Cart)
│   ├── context/                # Context Providers (e.g., Cart, Auth)
│   ├── hooks/                  # Custom React hooks
│   ├── App.jsx                 # Main App component
│   ├── main.jsx                # React DOM render
│   ├── index.css               # Global styles
│   ├── App.css                 # App-specific styles
│
├── server.js                   # (Optional) server config or proxy
├── vite.config.js              # Vite configuration
├── package.json                # Frontend dependencies
├── .gitignore
├── README.md


---

## 🚀 Getting Started

### 1. Clone the repository
git clone https://github.com/Sky471012/GoFood.git
cd gofood

### 2. Install Frontend Dependencies
npm install

### 3. Install Backend Dependencies
cd backend
npm install

### 4. Create a .env file in /backend folder
MONGO_URI = your_mongodb_connection_string

### 5. Run the App
In one terminal (Backend):
cd backend
nodemon .\index.js

In another terminal (Frontend):
npm run dev

