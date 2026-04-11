import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001';

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
