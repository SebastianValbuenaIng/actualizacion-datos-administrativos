import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface State {
    direccionFinalPersona: string;
    setDireccionFinalPersona: (direccionFinalPersona: string) => void;
    getDireccionFinalPersona: () => string;
}

export const useDireccionFinalPersona = create<State>()(
    persist(
        (set, get) => (
            {
                direccionFinalPersona: '',
                getDireccionFinalPersona: () => {
                    const { direccionFinalPersona } = get();
                    return direccionFinalPersona;
                },
                setDireccionFinalPersona: (direccionFinalPersona: string) => {
                    set({ direccionFinalPersona});
                }
            }
        ),
        {
            name: 'direccion-final-persona'
        }
    )
)