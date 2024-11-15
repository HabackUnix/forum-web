import PostComponent from "../PostComponent/PostComponent";
import RightBarComponent from "../RightBarComponent/RightBarComponent";
const MainComponent = () => {
  return (
    <div className="flex flex-row justify-center items-start w-full h-full">
      {/* Componente dos Posts com scroll */}
      <div className="flex flex-col w-full lg:w-3/4 h-[32rem] overflow-y-auto scrollbar-none"> {/* Aumenta a altura para 32rem */}
        <div className="space-y-4 p-2"> {/* Espaçamento vertical entre os posts */}
            <div>
            <PostComponent />
            </div>
        </div>
      </div>

      <RightBarComponent/>
      
    </div>
  );
};

export default MainComponent;
