import React, { useEffect, useState } from 'react';
import sendMailPassword from '../../api/sendmail';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

interface SendMailPassword {
  email: string,
  id: string,
}

const SendMailPasswordComponent = () => {
  const [registerData, setRegisterData] = useState<SendMailPassword>({ email: '', id: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSendMail = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const userInfo = await sendMailPassword(registerData.email);
      setErrorMessage(null);
      setSuccessMessage('E-mail enviado com sucesso!');

      // Armazena o e-mail validado no localStorage
      localStorage.setItem('validatedEmail', userInfo.user.email);
      localStorage.setItem('userId', userInfo.user.id);
      // Redireciona para a tela de verificação do código
      setTimeout(() => {
        navigate('/user/verify-code');
      }, 2000);
    } catch (error) {
      setErrorMessage('Falha no envio do E-mail.');
      setSuccessMessage(null);
      console.error('Erro ao enviar e-mail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {

    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/home', { replace: true });// Redireciona para a página inicial se o usuário já estiver logado
    }

    const standbyRoute = localStorage.getItem('standby');

    if(standbyRoute) {
      localStorage.removeItem('validatedEmail');
      localStorage.removeItem('standby');
    }

    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, navigate, successMessage]);

  return (
    <div className="flex justify-center items-center flex-col gap-7 bg-zinc-800 mx-auto w-full h-full">
      <h2 className="text-center text-lg font-bold text-white">
        FORUM WEB - <span className="text-blue-500">IFAP</span>
      </h2>
      <p className="text-zinc-400">Informe seu E-mail!</p>
      <form
        onSubmit={handleSendMail}
        className="p-2 flex flex-col gap-4 justify-center items-center w-96"
      >
        <div className="w-full">
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleInputChange}
            placeholder="Informe seu e-mail"
            required
            className="outline-none w-full px-3 py-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-sm w-full hover:bg-blue-700 flex justify-center items-center"
          disabled={loading} // Desabilita o botão enquanto o spinner está ativo
        >
          {loading ? (
            <FaSpinner />
          ) : (
            'Enviar'
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

export default SendMailPasswordComponent;
