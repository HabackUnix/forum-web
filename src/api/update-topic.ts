// api/get-user.ts
import api from './api';

export const updateTopic = async (topicId: string, title: string, content: string, userId:string, categoryId: string) => {
    const response = await api.post(`topic/${topicId}`, {topicId, title, content, userId, categoryId });
    return response.data;
};

export default updateTopic;