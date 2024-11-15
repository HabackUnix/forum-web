import axios from 'axios';

// Crie uma instância do axios com configuração padrão
const api = axios.create({
  baseURL: 'app-forum-app-forum.up.railway.app', // Substitua pela URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;