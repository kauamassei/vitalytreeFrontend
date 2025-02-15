import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";
import logo from '@/assets/LogoVitalytree.svg';
import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/shared/ActionButton";
import { useNavigate } from "react-router-dom";

type Props = {
    isTopOfPage: boolean;
};

const Navbar = ({ isTopOfPage }: Props) => {
    const flexBetween = "flex items-center justify-between";
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); 
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const navigate = useNavigate();

    useEffect(() => {
        const userLoggedIn = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(userLoggedIn);
    }, []);

    const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";

    return (
        <nav>
            <div className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}>
                <div className={`${flexBetween} mx-auto w-5/6`}>
                    <div className={`${flexBetween} w-full gap-16`}>
                        <a href="/" className="flex items-center">
                            <img src={logo} className='h-20 w-auto' />
                        </a>

                        {isAboveMediumScreens ? (
                            <div className={`${flexBetween} w-full`}>
                                <div className={`${flexBetween} gap-8 text-sm`}>
                                    {/* Links para seções */}
                                    <a 
                                        href="#home" 
                                        className="transition duration-500 hover:text-primary-300"
                                    >
                                        Home
                                    </a>
                                    <a 
                                        href="#benefits" 
                                        className="transition duration-500 hover:text-primary-300"
                                    >
                                        Benefícios
                                    </a>
                                    <a 
                                        href="#ourClasses" 
                                        className="transition duration-500 hover:text-primary-300"
                                    >
                                        Serviços
                                    </a>
                                    <a 
                                        href="#contactUs" 
                                        className="transition duration-500 hover:text-primary-300"
                                    >
                                        Contato
                                    </a>
                                    {/* Ícone de Lupa */}
                                    <div className="flex items-center cursor-pointer" onClick={() => navigate('/doenca')}>
                                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
                                    </div>
                                </div>
                                <div className={`${flexBetween} gap-8`}>
                                    {!isAuthenticated ? (
                                        <>
                                            <p onClick={() => navigate('/login')} className="cursor-pointer">Entre</p>
                                            <ActionButton onClick={() => navigate('/login')}>
                                                Login
                                            </ActionButton>
                                        </>
                                    ) : (
                                        <UserIcon className="h-6 w-6 text-gray-600 cursor-pointer" onClick={() => navigate('/perfil')} />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <button className="rounded-full bg-secondary-500 p-2" onClick={() => setIsMenuToggled(!isMenuToggled)}>
                                <Bars3Icon className="h-6 w-6 text-white"/>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Menu Responsivo */}
            {!isAboveMediumScreens && isMenuToggled && (
                <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
                    <div className="flex justify-end p-12">
                        <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                            <XMarkIcon className="h-6 w-6 text-gray-400" />
                        </button>
                    </div>
                    <div className="ml-[10%] flex flex-col gap-10 text-2xl">
                        <a href="#home">Home</a>
                        <a href="#benefits">Benefícios</a>
                        <a href="#ourClasses">Serviços</a>
                        <a href="#contactUs">Contato</a>
                        <div className="flex flex-col gap-4 mt-4 items-start">
                            <div className="flex items-center cursor-pointer" onClick={() => navigate('/doenca')}>
                                <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" />
                                <span className="ml-2 text-lg">Buscar</span>
                            </div>
                            <div className="flex items-center cursor-pointer" onClick={() => isAuthenticated ? navigate('/perfil') : navigate('/login')}>
                                <UserIcon className="h-6 w-6 text-gray-600" />
                                <span className="ml-2 text-lg">Meu Perfil</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
