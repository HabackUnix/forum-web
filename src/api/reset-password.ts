// api/get-user.ts
import api from './api';

export const resetPassword = async (id: string, password: string) => {
    const response = await api.put(`/user/${id}/reset-password`, { id, password });
    return response.data.userInfo; // Acessa a chave 'user' da resposta
};

export default resetPassword;