// api/get-user.ts
import api from './api';

export const getTopics = async (userId: string) => {
    const response = await api.get(`/topics/${userId}`);
    return response.data.topics; // Acessa a chave 'user' da resposta
};

export default getTopics;