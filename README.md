🌸 Perfume Store — Full‑Stack E‑Commerce Web App
A modern, responsive perfume e‑commerce application built with Vue 3 + Vite on the frontend and Node.js + Express on the backend.
Designed for scalability, clean architecture, and a smooth shopping experience.

🚀 Features
🖥 Frontend (Vue 3 + Vite)
- ✅ Fully responsive UI
- ✅ Dynamic product listing
- ✅ Category filtering
- ✅ Cart management
- ✅ Smooth navigation with Vue Router
- ✅ Reusable component
- ✅ Fast development with Vite
🛠 Backend (Node.js + Express)
- ✅ REST API for products, categories, offers, and user actions
- ✅ Clean route/controller structure
- ✅ Environment‑based configuration
- ✅ CORS enabled for frontend communication
- ✅ Scalable folder architecture
🔗 Full‑Stack Integration
- ✅ Frontend connected to backend API
- ✅ Fetches real pr
- ✅ Unified project structure (frontend/ + backend/)
- ✅ Ready for deployment (frontend + backend separately or combined)

🧱 Tech Stack
| Layer           | Technology  | 
| Frontend        | Vue 3, Vite, TailwindCSS, Iconify  | 
| Backend         | Node.js, Express | 
| Package Manager | npm | 
| Version Control | Git + GitHub  | 



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
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
⚙️ Installation & Setup
✅ 1. Clone the repository
git clone https://github.com/Saicharangaddi/perfume-store-vue.git
cd perfume-store-vue



✅ 2. Setup Backend
cd backend
npm install
npm start
Backend runs on:
http://localhost:5000



✅ 3. Setup Frontend
cd ../frontend
npm install
npm run dev


Frontend runs on:
http://localhost:5173




🔗 API Integration
Your frontend communicates with the backend using:
http://localhost:5000/api/...


Example:
const response = await fetch("http://localhost:5000/api/products");



📦 Environment Variables
Create a .env file inside backend/:
PORT=5000
MONGO_URI=your_database_url   # if using DB later



✅ Future Enhancements
- 🛍 Order Management System
Allow users to place orders, view order history, and track order status.
- 👑 Admin Dashboard
Manage products, categories, offers, and users with a secure admin panel.
- 💳 Payment Gateway Integration
Add Stripe, Razorpay, or PayPal for real online payments.
- 📦 Inventory Management
Track stock levels, auto‑update inventory after purchases.
- 🖼 Product Image Uploads (Cloud Storage)
Integrate Cloudinary, AWS S3, or Firebase Storage for image hosting.
- 📊 Analytics & Insights
Dashboard for sales, user activity, and product performance.
- 🌐 Deployment
Deploy backend (Render/Heroku) and frontend (Vercel/Netlify) with environment variables.
- 📱 PWA Support
Make the app installable on mobile and support offline browsing.
- 🔍 Search & Filters Upgrade
Add fuzzy search, price filters, and advanced sorting.
- 📨 Email Notifications
Order confirmation emails, password reset emails, etc.

🤝 Contributing
Pull requests are welcome.
For major changes, please open an issue first to discuss what you’d like to improve.

📄 License
This project is open-source and available under the MIT License.








