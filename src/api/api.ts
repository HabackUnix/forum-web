import axios from 'axios';

// Crie uma instância do axios com configuração padrão
const api = axios.create({
  baseURL: 'http://localhost:3333', // Substitua pela URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;