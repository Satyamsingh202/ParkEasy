# ParkEasy

A smart, modular parking management system that allows hosts to list parking spaces and clients to discover, book, and access parking spots using auto-generated QR codes. The project has been strictly structured with a clear separation of frontend and backend technologies.

## Features

- **User Authentication:** Robust sign up and log in flow. Session persists via frontend storage context.
- **RESTful Modularity:** The FastAPI backend is structured cleanly into routes, models, and independent configs.
- **Host Dashboard:** Parking space owners can list their available parking lots with details like location, type (free/paid/emergency), and total slots.
- **Client Dashboard:** Users can browse available parking spaces, filter by type, and book spots instantly.
- **QR Code Access:** Upon booking, clients receive a unique QR code that serves as their parking pass.
- **Real-time Availability:** The SQLite database cleanly subtracts availability atomically during booking events.
- **Modern React:** Component-based UI with responsive Tailwind CSS scaling.

## Folder Structure

The project has been refactored into a strict separation of concerns architecture.

```
ParkEasy/
├── backend/                  # Python backend application
│   ├── app/
│   │   ├── routes/           # Decoupled FastAPI routing endpoints
│   │   │   ├── auth.py
│   │   │   ├── parking.py
│   │   │   └── booking.py
│   │   ├── models/           # Database declarations and Pydantic schemas
│   │   │   ├── models.py
│   │   │   └── schemas.py
│   │   ├── services/         # Extensible business logic
│   │   ├── utils/            # Helper scripts 
│   │   └── __init__.py
│   ├── config/               # System setups
│   │   └── database.py       # SQLite connection logic
│   ├── tests/                # Automated unit tests placeholder
│   └── main.py               # Root application entry point
├── frontend/                 # React frontend application
│   ├── public/               # Static web assets
│   ├── src/
│   │   ├── components/       # Reusable UI parts (Navbar, Sidebar, etc.)
│   │   ├── pages/            # View-level routing pages
│   │   ├── services/         # Remote data synchronization layer
│   │   │   └── api.js        # Centralized HTTP request utility
│   │   ├── hooks/            # Decoupled custom React logics
│   │   │   └── AuthContext.jsx # Tree-level Session management
│   │   ├── App.jsx           # Global component routing hub
│   │   ├── main.jsx          # React initialization
│   │   └── index.css         # Tailwind directives
│   ├── package.json          # Node dependency instructions
│   └── vite.config.js        # Build configuration
├── docs/                     # Project documentation placeholder
├── .gitignore                # Source control filters
└── README.md                 # Primary project documentation
```

## How It Works

1. **Frontend Flow:** When an action occurs on the React UI (such as clicking "Book"), it calls a service mapped in `frontend/src/services/api.js`.
2. **REST Connection:** `api.js` points to `http://localhost:5000` (the standard Backend execution port).
3. **Backend Flow:** That request arrives at `backend/main.py`, which is hooked into the granular sub-routers inside `backend/app/routes/`.
4. **Data Translation:** The routes validate input via `schemas.py` and modify actual persistent data stores handled in `models.py` connected through `config/database.py`.

## Setup Instructions

### 1. Backend Setup

The backend handles core validation, routing, and database integrity.

```bash
# Navigate into the core backend directory
cd backend

# (Optional but recommended) Provision a localized python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install strictly targeted backend requirements
pip install -r requirements.txt

# Start the application server natively
python main.py
```
*Note: The API will be natively served at `http://localhost:5000`.*

### 2. Frontend Setup

The frontend connects directly to your local instance.

```bash
# Navigate into the frontend ecosystem
cd frontend

# Install node dependencies
npm install

# Start the optimized Vite development environment
npm run dev
```
*Note: The Web Dashboard will locally deploy at standard Vite ports (e.g. `http://localhost:5173`)*

## Contributing

The repository uses strict logical separation to minimize merge conflicts. Please route visual component updates to `frontend/src/components/`, data queries to `frontend/src/services/`, and API expansions to `backend/app/routes/`. Ensure your pull requests do not disrupt the core `models.py` structural boundaries.
