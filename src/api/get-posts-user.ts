// api/get-user.ts
import api from './api';

export const getPostsUser = async (userId: string) => {
    const response = await api.get(`/posts/${userId}`);
    return response.data.posts; // Acessa a chave 'user' da resposta
};

export default getPostsUser;