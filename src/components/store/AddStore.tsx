'use client';

import { useInfoPersonaStore } from "@/store";
import { PersonaActiva } from "@/types";
import { useEffect } from "react";

interface Props {
    infoPersona: PersonaActiva
}

export const AddStore = ({ infoPersona }: Props) => {
    const setInfoPersona = useInfoPersonaStore(state => state.setInfoPersona);

    useEffect(() => {
        setInfoPersona(infoPersona)
    }, [infoPersona, setInfoPersona]);

    return (
        <></>
    )
}