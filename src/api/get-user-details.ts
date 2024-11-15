// api/get-user.ts
import api from './api';

export const getUserDetails = async (userId: string) => {
    const response = await api.get(`/user/${userId}`);
    return response.data.user; // Acessa a chave 'user' da resposta
};

export default getUserDetails;