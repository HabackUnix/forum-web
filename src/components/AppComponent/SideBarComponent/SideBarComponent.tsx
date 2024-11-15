import { MdForum } from "react-icons/md";
import { RiJavascriptFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";


const SideBarComponent = () => {
  return (
    <div className="flex flex-col items-center justify-between p-4 w-full h-full">
      <div className="flex flex-row justify-center gap-4">
        <MdForum className="text-3xl text-slate-300" />
        <h2 className="mb-4 text-slate-300 font-bold">WEB FORUM - IFAP</h2>
      </div>

      <input
          className="bg-slate-800 border w-full mb-3 border-slate-600 rounded-md outline-0 max-sm:text-sm  max-sm:w-auto max-sm:py-1 pl-6 p-1 text-white"
          type="name"
          name="search-post"
          placeholder="Pesquisar"
        />
      {/* O flex-grow 1 faz essa div ocupar todo o espaço possível */}
      <div className=" flex flex-col w-full gap-6 h-[32rem] max-sm:h-[51rem] overflow-y-auto scrollbar-none">
        <div className="flex flex-col bg-slate-900 p-3 rounded-md gap-1">
          <h2 className="font-bold text-slate-300">Visto recentemente</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-1 p-1 rounded-md text-sm text-slate-400 truncate">
              <RiJavascriptFill className="text-2xl text-yellow-300" />
              <span>Javascript</span>
            </div>
            <div className="flex flex-row items-center gap-1 p-1 rounded-md text-sm text-slate-400 truncate">
              <FaReact className="text-2xl text-cyan-400" />
              <span>ReactJS</span>
            </div>
            <div className="flex flex-row items-center gap-1 p-1 rounded-md text-sm text-slate-400 truncate">
              <SiTypescript className="text-2xl text-blue-600" />
              <span>Typescript</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-slate-900 p-3 rounded-md gap-1">
          <h2 className="font-bold text-slate-300">Tags populares</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-1 p-1 rounded-md text-sm  text-slate-400 truncate">
              <img src="./src/assets/images/tag-javascript.png" alt="" />
              <span>#javascript</span>
            </div>
            <div className="flex flex-row items-center gap-1 p-1 rounded-md text-sm  text-slate-400 truncate">
              <img src="./src/assets/images/tag-bitcoin.png" alt="" />
              <span>#bitcoin</span>
            </div>
            <div className="flex flex-row items-center gap-1 p-1 rounded-md text-sm  text-slate-400 truncate">
              <img src="./src/assets/images/tag-design.png" alt="" />
              <span>#design</span>
            </div>
            <div className="flex flex-row items-center gap-1 p-1 rounded-md text-sm  text-slate-400 truncate">
            <img src="./src/assets/images/tag-inovacao.png" alt="" />
              <span>#inovação</span>
            </div>
            <div className="flex flex-row items-center gap-1 p-1 rounded-md text-sm  text-slate-400 truncate">
            <img src="./src/assets/images/tag-tutorial.png" alt="" />
              <span>#tutorial</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-slate-900 p-3 rounded-md gap-1">
          <h2 className="font-bold text-slate-300">FORUM WEB IFAP</h2>
          <div className="flex flex-col gap-2">
            <div className="p-1 rounded-md text-sm text-slate-400 truncate">Discursoes</div>
            <div className="p-1 rounded-md text-sm text-slate-400 truncate">Suporte</div>
            <div className="p-1 rounded-md text-sm text-slate-400 truncate">Melhorias</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SideBarComponent;
