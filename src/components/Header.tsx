"use client"

import { useState } from "react";
import Image from "next/image";
import Menu from "@/components/Menu";
import Modal from "./Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Header = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const router = useRouter();

    const cerrarSesion = () => {
        sessionStorage.removeItem('email');
        localStorage.removeItem('info-persona');

        router.push('https://empleados.escuelaing.edu.co/intraeci/Menu');
    }

    return (
        <header className="fixed top-0 left-0 right-0  w-full h-[65px] text-start shadow-sm bg-gray-box border-b border-borders-light z-40 select-none">
            <Modal
                isOpen={showModal}
                setIsOpen={setShowModal}
                classContainer="max-w-[450px]"
            >
                <>
                    <h1 className="flex flex-col mt-4 mb-6 text-xl font-semibold text-primary text-center gap-1 outline-none">
                        Cerrar sesión
                    </h1>
                    <div>
                        <p className="text-lg text-center items-center justify-center rounded-lg outline-none">
                            ¿Seguro que quiere cerrar sesión?
                        </p>
                    </div>
                    <div className="flex items-center gap-7 pb-3 justify-center text-center">
                        <div className="mt-5">
                            <button
                                onClick={cerrarSesion}
                                type="button"
                                className="inline-flex font-base hover:text-primary outline-none hover:font-bold border-none transition-all justify-center rounded-lg px-4 text-lg"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                        <div className="mt-5">
                            <button
                                type="button"
                                className="inline-flex font-base hover:font-bold outline-none border-none transition-all justify-center rounded-lg px-4 text-lg"
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </>
            </Modal>
            <nav className="mx-auto flex items-center justify-between container-class gap-4">
                <section className="h-[65px] flex justify-between">
                    <Link href={"/"}>
                        <Image
                            src="/images/ecijg60.png"
                            width={105}
                            height={60}
                            alt="Logo header"
                            className="cursor-pointer"
                            priority={true}
                        />
                    </Link>
                </section>
                <ul className="hidden lg:flex flex-col items-center justify-center font-medium lg:flex-row ">
                    <li>
                        <Link href={"/"} className="w-full mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link className="w-full py-2 mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0" href={"https://empleados.escuelaing.edu.co/intraeci/AdminConvoca"}>
                            Aplicantes convocatorias
                        </Link>
                    </li>
                    <li>
                        <Link href={"https://siaci-escuelaing.azurewebsites.net/Account/Login?ReturnUrl=%2F"} className="w-full mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                            SIACI
                        </Link>
                    </li>
                    <li>
                        <Link href={"https://empleados.escuelaing.edu.co/intraeci/InicioPlanes"} className="w-full py-2 mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                            Planes
                        </Link>
                    </li>
                    <li>
                        <Link href={"https://empleados.escuelaing.edu.co/intraeci/presupuesto"} className="w-full py-2 mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                            Presupuesto
                        </Link>
                    </li>
                    <li>
                        <Link href={"https://horus.escuelaing.edu.co/planeacion/"} className="w-full py-2 mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                            Proyectos
                        </Link>
                    </li>
                    <li>
                        <Link href={"http://copernico.escuelaing.edu.co/software/"} className="w-full py-2 mx-3 transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                            Descargas
                        </Link>
                    </li>
                </ul>
                <Menu />

                {/* Botón de cerrar sesión */}
                <section className="h-[65px] flex justify-start flex-col">
                    <button
                        className="bg-primary w-[140px] h-10 items-center p-1 my-3 hidden lg:block hover:bg-dark-primary text-off-white justify-center rounded-xl"
                        onClick={() => setShowModal(true)}
                    >
                        <i className="bi bi-box-arrow-right mr-2 mt-3 sm:text-base "></i>
                        Cerrar Sesión
                    </button>
                </section>
            </nav>
        </header>
    );
};

export default Header;