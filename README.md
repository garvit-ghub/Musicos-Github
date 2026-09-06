# Musicos

A full-stack MERN e-commerce platform for selling and purchasing online musical instrument courses. Built with React, Node.js, Express, and MongoDB.

![Musicos](frontend/public/musicos_logo.jpg)

## Features

### User Features
- Browse 15+ music courses across 9 categories (Guitar, Keyboard, Vocals, Percussion, Violin, Flute, Sitar, Saxophone, Harmonium)
- Search and filter courses in real-time
- Shopping cart with persistent state (Redux + localStorage)
- Secure payment via Razorpay
- OTP email verification during registration
- Order history and automatic course delivery via email

### Admin Features
- Dashboard with real-time stats (users, orders, products, revenue)
- Full CRUD for courses with Cloudinary image uploads
- Order management with status updates
- User directory

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Redux Toolkit, React Router v7 |
| Backend | Node.js, Express 5 |
| Database | MongoDB (Mongoose) |
| Authentication | JWT, bcryptjs, OTP via Nodemailer |
| Payments | Razorpay |
| Image Hosting | Cloudinary |

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm
- MongoDB Atlas account (or local MongoDB)
- Razorpay account (test mode)
- Cloudinary account
- Gmail account (for SMTP)

### Installation

```bash
# Clone the repository
git clone https://github.com/garvit-ghub/Musicos.git
cd Musicos

# Install all dependencies (root + backend + frontend)
npm run install-all
```

### Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories.

**backend/.env**

```env
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=http://localhost:3001
NODE_ENV=development
```

**frontend/.env**

```env
PORT=3001
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
REACT_APP_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Seed Database

```bash
npm run seed
```

**Test Credentials (password: `123456`)**

| Role | Email |
|---|---|
| Admin | admin@musicos.com |
| User (verified) | john@musicos.com |
| User (unverified) | jane@musicos.com |

### Run Development Server

```bash
npm run dev
```

- Frontend: `http://localhost:3001`
- Backend: `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register (sends OTP email) |
| POST | `/api/auth/verify-otp` | Public | Verify OTP code |
| POST | `/api/auth/resend-otp` | Public | Resend OTP (rate-limited) |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/users` | Admin | List all users |

### Products

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get single product |
| POST | `/api/products` | Admin | Create product (multipart) |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

### Orders

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/orders` | User | Create order |
| GET | `/api/orders/my` | User | Get current user's orders |
| GET | `/api/orders` | Admin | Get all orders |
| PUT | `/api/orders/:id/status` | Admin | Update order status |

### Payments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/payments/order` | Public | Create Razorpay order |
| POST | `/api/payments/verify` | Public | Verify payment |

### Analytics

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/analytics` | Admin | Dashboard stats |

## Project Structure

```
Musicos/
├── backend/
│   ├── config/          # DB and Cloudinary config
│   ├── controllers/     # Route handlers
│   ├── middleware/       # Auth and admin middleware
│   ├── model/           # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Email utilities
│   └── index.js         # Server entry point
├── frontend/
│   ├── public/          # Static assets
│   └── src/
│       ├── admin/       # Admin panel pages
│       ├── components/  # Reusable components
│       ├── context/     # Auth context
│       ├── pages/       # User-facing pages
│       ├── redux/       # Redux store & slices
│       └── styles/      # CSS files
├── package.json         # Root orchestration scripts
└── README.md
```

## Author

**Garvit Saini**

- [GitHub](https://github.com/garvit-ghub)
- [LinkedIn](https://www.linkedin.com/in/garvit-saini-7ab5b2329)

## License

This project is open source and available under the [MIT License](LICENSE).
