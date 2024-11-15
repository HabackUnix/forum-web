import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppComponent from '../AppComponent/AppComponent';

const HomeComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    // Verifica se o authToken não existe e redireciona para a página de login
    if (!token) {
      navigate('/login', { replace: true });
    }
  });

  return (
    <div className="flex justify-center items-center flex-col gap-4 bg-zinc-800 mx-auto w-full h-full">
      <AppComponent/>
    </div>
  );
};

export default HomeComponent;
