// api/update-post.ts
import api from './api';

export const updatePost = async (
    postId: string, 
    content: string, 
    topicId: string, 
    image_url: string, 
    userId: string
) => {
    // Defina o valor padrão da imagem
    const defaultImageUrl = "https://icons.veryicon.com/png/o/miscellaneous/light-e-treasure-3/forum-9.png"; // URL da imagem padrão

    // Se image_url não estiver definido ou estiver vazio, use a imagem padrão
    if (!image_url || image_url.trim() === "") {
        image_url = defaultImageUrl;
    }

    // Faça a requisição de atualização do post
    const response = await api.put(`/post/${postId}`, { postId, content, topicId, image_url, userId });
    return response.data;
};

export default updatePost;
