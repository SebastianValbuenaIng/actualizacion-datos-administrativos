"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import LoadingPage from "../LoadingPage";
import Image from "next/image";
import Modal from "../Modal";

export default function Login({ searchParams }: any) {
    let [IsOpenInstruc, setIsOpenInstruc] = useState<boolean>(true);
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
        const error = searchParams.error ? searchParams.error : false;
        if (error) {
            if (error === "auth") {
                toast.error("su cuenta no esta activa, por favor cerrar sesión.", {
                    position: "bottom-center",
                    id: "error1",
                });
            }
            if (error === "rol") {
                toast.error(
                    "usted esta usando una cuenta de estudiante, por favor cerrar sesión.",
                    { position: "bottom-center", id: "error2" }
                );
            }
            router.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (status === "unauthenticated") signIn("azure-ad", { callbackUrl: "/" });
    }, [status]);

    return (
        <>
            <div className="flex justify-center items-center">
                <LoadingPage />
            </div>
            {/* {
                status === 'unauthenticated' && (
                    <>
                        {searchParams.error && searchParams.error == 401 && (
                            <Modal isOpen={IsOpenInstruc} setIsOpen={setIsOpenInstruc}>
                                <div className="bg-default-white rounded-md p-5">
                                    {" "}
                                    <p className="text-xl font-bold">Acceso Denegado</p> <br /> Este
                                    cuenta de correo esta desabilitada o no es administrativa
                                    <br /> por favor inicia sesión con un correo activo o administrativo
                                    <br />
                                    <button
                                        onClick={() =>
                                            router.push(
                                                "https://login.microsoftonline.com/common/oauth2/v2.0/logout"
                                            )
                                        }
                                        className="bg-primary p-1 text-off-white mt-4 justify-center rounded-md"
                                    >
                                        Cerrar sesión desde Microsoft
                                    </button>
                                    <button
                                        type="button"
                                        className="mx-2 bg-primary p-1 text-off-white mt-4 justify-center rounded-md"
                                        onClick={() => setIsOpenInstruc(false)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </Modal>
                        )}
                        <div className="flex justify-between">
                            <div className="image-login hidden md:flex h-[100vh] w-[70%]"></div>
                            <div className="mx-auto w-[80%] md:w-[40%] text-center mt-[12%] max-w-md justify-center items-center">
                                <Image
                                    className="mx-auto"
                                    alt="logo_Login"
                                    src={"/images/ecijg250.png"}
                                    width={200}
                                    height={200}
                                />
                                <p className="text-3xl text-center my-12 font-semibold">
                                    Servicios Administrativos
                                </p>
                                <div className="py-3 px-2 pb-5 mx-5 bg-gray-box rounded-xl normal-shadow">
                                    <p className="pb-2 text-primary text-lg font-medium">
                                        Iniciar sesión
                                    </p>
                                    <button
                                        className="w-[95%] max-w-xs h-12 bg-primary text-off-white py-2 px-4 font-semibold rounded-xl hover:bg-dark-red transition-all"
                                        onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
                                    >
                                        <i className="bi bi-microsoft mr-2"></i> Ingresar con Microsoft
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            } */}
        </>
    );
}