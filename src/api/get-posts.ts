// api/get-user.ts
import api from './api';

export const getPosts = async () => {
    const response = await api.get(`/posts`);
    return response.data.post; // Acessa a chave 'user' da resposta
};

export default getPosts;