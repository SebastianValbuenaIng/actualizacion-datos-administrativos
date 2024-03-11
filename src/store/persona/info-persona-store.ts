import { PersonaActiva } from '@/types';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface State {
    infoPersona: PersonaActiva;
    setInfoPersona: (infoPersona: PersonaActiva) => void;
    getInfoPersona: () => PersonaActiva;
}

export const useInfoPersonaStore = create<State>()(
    persist(
        (set, get) => (
            {
                infoPersona: {
                    id: 0,
                    nombre: '',
                    nroDocumento: '',
                    emplId: '',
                    email: '',
                    tipoDocumento: ''
                },
                setInfoPersona: (infoPersona) => {
                    set({ infoPersona });
                },
                getInfoPersona: () => {
                    const { infoPersona } = get();
                    return infoPersona;
                },
            }
        ),
        {
            name: 'info-persona'
        }
    )
)