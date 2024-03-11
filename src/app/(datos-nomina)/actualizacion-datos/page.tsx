'use client';

import { useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PrincipalTabs } from "./ui";
import { NamePerson } from "@/components/data/NamePerson";
import { useDireccionFinalPersona } from "@/store";
import toast from "react-hot-toast";

export default function ActualizacionDatosPage() {
    const [openModal, setOpenModal] = useState(false);
    const getDireccionFinalPersona = useDireccionFinalPersona(state => state.getDireccionFinalPersona());

    return (
        <>
            <main className="mb-10 mt-10">
                <Header />
                <div className="justify-center text-center mt-14 h-[90px]">
                    <NamePerson />
                    <div className="flex-center">
                        <Link href="/">
                            <button
                                className="mx-5 mt-[15px] mb-4 w-[125px] min-w-[100px] max-w-xs h-12 lg:text-base text-center rounded-xl transition-all normal-shadow bg-default-white font-semibold text-primary hover:bg-primary hover:text-default-white "
                            >
                                Volver
                            </button>
                        </Link>
                        <div>
                            <Button color="primary" size="lg" onClick={() => {
                                if (getDireccionFinalPersona.length > 40) {
                                    toast.error('La dirección nueva no es válida')
                                } else {
                                    setOpenModal(!openModal)
                                }
                            }}>
                                Guardar cambios
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-8 mt-12">
                    <PrincipalTabs openModal={openModal} setOpenModal={setOpenModal} />
                </div>

                <div className="flex-center mt-4 block md:hidden">
                    <Button className="block md:hidden" color="primary" size="lg" onClick={() => {
                        if (getDireccionFinalPersona.length > 40) {
                            toast.error('La dirección nueva no es válida')
                        } else {
                            setOpenModal(!openModal)
                        }
                    }}>
                        Guardar cambios
                    </Button>
                </div>
            </main>
            <Footer />
        </>
    );
}