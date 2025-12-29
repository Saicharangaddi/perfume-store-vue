🌸 Perfume Store — Full‑Stack E‑Commerce Web App
A modern, responsive perfume e‑commerce application built with Vue 3 + Vite on the frontend and Node.js + Express + MongoDB Atlas on the backend.
Designed with clean architecture, JWT authentication, persistent cart, and a scalable admin dashboard.

🚀 Features
🖥 Frontend (Vue 3 + Vite)
- Fully responsive UI
- Dynamic product listing
- Category filtering
- Persistent cart synced with backend
- Smooth navigation with Vue Router
- Reusable, modular components
- TailwindCSS for modern styling
- Iconify for scalable icons
🛠 Backend (Node.js + Express + MongoDB Atlas)
- REST API for products, categories, offers, and users
- JWT Authentication (Login, Register, Protected Routes)
- MongoDB Atlas database integration
- Admin dashboard APIs (add/edit/delete products, categories, offers)
- Secure password hashing
- CORS enabled for frontend communication
- Clean controller + route structure
🔗 Full‑Stack Integration
- Frontend communicates with backend via REST API
- Persistent cart stored in MongoDB
- Authenticated routes for user actions
- Admin‑only routes for product management

🧱 Tech Stack

|    Layer         |             Technology            | 
| Frontend         | Vue 3, Vite, TailwindCSS, Iconify | 
| Backend          |     Node.js, Express              | 
| Database         |     MongoDB Atlas                 | 
| Auth             |    JWT (JSON Web Tokens)          | 
| Version Control  |    Git + GitHub                   | 



📁 Project Structure
perfume-store-vue/
│
├── frontend/               # Vue 3 + Vite application
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
├── backend/                # Node.js + Express API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md



⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Saicharangaddi/perfume-store-vue.git
cd perfume-store-vue



2️⃣ Backend Setup
cd backend
npm install
npm start


Backend runs on:
http://localhost:3000


Backend Environment Variables (backend/.env)
PORT=3000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret



3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev


Frontend runs on:
http://localhost:5173



🔗 API Integration
Example API call from frontend:
const response = await fetch("http://localhost:5000/api/products");



🔐 Authentication Flow
- User registers → stored in MongoDB with hashed password
- User logs in → receives JWT token
- Token stored in localStorage
- Protected routes require token
- Cart is synced with backend using user ID

🛍 Admin Dashboard
Admin can:
- Add / Edit / Delete products
- Manage categories
- View user data
- Access protected admin routes

🚀 Future Enhancements (Updated)
Since JWT Auth, MongoDB Atlas, Admin Dashboard, and Persistent Cart are already implemented, here are the next meaningful upgrades:
- 💳 Payment Gateway Integration (Stripe / Razorpay)
- 📦 Inventory Management System
- 📨 Email Notifications (order confirmation, password reset)
- 📊 Analytics Dashboard (sales, users, product performance)
- 🌐 Deployment (Render for backend, Vercel/Netlify for frontend)
- 📱 PWA Support (installable app + offline mode)
- 🔍 Advanced Search & Filters (price range, sorting, fuzzy search)
- 🖼 Cloud Storage for Product Images (Cloudinary / AWS S3)

🤝 Contributing
Pull requests are welcome.
For major changes, please open an issue first to discuss what you’d like to improve.

📄 License
This project is open-source and available under the MIT License.


