"use client";

import { Spinner } from "@nextui-org/react";
import Image from "next/image";

const LoadingPage = () => {
    return (
        <main className="py-14 text-center select-none mb-9">
            <Image
                src={'/images/ecijg250.png'}
                alt="Imagen Escuela Colombiana de Ingeniería"
                width={250}
                height={250}
            />
            <section className="flex-center flex-col mt-9">
                <Spinner size="lg" />
                <p className="my-3 font-medium text-2xl opacity-80 select-none animate-pulse">
                    Cargando...
                </p>
            </section>
        </main>
    );
};

export default LoadingPage;