import axios from 'axios';

// Set Base URL for the API. When running locally, it hits the Express backend on port 5000.
// In production (Vercel), it should use the Render backend URL provided via VITE_API_URL environment variable.
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Ensure all requests send credentials (cookies) for authentication
axios.defaults.withCredentials = true;
