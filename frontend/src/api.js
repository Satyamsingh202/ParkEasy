import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001';

// ---- Auth API ----

export const signupUser = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
};

export const getUser = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/user/${id}`);
    return response.data;
};

// ---- Parking API ----

export const getParkingLots = async () => {
    const response = await axios.get(`${API_BASE_URL}/parking`);
    return response.data;
};

export const createParkingLot = async (data) => {
    const response = await axios.post(`${API_BASE_URL}/parking`, data);
    return response.data;
};

export const createBooking = async (parking_id) => {
    const response = await axios.post(`${API_BASE_URL}/book`, { parking_id });
    return response.data;
};
