// api/get-user.ts
import api from './api';

export const verifyUser = async (email: string, password: string) => {
    const response = await api.post('/user/verify', { email, password });
    return response.data.userData; // Acessa a chave 'user' da resposta
};

export default verifyUser;