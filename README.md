# ParkEasy

A smart parking management system that allows hosts to list parking spaces and clients to discover, book, and access parking spots using QR codes — with built-in user authentication.
## Features

- **User Authentication**: Sign up and log in with email & phone — session persists via localStorage.
- **User Profile**: View your profile details and manage your session from the navbar dropdown or a dedicated profile page.
- **Host Dashboard**: Parking space owners can list their available parking lots with details like location, type (free/paid/emergency), and total slots.
- **Client Dashboard**: Users can browse available parking spaces, filter by type, and book spots instantly.
- **QR Code Access**: Upon booking, clients receive a unique QR code that serves as their parking pass.
- **Real-time Availability**: System tracks available slots and updates in real-time after bookings.
- **Responsive Design**: Modern, mobile-friendly interface built with React and Tailwind CSS.


## Tech Stack

### Backend
- **FastAPI**: High-performance web framework for building APIs
- **SQLAlchemy**: ORM for database operations
- **SQLite**: Lightweight database for development
- **Pydantic**: Data validation and serialization

### Frontend
- **React**: Component-based UI library
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **QRCode.react**: QR code generation library
- **Lucide React**: Icon library

## Project Structure

```
ParkEasy/
├── backend/
│   ├── database.py          # Database configuration and session management
│   ├── main.py              # FastAPI application with all endpoints
│   ├── models.py            # SQLAlchemy models (User, Parking, Booking)
│   ├── schemas.py           # Pydantic schemas for request/response validation
│   ├── parking.db           # SQLite database file
│   └── venv/                # Python virtual environment
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── api.js           # API client functions (auth + parking + booking)
│   │   ├── App.jsx          # Main React component with routing
│   │   ├── main.jsx         # React app entry point
│   │   ├── index.css        # Global styles
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth context with localStorage persistence
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Sticky navbar with auth buttons / profile dropdown
│   │   │   └── QRModal.jsx        # QR code display modal
│   │   └── pages/
│   │       ├── Home.jsx           # Landing page with hero, features, role selection
│   │       ├── Login.jsx          # Login page (email + phone)
│   │       ├── Signup.jsx         # Sign up page (username, name, email, phone)
│   │       ├── Profile.jsx        # User profile page with details & logout
│   │       ├── HostDashboard.jsx  # Host interface for managing parking
│   │       └── ClientDashboard.jsx # Client interface for booking
│   ├── index.html           # HTML entry point with SEO meta & Google Fonts
│   ├── package.json         # Node.js dependencies and scripts
│   ├── vite.config.js       # Vite configuration
│   └── eslint.config.js     # ESLint configuration
└── README.md
```

## API Endpoints

### User Authentication
- `POST /signup` - Create a new user account (username, full_name, email, phone)
- `POST /login` - Log in with email + phone, returns user data
- `GET /user/{id}` - Get user profile by ID

### Parking Management
- `POST /parking` - Create a new parking lot
- `GET /parking` - Get all parking lots
- `GET /parking/{id}` - Get specific parking lot by ID

### Booking System
- `POST /book` - Create a new booking and generate QR code
- `GET /bookings` - Get all bookings

## Database Models

### User
| Field     | Type    | Notes         |
|-----------|---------|---------------|
| id        | Integer | Primary Key   |
| username  | String  | Indexed       |
| full_name | String  |               |
| email     | String  | Unique, Indexed |
| phone     | String  |               |

### Parking
| Field           | Type    | Notes       |
|-----------------|---------|-------------|
| id              | Integer | Primary Key |
| location        | String  | Indexed     |
| type            | String  | free/paid/emergency |
| total_slots     | Integer |             |
| available_slots | Integer |             |

### Booking
| Field      | Type     | Notes       |
|------------|----------|-------------|
| id         | Integer  | Primary Key |
| parking_id | Integer  | Indexed     |
| timestamp  | DateTime | Auto-generated |

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 20.19+ or 22+
- npm

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic
   ```

4. Run the backend server:
   ```bash
   uvicorn main:app --reload --port 8001
   ```

The API will be available at `http://localhost:8001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Usage

1. Open the application at `http://localhost:5173`
2. **Sign Up**: Create an account with your username, name, email, and phone
3. **Log In**: Use your email + phone to log back in
4. Choose your role: **Host** or **Client**
5. **As a Host**: Add parking spaces with location, type, and capacity
6. **As a Client**: Browse available spots, filter by type, select one, and book it
7. Receive a **QR code** that serves as your parking pass
8. **Profile**: Click your avatar in the navbar to view profile or log out

## Authentication Flow

```
Home Page → Sign Up / Log In
    ↓
Credentials validated via FastAPI
    ↓
User data stored in localStorage + React Context
    ↓
Navbar updates: shows avatar + profile dropdown
    ↓
Client Dashboard → Book Parking → QR Generated
    ↓
Logout clears session → redirects to Home
```

## Development

### Running Tests
- Backend: Add tests in a `tests/` directory using pytest
- Frontend: Run `npm run lint` for code quality checks

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
# Deploy FastAPI app using your preferred method (Docker, server, etc.)
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is developed for Hackachinno 3 hackathon.
