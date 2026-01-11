# Tensor Technology - E-Commerce Platform

A full-stack electronics e-commerce application built with the **MERN Stack** (MongoDB, Express, React, Node.js). Features a modern, responsive UI with **Tailwind CSS**, dynamic product filtering, cart management, and user authentication.

![Tensor Technology Banner](/client/public/logo.svg)

## 🚀 Features

### Frontend (Client)
-   **Modern UI/UX**: Built with React + Vite and styled with Tailwind CSS.
-   **Responsive Design**: Mobile-first architecture ensuring compatibility across all devices.
-   **Product Management**: Browse by category, search functionality, and advanced filtering (Price, Brand).
-   **Shopping Cart**: Dynamic cart with quantity adjustments and persisted state.
-   **Wishlist**: Save favorite items for later.
-   **User Authentication**: Login/Register functionality with JWT (JSON Web Tokens).
-   **Admin Panel**: specific interface for adding new products (Image upload supported).
-   **State Management**: Context API for Cart, Wishlist, and Authentication.

### Backend (Server)
-   **RESTful API**: Built with Node.js and Express. It serves products, handles auth, and manages orders.
-   **Database**: MongoDB Atlas for scalable data storage.
-   **Security**: Password hashing (bcrypt) and JWT authentication.
-   **Image Handling**: Support for image uploads (Multer).

## 🛠️ Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS, Lucide React (Icons), Swiper (Carousels), Axios.
-   **Backend**: Node.js, Express.js, CORS, .env.
-   **Database**: MongoDB, Mongoose.

## 📦 Installation & Setup

### Prerequisites
-   Node.js (v16+)
-   MongoDB Atlas Account (Connection String)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Tensor-Technology
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm start
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `client` folder:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
# Client runs on http://localhost:5173 (usually)
```

## 🚀 Deployment

### Backend (Render)
1.  Connect your repo to Render.
2.  Set Root Directory to `server`.
3.  Add Environment Variable `MONGODB_URI`.
4.  Build Command: `npm install`.
5.  Start Command: `node server.js`.

### Frontend (Vercel)
1.  Import your repo to Vercel.
2.  Set Root Directory to `client`.
3.  Add Environment Variable `VITE_API_URL` (Your Render Backend URL).
4.  Deploy.

## 📁 Project Structure

```
Tensor-Technology/
├── client/                 # React Frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components (Header, Footer, ProductCard)
│   │   ├── context/        # Global State (Auth, Cart, Wishlist)
│   │   ├── pages/          # Route Pages (Home, Shop, Cart, Admin)
│   │   └── ...
│   ├── .env                # Local Environment Variables
│   └── vercel.json         # Deployment Config
│
└── server/                 # Node.js Backend
    ├── models/             # Mongoose Schemas (User, Product)
    ├── routes/             # API Routes
    ├── uploads/            # Image Storage
    └── server.js           # Entry Point
```

## 📝 License
This project is open source and available under the [MIT License](LICENSE).
