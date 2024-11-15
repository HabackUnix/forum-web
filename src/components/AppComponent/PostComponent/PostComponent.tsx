import { BiLike } from "react-icons/bi";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import getPosts from "../../../api/get-posts";
import { useNavigate } from 'react-router-dom';
import getTopics from '../../../api/get-topics';
import createPost from '../../../api/create-post';

import { FaSearch } from "react-icons/fa";

interface User {
    id: string;
    username: string;
}

interface Topics {
  id: string;
  title: string;
}

interface Posts {
    id: string;
    content: string;
    imageUrl: string;
    user: User;
    topic: Topics;
}



const PostComponent = () => {
  
    const [post, setPosts] = useState<Posts[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Posts[]>([]);
    const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [filteredTopics, setFilteredTopics] = useState<Topics[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<Topics | null>(null);
    const [topics, setTopics] = useState<Topics[]>([]);
    const [content, setContent] = useState<string>(''); 
    const [imageUrl, setImageUrl] = useState<string>(''); // Alterado para URL
    const [errorMessage, setErrorMessage] = useState<string | null>(null); 
    const [successMessage, setSuccessMessage] = useState<string | null>(null); 
    const [searchTerm, setSearchTerm] = useState<string>(''); // Novo estado para busca
    const menuRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
  
    const fetchCategories = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID não encontrado');
          return;
        }
  
        const response = await getTopics(userId);
        setTopics(response);
        setFilteredTopics(response);
      } catch (error) {
        console.error('Erro ao buscar categorias', error);
      }
    };
  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const openCategoryModal = () => {
      setIsCategoryModalOpen(true);
      setFilteredTopics(topics);
    };
  
    const closeCategoryModal = () => setIsCategoryModalOpen(false);
  
    const handleCategorySearch = (e: ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      const filtered = topics.filter((topic) =>
        topic.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredTopics(filtered);
    };
  
    const handleCategorySelect = (topic: Topics) => {
      setSelectedTopic(topic);
      setIsCategoryModalOpen(false);
    };

  
    const handleLogout = () => {
      localStorage.removeItem('authToken');
      setIsMenuOpen(false);
      navigate('/login');
    };
  
    useEffect(() => {
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
  
    const handlePostSubmit = async () => {
      if (!selectedTopic) {
        setErrorMessage('Por favor, selecione um tópico.');
        return;
      }
    
      if (!content.trim()) {
        setErrorMessage('O conteúdo do post não pode estar vazio.');
        return;
      }
    
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setErrorMessage('Usuário não autenticado.');
          return;
        }
    
        const responsePost = await createPost(content, imageUrl, userId, selectedTopic.id);
        setSuccessMessage('Post criado com sucesso!');
        setContent('');
        setSelectedTopic(null);
        setImageUrl(''); // Limpa o campo de URL da imagem
        setErrorMessage(null);
    
        // Aqui, chamamos o fetchPosts() para recarregar a lista de posts
        await fetchPosts();
    
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
    
        console.log(responsePost);
      } catch (error) {
        setErrorMessage('Erro ao criar o post. Tente novamente.');
    
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
    
        console.log(error);
      }
    };
    

  const fetchPosts = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID não encontrado');
        return;
      }

      const response = await getPosts();
      setPosts(response);
      setFilteredPosts(response);

       // Recuperar os likes armazenados no localStorage
       const storedLikes = localStorage.getItem('likedPosts');
       if (storedLikes) {
         setLikedPosts(JSON.parse(storedLikes));
       }

    } catch (error) {
      console.error('Erro ao buscar categorias', error);
    }
  };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toLowerCase();
      setSearchTerm(value);
      const filtered = post.filter((p) =>
        p.content.toLowerCase().includes(value) ||
        p.topic.title.toLowerCase().includes(value)
      );
      setFilteredPosts(filtered);
    };

    const handleLike = (postId: string) => {
      // Verifica se o post já foi curtido
      const updatedLikedPosts = { ...likedPosts };
      if (updatedLikedPosts[postId]) {
        // Se já foi curtido, remove o like
        delete updatedLikedPosts[postId];
      } else {
        // Se não foi curtido, adiciona o like
        updatedLikedPosts[postId] = true;
      }
  
      // Atualiza o estado e armazena no localStorage
      setLikedPosts(updatedLikedPosts);
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
    };

  return (
    
    <div className="flex flex-col h-full w-full rounded-md justify-center p-3">
      <div className="flex flex-row justify-between w-full px-5">
        <button 
          onClick={openModal}
          className=" bg-slate-950 p-2 rounded-md max-sm:text-sm text-slate-300 border border-indigo-800 border-opacity-50">
          Novo post
        </button>
        <div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 max-sm:text-sm">
              <FaSearch />
            </span>
            <input
              className="bg-slate-800 border border-slate-600 rounded-md outline-0 w-44 max-sm:text-sm max-sm:w-44 max-sm:py-1 pl-10 p-2 text-white"
              type="text"
              name="search-post"
              placeholder="Buscar por posts"
              value={searchTerm} // Conecta o input ao estado searchTerm
              onChange={handleSearch} // Chama a função de busca ao digitar
            />
          </div>
        </div>
      </div>
      


      <div className="flex flex-col gap-4 p-3 rounded-md w-full h-full overflow-hidden">
        
      {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="flex flex-row bg-slate-900 w-full items-center border-separate justify-center p-3 rounded-lg gap-3">
              <div className="flex flex-col justify-between h-full w-full gap-8 max-sm:w-full max-md:w-full">
                <div className="flex flex-col gap-4">
                  <div className="text-slate-400 text-xs flex flex-row items-center gap-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="username" className="w-8 h-8" />
                    {post.user.username}
                  </div>
                  <div className="flex flex-row p-1 mx-auto max-sm:text-sm rounded-md gap-1">
                    <p className="text-zinc-400">Tópico associado ao post:</p>
                    <span className="bg-zinc-500 px-1 rounded-md">{post.topic.title}</span>
                  </div>
                  <div>
                    <div className="flex flex-col justify-between gap-2 items-end max-sm:gap-6">
                      <div className="flex-1 max-sm:text-sm  text-slate-300 mx-5">
                        {post.content}
                      </div>
                      <div className="max-md:"> {/* Adiciona espaço entre texto e ícone */}
                      <button
                          className={`ml-auto text-2xl p-1 rounded-md ${
                            likedPosts[post.id] ? "text-indigo-500" : "text-gray-400"
                          }`}
                          onClick={() => handleLike(post.id)}
                        >
                          <BiLike />
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white p-3 mx-auto">Nenhum post encontrado.</p>
        )}

              {isMenuOpen && (
                          <div ref={menuRef} className="absolute top-5 right-20 bg-slate-900 p-4 rounded-md shadow-md">
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

        {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center w-full h-full">
          <div className="flex flex-col gap-3 bg-slate-900 p-5 rounded-md shadow-md max-w-sm w-full">
            <h2 className="text-xl text-slate-300 mb-4">Criar novo post</h2>

            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            <div className='flex flex-col gap-5 w-full'>


              <div className="bg-slate-800 p-3 rounded-md flex flex-col gap-2">
                <div className='flex flex-row justify-between items-center text-sm'>
                  <label className="block text-sm text-slate-300 mb-1">Tópico</label>
                  <span className='text-red-500'>obrigatório</span>
                </div>
                <button
                  onClick={openCategoryModal}
                  className="bg-slate-700 text-slate-400 py-2 px-4 w-full rounded-md text-left"
                >
                  {selectedTopic ? selectedTopic.title : 'Selecione um tópico'}
                </button>
              </div>

              {selectedTopic ? <p className='text-sm text-slate-200'>topico selecionado: <span className='text-slate-400'>{selectedTopic.title}</span></p> : null}

              <textarea
                className="bg-slate-800 text-slate-400 outline-none p-2 rounded-md w-full h-28"
                placeholder="Escreva seu conteúdo"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              <button
                onClick={handlePostSubmit}
                className="bg-slate-950 text-sm py-2 px-4 rounded-md border border-indigo-900 border-opacity-50 text-indigo-300"
              >
                Publicar
              </button>
            </div>

            <button
              onClick={closeModal}
              className="bg-slate-950 text-sm py-2 px-4 rounded-md border border-indigo-900 border-opacity-50 text-indigo-300"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center w-full h-full">
          <div className="flex flex-col gap-3 bg-slate-900 p-5 rounded-md shadow-md max-w-sm w-full">
            <h2 className="text-xl text-slate-300 mb-4">Selecione um tópico</h2>

            <input
              className="bg-slate-800 text-white p-2 outline-none rounded-md w-full"
              type="text"
              placeholder="Buscar Tópicos"
              onChange={handleCategorySearch}
            />

            <ul className="bg-slate-800 p-3 rounded-md">
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic) => (
                  <li
                    key={topic.id}
                    className="text-slate-300 cursor-pointer p-2 hover:bg-slate-700 rounded-md"
                    onClick={() => handleCategorySelect(topic)}
                  >
                    {topic.title}
                  </li>
                ))
              ): <span className="text-sm text-slate-400">Nenhum tópico encontrado.</span>}
            </ul>

            <button
              onClick={closeCategoryModal}
              className="bg-slate-950 text-slate-400 py-1 px-4 rounded-md"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default PostComponent;
