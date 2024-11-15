import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserDetails from '../../../api/get-user-details';

interface UserInfo {
  name: string;
  username: string;
}

const HeaderComponent = () => {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [infoUser, setInfoUser] = useState<UserInfo | null>(null);


  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();


  const getUserInfo = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return false;
      }

      const response = await getUserDetails(userId);
      setInfoUser(response);
    } catch (error) {
      return error;
    }
  };



  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsMenuOpen(false);
    navigate('/login');
  };

  useEffect(() => {

    getUserInfo();


    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);


  return (
    <div className="ml-auto mr-8">
      <div className="flex justify-start w-full py-2 px-2 max-sm:gap-3">

        <div className='flex flex-row justify-start gap-4'>
        <button onClick={toggleMenu} className='flex '>
          {infoUser ? (
            <div className='flex flex-col items-center justify-center gap-1'>
              <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" className='w-8' alt="Perfil" />
              <span className='text-xs text-slate-400'>{infoUser.username}</span>
            </div>
          ) : (
            <p className="text-slate-400">User</p>
          )}
        </button>


        {isMenuOpen && (
            <div 
              ref={menuRef} 
              className="absolute top-5 right-20 bg-slate-900 p-4 rounded-md shadow-md z-50" // Aqui, adicionei z-50
            >
              <ul className="flex flex-col gap-2 w-36">
                <a className="text-slate-300 cursor-pointer text-base bg-slate-700 hover:bg-slate-700 p-1 rounded-md" href="user/posts">Posts</a>
                <a className="text-slate-300 cursor-pointer text-base bg-slate-700 hover:bg-slate-700 p-1 rounded-md" href="user/topics">Tópicos</a>
                <a className="text-slate-300 cursor-pointer text-base bg-slate-700 hover:bg-slate-700 p-1 rounded-md" href="/user/perfil">Perfil</a>
                <li
                  onClick={handleLogout}
                  className="text-slate-300 cursor-pointer text-base bg-slate-700 hover:bg-slate-700 p-1 rounded-md"
                >
                  Sair
                </li>
              </ul>
            </div>
          )}

        </div>
      </div>

      
    </div>
  );
};

export default HeaderComponent;
