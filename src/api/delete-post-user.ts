// api/get-user.ts
import api from './api';

export const deletePostUser = async (postId: string, userId: string) => {
    const response = await api.post(`post/${postId}`, { postId, userId });
    return response.data.user; // Acessa a chave 'user' da resposta
};

export default deletePostUser;