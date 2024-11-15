// api/get-user.ts
import api from './api';

export const createPost = async (content: string, imageUrl: string, userId: string, topicId: string) => {
    const response = await api.post('/posts', { content, imageUrl, userId, topicId });
    return response.data.user; // Acessa a chave 'user' da resposta
};

export default createPost;