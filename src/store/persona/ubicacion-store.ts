import { create } from "zustand";

type InfoUbicacion = {
    pais: string | null;
    departamento: string | null;
    ciudad: string | null;
}

interface State {
    infoUbicacion: InfoUbicacion;
    setInfoUbicacion: (infoUbicacion: InfoUbicacion) => void;
    getInfoUbicacion: () => InfoUbicacion;
}

export const useUbicacionStore = create<State>()(
    (set, get) => (
        {
            infoUbicacion: {
                pais: null,
                departamento: null,
                ciudad: null
            },
            setInfoUbicacion: (infoUbicacion) => {
                set({ infoUbicacion });
            },
            getInfoUbicacion: () => {
                const { infoUbicacion } = get();
                return infoUbicacion;
            },
        }
    )
)