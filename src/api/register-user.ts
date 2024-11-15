// api/get-user.ts
import api from './api';

export const registerUser = async (name: string, username: string, email: string, password: string) => {
    const response = await api.post('/users', { name, username, email, password });
    return response.data.user; // Acessa a chave 'user' da resposta
};

export default registerUser;