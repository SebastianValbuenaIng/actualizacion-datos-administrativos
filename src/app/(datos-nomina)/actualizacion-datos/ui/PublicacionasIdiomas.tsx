'use client';

import { useEffect, useState } from "react";
import Button from "@/components/ui/ButtonContinue";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, SelectItem, Button as ButtonNextUI, Divider, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import SelectForm from "@/components/forms/SelectForm";
import InputForm from "@/components/forms/InputForm";
import useValidateForm from "@/app/hooks/useValidateForm";
import { useInfoPersonaStore } from "@/store";
import { formatDate } from "@/libs/functionsStrings";
import { Triangle } from "react-loader-spinner";
import fetchFn from "@/utils/fetchFn";
import toast from "react-hot-toast";

interface Props {
    changeTab: (tab: string) => void;
    getIdiomaEmpl: any[];
    idiomas: any[];
    calificacionIdioma: any[];
    habilidadIdioma: any[];
    publicacionesEmpl: any[];
}

export const PublicacionesIdiomas = ({ changeTab, getIdiomaEmpl, calificacionIdioma, habilidadIdioma, idiomas, publicacionesEmpl }: Props) => {
    const infoPersona = useInfoPersonaStore(state => state.getInfoPersona());
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3, onClose: onClose3 } = useDisclosure();
    const { isOpen: isOpen4, onOpen: onOpen4, onOpenChange: onOpenChange4 } = useDisclosure();

    const [agregarIdioma, setAgregarIdioma] = useState(false);
    const [agregarPublicacion, setAgregarPublicacion] = useState(false);
    const [loading, setLoading] = useState(false);
    const [idiomasActualizaDatos, setIdiomasActualizaDatos] = useState<[]>([]);
    const [publicacionesActualizaDatos, setPublicacionesActualizaDatos] = useState<[]>([]);
    const [selectedId, setSelectedId] = useState();

    const changeIdiomaEmpleado = useValidateForm<any>([
        {
            name: 'idioma'
        },
        {
            name: 'calificacion_idioma'
        },
        {
            name: 'habilidad_idioma'
        }
    ]);

    const changePublicacion = useValidateForm<any>([
        {
            name: 'titulo',
            validations: {
                required: 'El título es requerido'
            }
        },
        {
            name: 'editorial',
            validations: {
                required: 'La editorial es requerida'
            }
        },
        {
            name: 'year_publicacion',
            validations: {
                required: 'El año publicación es requerido'
            }
        },
        {
            name: 'isbn',
            validations: {
                required: 'El ISBN es requerido'
            }
        }
    ]);

    const editPulicacion = useValidateForm<any>([
        {
            name: 'editorial',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'fecha_public',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'isbn',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'titulo_public',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'id'
        }
    ]);

    const editIdioma = useValidateForm<any>([
        {
            name: 'cod_idioma',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'cod_calif',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'cod_hab',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'id'
        }
    ]);

    const getIdiomasPublicaciones = async () => {
        setLoading(true);

        const respIdiomasActualizaDatos = await fetch(process.env.NEXT_PUBLIC_API_URL + `/nuevoIdioma?documento=${infoPersona.nroDocumento}`);
        const respIdiomasActualizaDatosJson = await respIdiomasActualizaDatos.json();
        setIdiomasActualizaDatos(respIdiomasActualizaDatosJson);

        const respPublicacionesActualizaDatos = await fetch(process.env.NEXT_PUBLIC_API_URL + `/publicacionNueva?documento=${infoPersona.nroDocumento}`);
        const respPublicacionesActualizaDatosJson = await respPublicacionesActualizaDatos.json();
        setPublicacionesActualizaDatos(respPublicacionesActualizaDatosJson);

        setLoading(false);
    }

    const postPublicacion = async () => {
        const respNuevaPublicacion = await fetchFn(`/publicacionNueva?documento=${infoPersona.nroDocumento}`, {
            method: 'POST',
            body: {
                titulo_public: changePublicacion.data.titulo,
                fecha_public: changePublicacion.data.year_publicacion,
                editorial: changePublicacion.data.editorial,
                isbn: changePublicacion.data.isbn
            }
        });

        if (respNuevaPublicacion.code !== 200) {
            toast.error(respNuevaPublicacion.data.message, {
                id: 'error-peticion'
            });
            return;
        }

        getIdiomasPublicaciones();
        toast.success('Publicación agregada correctamente.', {
            id: 'success'
        });
    }

    const putPublicacion = async () => {
        const respUpdatePublicacion = await fetchFn(`/publicacionNueva?id_publicacion=${editPulicacion.data.id}`, {
            method: 'PUT',
            body: {
                ...editPulicacion.data
            }
        });

        if (respUpdatePublicacion.code !== 200) {
            toast.error('Hubo un error', {
                id: 'error-peticion'
            });
            return;
        }

        getIdiomasPublicaciones();
        toast.success('Publicación editada correctamente.', {
            id: 'success'
        });
    }

    const deletePublicacion = async () => {
        const respDeletePublicacion = await fetchFn(`/publicacionNueva?id_publicacion=${selectedId}`, {
            method: 'DELETE'
        });

        if (respDeletePublicacion.code !== 200) {
            toast.error('Hubo un error', {
                id: 'error-peticion'
            });
            return;
        }

        getIdiomasPublicaciones();
        toast.success('Publicación eliminada correctamente.', {
            id: 'success'
        });
    }

    const postIdioma = async () => {
        const respNuevoIdioma = await fetchFn(`/nuevoIdioma?documento=${infoPersona.nroDocumento}`, {
            method: 'POST',
            body: {
                cod_idioma: idiomas.find(idioma => idioma.nombre_idioma == changeIdiomaEmpleado.data.idioma).cod_idioma,
                cod_calif: calificacionIdioma.find(calif => calif.calificacion == changeIdiomaEmpleado.data.calificacion_idioma).cod_calificacion,
                cod_hab: habilidadIdioma.find(habil => habil.descripcion_habilidad == changeIdiomaEmpleado.data.habilidad_idioma).cod_habilidad,
            }
        });

        if (respNuevoIdioma.code !== 200) {
            toast.error(respNuevoIdioma.data.message, {
                id: 'error-peticion'
            });
            return;
        }

        getIdiomasPublicaciones();
        toast.success('Idioma agregado correctamente.', {
            id: 'success'
        });
    }

    const putIdioma = async () => {
        const respUpdateIdioma = await fetchFn(`/nuevoIdioma?id_idioma=${editIdioma.data.id}`, {
            method: 'PUT',
            body: {
                ...editIdioma.data
            }
        });

        if (respUpdateIdioma.code !== 200) {
            toast.error('Hubo un error', {
                id: 'error-peticion'
            });
            return;
        }

        getIdiomasPublicaciones();
        toast.success('Idioma editado correctamente.', {
            id: 'success'
        });
    }

    const deleteIdioma = async () => {
        const respDeletePublicacion = await fetchFn(`/nuevoIdioma?id_idioma=${selectedId}`, {
            method: 'DELETE'
        });

        if (respDeletePublicacion.code !== 200) {
            toast.error('Hubo un error', {
                id: 'error-peticion'
            });
            return;
        }

        getIdiomasPublicaciones();
        toast.success('Idioma eliminado correctamente.', {
            id: 'success'
        });
    }

    useEffect(() => {
        getIdiomasPublicaciones();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section>
            <form className="w-full max-w-[1400px]">

                {/* Tabla publicaciones */}
                <div className="flex-center flex-col items-end justify-start">
                    <h2 className="text-2xl font-semibold text-center my-4">Consultar Publicaciones</h2>

                    <ButtonNextUI color="primary" className="m-2 font-semibold" onClick={() => setAgregarPublicacion(!agregarPublicacion)}>
                        {agregarPublicacion ? 'Cerrar' : 'Agregar publicación'}
                    </ButtonNextUI>

                    {
                        agregarPublicacion && (
                            <>
                                {/* Añadir publicación */}
                                <div className="flex flex-wrap justify-center gap-4 mt-2">
                                    <div>
                                        <div className="mb-4">
                                            <InputForm
                                                classNames={{
                                                    inputWrapper: "pb-1",
                                                    errorMessage: "text-sm font-medium",
                                                    input: "bg-off-white w-72 text-sm",
                                                    label: "text-sm"
                                                }}
                                                label="Título publicación"
                                                name='titulo'
                                                onChange={changePublicacion.setField}
                                                isRequired
                                                validations={changePublicacion.validators}
                                            />
                                        </div>

                                        <div>
                                            <InputForm
                                                classNames={{
                                                    inputWrapper: "pb-1",
                                                    errorMessage: "text-sm font-medium",
                                                    input: "bg-off-white w-72 text-sm",
                                                    label: "text-sm"
                                                }}
                                                label="Editorial o publicador"
                                                name='editorial'
                                                onChange={changePublicacion.setField}
                                                isRequired
                                                validations={changePublicacion.validators}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <InputForm
                                                placeholder="fecha"
                                                classNames={{
                                                    inputWrapper: "pb-1",
                                                    errorMessage: "text-sm font-medium",
                                                    input: "bg-off-white w-36 text-sm",
                                                    label: "text-sm"
                                                }}
                                                className="max-w-xs mb-4"
                                                label="Año publicación"
                                                name='year_publicacion'
                                                type="date"
                                                onChange={changePublicacion.setField}
                                                isRequired
                                                validations={changePublicacion.validators}
                                            />
                                        </div>

                                        <div>
                                            <InputForm
                                                classNames={{
                                                    inputWrapper: "pb-1",
                                                    errorMessage: "text-sm font-medium",
                                                    input: "bg-off-white w-72 text-sm",
                                                    label: "text-sm"
                                                }}
                                                label="ISBN"
                                                name="isbn"
                                                onChange={changePublicacion.setField}
                                                isRequired
                                                validations={changePublicacion.validators}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <ButtonNextUI color="primary" className="m-2 font-semibold mt-6" isDisabled={!changePublicacion.validData} onClick={postPublicacion}>Guardar</ButtonNextUI>
                            </>
                        )
                    }

                    {/* Eliminar publicación */}
                    <Modal isOpen={isOpen2} onOpenChange={onOpenChange2}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Eliminar Publicación</ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <p>Está seguro de eliminar la publicación?</p>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <ButtonNextUI color="danger" variant="light" onPress={onClose}>
                                            Cerrar
                                        </ButtonNextUI>
                                        <ButtonNextUI color="danger" variant="solid" className="text-off-white" onClick={() => {
                                            deletePublicacion();
                                            onClose();
                                        }}>
                                            Eliminar
                                        </ButtonNextUI>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    {/* Editar Publicacion */}
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Editar Publicación</ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <div className="flex flex-col gap-2 items-center justify-center mt-3">
                                                <InputForm
                                                    name="titulo_public"
                                                    isRequired
                                                    onChange={editPulicacion.setField}
                                                    type="text"
                                                    label="Titulo Publicación"
                                                    classNames={{
                                                        inputWrapper: "pb-1",
                                                        errorMessage: "text-sm font-medium",
                                                        input: "bg-off-white text-sm",
                                                        label: "text-sm"
                                                    }}
                                                    className="max-w-xs"
                                                    defaultValue={editPulicacion.data.titulo_public}
                                                    validations={editPulicacion.validators}
                                                />

                                                <InputForm
                                                    name="fecha_public"
                                                    isRequired
                                                    onChange={editPulicacion.setField}
                                                    type="date"
                                                    label="Año Publicación"
                                                    classNames={{
                                                        inputWrapper: "pb-1",
                                                        errorMessage: "text-sm font-medium",
                                                        input: "bg-off-white text-sm",
                                                        label: "text-sm"
                                                    }}
                                                    className="max-w-xs"
                                                    defaultValue={(editPulicacion.data.fecha_public).split("T")[0]}
                                                    validations={editPulicacion.validators}
                                                />

                                                <InputForm
                                                    name="isbn"
                                                    isRequired
                                                    onChange={editPulicacion.setField}
                                                    type="text"
                                                    label="ISBN"
                                                    classNames={{
                                                        inputWrapper: "pb-1",
                                                        errorMessage: "text-sm font-medium",
                                                        input: "bg-off-white text-sm",
                                                        label: "text-sm"
                                                    }}
                                                    className="max-w-xs"
                                                    defaultValue={editPulicacion.data.isbn}
                                                    validations={editPulicacion.validators}
                                                />

                                                <InputForm
                                                    name="editorial"
                                                    isRequired
                                                    onChange={editPulicacion.setField}
                                                    type="text"
                                                    label="Editorial"
                                                    classNames={{
                                                        inputWrapper: "pb-1",
                                                        errorMessage: "text-sm font-medium",
                                                        input: "bg-off-white text-sm",
                                                        label: "text-sm"
                                                    }}
                                                    className="max-w-xs"
                                                    defaultValue={editPulicacion.data.editorial}
                                                    validations={editPulicacion.validators}
                                                />
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <ButtonNextUI color="danger" variant="light" onPress={onClose}>
                                            Cerrar
                                        </ButtonNextUI>
                                        <ButtonNextUI color="danger" variant="solid" className="text-off-white" onClick={() => {
                                            putPublicacion();
                                            onClose();
                                        }} isDisabled={!editPulicacion.validData}>
                                            Guardar
                                        </ButtonNextUI>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    {/* Publicaciones */}
                    {
                        (publicacionesActualizaDatos.length > 0 && !loading) && (
                            <div>
                                <h6 className="text-center text-xl font-semibold my-4">Publicaciones Agregadas Recientemente</h6>
                                <div className="flex-center">
                                    <Table isStriped aria-label="Example static collection table" className="overflow-x-auto w-80 lg:w-full mt-2">
                                        <TableHeader className="text-center">
                                            <TableColumn className="text-center">Título Publicación</TableColumn>
                                            <TableColumn className="text-center">Año Publicación</TableColumn>
                                            <TableColumn className="text-center">Editorial o Publicador</TableColumn>
                                            <TableColumn className="text-center">ISBN</TableColumn>
                                            <TableColumn className="text-center">Editar</TableColumn>
                                            <TableColumn className="text-center">Eliminar</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                publicacionesActualizaDatos.map((data: any, index) => (
                                                    <TableRow key={index} className="text-center">
                                                        <TableCell>{data.titulo_public}</TableCell>
                                                        <TableCell>{formatDate(data.fecha_public)}</TableCell>
                                                        <TableCell>{data.editorial}</TableCell>
                                                        <TableCell>{data.isbn}</TableCell>
                                                        <TableCell>
                                                            <i title="Editar publicación" className="bi bi-pencil text-default-400 text-lg hover:cursor-pointer hover:text-custom-black transition-all" onClick={() => {
                                                                onOpen();
                                                                editPulicacion.loadData({
                                                                    editorial: data.editorial,
                                                                    fecha_public: data.fecha_public,
                                                                    isbn: data.isbn,
                                                                    titulo_public: data.titulo_public,
                                                                    id: data.id
                                                                })
                                                            }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <i title="Eliminar publicación" className="bi bi-trash3 text-default-400 text-lg hover:cursor-pointer hover:text-danger transition-all" onClick={() => {
                                                                setSelectedId(data.id);
                                                                onOpen2();
                                                            }} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        )
                    }

                    {
                        publicacionesEmpl.length > 0 && (
                            <div>
                                <h6 className="text-center text-xl font-semibold my-4">Publicaciones Registradas Actualmente</h6>
                                <div className="flex-center">
                                    <Table isStriped aria-label="Example static collection table" className="overflow-x-auto w-80 lg:w-full">
                                        <TableHeader className="text-center">
                                            <TableColumn className="text-center">Título Publicación</TableColumn>
                                            <TableColumn className="text-center">Año Publicación</TableColumn>
                                            <TableColumn className="text-center">Editorial o Publicador</TableColumn>
                                            <TableColumn className="text-center">ISBN</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                publicacionesEmpl.map((data: any, index) => (
                                                    <TableRow key={index} className="text-center">
                                                        <TableCell>{data.titulo}</TableCell>
                                                        <TableCell>{data.year_publicacion}</TableCell>
                                                        <TableCell>{data.editorial}</TableCell>
                                                        <TableCell>{data.isbn}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        )
                    }
                </div>

                {loading && (
                    <div className="flex-center">
                        <Triangle
                            visible={true}
                            height="100"
                            width="100"
                            color="#8D0404"
                            ariaLabel="triangle-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                )}

                <Divider className="my-6" />

                {/* Editar Idioma */}
                <Modal isOpen={isOpen3} onOpenChange={onOpenChange3} >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Editar Idioma</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <div className="flex flex-col gap-2 items-center justify-center mt-3">
                                            <SelectForm
                                                name='cod_idioma'
                                                onChange={editIdioma.setField}
                                                label="Idioma"
                                                className="w-40 text-sm"
                                                classNames={{
                                                    label: "text-sm"
                                                }}
                                                isRequired
                                                defaultValue={idiomas.find(i => i.cod_idioma == editIdioma.data.cod_idioma)?.cod_idioma ?? undefined}
                                            >
                                                {
                                                    idiomas.map(i => (
                                                        <SelectItem key={i.cod_idioma} className="text-sm">
                                                            {i.nombre_idioma}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectForm>

                                            <SelectForm
                                                name='cod_calif'
                                                onChange={editIdioma.setField}
                                                label="Nivel de Idioma"
                                                className="w-40 text-sm"
                                                classNames={{
                                                    label: "text-sm"
                                                }}
                                                isRequired
                                                defaultValue={calificacionIdioma.find(i => i.cod_calificacion == editIdioma.data.cod_calif)?.cod_calificacion ?? undefined}
                                            >
                                                {
                                                    calificacionIdioma.map(i => (
                                                        <SelectItem key={i.cod_calificacion} className="text-sm">
                                                            {i.calificacion}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectForm>

                                            <SelectForm
                                                name='cod_hab'
                                                onChange={editIdioma.setField}
                                                label="Habilidad en el Idioma"
                                                className="w-56 text-sm"
                                                classNames={{
                                                    label: "text-sm"
                                                }}
                                                isRequired
                                                defaultValue={habilidadIdioma.find(i => i.cod_habilidad == editIdioma.data.cod_hab)?.cod_habilidad ?? undefined}
                                            >
                                                {
                                                    habilidadIdioma.map(i => (
                                                        <SelectItem key={i.cod_habilidad} className="text-sm">
                                                            {i.descripcion_habilidad}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectForm>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <ButtonNextUI color="danger" variant="light" onPress={onClose}>
                                        Cerrar
                                    </ButtonNextUI>
                                    <ButtonNextUI color="danger" variant="solid" className="text-off-white" onClick={() => {
                                        putIdioma();
                                        onClose3();
                                    }} isDisabled={!editIdioma.validData}>
                                        Guardar
                                    </ButtonNextUI>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                {/* Eliminar Idioma */}
                <Modal isOpen={isOpen4} onOpenChange={onOpenChange4}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Eliminar Idioma</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <p>Está seguro de eliminar el idioma?</p>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <ButtonNextUI color="danger" variant="light" onPress={onClose}>
                                        Cerrar
                                    </ButtonNextUI>
                                    <ButtonNextUI color="danger" variant="solid" className="text-off-white" onClick={() => {
                                        deleteIdioma();
                                        onClose();
                                    }}>
                                        Eliminar
                                    </ButtonNextUI>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                {/* Tabla idiomas */}
                <div className="flex-center flex-col items-end justify-start">
                    <h2 className="text-2xl font-semibold text-center my-3">Consultar Idiomas</h2>

                    <ButtonNextUI color="primary" className="m-2 font-semibold" onClick={() => setAgregarIdioma(!agregarIdioma)}>
                        {agregarIdioma ? 'Cerrar' : 'Agregar idioma'}
                    </ButtonNextUI>

                    {
                        agregarIdioma && (
                            <div className="flex flex-col flex-center my-4">
                                <div className="flex flex-col justify-center items-center md:flex-row gap-3">
                                    <div>
                                        <SelectForm
                                            name='idioma'
                                            onChange={changeIdiomaEmpleado.setField}
                                            label="Idioma"
                                            className="w-40 text-sm"
                                            classNames={{
                                                label: "text-sm"
                                            }}
                                            isRequired
                                        >
                                            {
                                                idiomas.map(i => (
                                                    <SelectItem key={i.nombre_idioma} className="text-sm">
                                                        {i.nombre_idioma}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                    </div>

                                    <div>
                                        <SelectForm
                                            name="calificacion_idioma"
                                            onChange={changeIdiomaEmpleado.setField}
                                            label="Nivel de Idioma"
                                            className="w-40 text-sm"
                                            isRequired
                                        >
                                            {
                                                calificacionIdioma.map(ci => (
                                                    <SelectItem key={ci.calificacion} className="text-sm">
                                                        {ci.calificacion}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                    </div>

                                    <div>
                                        <SelectForm
                                            name="habilidad_idioma"
                                            onChange={changeIdiomaEmpleado.setField}
                                            label="Habilidad en el Idioma"
                                            className="w-52 text-sm"
                                            classNames={{
                                                label: "text-sm"
                                            }}
                                            isRequired
                                        >
                                            {
                                                habilidadIdioma.map(hi => (
                                                    <SelectItem key={hi.descripcion_habilidad} className="text-sm">
                                                        {hi.descripcion_habilidad}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                    </div>
                                </div>

                                <ButtonNextUI color="primary" className="m-2 font-semibold mt-6" onClick={postIdioma} isDisabled={!changeIdiomaEmpleado.validData}>Guardar</ButtonNextUI>
                            </div>
                        )
                    }

                    {/* Idiomas Agregados Recientemente */}
                    {
                        (idiomasActualizaDatos.length > 0 && !loading) && (
                            <div>
                                <h6 className="text-center text-xl font-semibold my-4">Idiomas Agregados Recientemente</h6>
                                <div className="flex-center">
                                    <Table isStriped aria-label="Example static collection table" className="overflow-x-auto w-80 md:w-96 lg:w-full mt-2">
                                        <TableHeader className="text-center">
                                            <TableColumn className="text-center">Idioma</TableColumn>
                                            <TableColumn className="text-center">Nivel de Idioma</TableColumn>
                                            <TableColumn className="text-center">Habilidad en el Idioma</TableColumn>
                                            <TableColumn className="text-center">Editar</TableColumn>
                                            <TableColumn className="text-center">Eliminar</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                idiomasActualizaDatos.map((data: any, index) => (
                                                    <TableRow key={index} className="text-center">
                                                        <TableCell>
                                                            {idiomas.find(idioma => idioma.cod_idioma == data.codIdi).nombre_idioma}
                                                        </TableCell>
                                                        <TableCell>
                                                            {calificacionIdioma.find(calif => calif.cod_calificacion == data.cod_calif).calificacion}
                                                        </TableCell>
                                                        <TableCell>
                                                            {habilidadIdioma.find(habil => habil.cod_habilidad == data.cod_hab.trim()).descripcion_habilidad}
                                                        </TableCell>
                                                        <TableCell>
                                                            <i title="Editar idioma" className="bi bi-pencil text-default-400 text-lg hover:cursor-pointer hover:text-custom-black transition-all" onClick={() => {
                                                                onOpen3();
                                                                editIdioma.loadData({
                                                                    cod_idioma: data.codIdi,
                                                                    cod_calif: data.cod_calif,
                                                                    cod_hab: data.cod_hab,
                                                                    id: data.id
                                                                })
                                                            }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <i title="Eliminar idioma" className="bi bi-trash3 text-default-400 text-lg hover:cursor-pointer hover:text-danger transition-all" onClick={() => {
                                                                setSelectedId(data.id);
                                                                onOpen4();
                                                            }} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        )
                    }

                    {/* Idiomas Ya existentes */}
                    {
                        getIdiomaEmpl.length > 0 && (
                            <div>
                                <h6 className="text-center text-xl font-semibold my-4">Idiomas Registrados Actualmente</h6>
                                <Table isStriped aria-label="Example static collection table" className="overflow-x-auto w-2/3 md:w-96 lg:w-full mt-2">
                                    <TableHeader className="text-center">
                                        <TableColumn className="text-center">Idioma</TableColumn>
                                        <TableColumn className="text-center">Nivel de Idioma</TableColumn>
                                        <TableColumn className="text-center">Habilidad en el Idioma</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            getIdiomaEmpl.map((data, index) => (
                                                <TableRow key={index} className="text-center">
                                                    <TableCell>
                                                        {data.idioma}
                                                    </TableCell>
                                                    <TableCell>
                                                        {data.nivel_idioma}
                                                    </TableCell>
                                                    <TableCell>
                                                        {data.nivel_habilidad}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        )
                    }
                </div>
            </form>

            <div className="flex flex-center mt-8">
                <div className="flex gap-3">
                    <div>
                        <button className="h-10 border-2 select-none justify-center rounded-xl text-base font-medium items-center normal-shadow hover:font-semibold border-borders-light hover:border-primary bg-default-white hover:text-primary transition-all flex gap-1 w-40" onClick={() => changeTab('consultar-experiencia')}>
                            <i className='bi bi-caret-left mr-2 text-xl'></i>
                            Volver
                        </button>
                    </div>
                    <div className="w-40">
                        <Button text="Continuar" icon="caret-right" onClick={() => changeTab('consultar-familiares')} />
                    </div>
                </div>
            </div>
        </section>
    )
}