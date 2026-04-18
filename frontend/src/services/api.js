import axios from 'axios';

// Unified connection point to our Python Backend service
const API_BASE_URL = 'http://localhost:5000';

// ---- Auth API ----

// Execute an HTTP POST to securely create a new user entity
export const signupUser = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);
    return response.data;
};

// Dispatch login assertions to backend to spawn a session context
export const loginUser = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
};

// Lookup single user records remotely
export const getUser = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/user/${id}`);
    return response.data;
};

// ---- Parking API ----

// Grabs a complete array of known parking assets available
export const getParkingLots = async () => {
    const response = await axios.get(`${API_BASE_URL}/parking`);
    return response.data;
};

// Intelligently queries slots filtering strictly based on explicit geographic tags
export const searchParkingLots = async (location = '') => {
    // Only pass filter params when effectively supplied by user input
    const params = location ? { location } : {};
    const response = await axios.get(`${API_BASE_URL}/parking`, { params });
    return response.data;
};

// Publishes a fresh Host listing payload to the backend
export const createParkingLot = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/parking`, data);
    return response.data;
};

// Deducts availability from target parking area and emits a JSON payload
export const createBooking = async (parking_id) => {
    const response = await axios.post(`${API_BASE_URL}/book`, { parking_id });
    return response.data;
};
