<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-0.128-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

<h1 align="center">🅿️ ParkEasy</h1>

<p align="center">
  <strong>QR-Based Smart Parking Management System</strong><br/>
  Discover, book, and access parking spaces instantly — powered by QR codes.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-folder-structure">Structure</a> •
  <a href="#-getting-started">Setup</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-how-it-works">Flow</a>
</p>

---

## ✨ Features

- **🔐 User Authentication** — Sign up with username, name, email & phone. Log in with email + phone. Session persists via `localStorage`.
- **🏠 Host Dashboard** — Parking owners can list new spaces with location, type (`free` / `paid` / `emergency`), and total slot capacity.
- **🔍 Smart Search** — Clients search parking by location. Results update in real-time with type filter pills.
- **🎫 Instant Booking** — One-click booking that atomically decrements available slots, with full error handling for sold-out spaces.
- **📱 QR Code Generation** — Every successful booking generates a unique QR code containing booking ID, parking ID, and timestamp — serves as a digital parking pass.
- **👤 User Profile** — Dedicated profile page displaying user details with session management.
- **📊 Live Availability** — Slot counts update in real-time after every booking across all views.
- **🎨 Modern UI** — Glassmorphism, gradient accents, micro-animations, and responsive design built with Tailwind CSS v4.

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI framework |
| **Vite 8** | Lightning-fast dev server & bundler |
| **Tailwind CSS 4** | Utility-first styling |
| **React Router 7** | Client-side routing |
| **Axios** | HTTP client for API communication |
| **QRCode.react** | QR code generation from booking data |
| **Lucide React** | Modern icon library |

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | High-performance Python web framework |
| **SQLAlchemy 2** | ORM for database operations |
| **Pydantic v2** | Data validation & serialization |
| **Uvicorn** | ASGI server |
| **SQLite** | Lightweight file-based database |

---

## 📁 Folder Structure

```
ParkEasy/
├── backend/                          # Python API server
│   ├── app/
│   │   ├── routes/                   # Decoupled API endpoints
│   │   │   ├── auth.py               #   POST /signup, POST /login, GET /user/:id
│   │   │   ├── parking.py            #   POST /parking, GET /parking, GET /parking/:id
│   │   │   └── booking.py            #   POST /book, GET /bookings
│   │   ├── models/                   # Data layer
│   │   │   ├── models.py             #   SQLAlchemy ORM table definitions
│   │   │   └── schemas.py            #   Pydantic request/response schemas
│   │   ├── services/                 # Business logic (extensible)
│   │   └── utils/                    # Helper functions (extensible)
│   ├── config/
│   │   └── database.py               # SQLite engine, session factory, dependency
│   ├── tests/                        # Test suite placeholder
│   ├── main.py                       # FastAPI app entry point
│   └── requirements.txt              # Python dependencies
│
├── frontend/                         # React client application
│   ├── public/                       # Static assets (favicon, icons)
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── Navbar.jsx            #   Auth-aware navigation bar
│   │   │   ├── SearchBar.jsx         #   Location search input
│   │   │   ├── ParkingCard.jsx       #   Parking lot display card
│   │   │   ├── QRModal.jsx           #   QR code popup after booking
│   │   │   └── Sidebar.jsx           #   Off-canvas navigation menu
│   │   ├── pages/                    # Route-level views
│   │   │   ├── Home.jsx              #   Landing page + search + results
│   │   │   ├── Login.jsx             #   Email + phone login form
│   │   │   ├── Signup.jsx            #   Registration form
│   │   │   ├── Profile.jsx           #   User profile details
│   │   │   ├── HostDashboard.jsx     #   Host: manage parking listings
│   │   │   └── ClientDashboard.jsx   #   Client: browse + book + QR
│   │   ├── services/
│   │   │   └── api.js                # Centralized Axios API client
│   │   ├── hooks/
│   │   │   └── AuthContext.jsx       # React Context for auth state
│   │   ├── App.jsx                   # Root component with routing
│   │   ├── main.jsx                  # React DOM entry point
│   │   └── index.css                 # Global styles + Tailwind directives
│   ├── package.json
│   └── vite.config.js
│
├── docs/                             # Documentation (extensible)
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.8+
- **Node.js** 20+ and **npm**
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Satyamsingh202/ParkEasy.git
cd ParkEasy
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate          # Windows

# Install dependencies
pip install -r requirements.txt

# Start the API server
python main.py
```

> ✅ Backend runs at **http://localhost:5000**
>
> 📄 API docs available at **http://localhost:5000/docs** (Swagger UI)

### 3. Frontend Setup

Open a **new terminal**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

> ✅ Frontend runs at **http://localhost:5173**

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/signup` | Register a new user | `{ username, full_name, email, phone }` |
| `POST` | `/login` | Authenticate user | `{ email, phone }` |
| `GET` | `/user/{id}` | Get user by ID | — |

### Parking Management

| Method | Endpoint | Description | Request Body / Params |
|--------|----------|-------------|----------------------|
| `POST` | `/parking` | Create a parking lot | `{ location, type, total_slots }` |
| `GET` | `/parking` | List all parking lots | `?location=` *(optional filter)* |
| `GET` | `/parking/{id}` | Get parking lot by ID | — |

### Booking System

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/book` | Book a parking slot | `{ parking_id }` |
| `GET` | `/bookings` | List all bookings | — |

### Response Examples

<details>
<summary><strong>POST /signup</strong> — 200 OK</summary>

```json
{
  "id": 1,
  "username": "john_doe",
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210"
}
```
</details>

<details>
<summary><strong>POST /book</strong> — 200 OK</summary>

```json
{
  "id": 1,
  "parking_id": 3,
  "timestamp": "2026-04-18T15:30:00",
  "qr_payload": "{\"bookingId\":1,\"parkingId\":3,\"timestamp\":\"2026-04-18T15:30:00\"}"
}
```
</details>

---

## 🔄 How It Works

```
┌──────────────────────────────────────────────────────────────┐
│                        USER FLOW                             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   1. SIGN UP / LOG IN                                        │
│      └─▶ User registers with username, name, email, phone   │
│      └─▶ Credentials validated via FastAPI                   │
│      └─▶ Session stored in localStorage + React Context      │
│                                                              │
│   2. CHOOSE ROLE                                             │
│      ├─▶ HOST: List parking spaces (location, type, slots)   │
│      └─▶ CLIENT: Search & book parking                       │
│                                                              │
│   3. SEARCH PARKING                                          │
│      └─▶ Enter location → GET /parking?location=...          │
│      └─▶ Filter by type: Free / Paid / Emergency             │
│      └─▶ View live slot availability                         │
│                                                              │
│   4. BOOK A SLOT                                             │
│      └─▶ Click "Book Now" → POST /book                       │
│      └─▶ Backend decrements available_slots atomically       │
│      └─▶ Returns booking details + QR payload                │
│                                                              │
│   5. GET QR PASS                                             │
│      └─▶ QR modal appears with scannable booking QR code     │
│      └─▶ Contains: bookingId, parkingId, timestamp           │
│      └─▶ Use QR as digital parking entry pass                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### Users
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | Integer | Primary Key, Auto-increment |
| `username` | String | Indexed |
| `full_name` | String | — |
| `email` | String | Unique, Indexed |
| `phone` | String | — |

### Parking
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | Integer | Primary Key, Auto-increment |
| `location` | String | Indexed |
| `type` | String | `free` / `paid` / `emergency` |
| `total_slots` | Integer | — |
| `available_slots` | Integer | Decremented on booking |

### Bookings
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | Integer | Primary Key, Auto-increment |
| `parking_id` | Integer | Indexed |
| `timestamp` | DateTime | Auto-generated (UTC) |

---

## 📸 Screenshots

> *Screenshots coming soon — run the app locally to preview the full UI.*

| Page | Description |
|------|-------------|
| Home | Hero section, search bar, parking grid with filter pills |
| Sign Up | Registration form with gradient card design |
| Login | Email + phone authentication |
| Client Dashboard | Browse, filter, and book parking slots |
| Host Dashboard | Add new parking spaces, view listings |
| QR Modal | Scannable QR code after successful booking |
| Profile | User details card with logout action |

---

## 🔮 Future Improvements

- [ ] **Password-based authentication** with JWT tokens
- [ ] **Payment integration** for paid parking slots
- [ ] **Google Maps** integration for real-time location search
- [ ] **QR Scanner** to verify passes at parking entry
- [ ] **Booking history** and cancellation support
- [ ] **Admin panel** for parking lot analytics
- [ ] **Mobile app** using React Native
- [ ] **Email/SMS notifications** for booking confirmations
- [ ] **Rate limiting** and security hardening
- [ ] **Docker** deployment configuration

---

## 👥 Contributors

| Name | Role |
|------|------|
| **Satyam Kumar Singh** | Full-Stack Developer |
| *(Add contributors here)* | — |

---

## 📄 License

This project was built for **Hackachinno 3** hackathon.

---

<p align="center">
  Built with ❤️ using React + FastAPI
</p>
