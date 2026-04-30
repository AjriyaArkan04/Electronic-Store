import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ||
  'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000, // biar gak infinite "network error"
  headers: {
    'Content-Type': 'application/json',
  },
});

// =======================
// REQUEST INTERCEPTOR
// =======================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // DEBUG (hapus kalau sudah stabil)
    console.log('[API REQUEST]', config.method?.toUpperCase(), config.url);

    return config;
  },
  (error) => {
    console.error('[REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

// =======================
// RESPONSE INTERCEPTOR
// =======================
api.interceptors.response.use(
  (response) => {
    console.log('[API RESPONSE]', response.config.url, response.status);
    return response;
  },
  (error) => {
    // DEBUG ERROR DETAIL (INI PENTING BUAT KAMU)
    console.error('[API ERROR]', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });

    // HANDLE UNAUTHORIZED
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    // HANDLE NETWORK ERROR (INI YANG KAMU ALAMI)
    if (error.message === 'Network Error') {
      console.error(
        'NETWORK ERROR: cek backend URL / CORS / Railway status'
      );
    }

    return Promise.reject(error);
  }
);

export default api;