import React, { useState, useEffect } from 'react';
import resetPassword from '../../api/reset-password';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ResetPassword {
  id: string;
  password: string;
}

const ResetPasswordComponent = () => {
  const [userInfoData, setUserInfoData] = useState<ResetPassword>({
    id: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // Estado para a confirmação da senha
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true); // Estado para verificar se as senhas são iguais
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Estado para controlar o spinner
  const navigate = useNavigate();

  useEffect(() => {
    // Obter o ID do usuário do localStorage e definir no estado
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserInfoData((prevData) => ({
        ...prevData,
        id: storedUserId,
      }));
    }
  }, []);

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!passwordsMatch) {
      setErrorMessage('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    try {
      const userData = await resetPassword(userInfoData.id, userInfoData.password);
      setErrorMessage(null);
      setSuccessMessage('Senha alterada com sucesso!');
      localStorage.removeItem('isValidResetCode');
      console.log('Dados do usuário:', userData);
      
    } catch (error) {
      setErrorMessage('Falha na redefinição de senha. Verifique suas credenciais.');
      setSuccessMessage(null);
      console.error('Erro ao redefinir senha do usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };


  useEffect(() => {

    const standbyRoute = localStorage.getItem('standby');
    const isValidResetCode = localStorage.getItem('isValidResetCode');
    const token = localStorage.getItem('authToken');

    if (token) {
      navigate('/home', { replace: true });// Redireciona para a página inicial se o usuário já estiver logado
    }

    setPasswordsMatch(userInfoData.password === confirmPassword);
  
      // Verifica se o authToken não existe e redireciona para a página de login
      if (!isValidResetCode) {
        navigate('/login', { replace: true });
      }

  
    if (standbyRoute) {
      localStorage.removeItem('validatedEmail');
      localStorage.removeItem('standby');
    }

    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);

        navigate('/login');

      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, navigate, successMessage, userInfoData.password, confirmPassword]);

  return (
    <div className="flex justify-center items-center flex-col gap-7 bg-zinc-800 mx-auto w-full h-full">
      <h2 className="text-center text-lg font-bold text-white">
        FORUM WEB - <span className="text-blue-500">IFAP</span>
      </h2>
      <p className="text-zinc-400">Informe sua nova senha!</p>
      <form
        onSubmit={handleResetPassword}
        className="p-2 flex flex-col gap-4 justify-center items-center w-96"
      >
        <div className="w-full">
          <input
            type="password"
            name="password"
            value={userInfoData.password}
            onChange={handleInputChange}
            placeholder="Nova senha"
            required
            className="outline-none w-full px-3 py-2 rounded-md"
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirme nova senha"
            required
            className="outline-none w-full px-3 py-2 rounded-md"
          />
        </div>

        {/* Verificação de senha em tempo real */}
        {!passwordsMatch && (
          <p className="text-red-500">As senhas não coincidem.</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-sm w-full hover:bg-blue-700 flex justify-center items-center"
          disabled={loading || !passwordsMatch} // Desabilita o botão enquanto o spinner está ativo ou se as senhas não coincidirem
        >
          {loading ? (
            <FaSpinner />
          ) : (
            'Alterar senha'
          )}
        </button>

        <div className="flex justify-between w-full items-center flex-row">
          <a href="/login" className="text-blue-500">Fazer login</a>
        </div>
      </form>

      {/* Adiciona um espaço fixo para as mensagens, sem mover o conteúdo */}
      <div className="h-6 w-full text-center">
        {errorMessage && (
          <p className="text-red-500 visibility-visible">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-400 visibility-visible">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
