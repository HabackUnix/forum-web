import { FaArrowRight } from "react-icons/fa";

const RightBarComponent = () => {
    return (
        <div>
            <div className=" lg:flex max-sm:hidden max-md:hidden flex flex-col gap-2 "> {/* Oculto em telas menores que lg */}
        <div className="flex flex-col gap-2 p-3 w-64 bg-slate-700 rounded-md">
            <div className="flex flex-row justify-between">
              <h2 className="font-bold text-slate-300">Tópicos em alta</h2>
              <FaArrowRight className="text-slate-400" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="bg-slate-600 p-1 rounded-md text-sm text-slate-400 truncate">Javascript e seu paradigma procedural</div>
              <div className="bg-slate-600 p-1 rounded-md text-sm text-slate-400 truncate">Typescript com unions</div>
              <div className="bg-slate-600 p-1 rounded-md text-sm text-slate-400 truncate">ReactNative com Expo</div>
              <div className="bg-slate-600 p-1 rounded-md text-sm text-slate-400 truncate">Prisma e sua integração com zod</div>
            </div>
        </div>
        <div className="flex flex-col gap-2 p-3 w-64 bg-slate-700 rounded-md">
            <div className="flex flex-row justify-between">
              <h2 className="font-bold text-slate-300">Posts mais comentados</h2>
              <FaArrowRight className="text-slate-400" />
            </div>
          <div className="flex flex-col gap-1">
            <div className="bg-slate-600 p-1 rounded-md text-sm text-slate-400 truncate">TypeScript com Zod + Fastify cria um integração excelente no backend de sua aplicação</div>
            <div className="bg-slate-600 p-1 rounded-md text-sm text-slate-400 truncate">Criar um projeto react + vite torna mais produtivo o desenvolvimento da aplicação</div>
            <div className="bg-slate-600 p-1 rounded-md text-sm text-slate-400 truncate">Tailwind CSS é a melhor lib pra estilizar componentes reacts</div>
            <div className="bg-slate-600 p-1 rounded-md text-sm text-slate-400 truncate">A trilha do NLW journey foi a melhor do ano</div>
            <div className="bg-slate-600 p-1 rounded-md text-sm text-slate-400 truncate">Criar um projeto react + vite torna mais produtivo o desenvolvimento da aplicação</div>
            <div className="bg-slate-600 p-1 rounded-md text-sm text-slate-400 truncate">Tailwind CSS é a melhor lib pra estilizar componentes reacts</div>
            <div className="bg-slate-600 p-1 rounded-md text-sm text-slate-400 truncate">A trilha do NLW journey foi a melhor do ano</div>
            <div className="bg-slate-600 p-1 rounded-md text-sm text-slate-400 truncate">Criar um projeto react + vite torna mais produtivo o desenvolvimento da aplicação</div>
          </div>
        </div>
      </div>
        </div>
    );
}

export default RightBarComponent