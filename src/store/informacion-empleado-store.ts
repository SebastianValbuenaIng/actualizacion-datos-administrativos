import { InformacionBasicaEmpleado } from '@/types';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface State {
    infoBasicEmpleado: InformacionBasicaEmpleado;
    setInfoEmpleado: (infoBasicEmpleado: InformacionBasicaEmpleado) => void;
    getInfoEmpleado: () => InformacionBasicaEmpleado;
}

export const useInformacionEmpleadoStore = create<State>()(
    persist(
        (set, get) => (
            {
                infoBasicEmpleado: {
                    ciudades: [],
                    departamentos: [],
                    paises: [],
                    generos: [],
                    estadoCivil: [],
                    tipoEmpleado: []
                },
                setInfoEmpleado: (infoBasicEmpleado) => {
                    set({ infoBasicEmpleado });
                },
                getInfoEmpleado: () => {
                    const { infoBasicEmpleado } = get();
                    return infoBasicEmpleado;
                },
            }
        ),
        {
            name: 'informacion-empleado'
        }
    )
)