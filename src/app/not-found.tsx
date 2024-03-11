import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Página no encontrada | Servicios",
};

const NotFound: NextPage = () => {

    return (
        <main className="py-14 text-center select-none">
            <Link href="/">
                <Image
                    src="/images/ecijg250.png"
                    width={250}
                    height={142}
                    alt="Logo ECIJG"
                    className="cursor-pointer mx-auto"
                    title="Volver al inicio"
                />
            </Link>

            <h1 className="my-8 font-bold text-gray text-9xl">404</h1>

            <p className="my-3 font-medium text-gray text-3xl">
                Página no encontrada
            </p>
        </main>
    );
};

export default NotFound;