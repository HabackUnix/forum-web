import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent/LoginComponent';
import RegisterUserComponent from '../components/RegisterUserComponent/RegisterUserComponent';
import SendMailPasswordComponent from '../components/SendMailPasswordComponent/SendMailPasswordComponent';
import VerifyCodeComponent from '../components/VerifyCodeComponent/VerifyCodeComponent';
import ResetPasswordComponent from '../components/ResetPasswordComponent/ResetPasswordComponent';
import HomeComponent from '../components/HomeComponent/HomeComponent';
import PostUserComponent from '../components/AppComponent/UserComponent/PostUserComponent/PostUserComponent';
import TopicUserComponent from '../components/AppComponent/UserComponent/TopicUserComponent/TopicUserComponent';
import PerfilUserComponent from '../components/AppComponent/UserComponent/PerfilComponent/PerfilUserComponent';

const Routers = () => {

  // Função que verifica se o usuário está autenticado verificando a presença do token
  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };
  

  return (
    <Router>
      <Routes>
        {/* Redireciona para o Home se o usuário estiver autenticado, senão vai para login */}
        <Route path="/home" element={isAuthenticated() ? <HomeComponent /> : <Navigate to="/login" />} />

        <Route path="/user/posts" element={isAuthenticated() ? <PostUserComponent/> : <Navigate to="/login" />} />

        <Route path="/user/topics" element={isAuthenticated() ? <TopicUserComponent/> : <Navigate to="/login" />} />

        <Route path="/user/perfil" element={isAuthenticated() ? <PerfilUserComponent/> : <Navigate to="/login" />} />
        
        {/* Rota para registro de novos usuários */}
        <Route path="/register" element={<RegisterUserComponent />} />

        {/* Rota para envio de email para reset de senha */}
        <Route path="/send-mail" element={<SendMailPasswordComponent />} />

        {/* Rota para verificação do código de recuperação */}
        <Route path="/user/verify-code" element={<VerifyCodeComponent />} />

        {/* Rota para reset de senha */}
        <Route path="/user/reset-password" element={<ResetPasswordComponent />} />

        {/* Página de login */}
        <Route path="/login" element={<LoginComponent />} />

        {/* Qualquer rota desconhecida redireciona para a página de login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default Routers;
