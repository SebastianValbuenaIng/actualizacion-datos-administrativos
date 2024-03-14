'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInfoPersonaStore } from "@/store";
import { PersonaActiva } from "@/types";

interface Props {
    infoPersona: PersonaActiva
}

export const HomeRedirect = ({ infoPersona }: Props) => {
    const setInfoPersona = useInfoPersonaStore(state => state.setInfoPersona);
    const router = useRouter();

    useEffect(() => {
        setInfoPersona(infoPersona)

        if (infoPersona.email) {
            router.push('/actualizacion-datos');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        </>
    )
}
