// api/get-user.ts
import api from './api';

export const confirmReaction = async (type: boolean, userId: string, postId: string) => {
    const response = await api.post('/post/reaction', { type, userId, postId });
    return response.data; // Acessa a chave 'user' da resposta
};

export default confirmReaction;