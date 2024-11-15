// api/get-user.ts
import api from './api';

export const verifyResetCode = async (resetToken: string) => {
    const response = await api.post('/user/verify-token', { resetToken });
    return response.data.resetToken;
};

export default verifyResetCode;