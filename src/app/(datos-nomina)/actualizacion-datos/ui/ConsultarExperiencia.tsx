'use client';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button as ButtonNextUI, SelectItem, ScrollShadow, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import toast from "react-hot-toast";
import { Triangle } from "react-loader-spinner";
import InputForm from "@/components/forms/InputForm";
import SelectForm from "@/components/forms/SelectForm";
import Button from "@/components/ui/ButtonContinue";
import useValidateForm from "@/app/hooks/useValidateForm";
import { useInfoPersonaStore } from "@/store";
import { formatDate } from "@/libs/functionsStrings";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import fetchFn from "@/utils/fetchFn";

interface Props {
    changeTab: (tab: string) => void;
    getExperienciaEmpl: any[];
    duracionExperiencia: any[];
    areasExperiencia: any[];
}

export const ConsultarExperiencia = ({ changeTab, getExperienciaEmpl, duracionExperiencia, areasExperiencia }: Props) => {
    const infoPersona = useInfoPersonaStore(state => state.getInfoPersona());

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2, onClose: onClose2 } = useDisclosure();
    const [, scrollerRef] = useInfiniteScroll({});

    const [agregarExperiencia, setAgregarExperiencia] = useState(false);
    const [loading, setLoading] = useState(false);
    const [experienciaActualizaDatos, setExperienciaActualizaDatos] = useState<[]>([]);
    const [selectedId, setSelectedId] = useState();

    const changeExperienciaEmpleado = useValidateForm<any>([
        {
            name: 'nombre_empresa',
            validations: {
                required: 'El nombre empresa es requerido'
            }
        },
        {
            name: 'cargo',
            validations: {
                required: 'El cargo es requerido'
            }
        },
        {
            name: 'area_empresa',
            validations: {
                required: 'El area es requerida'
            }
        },
        {
            name: 'funciones',
            validations: {
                required: 'Las funciones son requeridas'
            }
        },
        {
            name: 'duracion',
            validations: {
                required: 'La duración es requerida'
            }
        },
        {
            name: 'motivo_retiro',
            validations: {
                required: 'El motivo retiro es requerido'
            }
        },
        {
            name: 'nombre_jefe',
            validations: {
                required: 'El nombre jefe es requerido'
            }
        },
        {
            name: 'telefono',
            validations: {
                required: 'El teléfono es requerido'
            }
        },
        {
            name: 'fecha_ingreso',
            validations: {
                required: 'La fecha de ingreso es requerida'
            }
        },
        {
            name: 'fecha_terminacion',
            validations: {
                required: 'La fecha de terminación es requerida'
            }
        }
    ]);

    const editExperiencia = useValidateForm<any>([
        {
            name: 'nomEmpr',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'nom_car',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'area_exp',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'des_fun',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'tpo_exp',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'mot_ret',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'jefe_inm',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'num_tel',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'fec_ing',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'fec_ter',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'id'
        }
    ]);

    const getNuevasExperiencias = async () => {
        setLoading(true);

        const respExperienciaActualizaDatos = await fetch(process.env.NEXT_PUBLIC_API_URL + `/experienciaNueva?documento=${infoPersona.nroDocumento}`);
        const respExperienciaActualizaDatosJson = await respExperienciaActualizaDatos.json();
        setExperienciaActualizaDatos(respExperienciaActualizaDatosJson);

        setLoading(false);
    }

    const postExperiencia = async () => {
        const respNuevaExperiencia = await fetchFn(`/experienciaNueva?documento=${infoPersona.nroDocumento}`, {
            method: 'POST',
            body: {
                nomEmpr: changeExperienciaEmpleado.data.nombre_empresa,
                nom_car: changeExperienciaEmpleado.data.cargo,
                area_exp: areasExperiencia.find(area => area.des_area_exp == changeExperienciaEmpleado.data.area_empresa).area_exp,
                des_fun: changeExperienciaEmpleado.data.funciones,
                tpo_exp: Number(duracionExperiencia.find(duracion => duracion.descripcion_duracion == changeExperienciaEmpleado.data.duracion).cod_duracion),
                mot_ret: changeExperienciaEmpleado.data.motivo_retiro,
                jefe_inm: changeExperienciaEmpleado.data.nombre_jefe,
                num_tel: changeExperienciaEmpleado.data.telefono,
                fec_ing: changeExperienciaEmpleado.data.fecha_ingreso,
                fec_ter: changeExperienciaEmpleado.data.fecha_terminacion
            }
        });

        
        if (respNuevaExperiencia.code !== 200) {
            toast.error(respNuevaExperiencia.data.message, {
                id: 'error-peticion'
            });
            return;
        }

        getNuevasExperiencias();
        toast.success('Experiencia agregada correctamente.', {
            id: 'success'
        })
    }

    const putExperiencia = async () => {
        const respUpdateExperiencia = await fetchFn(`/experienciaNueva?id_experiencia=${editExperiencia.data.id}`, {
            method: 'PUT',
            body: {
                ...editExperiencia.data
            }
        });

        if (respUpdateExperiencia.code !== 200) {
            toast.error(respUpdateExperiencia.data.message, {
                id: 'error-peticion'
            });
            return false;
        }

        getNuevasExperiencias();
        toast.success('Experiencia editada correctamente.', {
            id: 'success'
        });

        return true;
    }

    const deleteExperiencia = async () => {
        const respDeleteExperiencia = await fetchFn(`/experienciaNueva?id_experiencia=${selectedId}`, {
            method: 'DELETE'
        });

        if (respDeleteExperiencia.code !== 200) {
            toast.error('Hubo un error', {
                id: 'error-peticion'
            });
            return;
        }

        getNuevasExperiencias();
        toast.success('Experiencia eliminada correctamente.', {
            id: 'success'
        });
    }

    useEffect(() => {
        getNuevasExperiencias();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section>
            <h2 className="text-2xl font-semibold text-center my-8">Consultar Experiencia</h2>

            <div className="w-full max-w-[1400px] flex-center">
                <div className="flex-center flex-col items-end justify-start">
                    <ButtonNextUI color="primary" className="m-2 font-semibold" onClick={() => setAgregarExperiencia(!agregarExperiencia)}>
                        {agregarExperiencia ? 'Cerrar' : 'Agregar experiencia'}
                    </ButtonNextUI>

                    {
                        agregarExperiencia && (
                            <div className="flex flex-col flex-center my-4">
                                <div className="flex flex-col justify-center items-center md:flex-row gap-3">
                                    <div>
                                        <InputForm
                                            isRequired
                                            name="nombre_empresa"
                                            onChange={changeExperienciaEmpleado.setField}
                                            validations={changeExperienciaEmpleado.validators}
                                            type="text"
                                            label="Nombre de la empresa"
                                            classNames={{
                                                inputWrapper: "pb-1",
                                                errorMessage: "text-sm font-medium",
                                                input: "bg-off-white w-40 text-sm",
                                                label: "text-sm"
                                            }}
                                            className="max-w-xs"
                                        />
                                    </div>

                                    <div>
                                        <InputForm
                                            isRequired
                                            name="cargo"
                                            onChange={changeExperienciaEmpleado.setField}
                                            validations={changeExperienciaEmpleado.validators}
                                            type="text"
                                            label="Cargo"
                                            classNames={{
                                                inputWrapper: "pb-1",
                                                errorMessage: "text-sm font-medium",
                                                input: "bg-off-white w-40 text-sm",
                                                label: "text-sm"
                                            }}
                                            className="max-w-xs"
                                        />
                                    </div>

                                    <div>
                                        <SelectForm
                                            name="area_empresa"
                                            onChange={changeExperienciaEmpleado.setField}
                                            label="Área"
                                            isRequired
                                            className="w-80 text-sm"
                                            scrollRef={scrollerRef}
                                            validations={changeExperienciaEmpleado.validators}
                                        >
                                            {
                                                areasExperiencia.map(area => (
                                                    <SelectItem key={area.des_area_exp}>
                                                        {area.des_area_exp}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                    </div>

                                    <div>
                                        <InputForm
                                            isRequired
                                            name="funciones"
                                            onChange={changeExperienciaEmpleado.setField}
                                            validations={changeExperienciaEmpleado.validators}
                                            type="text"
                                            label="Funciones"
                                            classNames={{
                                                inputWrapper: "pb-1",
                                                errorMessage: "text-sm font-medium",
                                                input: "bg-off-white w-60 text-sm",
                                                label: "text-sm"
                                            }}
                                            className="max-w-xs"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-3 mt-4">
                                    <div>
                                        <SelectForm
                                            name="duracion"
                                            onChange={changeExperienciaEmpleado.setField}
                                            label="Duración"
                                            className="w-48 text-sm"
                                            validations={changeExperienciaEmpleado.validators}
                                            isRequired
                                        >
                                            {
                                                duracionExperiencia.map(de => (
                                                    <SelectItem key={de.descripcion_duracion} className="text-sm">
                                                        {de.descripcion_duracion}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                    </div>
                                    <div>
                                        <InputForm
                                            isRequired
                                            name="motivo_retiro"
                                            onChange={changeExperienciaEmpleado.setField}
                                            validations={changeExperienciaEmpleado.validators}
                                            type="text"
                                            label="Motivo del Retiro"
                                            classNames={{
                                                inputWrapper: "pb-1",
                                                errorMessage: "text-sm font-medium",
                                                input: "bg-off-white w-40 text-sm",
                                                label: "text-sm"
                                            }}
                                            className="max-w-xs"
                                        />
                                    </div>

                                    <div>
                                        <InputForm
                                            isRequired
                                            name="nombre_jefe"
                                            onChange={changeExperienciaEmpleado.setField}
                                            validations={changeExperienciaEmpleado.validators}
                                            type="text"
                                            label="Nombre del Jefe"
                                            classNames={{
                                                inputWrapper: "pb-1",
                                                errorMessage: "text-sm font-medium",
                                                input: "bg-off-white w-40 text-sm",
                                                label: "text-sm"
                                            }}
                                            className="max-w-xs"
                                        />
                                    </div>

                                    <div>
                                        <InputForm
                                            name="telefono"
                                            onChange={changeExperienciaEmpleado.setField}
                                            validations={changeExperienciaEmpleado.validators}
                                            isRequired
                                            type="number"
                                            label="Teléfono"
                                            classNames={{
                                                inputWrapper: "py-0 pb-1",
                                                errorMessage: "text-sm font-medium",
                                                input: "bg-off-white w-28 text-sm",
                                                label: "text-sm"
                                            }}
                                            className="max-w-xs"
                                        />
                                    </div>

                                    <div>
                                        <InputForm
                                            placeholder="fecha"
                                            name="fecha_ingreso"
                                            onChange={changeExperienciaEmpleado.setField}
                                            validations={changeExperienciaEmpleado.validators}
                                            isRequired
                                            type="date"
                                            label="Fecha de Ingreso"
                                            classNames={{
                                                inputWrapper: "pb-1",
                                                errorMessage: "text-sm font-medium",
                                                input: "bg-off-white w-36 text-sm",
                                                label: "text-sm"
                                            }}
                                            className="max-w-xs"
                                        />
                                    </div>

                                    <div>
                                        <InputForm
                                            placeholder="fecha"
                                            name="fecha_terminacion"
                                            onChange={changeExperienciaEmpleado.setField}
                                            validations={changeExperienciaEmpleado.validators}
                                            isRequired
                                            type="date"
                                            label="Fecha de Terminación"
                                            classNames={{
                                                inputWrapper: "pb-1",
                                                errorMessage: "text-sm font-medium",
                                                input: "bg-off-white w-40 text-sm",
                                                label: "text-sm"
                                            }}
                                            className="max-w-xs"
                                        />
                                    </div>
                                </div>

                                <ButtonNextUI color="primary" className="m-2 font-semibold mt-6" onClick={postExperiencia} isDisabled={!changeExperienciaEmpleado.validData}>Guardar</ButtonNextUI>
                            </div>
                        )
                    }

                    {/* Editar Experiencia */}
                    <Modal isOpen={isOpen2} onOpenChange={onOpenChange2} >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Editar Experiencia</ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <div className="flex flex-col gap-2 items-center justify-center mt-3">
                                                <div className="flex gap-3">
                                                    <InputForm
                                                        name="nomEmpr"
                                                        isRequired
                                                        onChange={editExperiencia.setField}
                                                        type="text"
                                                        label="Nombre Empresa"
                                                        classNames={{
                                                            inputWrapper: "pb-1",
                                                            errorMessage: "text-sm font-medium",
                                                            input: "bg-off-white text-sm",
                                                            label: "text-sm"
                                                        }}
                                                        className="max-w-xs"
                                                        defaultValue={editExperiencia.data.nomEmpr}
                                                        validations={editExperiencia.validators}
                                                    />

                                                    <InputForm
                                                        name="nom_car"
                                                        isRequired
                                                        onChange={editExperiencia.setField}
                                                        type="text"
                                                        label="Nombre Cargo"
                                                        classNames={{
                                                            inputWrapper: "pb-1",
                                                            errorMessage: "text-sm font-medium",
                                                            input: "bg-off-white text-sm",
                                                            label: "text-sm"
                                                        }}
                                                        className="max-w-xs"
                                                        defaultValue={editExperiencia.data.nom_car}
                                                        validations={editExperiencia.validators}
                                                    />
                                                </div>

                                                <div className="flex gap-3">
                                                    <SelectForm
                                                        name='area_exp'
                                                        onChange={editExperiencia.setField}
                                                        label="Área Experiencia"
                                                        className="w-40 text-sm"
                                                        classNames={{
                                                            label: "text-sm"
                                                        }}
                                                        isRequired
                                                        defaultValue={areasExperiencia.find(i => i.area_exp == editExperiencia.data.area_exp)?.area_exp ?? undefined}
                                                        validations={editExperiencia.validators}
                                                    >
                                                        {
                                                            areasExperiencia.map(i => (
                                                                <SelectItem key={i.area_exp} className="text-sm">
                                                                    {i.des_area_exp}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                    </SelectForm>

                                                    <SelectForm
                                                        name='tpo_exp'
                                                        onChange={editExperiencia.setField}
                                                        label="Duración"
                                                        className="w-40 text-sm"
                                                        classNames={{
                                                            label: "text-sm"
                                                        }}
                                                        isRequired
                                                        defaultValue={duracionExperiencia.find(i => i.cod_duracion == editExperiencia.data.tpo_exp)?.cod_duracion ?? undefined}
                                                        validations={editExperiencia.validators}
                                                    >
                                                        {
                                                            duracionExperiencia.map(i => (
                                                                <SelectItem key={i.cod_duracion} className="text-sm">
                                                                    {i.descripcion_duracion}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                    </SelectForm>
                                                </div>

                                                <InputForm
                                                    name="des_fun"
                                                    isRequired
                                                    onChange={editExperiencia.setField}
                                                    type="text"
                                                    label="Funciones"
                                                    classNames={{
                                                        inputWrapper: "pb-1",
                                                        errorMessage: "text-sm font-medium",
                                                        input: "bg-off-white text-sm",
                                                        label: "text-sm"
                                                    }}
                                                    className="max-w-xs"
                                                    defaultValue={editExperiencia.data.des_fun}
                                                    validations={editExperiencia.validators}
                                                />

                                                <InputForm
                                                    name="mot_ret"
                                                    isRequired
                                                    onChange={editExperiencia.setField}
                                                    type="text"
                                                    label="Motivo Retiro"
                                                    classNames={{
                                                        inputWrapper: "pb-1",
                                                        errorMessage: "text-sm font-medium",
                                                        input: "bg-off-white text-sm",
                                                        label: "text-sm"
                                                    }}
                                                    className="max-w-xs"
                                                    defaultValue={editExperiencia.data.mot_ret}
                                                    validations={editExperiencia.validators}
                                                />


                                                <div className="flex gap-3">
                                                    <InputForm
                                                        name="jefe_inm"
                                                        isRequired
                                                        onChange={editExperiencia.setField}
                                                        type="text"
                                                        label="Nombre del Jefe"
                                                        classNames={{
                                                            inputWrapper: "pb-1",
                                                            errorMessage: "text-sm font-medium",
                                                            input: "bg-off-white text-sm",
                                                            label: "text-sm"
                                                        }}
                                                        className="max-w-xs"
                                                        defaultValue={editExperiencia.data.jefe_inm}
                                                        validations={editExperiencia.validators}
                                                    />

                                                    <InputForm
                                                        name="num_tel"
                                                        isRequired
                                                        onChange={editExperiencia.setField}
                                                        type="text"
                                                        label="Teléfono"
                                                        classNames={{
                                                            inputWrapper: "pb-1",
                                                            errorMessage: "text-sm font-medium",
                                                            input: "bg-off-white text-sm",
                                                            label: "text-sm"
                                                        }}
                                                        className="max-w-xs"
                                                        defaultValue={editExperiencia.data.num_tel}
                                                        validations={editExperiencia.validators}
                                                    />
                                                </div>

                                                <div className="flex gap-3">
                                                    <InputForm
                                                        placeholder="fecha"
                                                        name="fec_ing"
                                                        onChange={editExperiencia.setField}
                                                        validations={editExperiencia.validators}
                                                        isRequired
                                                        type="date"
                                                        label="Fecha de Ingreso"
                                                        classNames={{
                                                            inputWrapper: "pb-1",
                                                            errorMessage: "text-sm font-medium",
                                                            input: "bg-off-white w-40 text-sm",
                                                            label: "text-sm"
                                                        }}
                                                        className="max-w-xs"
                                                        defaultValue={editExperiencia.data.fec_ing.split("T")[0]}
                                                    />

                                                    <InputForm
                                                        placeholder="fecha"
                                                        name="fec_ter"
                                                        onChange={editExperiencia.setField}
                                                        validations={editExperiencia.validators}
                                                        isRequired
                                                        type="date"
                                                        label="Fecha de Terminación"
                                                        classNames={{
                                                            inputWrapper: "pb-1",
                                                            errorMessage: "text-sm font-medium",
                                                            input: "bg-off-white w-40 text-sm",
                                                            label: "text-sm"
                                                        }}
                                                        className="max-w-xs"
                                                        defaultValue={editExperiencia.data.fec_ter.split("T")[0]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <ButtonNextUI color="danger" variant="light" onPress={onClose}>
                                            Cerrar
                                        </ButtonNextUI>
                                        <ButtonNextUI color="danger" variant="solid" className="text-off-white" onClick={async () => {
                                            const res = await putExperiencia();
                                            if(res) onClose2();
                                        }} isDisabled={!editExperiencia.validData}>
                                            Guardar
                                        </ButtonNextUI>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    {/* Eliminar Experiencia */}
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Eliminar Experiencia</ModalHeader>
                                    <ModalBody>
                                        <div>
                                            <p>Está seguro de eliminar la experiencia?</p>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <ButtonNextUI color="danger" variant="light" onPress={onClose}>
                                            Cerrar
                                        </ButtonNextUI>
                                        <ButtonNextUI color="danger" variant="solid" className="text-off-white" onClick={() => {
                                            deleteExperiencia();
                                            onClose();
                                        }}>
                                            Eliminar
                                        </ButtonNextUI>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    {/* Nueva Experiencia */}
                    {
                        (
                            experienciaActualizaDatos.length > 0 && !loading) && (
                            <div className="my-5">
                                <h6 className="text-center text-xl font-semibold">Experiencia Agregada Recientemente</h6>
                                <div className="flex-center">
                                    <Table isStriped aria-label="Example static collection table" className="overflow-x-auto w-72 md:w-96 lg:w-full mt-2">
                                        <TableHeader className="text-center">
                                            <TableColumn className="text-center">Nombre de la empresa</TableColumn>
                                            <TableColumn className="text-center">Cargo</TableColumn>
                                            <TableColumn className="text-center">Área</TableColumn>
                                            <TableColumn className="text-center">Funciones</TableColumn>
                                            <TableColumn className="text-center">Duración</TableColumn>
                                            <TableColumn className="text-center">Motivo del Retiro</TableColumn>
                                            <TableColumn className="text-center">Nombre del Jefe</TableColumn>
                                            <TableColumn className="text-center">Teléfono</TableColumn>
                                            <TableColumn className="text-center">Fecha de Ingreso</TableColumn>
                                            <TableColumn className="text-center">Fecha de Terminación</TableColumn>
                                            <TableColumn className="text-center">Editar</TableColumn>
                                            <TableColumn className="text-center">Eliminar</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                experienciaActualizaDatos?.map((data: any, index) => (
                                                    <TableRow key={index} className="text-center">
                                                        <TableCell>{data.nomEmpr}</TableCell>
                                                        <TableCell>{data.nom_car}</TableCell>
                                                        <TableCell>{areasExperiencia.find(area => area.area_exp == data.area_exp).des_area_exp}</TableCell>

                                                        <TableCell>
                                                            <ScrollShadow size={5} className="h-28">
                                                                <p className="md:mt-3">{data.des_fun}</p>
                                                            </ScrollShadow>
                                                        </TableCell>

                                                        <TableCell>{duracionExperiencia.find(duracionExp => data.tpo_exp == duracionExp.cod_duracion).descripcion_duracion}</TableCell>
                                                        <TableCell>{data.mot_ret}</TableCell>
                                                        <TableCell>{data.jefe_inm}</TableCell>
                                                        <TableCell>{data.num_tel}</TableCell>
                                                        <TableCell>{formatDate(data.fec_ing)}</TableCell>
                                                        <TableCell>{formatDate(data.fec_ter)}</TableCell>
                                                        <TableCell>
                                                            <i title="Editar publicación" className="bi bi-pencil text-default-400 text-lg hover:cursor-pointer hover:text-custom-black transition-all" onClick={() => {
                                                                onOpen2();
                                                                editExperiencia.loadData({
                                                                    nomEmpr: data.nomEmpr,
                                                                    nom_car: data.nom_car,
                                                                    area_exp: data.area_exp,
                                                                    des_fun: data.des_fun,
                                                                    tpo_exp: data.tpo_exp,
                                                                    mot_ret: data.mot_ret,
                                                                    jefe_inm: data.jefe_inm,
                                                                    num_tel: data.num_tel,
                                                                    fec_ing: data.fec_ing,
                                                                    fec_ter: data.fec_ter,
                                                                    id: data.id
                                                                })
                                                            }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <i title="Eliminar publicación" className="bi bi-trash3 text-default-400 text-lg hover:cursor-pointer hover:text-danger transition-all" onClick={() => {
                                                                setSelectedId(data.id);
                                                                onOpen();
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

                    {/* Experiencia Registrada Actualmente */}
                    {
                        getExperienciaEmpl.length > 0 && (
                            <div className="my-5">
                                <h6 className="text-center text-xl font-semibold">Experiencia Registrada Actualmente</h6>
                                <Table isStriped aria-label="Example static collection table" className="overflow-x-auto w-72 md:w-96 lg:w-full mt-2">
                                    <TableHeader className="text-center">
                                        <TableColumn className="text-center">Nombre de la empresa</TableColumn>
                                        <TableColumn className="text-center">Cargo</TableColumn>
                                        <TableColumn className="text-center">Área</TableColumn>
                                        <TableColumn className="text-center">Funciones</TableColumn>
                                        <TableColumn className="text-center">Duración</TableColumn>
                                        <TableColumn className="text-center">Motivo del Retiro</TableColumn>
                                        <TableColumn className="text-center">Nombre del Jefe</TableColumn>
                                        <TableColumn className="text-center">Teléfono</TableColumn>
                                        <TableColumn className="text-center">Fecha de Ingreso</TableColumn>
                                        <TableColumn className="text-center">Fecha de Terminación</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            getExperienciaEmpl.map((data, index) => (
                                                <TableRow key={index} className="text-center">
                                                    <TableCell>{data.nombre_empresa}</TableCell>
                                                    <TableCell>{data.nombre_cargo}</TableCell>
                                                    <TableCell>{data.area_experiencia}</TableCell>

                                                    <TableCell>
                                                        <ScrollShadow size={5} className="h-28">
                                                            <p className="md:mt-3">{data.funciones}</p>
                                                        </ScrollShadow>
                                                    </TableCell>

                                                    <TableCell>{data.duracion_experiencia}</TableCell>
                                                    <TableCell>{data.motivo_retiro}</TableCell>
                                                    <TableCell>{data.nombre_jefe}</TableCell>
                                                    <TableCell>{data.numero_jefe}</TableCell>
                                                    <TableCell>{data.fecha_ingreso}</TableCell>
                                                    <TableCell>{data.fecha_terminacion}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="flex flex-center mt-8">
                <div className="flex gap-3">
                    <div>
                        <button className="h-10 border-2 select-none justify-center rounded-xl text-base font-medium items-center normal-shadow hover:font-semibold border-borders-light hover:border-primary bg-default-white hover:text-primary transition-all flex gap-1 w-40" onClick={() => changeTab('detalles-cargo')}>
                            <i className='bi bi-caret-left mr-2 text-xl'></i>
                            Volver
                        </button>
                    </div>
                    <div className="w-40">
                        <Button text="Continuar" icon="caret-right" onClick={() => changeTab('publicaciones-idiomas')} />
                    </div>
                </div>
            </div>
        </section >
    )
}