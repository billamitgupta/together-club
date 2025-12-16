const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    // Debug logging
    console.log('API Service initialized with URL:', this.baseURL);
    console.log('Environment variables:', {
      REACT_APP_API_URL: process.env.REACT_APP_API_URL,
      NODE_ENV: process.env.NODE_ENV
    });
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Booking endpoints
  async createOrder(orderData) {
    return this.request('/api/create-order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async verifyPayment(paymentData) {
    return this.request('/api/verify-payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Invite request endpoints
  async submitInviteRequest(requestData) {
    return this.request('/api/request-invite', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  // Get available slots
  async getAvailableSlots() {
    return this.request('/api/available-slots');
  }

  // Admin endpoints
  async getBookings() {
    return this.request('/api/bookings');
  }

  async getInviteRequests() {
    return this.request('/api/invite-requests');
  }
}

const apiService = new ApiService();
export default apiService;