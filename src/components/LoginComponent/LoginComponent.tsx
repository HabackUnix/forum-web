import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom'; // Importar useNavigate
import verifyUser from '../../api/get-user';

interface LoginData {
  email: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  //const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Inicializar o hook useNavigate

  useEffect(() => {
    // Verifica se o token está presente no localStorage
    const isValidResetCode = localStorage.getItem('isValidResetCode');
    const token = localStorage.getItem('authToken');

    if(isValidResetCode) {
      localStorage.removeItem('isValidResetCode');
    }

    if (token) {
      window.location.href = '/home';// Redireciona para a página inicial se o usuário já estiver logado
    }
  });

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    //setLoading(true);

    try {
      // Recebe a resposta da API (que deve incluir o token)
      const response = await verifyUser(loginData.email, loginData.password);
      
      console.log('Resposta da requisicao:', response);
      // Verifica se há um token
      if (response.token) {
        // Armazena o token no localStorage
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userId', response.userId);
        setErrorMessage(null);
        navigate('/home', { replace: true}); // Redireciona para a página inicial após o login bem-sucedido
      } else {
        throw new Error('Token não recebido.');
      }
    } catch (error) {
      setErrorMessage('Falha no login. Verifique suas credenciais.');
      console.error('Erro ao fazer login:', error);
    } finally {
      //setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  return (
    <div className="flex justify-center items-center flex-col gap-5 bg-zinc-800 mx-auto w-full h-full">
      <h2 className="text-center text-lg font-bold text-white">
        FORUM WEB - <span className="text-blue-500">IFAP</span>
      </h2>
      <p className="text-zinc-400">Informe seus dados para fazer login</p>
      <form
        onSubmit={handleLogin}
        className="p-2 flex flex-col gap-4 justify-center items-center w-96"
      >
        <div className="w-full">
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
            placeholder="Informe seu e-mail"
            required
            className="outline-none w-full px-3 py-2 rounded-md"
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            placeholder="Informe sua senha"
            required
            className="outline-none w-full px-3 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-sm w-full hover:bg-blue-700 flex justify-center items-center"
          
        >
          Entrar
        </button>

        <div className="flex justify-between w-full items-center flex-row">
          <a href="/register" className="text-blue-500">Sou novo!</a>
          <a href="/send-mail" className="text-blue-500">Esqueceu a senha?</a>
        </div>
      </form>

      <div className="h-6 w-full text-center">
        {errorMessage && (
          <p className="text-red-500 visibility-visible">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default LoginComponent;
