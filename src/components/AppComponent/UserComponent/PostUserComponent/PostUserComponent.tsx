import { MdOutlineDeleteSweep, MdOutlineEdit } from "react-icons/md";
import { ChangeEvent, useEffect, useState } from "react";
import updatePost from "../../../../api/update-post";
import { FaSearch } from "react-icons/fa";
import getPostsUser from "../../../../api/get-posts-user";
import getTopics from "../../../../api/get-topics";
import deletePostUser from "../../../../api/delete-post-user";

interface User {
    username: string;
}

interface Topics {
    id: string;
    title: string;
}

interface PostsUser {
    id: string;
    content: string;
    topicId: string; // Adicionando topicId
    imageUrl: string;
    userId: string,
    user: User,
}

interface DeletePost {
    id: string;
}

const PostUserComponent = () => {
    const [post, setPosts] = useState<PostsUser[]>([]);
    const [deletPost, setDeletePost] = useState<DeletePost[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
    const [filteredTopics, setFilteredTopics] = useState<Topics[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<Topics | null>(null);
    const [topics, setTopics] = useState<Topics[]>([]);
    const [content, setContent] = useState<string>(''); 
    const [imageUrl, setImageUrl] = useState<string>(''); 
    const [errorMessage, setErrorMessage] = useState<string | null>(null); 
    const [successMessage, setSuccessMessage] = useState<string | null>(null); 
    const [currentPostId, setCurrentPostId] = useState<string | null>(null); // ID do post atual

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

    const deletePost = async (postId: string, userId: string) => {
        try {
            const response = await deletePostUser(postId, userId);
            setDeletePost((prev) => prev.filter((post) => post.id !== postId)); // Remove o post deletado da lista
            
            return deletPost;
            return response;
        } catch (error) {
            console.error('Erro ao deletar post', error);
        }
    }
    
    const handleDeletePost = async (postId: string) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID não encontrado');
            return;
        }
    
        await deletePost(postId, userId);
        await fetchPosts(); // Atualiza a lista de posts após a exclusão
    };
    

    useEffect(() => {
        fetchCategories();
        fetchPosts(); // Carregar os posts também
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

    const fetchPosts = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User ID não encontrado');
                return;
            }
            const response = await getPostsUser(userId);

            setPosts(response);


        } catch (error) {
            console.error('Erro ao buscar posts', error);
        }
    };


    const handleUpdatePost = async (postId: string) => {
        const postToUpdate = post.find((p) => p.id === postId);
        if (postToUpdate) {
            setCurrentPostId(postToUpdate.id);
            setContent(postToUpdate.content);
            setImageUrl(postToUpdate.imageUrl);
            setSelectedTopic({ id: postToUpdate.topicId, title: postToUpdate.topicId }); // Atribuindo o tópico atual
            openModal();
        }
    };

    const updatePostHandler = async () => {
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

            const response = await updatePost(currentPostId!, content, selectedTopic.id, imageUrl, userId);
            setSuccessMessage('Post atualizado com sucesso!');
            setContent('');
            setSelectedTopic(null);
            setImageUrl('');
            setErrorMessage(null);
            closeModal();
            await fetchPosts(); // Atualiza a lista de posts
            
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);

            return response

        } catch (error) {
            setErrorMessage('Erro ao atualizar o post. Tente novamente.');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);

            return error
        }
    };

    return (
        <div className="flex flex-col h-full w-full justify-center items-center gap-3 p-3 bg-slate-800">
            {/* Seção de buscar posts */}
            <div className="flex flex-row justify-between w-full px-5">
                {/* Remover o botão de novo post */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaSearch />
                    </span>
                    <input
                        className="bg-slate-800 border border-slate-600 rounded-md outline-0 w-44 pl-10 p-2 text-white"
                        type="text"
                        name="search-post"
                        placeholder="Buscar por posts"
                    />
                </div>
            </div>

            {/* Lista de posts */}
            <div className="flex flex-col w-full lg:w-3/4 h-[32rem] overflow-y-auto scrollbar-none gap-3">
    {post.length > 0 ? (
        post.map((post) => {
            // Encontrar o tópico associado ao post
            const associatedTopic = topics.find((topic) => topic.id === post.topicId);

            return (
                <div key={post.id} className="flex flex-row bg-slate-900 items-center p-3 rounded-lg gap-3">
                    <div className="flex flex-col justify-between h-full w-full gap-2">
                        <div className="flex flex-row justify-between gap-2 items-center">
                            <div className="flex-1 text-slate-300 max-sm:text-sm">
                                {post.content}
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center gap-3 px-1">
                            <div className="flex flex-row items-center justify-between mt-2">
                                {associatedTopic ? (
                                    <div className="flex flex-row items-center gap-2">
                                        <p className="text-sm text-slate-400">Tópico:</p>
                                        <span className="bg-slate-700 rounded-md max-sm:text-xs p-0.5">{associatedTopic.title}</span>
                                    </div>
                                ) : (
                                    <p className="text-sm text-red-400">Tópico não encontrado</p>
                                )}
                            </div>
                            <div className="flex flex-row gap-3">
                                    <button onClick={() => handleUpdatePost(post.id)}>
                                        <MdOutlineEdit className="text-2xl text-slate-400" />
                                    </button>
                                    <button onClick={() => handleDeletePost(post.id)}>
                                        <MdOutlineDeleteSweep className="text-2xl text-slate-400" />
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            );
        })
    ) : (
        <p className="text-slate-400 mx-auto my-auto">Nenhum Post encontrado.</p>
    )}

                {/* Modal de criar/editar post */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center w-full h-full">
                        <div className="flex flex-col gap-3 bg-slate-900 p-5 rounded-md shadow-md max-w-sm w-full">
                            <h2 className="text-xl text-slate-300 mb-4">Atualizar Post</h2>

                            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                            <div className='flex flex-col gap-5 w-full'>
                                <div className="flex flex-col gap-3 bg-slate-800 p-3 rounded-md">
                                    <label className="block text-sm text-slate-300">URL da Imagem</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full bg-slate-900 text-white outline-none rounded-md p-2"
                                        placeholder="URL da imagem"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                    />
                                </div>

                                <div className="bg-slate-800 p-3 rounded-md flex flex-col gap-2">
                                    <label className="block text-sm text-slate-300">Tópico</label>
                                    <button
                                        className="mt-1 block w-full bg-slate-900 text-white outline-none rounded-md p-2"
                                        onClick={openCategoryModal}
                                    >
                                    {filteredTopics.map((topic) => (
                                        selectedTopic?.id == topic.id ? topic.title : ''
                                    ))}
                                    </button>
                                </div>

                                <div className="flex flex-col gap-3 bg-slate-800 p-3 rounded-md">
                                    <label className="block text-sm text-slate-300">Conteúdo</label>
                                    <textarea
                                        className="mt-1 scrollbar-none block w-full bg-slate-900 text-white outline-none rounded-md p-2"
                                        rows={3}
                                        placeholder="Conteúdo do post"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        className="bg-slate-800 text-white px-4 py-2 rounded-md"
                                        onClick={updatePostHandler}
                                    >
                                        Atualizar
                                    </button>
                                    <button
                                        className="bg-slate-800 text-white px-4 py-2 rounded-md ml-2"
                                        onClick={closeModal}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de categorias */}
                {isCategoryModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center w-full h-full">
                        <div className="flex flex-col gap-3 bg-slate-900 p-5 rounded-md shadow-md max-w-sm w-full">
                            <h2 className="text-xl text-slate-300 mb-4">Selecionar Tópico</h2>
                            <input
                                type="text"
                                className="bg-slate-800 text-white border border-slate-600 rounded-md p-2"
                                placeholder="Buscar categorias..."
                                onChange={handleCategorySearch}
                            />
                            <div className="flex flex-col gap-2 mt-3">
                                {filteredTopics.length > 0 ? (
                                    filteredTopics.map((topic) => (
                                        <button
                                            key={topic.id}
                                            className="bg-slate-700 p-2 rounded-md text-white"
                                            onClick={() => handleCategorySelect(topic)}
                                        >
                                            {topic.title}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-slate-400">Nenhum tópico encontrado.</p>
                                )}
                            </div>
                            <button className="bg-slate-800 text-white px-4 py-2 rounded-md mt-4" onClick={closeCategoryModal}>
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostUserComponent;
