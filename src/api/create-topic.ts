// api/get-user.ts
import api from './api';

export const createTopic = async (title: string, content: string, userId:string, categoryId: string) => {
    const response = await api.post('/topics', { title, content, userId, categoryId });
    return response.data; // Acessa a chave 'user' da resposta
};

export default createTopic;