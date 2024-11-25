import PostComponent from "../PostComponent/PostComponent";
import RightBarComponent from "../RightBarComponent/RightBarComponent";
const MainComponent = () => {
  return (
    <div className="flex flex-row justify-center items-start w-full h-full">
      {/* Componente dos Posts com scroll */}
      <div className=""> {/* Aumenta a altura para 32rem */}
        <div className="space-y-4 p-2">
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
