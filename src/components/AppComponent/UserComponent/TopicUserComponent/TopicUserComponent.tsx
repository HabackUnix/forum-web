import { useEffect, useRef, useState } from "react";
import getCategories from "../../../../api/get-categories"; 
import createTopic from "../../../../api/create-topic"; 
import updateTopic from "../../../../api/update-topic"; 
import deleteTopicUser from "../../../../api/delete-topic-user";
import { MdOutlineDeleteSweep, MdOutlineEdit } from "react-icons/md";
import getTocpisUser from "../../../../api/get-topics-user";

interface TopicsUser {
  id: string;
  title: string;
  content: string;
  category?: CategoryUser; 
}

interface CategoryUser {
  id: string;
  name: string;
}

const TopicUserComponent = () => {
  const [topicUser, setTopicUser] = useState<TopicsUser[]>([]);
  const [categories, setCategories] = useState<CategoryUser[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); 
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [, setSearchCategory] = useState(''); 
  const [editTopicId, setEditTopicId] = useState<string | null>(null); 

  const containerRef = useRef<HTMLDivElement>(null);

  const fetchTopics = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID não encontrado");
        return;
      }
      const response = await getTocpisUser(userId);
      setTopicUser(response);
    } catch (error) {
      console.error("Erro ao buscar tópicos", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories(); 
      setCategories(response);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  };

  useEffect(() => {
    fetchTopics();
    fetchCategories(); 
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [topicUser]);

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID não encontrado");
      return;
    }

    const newPost = {
      title: newTitle,
      content: newContent,
      userId: userId,
      categoryId: selectedCategory,
    };

    try {
      await createTopic(newPost.title, newPost.content, newPost.userId, newPost.categoryId); 
      fetchTopics(); 
    } catch (error) {
      console.error("Erro ao criar tópico:", error);
    }

    setIsModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setSelectedCategory('');
    setSearchCategory('');
  };

  const handleEdit = (topic: TopicsUser) => {
    setEditTopicId(topic.id); 
    setNewTitle(topic.title); 
    setNewContent(topic.content); 
    setSelectedCategory(topic.category?.id || ''); 
    setIsEditModalOpen(true); 
  };

  const handleUpdateSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !editTopicId) {
      console.error("User ID ou Topic ID não encontrado");
      return;
    }

    try {
      await updateTopic(editTopicId, newTitle, newContent, userId, selectedCategory); 
      fetchTopics(); 
    } catch (error) {
      console.error("Erro ao atualizar tópico:", error);
    }

    setIsEditModalOpen(false); 
    setEditTopicId(null); 
    setNewTitle(''); 
    setNewContent(''); 
    setSelectedCategory(''); 
  };

  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsCategoryModalOpen(false);
  };

  const handleDelete = async (topicId: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID não encontrado");
      return;
    }

    try {
      await deleteTopicUser(topicId, userId);
      fetchTopics();
    } catch (error) {
      console.error("Erro ao deletar tópico:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-auto gap-5 w-full h-screen bg-slate-900">

      <div className="w-full ml-2 flex items-center justify-center bg-slate-900 fixed top-0 left-0 p-5  mr-auto rounded-md">
        <button
          className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
          onClick={() => setIsModalOpen(true)}
        >
          Criar Novo Tópico
        </button>
      </div>

      <div className="relative overflow-x-auto overflow-y-auto w-4/5 h-[32rem] max-sm:h-[32rem] max-md:h-[32rem] max-lg:h-[32rem] max-xl:h-[32rem] max-2xl:h-[32rem] scrollbar-none rounded-md">
      
      {topicUser.length > 0? (
        topicUser.map((topic) => (
          <div
            key={topic.id}
            className="flex flex-col mr-auto justify-between w-full items-center max-md:w-full bg-slate-800 shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-row w-full justify-between gap-3 items-center">
              <div className="max-md:text-sm flex flex-col items-start gap-5 w-full">
                <div className="flex flex-row items-center justify-between w-full gap-5">
                  <h2 className="text-2xl max-sm:text-lg font-bold mb-2 text-slate-400 text-center">{topic.title}</h2>
                  <div className="flex flex-col gap-2 text-slate-400">
                    <button onClick={() => handleEdit(topic)}>
                      <MdOutlineEdit className="text-2xl" />
                    </button>
                    <button onClick={() => handleDelete(topic.id)}> {/* Chama a função de delete */}
                      <MdOutlineDeleteSweep className="text-2xl"/>
                    </button>      
                  </div>
                </div>
                <p className="text-slate-300 mb-4">{topic.content}</p>
              </div>
            </div>
            <div className="flex flex-col mr-auto">
              <div className="text-sm text-slate-300 mb-2">
                <strong>ID do Tópico:</strong> <span>{topic.id}</span>
              </div>
              {topic.category && (
                <div className="text-sm text-slate-300 mb-2">
                  <strong>Categoria:</strong> <span>{topic.category.name}</span>
                </div>
              )}
              {topic.category && (
                <div className="text-sm text-slate-300 mb-2">
                  <strong>ID da Categoria:</strong> <span>{topic.category.id}</span>
                </div>
              )}
            </div>
          </div>
        ))
      ): <span className="text-lg text-slate-400 absolute w-full  text-center">Nenhum tópico encontrado!</span>}

      </div>

      {/* Modal para criar um novo post */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-900 rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl text-slate-400 font-bold mb-4">Criar Novo Tópico</h2>
            
            <div className="mb-4 flex flex-col gap-1">
              <label className="block text-slate-300">Título do Tópico</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded outline-none bg-slate-700 text-slate-200"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="titulo do tópico"
              />
            </div>

            <div className="mb-4 flex flex-col gap-1">
              <label className="block text-slate-300">Conteúdo do Tópico</label>
              <textarea
                className="w-full px-3 py-2 rounded outline-none bg-slate-700 text-slate-200"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="conteudo do tópico"
              ></textarea>
            </div>

            <div className="mb-4 flex flex-col gap-1">
              <label className="block text-slate-300">Categoria</label>
              <button
                className="w-full px-3 py-2 rounded bg-slate-700 outline-none"
                onClick={openCategoryModal}
              >
                <span className="text-slate-300">
                  {selectedCategory ? 
                  categories.find((cat) => cat.id === selectedCategory)?.name || "Selecione uma categoria"
                  : "Selecione uma categoria"}
                </span>
              </button>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-slate-700 outline-none text-white py-2 px-4 rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-slate-700 text-white py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Criar Tópico
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar um tópico */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-50">
          <div className="bg-slate-900 bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-slate-300">Editar Tópico</h2>
            
            <div className="mb-4 flex gap-2 flex-col">
              <label className="block text-slate-300 border-none">Título do Tópico</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded bg-slate-800 outline-none text-slate-200"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="mb-4 flex gap-2 flex-col">
              <label className="block text-slate-300">Conteúdo do Tópico</label>
              <textarea
                className="w-full px-3 py-2 border rounded bg-slate-800 outline-none scrollbar-none text-slate-200"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4 flex gap-2 flex-col">
              <label className="block text-slate-300">Categoria</label>
              <button
                className="w-full px-3 py-2 border rounded bg-slate-800 outline-none text-slate-200"
                onClick={openCategoryModal}
              >
                {selectedCategory ? 
                  categories.find((cat) => cat.id === selectedCategory)?.name || "Selecione uma categoria"
                  : "Selecione uma categoria"}
              </button>
            </div>

            <div className="flex justify-end">
              <button
                className=" text-slate-300 py-2 px-4 rounded mr-2"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="text-slate-300 py-2 px-4 rounded"
                onClick={handleUpdateSubmit}
              >
                Atualizar Tópico
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para selecionar categoria */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-700 rounded-lg shadow-lg p-4 bg-opacity-80 max-w-md w-full">
            <h2 className="text-lg text-slate-300 mb-4">Selecione uma Categoria</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.id} className="flex justify-between items-center mb-2">     
                  <button
                    className="text-center mx-auto border bg-slate-900 text-slate-400 border-slate-500 p-1 rounded-md w-full"
                    onClick={() => selectCategory(category.id)}
                  >{category.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-slate-900 text-slate-400 py-2 px-4 rounded text-sm"
              onClick={() => setIsCategoryModalOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicUserComponent;
