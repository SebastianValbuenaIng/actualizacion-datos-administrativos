import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function MenuMobile() {
    const router = useRouter();

    const cerrarSesion = () => {
        sessionStorage.removeItem('email');
        localStorage.clear();

        router.push('https://empleados.escuelaing.edu.co/intraeci/Menu');
    }


    return (
        <div className="block lg:hidden absolute ml-[85%] ">
            <Menu as="div" className="relative inline-block text-center ">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center  rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                            />
                        </svg>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md justify-center bg-default-white shadow-lg">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => router.push("/")}
                                        className={`${active
                                                ? "bg-primary text-default-white"
                                                : "text-custom-black"
                                            } group flex w-full items-center rounded-md justify-center px-2 py-2 text-center`}
                                    >
                                        Inicio
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() =>
                                            router.push(
                                                "/https://empleados.escuelaing.edu.co/intraeci/"
                                            )
                                        }
                                        className={`${active
                                                ? "bg-primary text-default-white"
                                                : "text-custom-black"
                                            } group flex w-full items-center rounded-md justify-center px-2 py-2 text-sm `}
                                    >
                                        Aplicantes convocatorias
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() =>
                                            router.push(
                                                "https://siaci-escuelaing.azurewebsites.net/Account/Login?ReturnUrl=%2F"
                                            )
                                        }
                                        className={`${active
                                                ? "bg-primary text-default-white"
                                                : "text-custom-black"
                                            } group flex w-full items-center rounded-md justify-center px-2 py-2 text-sm`}
                                    >
                                        SIACI
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() =>
                                            router.push(
                                                "https://empleados.escuelaing.edu.co/intraeci/InicioPlanes"
                                            )
                                        }
                                        className={`${active
                                                ? "bg-primary text-default-white"
                                                : "text-custom-black"
                                            } group flex w-full items-center rounded-md justify-center px-2 py-2 text-sm`}
                                    >
                                        Planes
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() =>
                                            router.push(
                                                "https://empleados.escuelaing.edu.co/intraeci/presupuesto"
                                            )
                                        }
                                        className={`${active
                                                ? "bg-primary text-default-white"
                                                : "text-custom-black"
                                            } group flex w-full items-center rounded-md justify-center px-2 py-2 text-sm`}
                                    >
                                        Presupuesto
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() =>
                                            router.push("https://horus.escuelaing.edu.co/planeacion/")
                                        }
                                        className={`${active
                                                ? "bg-primary text-default-white"
                                                : "text-custom-black"
                                            } group flex w-full items-center rounded-md justify-center px-2 py-2 text-sm`}
                                    >
                                        Proyectos
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() =>
                                            router.push(
                                                "http://copernico.escuelaing.edu.co/software/"
                                            )
                                        }
                                        className={`${active
                                                ? "bg-primary text-default-white"
                                                : "text-custom-black"
                                            } group flex w-full items-center rounded-md justify-center px-2 py-2 text-sm`}
                                    >
                                        Descargas
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button

                                        onClick={cerrarSesion}
                                        className={`${active
                                                ? "bg-primary text-default-white"
                                                : "text-custom-black"
                                            } group flex w-full items-center rounded-md justify-center px-2 py-2 text-sm`}
                                    >
                                        Cerrar sesión
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}