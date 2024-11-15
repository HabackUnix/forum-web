import { FaCheck } from "react-icons/fa";


const PerfilUserComponent = () => {


    return (
        <div className="bg-slate-800 w-full h-screen flex flex-col items-center justify-center  p-4 shadow-md">
            <div className=" overflow-hidden rounded-lg ">
                <div></div>
                <div className="px-4 py-5 sm:px-6 flex flex-row items-center justify-between gap-5">
                    <div className="max-sm:text-sm">
                        <h3 className=" text-lg leading-6 font-medium text-zinc-300">
                            Informações do Usuário
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-zinc-400">
                            Estas são algumas informações sobre o usuário.
                        </p>
                    </div>
                    <img 
                    src="https://cdn-icons-png.flaticon.com/512/147/147142.png" 
                    className="w-16 max-sm:w-12  rounded-full p-1" 
                    alt="Perfil" 
                    />

                </div>
                <div className="border-t border-zinc-500 border-opacity-50 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-zinc-500 sm:divide-opacity-50">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-zinc-300">
                                Nome Completo
                            </dt>
                            <dd className="mt-1 text-sm text-zinc-200 sm:mt-0 sm:col-span-2">
                                Forum Web - IFAP
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-zinc-300">
                                Nome de Usuário
                            </dt>
                            <dd className="mt-1 text-sm text-zinc-200 sm:mt-0 sm:col-span-2">
                                forumwebifap
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-zinc-300">
                                Endereço de E-mail
                            </dt>
                            <dd className="mt-1 text-sm text-zinc-200 sm:mt-0 sm:col-span-2">
                                forumwebifap@ifap.edu.gov
                            </dd>
                        </div>
                        <div className="flex flex-row items-center gap-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-zinc-300">
                                Status
                            </dt>
                            <div className="flex flex-row gap-5 items-center justify-between border rounded-full px-2 py-1 w-max">
                                <dd className="mt-1 text-sm text-zinc-200 sm:mt-0 sm:col-span-2">
                                    ativo
                                </dd>
                                <dd className="mt-1 text-sm text-zinc-200 sm:mt-0 sm:col-span-2">
                                    <FaCheck className="text-green-100 rounded-full p-1 w-5 h-5 bg-green-400" />
                                </dd>
                            </div>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default PerfilUserComponent;
