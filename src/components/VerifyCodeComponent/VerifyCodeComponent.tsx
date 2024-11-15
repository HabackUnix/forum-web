import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import verifyResetCode from '../../api/verify-resetcode';
import { FaSpinner } from 'react-icons/fa';

interface VerifyCodeState {
  code: string;
}

const VerifyCodeComponent = () => {
  const [verifyData, setVerifyData] = useState<VerifyCodeState>({ code: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Para redirecionamento após a verificação bem-sucedida


  const handleVerifyCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const verifiedToken = await verifyResetCode(verifyData.code);
      setErrorMessage(null);
      setSuccessMessage('Código verificado com sucesso!');
      console.log('Código verificado:', verifiedToken);

      localStorage.setItem('isValidResetCode', "true");

      // Redireciona para a próxima etapa (definir nova senha, por exemplo)
      setTimeout(() => {
        navigate('/user/reset-password'); // Ajuste a rota conforme necessário
      }, 2000); // Aguarde 2 segundos antes do redirecionamento
    } catch (error) {
      setErrorMessage('Falha na verificação do código.');
      setSuccessMessage(null);
      console.error('Erro ao verificar o código:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setVerifyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {

    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/home', { replace: true });// Redireciona para a página inicial se o usuário já estiver logado
    }

    const isValidEmail = localStorage.getItem('validatedEmail');

    if(!isValidEmail) {
        navigate('/send-mail')
    }

    localStorage.setItem('standby', 'true')

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
      <p className="text-zinc-400">Informe o código de 6 dígitos!</p>
      <form
        onSubmit={handleVerifyCode}
        className="p-2 flex flex-col gap-4 justify-center items-center w-96"
      >
        <div className="w-full">
          <input
            type="text"
            name="code"
            value={verifyData.code}
            onChange={handleInputChange}
            placeholder="Digite o código de 6 dígitos"
            required
            className="outline-none w-full px-3 py-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-sm w-full hover:bg-blue-700 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            'Verificar Código'
          )}
        </button>

        <div className="flex justify-between w-full items-center flex-row">
          <a href="/login" className="text-blue-500">Fazer login</a>
        </div>
      </form>

      {/* Mensagens de sucesso e erro */}
      <div className="h-6 w-full text-center">
        {errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-400">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyCodeComponent;
