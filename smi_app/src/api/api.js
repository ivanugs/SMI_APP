
import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_PROPUESTAS_API_URL } = getEnvVariables();

const api = axios.create({
  baseURL: VITE_PROPUESTAS_API_URL,
});

// Configurar el encabezado Cache-Control en las solicitudes
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  config.headers['Cache-Control'] = 'public, max-age=86400'; 

  const refresh = localStorage.getItem('refresh');
  if (refresh) {
    config.data = {
      ...config.data,
      refresh,
    };
  }
  return config;
});

export default api;
