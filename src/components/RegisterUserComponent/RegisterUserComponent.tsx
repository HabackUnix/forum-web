import React, { useState, useEffect } from 'react';
import registerUser from '../../api/register-user';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface RegisterUser {
  name: string,
  username: string,
  email: string;
  password: string;
}

const RegisterUserComponent = () => {
  const [registerData, setRegisterData] = useState<RegisterUser>({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const userData = await registerUser(registerData.name, registerData.username, registerData.email, registerData.password);
      setErrorMessage(null);
      setSuccessMessage('Usuario cadastrado com sucesso!');
      console.log('Dados do usuário:', userData);
    } catch (error) {
      setErrorMessage('Falha no cadastro. Verifique suas credenciais.');
      setSuccessMessage(null);
      console.error('Erro ao cadastrar usuario:', error);
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

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password: string) => {
    setPasswordValidation({
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  useEffect(() => {

    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/home', { replace: true });// Redireciona para a página inicial se o usuário já estiver logado
    }

    localStorage.removeItem('isValidResetCode');
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
  }, [errorMessage, successMessage]);

  return (
    <div className="flex justify-center items-center flex-col gap-7 bg-zinc-800 mx-auto w-full h-full">
      <h2 className="text-center text-lg font-bold text-white">
        FORUM WEB - <span className="text-blue-500">IFAP</span>
      </h2>
      <p className="text-zinc-400">Informe seus dados para cadastrar</p>
      <form
        onSubmit={handleRegister}
        className="p-2 flex flex-col gap-4 justify-center items-center w-96"
      >
        <div className="w-full">
          <input
            type="name"
            name="name"
            value={registerData.name}
            onChange={handleInputChange}
            placeholder="Nome completo"
            required
            className="outline-none w-full px-3 py-2 rounded-md"
          />
        </div>
        <div className="w-full">
          <input
            type="name"
            name="username"
            value={registerData.username}
            onChange={handleInputChange}
            placeholder="Nome de usuario"
            required
            className="outline-none w-full px-3 py-2 rounded-md"
          />
        </div>
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
        <div className="w-full">
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleInputChange}
            placeholder="Informe sua senha"
            required
            className="outline-none w-full px-3 py-2 rounded-md"
          />
        </div>

        <div className='flex flex-col mr-auto justify-start items-start'>
          <span className={`text-sm ${passwordValidation.hasUpperCase ? 'text-green-500' : 'text-red-500'}`}>
            Uma letra maiúscula 'A'
          </span>
          <span className={`text-sm ${passwordValidation.hasLowerCase ? 'text-green-500' : 'text-red-500'}`}>
            Uma letra minúscula 'a'
          </span>
          <span className={`text-sm ${passwordValidation.hasNumber ? 'text-green-500' : 'text-red-500'}`}>
            Pelo menos um número
          </span>
          <span className={`text-sm ${passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-red-500'}`}>
            Pelo menos um caractere especial '#,@,$'
          </span>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-sm w-full hover:bg-blue-700 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <FaSpinner />
          ) : (
            'Entrar'
          )}
        </button>

        <div className="flex justify-between w-full items-center flex-row">
          <a href="/login" className="text-blue-500">Fazer login</a>
        </div>
      </form>

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

export default RegisterUserComponent;
