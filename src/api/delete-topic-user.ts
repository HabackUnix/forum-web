// api/get-user.ts
import api from './api';

export const deleteTopicUser = async (topicId: string, userId: string) => {
    const response = await api.post(`topic/delete/${topicId}`, { topicId, userId });
    return response.data.user; // Acessa a chave 'user' da resposta
};

export default deleteTopicUser;