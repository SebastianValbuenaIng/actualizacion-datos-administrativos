import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface DireccionPersonaUpdate {
    [name: string]: string | null;
}

interface State {
    direccionPersona: DireccionPersonaUpdate;
    setDireccionPersona: ({ name, value }: { name: string, value: string | null }) => void;
    getDireccionPersona: () => DireccionPersonaUpdate;
}

export const usePerfilEmpleado = create<State>()(
    persist(
        (set, get) => (
            {
                direccionPersona: {
                    primerCampoCalle: '',
                    primerNumeroCalle: '',
                    primeraLetraCalle: '',
                    segundoCampoCalle: '',
                    segundoNumeroCalle: '',
                    segundaLetraCalle: '',
                    tercerNumeroCalle: '',
                    terceraLetraCalle: '',
                    tercerCampoCalle: '',
                    cuartoNumeroCalle: '',
                    cuartoCampoCalle: '',
                    quintoNumeroCalle: '',
                    quintoCampoCalle: '',
                    primeraReferencia: ''
                },
                getDireccionPersona: () => {
                    const { direccionPersona } = get();
                    return direccionPersona;
                },
                setDireccionPersona: ({ name, value }: { name: string, value: string | null }) => {
                    const { direccionPersona: pastDireccion } = get();

                    const updateDireccion = {
                        ...pastDireccion,
                        [name]: value
                    }

                    set({
                        direccionPersona: updateDireccion
                    });
                }
            }
        ),
        {
            name: 'perfil-empleado'
        }
    )
)