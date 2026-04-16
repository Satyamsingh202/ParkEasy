# ParkEasy

A smart parking management system that allows hosts to list parking spaces and clients to discover, book, and access parking spots using QR codes.

## Features

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

## Project Structure

```
ParkEasy/
├── backend/
│   ├── database.py      # Database configuration and session management
│   ├── main.py          # FastAPI application with endpoints
│   ├── models.py        # SQLAlchemy models (Parking, Booking)
│   ├── schemas.py       # Pydantic schemas for request/response validation
│   ├── parking.db       # SQLite database file
│   └── venv/            # Python virtual environment
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── api.js       # API client functions
│   │   ├── App.jsx      # Main React component with routing
│   │   ├── main.jsx     # React app entry point
│   │   ├── components/
│   │   │   └── QRModal.jsx  # QR code display modal
│   │   └── pages/
│   │       ├── Home.jsx         # Landing page with role selection
│   │       ├── HostDashboard.jsx    # Host interface for managing parking
│   │       └── ClientDashboard.jsx  # Client interface for booking
│   ├── package.json    # Node.js dependencies and scripts
│   ├── vite.config.js  # Vite configuration
│   └── eslint.config.js # ESLint configuration
└── README.md
```

## API Endpoints

### Parking Management
- `POST /parking` - Create a new parking lot
- `GET /parking` - Get all parking lots
- `GET /parking/{id}` - Get specific parking lot by ID

### Booking System
- `POST /book` - Create a new booking and generate QR code
- `GET /bookings` - Get all bookings

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Upgrade pip and install dependencies:
   ```bash
   pip install --upgrade pip
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
   npm run dev -- --host 0.0.0.0 --port 5173
   ```

The frontend will be available at `http://localhost:5173`

## Usage

1. Open the application in your browser
2. Choose your role: Host or Client
3. **As a Host**: Add parking spaces with location and capacity
4. **As a Client**: Browse available spots, select one, and book it
5. Receive a QR code that serves as your parking pass

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
