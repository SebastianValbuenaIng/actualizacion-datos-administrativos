'use client';

import { Divider, Tooltip, Button as ButtonNextUI, useDisclosure, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import Button from "@/components/ui/ButtonContinue";
import TextAreaForm from "@/components/forms/TextAreaForm";
import { TypeUseValidateForm } from "@/app/hooks/useValidateForm";
import { useEffect, useState } from "react";
import { useInfoPersonaStore } from "@/store";
import { ModalAddTitulo } from "./informacion-empleado-ui/ModalAddTitulo";
import toast from "react-hot-toast";
import fetchFn from "@/utils/fetchFn";
import { formatDate } from "@/libs/functionsStrings";
import { ModalEditTitulo } from "./informacion-empleado-ui/ModalEditTitulo";

interface Props {
    changeTab: (tab: string) => void;
    changePerfilEmpleadoData: TypeUseValidateForm;
    verifyChangeValue: boolean;
    setVerifyChangeValue: (changeValue: boolean) => void;
    titulosPregradoActuales: any[];
    titulosPosgradoActuales: any[];
    setModalGuardarTemporal: (guardar: boolean) => void;
    postPerfilEmplado: () => Promise<void>;
    instituciones: any[];
    estudios: any[];
}

export interface tituloEdit {
    cod_estudio: string;
    cod_ins: string;
    ano_est: number;
    fec_gra: string;
    nro_tar: string;
    archivo: string;
    id: number;
}

export const PerfilEmpleado = ({
    changeTab,
    changePerfilEmpleadoData,
    setVerifyChangeValue,
    titulosPosgradoActuales,
    titulosPregradoActuales,
    verifyChangeValue,
    setModalGuardarTemporal,
    postPerfilEmplado,
    estudios,
    instituciones }: Props) => {

    const infoPersona = useInfoPersonaStore(state => state.getInfoPersona());
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2, onClose: onClose2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3, onClose: onClose3 } = useDisclosure();

    const [loading, setLoading] = useState(false);
    const [titulos, setTitulos] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState();

    const [tituloEdit, setTituloEdit] = useState<tituloEdit>();

    const getTitulos = async () => {
        setLoading(true);

        const respTitulosNuevos = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/nuevoPerfil/titulos?documento=${infoPersona.nroDocumento}`)).json();
        setTitulos(respTitulosNuevos);

        setLoading(false);
    }

    const deleteTitulo = async () => {
        const respDeleteTitulo = await fetchFn(`/nuevoPerfil/nuevoTitulo?id_titulo=${selectedId}`, {
            method: 'DELETE'
        });

        if (respDeleteTitulo.code !== 200) {
            toast.error('Hubo un error', {
                id: 'error-peticion'
            });
            return;
        }

        getTitulos();
        toast.success('Titulo eliminado correctamente.', {
            id: 'success'
        });
    }

    useEffect(() => {
        getTitulos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section>
            <h2 className="text-2xl font-semibold text-center my-8">Perfil Empleado</h2>

            {/* Añadir Titulo */}
            <ModalAddTitulo
                getTitulos={getTitulos}
                documento={infoPersona.nroDocumento}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
                instituciones={instituciones}
                estudios={estudios}
            />

            {/* Editar Titulo */}
            <ModalEditTitulo
                tituloEdit={tituloEdit}
                getTitulos={getTitulos}
                onClose={onClose3}
                isOpen={isOpen3}
                onOpenChange={onOpenChange3}
                estudios={estudios}
                instituciones={instituciones}
            />

            {/* Eliminar titulo */}
            <Modal isOpen={isOpen2} onOpenChange={onOpenChange2}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminar Titulo</ModalHeader>
                            <ModalBody>
                                <div>
                                    <p>Está seguro de eliminar el titulo?</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <ButtonNextUI color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </ButtonNextUI>
                                <ButtonNextUI color="danger" variant="solid" className="text-off-white" onClick={() => {
                                    deleteTitulo();
                                    onClose();
                                }}>
                                    Eliminar
                                </ButtonNextUI>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <form className="w-full max-w-[1400px]">
                <div className="flex flex-col w-full max-w-[1000px] flex-center gap-6">
                    <div className="flex flex-col gap-2 items-center justify-center md:ml-4">
                        <div>
                            <div className="flex-center">
                                <ButtonNextUI color="primary" className="font-semibold text-center flex-center my-6" onClick={() => {
                                    onOpen();
                                }}>
                                    Agregar Nuevo Titulo
                                </ButtonNextUI>
                            </div>

                            <div>
                                {
                                    titulos.length > 0 && (
                                        <>
                                            <h6 className="text-center text-xl font-semibold my-4">Titulos Agregados Recientemente</h6>
                                            <Table isStriped aria-label="Example static collection table" className="overflow-x-auto w-72 md:w-96 p-0 lg:w-full mt-2" classNames={{
                                                wrapper: "p-0"
                                            }}>
                                                <TableHeader className="text-center">
                                                    <TableColumn className="text-center">Estudio</TableColumn>
                                                    <TableColumn className="text-center">Archivo</TableColumn>
                                                    <TableColumn className="text-center">Institución</TableColumn>
                                                    <TableColumn className="text-center">Año Grado</TableColumn>
                                                    <TableColumn className="text-center">Fecha Graduación</TableColumn>
                                                    <TableColumn className="text-center">Número Tarjeta Profesional</TableColumn>
                                                    <TableColumn className="text-center">Editar</TableColumn>
                                                    <TableColumn className="text-center">Eliminar</TableColumn>
                                                </TableHeader>
                                                <TableBody>
                                                    {
                                                        titulos.map((data, index) => (
                                                            <TableRow key={index} className="text-center">
                                                                <TableCell>{estudios.find(e => e.cod_est.trim() == data.cod_estudio.trim())?.nom_est ?? ''}</TableCell>
                                                                <TableCell>
                                                                    <a href={process.env.NEXT_PUBLIC_API_URL + `/nuevoPerfil/titulo?name_title=${data.archivo}`} className="underline hover:text-primary" target="_blank">
                                                                        {data.archivo}
                                                                    </a>
                                                                </TableCell>
                                                                <TableCell>{instituciones.find(i => i.cod_ins.trim() == data.cod_ins.trim())?.nom_ins ?? ''}</TableCell>
                                                                <TableCell>{data.ano_est}</TableCell>
                                                                <TableCell>{formatDate(data.fec_gra)}</TableCell>
                                                                <TableCell>{data.nro_tar ?? 'No aplica'}</TableCell>
                                                                <TableCell>
                                                                    <i title="Editar titulo" className="bi bi-pencil text-default-400 text-lg hover:cursor-pointer hover:text-custom-black transition-all" onClick={() => {
                                                                        setTituloEdit({
                                                                            ano_est: data.ano_est,
                                                                            cod_estudio: estudios.find(e => e.cod_est.trim() == data.cod_estudio.trim())?.cod_est,
                                                                            cod_ins: instituciones.find(i => i.cod_ins.trim() == data.cod_ins.trim())?.cod_ins,
                                                                            fec_gra: data.fec_gra,
                                                                            nro_tar: data.nro_tar ?? '',
                                                                            archivo: data.archivo,
                                                                            id: data.id
                                                                        })
                                                                        onOpen3();
                                                                    }} />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <i title="Eliminar titulo" className="bi bi-trash3 text-default-400 text-lg hover:cursor-pointer hover:text-danger transition-all" onClick={() => {
                                                                        setSelectedId(data.id);
                                                                        onOpen2();
                                                                    }} />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                        <Divider className="my-4" />

                        <div className="flex items-center flex-wrap gap-4 flex-center">
                            <div>
                                {
                                    titulosPregradoActuales.length > 0 && (
                                        <>
                                            <h6 className="text-center text-xl font-semibold my-4 w-[95%]">Títulos Pregrado Registrados Actualmente</h6>
                                            <div className="flex-center">
                                                <Table isStriped aria-label="Example static collection table" className="overflow-x-auto w-72 md:w-96 p-0 lg:w-full" classNames={{
                                                    wrapper: "p-0"
                                                }}>
                                                    <TableHeader className="text-center">
                                                        <TableColumn className="text-center">Título de pregrado</TableColumn>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {
                                                            titulosPregradoActuales.map((data, index) => (
                                                                <TableRow key={index} className="text-center">
                                                                    <TableCell>{data}</TableCell>
                                                                </TableRow>
                                                            ))
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            <div className="mt-4">
                                {
                                    titulosPosgradoActuales.length > 0 && (
                                        <>
                                            <h6 className="text-center text-xl font-semibold my-4 w-[95%]">Títulos Posgrado Registrados Actualmente</h6>
                                            <div className="flex-center">
                                                <Table isStriped aria-label="Example static collection table" className="overflow-x-auto w-72 md:w-96 p-0 lg:w-full" classNames={{
                                                    wrapper: "p-0"
                                                }}>
                                                    <TableHeader className="text-center">
                                                        <TableColumn className="text-center">Título de posgrado</TableColumn>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {
                                                            titulosPosgradoActuales.map((data, index) => (
                                                                <TableRow key={index} className="text-center">
                                                                    <TableCell>{data}</TableCell>
                                                                </TableRow>
                                                            ))
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <Divider className="my-4" />

                    <div className="flex flex-wrap flex-center gap-12 mt-4">
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <TextAreaForm
                                name="cargosDirectivos"
                                value={changePerfilEmpleadoData.data.cargosDirectivos}
                                label="Cargos directivos o dirección de proyectos destacados"
                                onChange={
                                    ({ name, value }) => {
                                        if (value && value.toString().length <= 400) {
                                            changePerfilEmpleadoData.setField({ name, value });
                                            setVerifyChangeValue(true);
                                        }
                                    }
                                }
                                className="max-w-full w-[425px] placeholder:text-red placeholder-shown:text-dark-red placeholder:text-sm "
                                classNames={{
                                    base: "text-sm",
                                    inputWrapper: "text-sm",
                                    label: "py-2",
                                    input: "bg-gray-box text-sm rounded p-1",
                                }}
                                endContent={
                                    <Tooltip
                                        content={
                                            <div className="w-36">
                                                <p className="text-xs"> En el caso de los profesores de cátedra, poner sólo el cargo y el nombre de la empresa actual. Empresas anteriores no.</p>
                                            </div>
                                        }
                                    >
                                        <button className="absolute right-5 top-3" type="button">
                                            <i className="bi bi-info-circle-fill text-red text-xl"></i>
                                        </button>
                                    </Tooltip>
                                }
                                validations={changePerfilEmpleadoData.validators}
                                defaultValue={changePerfilEmpleadoData.data.cargosDirectivos ?? undefined}
                            />
                        </div>

                        <div className="flex flex-col gap-2 items-center justify-center">
                            <TextAreaForm
                                value={changePerfilEmpleadoData.data.membresias}
                                name="membresias"
                                label="Membresías"
                                onChange={
                                    ({ name, value }) => {
                                        if (value && value.toString().length <= 300) {
                                            changePerfilEmpleadoData.setField({ name, value });
                                            setVerifyChangeValue(true);
                                        }
                                    }
                                }
                                // placeholder="Ejemplo: IEEE, ASCE"
                                className="max-w-full w-[409px]"
                                classNames={{
                                    base: "text-sm",
                                    inputWrapper: "text-sm",
                                    label: "py-2",
                                    input: "bg-gray-box text-sm rounded p-1",
                                }}
                                validations={changePerfilEmpleadoData.validators}
                                defaultValue={changePerfilEmpleadoData.data.membresias ?? undefined}
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center md:flex-row gap-6">
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <TextAreaForm
                                    value={changePerfilEmpleadoData.data.reconocimientos}
                                    name="reconocimientos"
                                    label="Reconocimientos: premios, becas, condecoraciones"
                                    onChange={
                                        ({ name, value }) => {
                                            if (value && value.toString().length <= 300) {
                                                changePerfilEmpleadoData.setField({ name, value });
                                                setVerifyChangeValue(true);
                                            }
                                        }
                                    }
                                    // placeholder="Ejemplo: Premio Nacional de Investigación 2023"
                                    className="max-w-full placeholder:text-red placeholder-shown:text-dark-red placeholder:text-sm "
                                    classNames={{
                                        base: "text-sm",
                                        inputWrapper: "text-sm",
                                        label: "py-2",
                                        input: "bg-gray-box text-sm rounded p-1",
                                    }}
                                    validations={changePerfilEmpleadoData.validators}
                                    defaultValue={changePerfilEmpleadoData.data.reconocimientos ?? undefined}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <Divider className="my-6" />

            <div>
                {/* Perfil Web */}
                <div>
                    <h4 className="text-center text-2xl my-4 font-bold">Perfil Web</h4>
                    {/* Boton Ejemplo Profesor*/}
                    <div className="flex-center gap-4">
                        <ButtonNextUI className="bg-primary text-soft-white">
                            Ejemplo para Profesor
                        </ButtonNextUI>

                        {/* Boton Ejemplo Decano*/}
                        <ButtonNextUI className="bg-primary text-soft-white">
                            Ejemplo para Decano
                        </ButtonNextUI>
                    </div>

                    <div className="flex flex-wrap gap-5 mt-5">
                        {/* Parrafo 1 - Perfil */}
                        <div className="mx-auto w-[95%] max-w-[500px]">
                            <TextAreaForm
                                value={changePerfilEmpleadoData.data.perfilParrafoUno}
                                name="perfilParrafoUno"
                                label="Párrafo 1 - Perfil"
                                onChange={
                                    ({ name, value }) => {
                                        if (value && value.toString().length <= 1000) {
                                            changePerfilEmpleadoData.setField({ name, value });
                                            setVerifyChangeValue(true);
                                        }
                                    }
                                }
                                validations={changePerfilEmpleadoData.validators}
                                placeholder="Ejemplo: Economista y magíster en Economía de la Universidad Nacional de Colombia y licenciado en Ciencias Sociales y Ph. D. (cum laude) de la Universidad Pompeu Fabra (España). Ha escrito tres libros, capítulos de libros y artículos sobre ciencias sociales, humanas, agrícolas y políticas; historia y arqueología; administración pública y economía y negocios. Fue investigador principal en el Observatorio Agrocadenas del Ministerio de Agricultura y el IICA-OEA, asesor en ministerios como el de Comercio Exterior y Agricultura y consultar en el Banco Mundial, la Agencia de los Estados Unidos para el Desarrollo Internacional (USAD), el banco Interamericano de Desarrollo (BID) y gremios asociados a la SAC y a la ANDIE. Piensa que, si una persona desarrolla competencias en lectura, matemáticas y escritura, tiene el mundo abierto."
                                className="max-w-full md:w-[500px]"
                                classNames={{
                                    base: "text-sm",
                                    inputWrapper: "text-sm",
                                    label: "py-2",
                                    input: "bg-gray-box text-sm rounded p-1 placeholder:text-softw-gray",
                                }}
                                minRows={15}
                                maxRows={19}
                                defaultValue={changePerfilEmpleadoData.data.perfilParrafoUno ?? undefined}
                                endContent={
                                    <Tooltip
                                        content={
                                            <div className="w-80">
                                                <p className="text-xs">Ejemplo: Economista y magíster en Economía de la Universidad Nacional de Colombia y licenciado en Ciencias Sociales y Ph. D. (cum laude) de la Universidad Pompeu Fabra (España). Ha escrito tres libros, capítulos de libros y artículos sobre ciencias sociales, humanas, agrícolas y políticas; historia y arqueología; administración pública y economía y negocios. Fue investigador principal en el Observatorio Agrocadenas del Ministerio de Agricultura y el IICA-OEA, asesor en ministerios como el de Comercio Exterior y Agricultura y consultar en el Banco Mundial, la Agencia de los Estados Unidos para el Desarrollo Internacional (USAD), el banco Interamericano de Desarrollo (BID) y gremios asociados a la SAC y a la ANDIE. Piensa que, si una persona desarrolla competencias en lectura, matemáticas y escritura, tiene el mundo abierto.</p>
                                            </div>
                                        }
                                    >
                                        <button className="absolute right-5 top-3" type="button">
                                            <i className="bi bi-info-circle-fill text-red text-xl"></i>
                                        </button>
                                    </Tooltip>
                                }
                            />
                        </div>

                        {/* Parrafo 2 - Perfil */}
                        <div className="mx-auto w-[95%] max-w-[500px]">
                            <TextAreaForm
                                value={changePerfilEmpleadoData.data.perfilParrafoDos}
                                name="perfilParrafoDos"
                                label="Párrafo 2 - Perfil"
                                onChange={
                                    ({ name, value }) => {
                                        if (value && value.toString().length <= 1000) {
                                            changePerfilEmpleadoData.setField({ name, value });
                                            setVerifyChangeValue(true);
                                        }
                                    }
                                }
                                validations={changePerfilEmpleadoData.validators}
                                placeholder="Ejemplo: Pedagogo comprometido con afianzar en sus estudiantes la lectura habitual, el respeto por el conocimiento, el pensamiento crítico, las competencias ciudadanas, el razonamiento cuantitativo; la concentración, la disciplina y el esfuerzo como características de las matemáticas y la aplicación de la economía con ética y responsabilidad social. Busca cambiar modelos educativos tradicionales por medio de la cercanía con sus aprendices. Cuenta con una amplia experiencia en el ejercicio de la docencia  desde 2017 es decano del Programa de Economía. Recuerda co aprecio a Josep Fontana, historiador español y profesor universitario fallecido en 2018, con quien fortaleció su formación personal y académica."
                                className="max-w-full md:w-[500px]"
                                classNames={{
                                    base: "text-sm",
                                    inputWrapper: "text-sm",
                                    label: "py-2",
                                    input: "bg-gray-box text-sm rounded p-1 placeholder:text-softw-gray",
                                }}
                                minRows={15}
                                maxRows={19}
                                defaultValue={changePerfilEmpleadoData.data.perfilParrafoDos ?? undefined}
                                endContent={
                                    <Tooltip
                                        content={
                                            <div className="w-80">
                                                <p className="text-xs">Ejemplo: Pedagogo comprometido con afianzar en sus estudiantes la lectura habitual, el respeto por el conocimiento, el pensamiento crítico, las competencias ciudadanas, el razonamiento cuantitativo; la concentración, la disciplina y el esfuerzo como características de las matemáticas y la aplicación de la economía con ética y responsabilidad social. Busca cambiar modelos educativos tradicionales por medio de la cercanía con sus aprendices. Cuenta con una amplia experiencia en el ejercicio de la docencia  desde 2017 es decano del Programa de Economía. Recuerda co aprecio a Josep Fontana, historiador español y profesor universitario fallecido en 2018, con quien fortaleció su formación personal y académica.</p>
                                            </div>
                                        }
                                    >
                                        <button className="absolute right-5 top-3" type="button">
                                            <i className="bi bi-info-circle-fill text-red text-xl"></i>
                                        </button>
                                    </Tooltip>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-center mt-8">
                <div className="flex gap-3">
                    <div>
                        <button className="h-10 border-2 select-none justify-center rounded-xl text-base font-medium items-center normal-shadow hover:font-semibold border-borders-light hover:border-primary bg-default-white hover:text-primary transition-all flex gap-1 w-40" onClick={() => {
                            changeTab('redes-sociales');
                            postPerfilEmplado();
                            if (verifyChangeValue) {
                                setModalGuardarTemporal(true);
                            }
                        }}>
                            <i className='bi bi-caret-left mr-2 text-xl'></i>
                            Volver
                        </button>
                    </div>
                    <div className="w-40">
                        <Button text="Continuar" icon="caret-right" onClick={() => {
                            changeTab('detalles-cargo');
                            postPerfilEmplado();
                            if (verifyChangeValue) {
                                setModalGuardarTemporal(true);
                            }
                        }} />
                    </div>
                </div>
            </div>
        </section>
    )
}