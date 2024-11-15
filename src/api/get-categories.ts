// api/get-user.ts
import api from './api';

export const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data.categories; // Acessa a chave 'user' da resposta
};

export default getCategories;