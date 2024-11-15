// api/get-user.ts
import api from './api';

export const sendMailPassword = async (email: string) => {
    const response = await api.post('/user/sendmail', { email });
    return response.data; // Acessa a chave 'user' da resposta
};

export default sendMailPassword;