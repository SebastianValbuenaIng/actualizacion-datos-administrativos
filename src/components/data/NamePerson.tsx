'use client';

import { useInfoPersonaStore } from "@/store";
export const NamePerson = () => {
    const person = useInfoPersonaStore(state => state.infoPersona);
    
    return (
        <h3 className="text-lg my-2 font-semibold text-center">
            {person.nombre}
        </h3>
    )
}
