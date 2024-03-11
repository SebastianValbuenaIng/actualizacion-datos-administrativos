'use client';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, SelectItem, Button as ButtonNextUI, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import InputForm from "@/components/forms/InputForm";
import SelectForm from "@/components/forms/SelectForm";
import useValidateForm from "@/app/hooks/useValidateForm";
import { useInfoPersonaStore } from "@/store";
import { formatDate } from "@/libs/functionsStrings";
import fetchFn from "@/utils/fetchFn";
import toast from "react-hot-toast";

interface Props {
    changeTab: (tab: string) => void;
    getFamiliaresEmpl: any[];
    parentescos: any[];
    estadoCivil: any[];
    generos: any[];
    tipoDocumento: any[];
    ocupacion: any[];
    nivelEstudios: any[];
}

export const ConsultarFamiliares = ({ changeTab, getFamiliaresEmpl, parentescos, estadoCivil, generos, tipoDocumento, ocupacion, nivelEstudios }: Props) => {
    const infoPersona = useInfoPersonaStore(state => state.getInfoPersona());

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2, onClose: onClose2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3, onClose: onClose3 } = useDisclosure();

    const [agregarFamiliar, setAgregarFamiliar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verMasFamiliar, setVerMasFamiliar] = useState({
        genero: '',
        estado_civil: '',
        ocupacion: '',
        recibe_subsidio: '',
        benificiario_pos: '',
        convive_conmigo: '',
        nivel_estudios: '',
        termino_estudios: ''
    });
    const [familiaresExistentes, setFamiliaresExistentes] = useState<[]>([]);
    const [selectedId, setSelectedId] = useState();

    const changeFamiliaEmpleado = useValidateForm<any>([
        {
            name: 'apellido_uno_familiar',
            validations: {
                required: 'El primer apellido es requerido'
            }
        },
        {
            name: 'apellido_dos_familiar'
        },
        {
            name: 'nombres_familiar',
            validations: {
                required: 'El nombre es requerido'
            }
        },
        {
            name: 'parentesco_familiar',
            validations: {
                required: 'El parentesco es requerido'
            }
        },
        {
            name: 'tipo_documento_familiar',
            validations: {
                required: 'El tipo documento es requerido'
            }
        },
        {
            name: 'numero_documento_familiar',
            validations: {
                required: 'El numero documento es requerido'
            }
        },
        {
            name: 'fecha_nacimiento_familiar',
            validations: {
                required: 'La fecha nacimiento es requerida'
            }
        },
        {
            name: 'genero_familiar',
            validations: {
                required: 'El género es requerido'
            }
        },
        {
            name: 'estado_civil_familiar',
            validations: {
                required: 'El estado civil es requerido'
            }
        },
        {
            name: 'ocupacion_familiar',
            validations: {
                required: 'La ocupación es requerida'
            }
        },
        {
            name: 'recibe_sub_familiar',
            validations: {
                required: 'Seleccione si recibe subsidio'
            }
        },
        {
            name: 'beneficiario_pos_familiar',
            validations: {
                required: 'Seleccione si es beneficiario pos'
            }
        },
        {
            name: 'convive_conmigo_familiar',
            validations: {
                required: 'Seleccione si convive con usted'
            }
        },
        {
            name: 'nivel_estudios_familiar',
            validations: {
                required: 'El nivel estudios es requerido'
            }
        },
        {
            name: 'termino_estudios_familiar',
            validations: {
                required: 'Seleccione si terminó estudios'
            }
        }
    ]);

    const editFamiliar = useValidateForm<any>([
        {
            name: 'apellido_uno_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'apellido_dos_familiar'
        },
        {
            name: 'nombres_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'parentesco_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'tipo_documento_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'numero_documento_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'fecha_nacimiento_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'genero_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'estado_civil_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'ocupacion_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'recibe_sub_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'beneficiario_pos_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'convive_conmigo_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'nivel_estudios_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'termino_estudios_familiar',
            validations: {
                required: 'El campo es requerido'
            }
        },
        {
            name: 'id'
        }
    ])

    const getFamiliares = async () => {
        setLoading(true);

        const respFamiliaresActualizaDatos = await fetch(process.env.NEXT_PUBLIC_API_URL + `/familiarNuevo?documento=${infoPersona.nroDocumento}`);
        const respFamiliaresActualizaDatosJson = await respFamiliaresActualizaDatos.json();
        setFamiliaresExistentes(respFamiliaresActualizaDatosJson);

        setLoading(false);
    }

    const postFamiliar = async () => {
        const respNuevoFamiliar = await fetchFn(`/familiarNuevo?documento=${infoPersona.nroDocumento}`, {
            method: 'POST',
            body: {
                apellido_uno_familiar: changeFamiliaEmpleado.data.apellido_uno_familiar,
                apellido_dos_familiar: changeFamiliaEmpleado.data.apellido_dos_familiar ?? '',
                nombres_familiar: changeFamiliaEmpleado.data.nombres_familiar,
                parentesco_familiar: parentescos.find(pare => pare.nombre_parentesco == changeFamiliaEmpleado.data.parentesco_familiar).cod_parentesco,
                tipo_documento_familiar: tipoDocumento.find(tip => tip.des_tip == changeFamiliaEmpleado.data.tipo_documento_familiar).cod_tip,
                numero_documento_familiar: changeFamiliaEmpleado.data.numero_documento_familiar,
                fecha_nacimiento_familiar: changeFamiliaEmpleado.data.fecha_nacimiento_familiar,
                genero_familiar: generos.find(gen => gen.des_gen == changeFamiliaEmpleado.data.genero_familiar).cod_gen,
                estado_civil_familiar: estadoCivil.find(esta => esta.des_est == changeFamiliaEmpleado.data.estado_civil_familiar).cod_est,
                ocupacion_familiar: ocupacion.find(ocu => ocu.desc_ocupacion == changeFamiliaEmpleado.data.ocupacion_familiar).cod_ocupacion,
                recibe_sub_familiar: changeFamiliaEmpleado.data.recibe_sub_familiar,
                beneficiario_pos_familiar: changeFamiliaEmpleado.data.beneficiario_pos_familiar,
                convive_conmigo_familiar: changeFamiliaEmpleado.data.convive_conmigo_familiar,
                nivel_estudios_familiar: nivelEstudios.find(nivel => nivel.des_est == changeFamiliaEmpleado.data.nivel_estudios_familiar).tip_est,
                termino_estudios_familiar: changeFamiliaEmpleado.data.termino_estudios_familiar
            }
        });

        if (respNuevoFamiliar.code !== 200) {
            toast.error('Ha ocurrido un error', {
                id: 'error-peticion'
            });
            return;
        }

        getFamiliares();
        toast.success('Familiar agregado correctamente.', {
            id: 'success'
        })
    }

    const putFamiliar = async () => {
        const respUpdateFamiliar = await fetchFn(`/familiarNuevo?id_familiar=${editFamiliar.data.id}`, {
            method: 'PUT',
            body: {
                ...editFamiliar.data,
                beneficiario_pos_familiar: editFamiliar.data.beneficiario_pos_familiar == "1" ? 0 : 1,
                convive_conmigo_familiar: editFamiliar.data.convive_conmigo_familiar == "1" ? 0 : 1,
                termino_estudios_familiar: editFamiliar.data.termino_estudios_familiar == "1" ? 0 : 1
            }
        });

        if (respUpdateFamiliar.code !== 200) {
            toast.error('Hubo un error', {
                id: 'error-peticion'
            });
            return;
        }

        getFamiliares();
        toast.success('Familiar editado correctamente.', {
            id: 'success'
        });
    }

    const deleteFamiliar = async () => {
        const respDeleteFamiliar = await fetchFn(`/familiarNuevo?id_familiar=${selectedId}`, {
            method: 'DELETE'
        });

        if (respDeleteFamiliar.code !== 200) {
            toast.error('Hubo un error', {
                id: 'error-peticion'
            });
            return;
        }

        getFamiliares();
        toast.success('Familiar eliminado correctamente.', {
            id: 'success'
        });
    }

    useEffect(() => {
        getFamiliares();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section>
            <h2 className="text-2xl font-semibold text-center my-8">Consultar Familiares</h2>

            <div className="w-full max-w-[1900px]">
                <div className="flex-center flex-col items-end justify-start">
                    <ButtonNextUI color="primary" className="m-2 font-semibold" onClick={() => setAgregarFamiliar(!agregarFamiliar)}>
                        {agregarFamiliar ? 'Cerrar' : 'Agregar familiar'}
                    </ButtonNextUI>

                    {
                        agregarFamiliar && (
                            <div className="mt-3">
                                <div className="flex flex-col items-center lg:flex-row flex-wrap gap-4">
                                    <div>
                                        <InputForm
                                            isRequired
                                            name='apellido_uno_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            validations={changeFamiliaEmpleado.validators}
                                            type="text"
                                            label="Primer Apellido"
                                            classNames={{
                                                inputWrapper: "pb-1",
                                                errorMessage: "text-sm font-medium",
                                                input: "bg-off-white w-28 text-sm",
                                                label: "text-sm"
                                            }}
                                            className="max-w-xs"
                                        />
                                    </div>

                                    <div>
                                        <InputForm
                                            isRequired={false}
                                            name='apellido_dos_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            type="text"
                                            label="Segundo Apellido"
                                            classNames={{
                                                inputWrapper: "pb-1",
                                                errorMessage: "text-sm font-medium",
                                                input: "bg-off-white w-32 text-sm",
                                                label: "text-sm"
                                            }}
                                            className="max-w-xs"
                                        />
                                    </div>

                                    <div>
                                        <InputForm
                                            isRequired
                                            name='nombres_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            validations={changeFamiliaEmpleado.validators}
                                            type="text"
                                            label="Nombres"
                                            classNames={{
                                                inputWrapper: "pb-1",
                                                errorMessage: "text-sm font-medium",
                                                input: "bg-off-white w-32 text-sm",
                                                label: "text-sm"
                                            }}
                                            className="max-w-xs"
                                        />
                                    </div>

                                    <div>
                                        <SelectForm
                                            name='parentesco_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            label="Parentesco"
                                            className="w-36 text-sm"
                                            classNames={{
                                                label: "text-sm"
                                            }}
                                            isRequired
                                            validations={changeFamiliaEmpleado.validators}
                                        >
                                            {
                                                parentescos.map(p => (
                                                    <SelectItem key={p.nombre_parentesco} className="text-sm">
                                                        {p.nombre_parentesco}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                    </div>

                                    <div>
                                        <SelectForm
                                            name='tipo_documento_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            validations={changeFamiliaEmpleado.validators}
                                            label="Tipo Documento"
                                            className="w-52 text-sm"
                                            classNames={{
                                                label: "text-sm"
                                            }}
                                            isRequired
                                        >
                                            {
                                                tipoDocumento.map(t => (
                                                    <SelectItem key={t.des_tip} className="text-sm">
                                                        {t.des_tip}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                    </div>

                                    <div>
                                        <InputForm
                                            isRequired
                                            name='numero_documento_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            type="number"
                                            validations={changeFamiliaEmpleado.validators}
                                            label="Número Documento"
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
                                            name='fecha_nacimiento_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            validations={changeFamiliaEmpleado.validators}
                                            isRequired
                                            type="date"
                                            label="Fecha de Nacimiento"
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
                                            name='genero_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            validations={changeFamiliaEmpleado.validators}
                                            label="Género"
                                            className="w-32 text-sm"
                                            classNames={{
                                                label: "text-sm"
                                            }}
                                            isRequired
                                        >
                                            {
                                                generos.map(g => (
                                                    <SelectItem key={g.des_gen} className="text-sm">
                                                        {g.des_gen}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center lg:flex-row flex-wrap gap-4 mt-3">
                                    <div>
                                        <SelectForm
                                            name='estado_civil_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            label="Estado Civil"
                                            className="w-36 text-sm"
                                            classNames={{
                                                label: "text-sm"
                                            }}
                                            isRequired
                                            validations={changeFamiliaEmpleado.validators}
                                        >
                                            {
                                                estadoCivil.map(p => (
                                                    <SelectItem key={p.des_est} className="text-sm">
                                                        {p.des_est}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                    </div>

                                    <div>
                                        <SelectForm
                                            name="ocupacion_familiar"
                                            onChange={changeFamiliaEmpleado.setField}
                                            label="Ocupación"
                                            className="w-72 text-sm"
                                            classNames={{
                                                label: "text-sm"
                                            }}
                                            isRequired
                                            validations={changeFamiliaEmpleado.validators}
                                        >
                                            {
                                                ocupacion.map(o => (
                                                    <SelectItem key={o.desc_ocupacion} className="text-sm">
                                                        {o.desc_ocupacion}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                    </div>

                                    <div>
                                        <SelectForm
                                            name='recibe_sub_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            label="Recibe Subsidio"
                                            className="w-40 text-sm"
                                            classNames={{
                                                label: "text-sm"
                                            }}
                                            isRequired
                                            validations={changeFamiliaEmpleado.validators}
                                        >
                                            <SelectItem value="" key="1" className="text-sm">
                                                SI
                                            </SelectItem>
                                            <SelectItem value="" key="2" className="text-sm">
                                                NO
                                            </SelectItem>
                                        </SelectForm>
                                    </div>

                                    <div>
                                        <SelectForm
                                            name='beneficiario_pos_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            label="Beneficiario POS"
                                            className="w-40 text-sm"
                                            classNames={{
                                                label: "text-sm"
                                            }}
                                            isRequired
                                            validations={changeFamiliaEmpleado.validators}
                                        >
                                            <SelectItem value="" key="1" className="text-sm">
                                                SI
                                            </SelectItem>
                                            <SelectItem value="" key="2" className="text-sm">
                                                NO
                                            </SelectItem>
                                        </SelectForm>
                                    </div>

                                    <div>
                                        <SelectForm
                                            name='convive_conmigo_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            label="Convive Conmigo"
                                            className="w-44 text-sm"
                                            classNames={{
                                                label: "text-sm"
                                            }}
                                            isRequired
                                            validations={changeFamiliaEmpleado.validators}
                                        >
                                            <SelectItem value="" key="1" className="text-sm">
                                                SI
                                            </SelectItem>
                                            <SelectItem value="" key="2" className="text-sm">
                                                NO
                                            </SelectItem>
                                        </SelectForm>
                                    </div>

                                    <div>
                                        <SelectForm
                                            name='nivel_estudios_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            label="Nivel Estudios"
                                            className="w-48 text-sm"
                                            classNames={{
                                                label: "text-sm"
                                            }}
                                            isRequired
                                            validations={changeFamiliaEmpleado.validators}
                                        >
                                            {
                                                nivelEstudios.map(nivel => (
                                                    <SelectItem value="" key={nivel.des_est} className="text-sm">
                                                        {nivel.des_est}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                    </div>

                                    <div>
                                        <SelectForm
                                            name='termino_estudios_familiar'
                                            onChange={changeFamiliaEmpleado.setField}
                                            label="Terminó Estudios"
                                            className="w-44 text-sm"
                                            classNames={{
                                                label: "text-sm"
                                            }}
                                            isRequired
                                            validations={changeFamiliaEmpleado.validators}
                                        >
                                            <SelectItem value="" key="1" className="text-sm">
                                                SI
                                            </SelectItem>
                                            <SelectItem value="" key="2" className="text-sm">
                                                NO
                                            </SelectItem>
                                        </SelectForm>
                                    </div>
                                </div>

                                <div className="flex-center mt-3">
                                    <ButtonNextUI color="primary" className="m-2 font-semibold" isDisabled={!changeFamiliaEmpleado.validData} onClick={postFamiliar}>
                                        Guardar
                                    </ButtonNextUI>
                                </div>
                            </div>
                        )
                    }
                </div>

                {/* Modal Ver Más Detalles */}
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Más Información</ModalHeader>
                                <ModalBody>
                                    <p className="text-center">Género: {verMasFamiliar.genero}</p>
                                    <p className="text-center">Estado Civil: {verMasFamiliar.estado_civil}</p>
                                    <p className="text-center">Ocupación: {verMasFamiliar.ocupacion}</p>
                                    <p className="text-center">Recibe Subsidio: {verMasFamiliar.recibe_subsidio}</p>
                                    <p className="text-center">Es Beneficiario POS: {verMasFamiliar.benificiario_pos}</p>
                                    <p className="text-center">Convive Conmigo: {verMasFamiliar.convive_conmigo}</p>
                                    <p className="text-center">Nivel de Estudios: {
                                        nivelEstudios.find(n => n.tip_est == verMasFamiliar.nivel_estudios)?.des_est ?? verMasFamiliar.nivel_estudios
                                    }</p>
                                    <p className="text-center">Terminó Estudios: {verMasFamiliar.termino_estudios}</p>
                                </ModalBody>
                                <ModalFooter>
                                    <ButtonNextUI color="danger" variant="light" onPress={onClose}>
                                        Cerrar
                                    </ButtonNextUI>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                {/* Modal Eliminar Familiar */}
                <Modal isOpen={isOpen3} onOpenChange={onOpenChange3}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Eliminar Familiar</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <p>Está seguro de eliminar el familiar?</p>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <ButtonNextUI color="danger" variant="light" onPress={onClose}>
                                        Cerrar
                                    </ButtonNextUI>
                                    <ButtonNextUI color="danger" variant="solid" className="text-off-white" onClick={() => {
                                        deleteFamiliar();
                                        onClose();
                                    }}>
                                        Eliminar
                                    </ButtonNextUI>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                {/* Modal Editar Familiar */}
                <Modal isOpen={isOpen2} onOpenChange={onOpenChange2} >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Editar Familiar</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <div className="flex flex-col gap-2 items-center justify-center mt-3">
                                            <div className="flex gap-3">
                                                <InputForm
                                                    name="apellido_uno_familiar"
                                                    isRequired
                                                    onChange={editFamiliar.setField}
                                                    type="text"
                                                    label="Primer Apellido"
                                                    classNames={{
                                                        inputWrapper: "pb-1",
                                                        errorMessage: "text-sm font-medium",
                                                        input: "bg-off-white text-sm",
                                                        label: "text-sm"
                                                    }}
                                                    className="max-w-xs"
                                                    defaultValue={editFamiliar.data.apellido_uno_familiar.trim()}
                                                    validations={editFamiliar.validators}
                                                />

                                                <InputForm
                                                    name="apellido_dos_familiar"
                                                    onChange={editFamiliar.setField}
                                                    type="text"
                                                    label="Segundo Apellido"
                                                    classNames={{
                                                        inputWrapper: "pb-1",
                                                        errorMessage: "text-sm font-medium",
                                                        input: "bg-off-white text-sm",
                                                        label: "text-sm"
                                                    }}
                                                    className="max-w-xs"
                                                    defaultValue={editFamiliar.data.apellido_dos_familiar.trim()}
                                                />
                                            </div>

                                            <div className="flex gap-3">
                                                <InputForm
                                                    name="nombres_familiar"
                                                    isRequired
                                                    onChange={editFamiliar.setField}
                                                    type="text"
                                                    label="Nombres"
                                                    classNames={{
                                                        inputWrapper: "pb-1",
                                                        errorMessage: "text-sm font-medium",
                                                        input: "bg-off-white text-sm",
                                                        label: "text-sm"
                                                    }}
                                                    className="max-w-xs"
                                                    defaultValue={editFamiliar.data.nombres_familiar.trim()}
                                                    validations={editFamiliar.validators}
                                                />

                                                <SelectForm
                                                    name='parentesco_familiar'
                                                    onChange={editFamiliar.setField}
                                                    label="Parentesco"
                                                    className="w-40 text-sm"
                                                    classNames={{
                                                        label: "text-sm"
                                                    }}
                                                    isRequired
                                                    defaultValue={
                                                        parentescos.find(i => i.cod_parentesco.trim() == editFamiliar.data.parentesco_familiar?.toString().trim())?.cod_parentesco ?? undefined
                                                    }
                                                    validations={editFamiliar.validators}
                                                >
                                                    {
                                                        parentescos.map(i => (
                                                            <SelectItem key={i.cod_parentesco} className="text-sm">
                                                                {i.nombre_parentesco}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectForm>
                                            </div>

                                            <div className="flex gap-3">
                                                <SelectForm
                                                    name='tipo_documento_familiar'
                                                    onChange={editFamiliar.setField}
                                                    label="Tipo Documento"
                                                    className="w-48 text-sm"
                                                    classNames={{
                                                        label: "text-sm"
                                                    }}
                                                    isRequired
                                                    defaultValue={
                                                        tipoDocumento.find(i => i.cod_tip == editFamiliar.data.tipo_documento_familiar)?.cod_tip ?? undefined
                                                    }
                                                    validations={editFamiliar.validators}
                                                >
                                                    {
                                                        tipoDocumento.map(i => (
                                                            <SelectItem key={i.cod_tip} className="text-sm">
                                                                {i.des_tip}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectForm>

                                                <InputForm
                                                    name="numero_documento_familiar"
                                                    isRequired
                                                    onChange={editFamiliar.setField}
                                                    type="text"
                                                    label="Número Documento"
                                                    classNames={{
                                                        inputWrapper: "pb-1",
                                                        errorMessage: "text-sm font-medium",
                                                        input: "bg-off-white text-sm",
                                                        label: "text-sm"
                                                    }}
                                                    className="max-w-xs"
                                                    defaultValue={editFamiliar.data.numero_documento_familiar}
                                                    validations={editFamiliar.validators}
                                                />
                                            </div>

                                            <div className="flex gap-3">
                                                <InputForm
                                                    placeholder="fecha"
                                                    name="fecha_nacimiento_familiar"
                                                    onChange={editFamiliar.setField}
                                                    validations={editFamiliar.validators}
                                                    isRequired
                                                    type="date"
                                                    label="Fecha Nacimiento"
                                                    classNames={{
                                                        inputWrapper: "pb-1",
                                                        errorMessage: "text-sm font-medium",
                                                        input: "bg-off-white w-40 text-sm",
                                                        label: "text-sm"
                                                    }}
                                                    className="max-w-xs"
                                                    defaultValue={editFamiliar.data.fecha_nacimiento_familiar.split("T")[0]}
                                                />

                                                <SelectForm
                                                    name='genero_familiar'
                                                    onChange={editFamiliar.setField}
                                                    label="Género"
                                                    className="w-48 text-sm"
                                                    classNames={{
                                                        label: "text-sm"
                                                    }}
                                                    isRequired
                                                    defaultValue={
                                                        generos.find(i => i.cod_gen == editFamiliar.data.genero_familiar)?.cod_gen.toString() ?? undefined
                                                    }
                                                    validations={editFamiliar.validators}
                                                >
                                                    {
                                                        generos.map(i => (
                                                            <SelectItem key={i.cod_gen} className="text-sm">
                                                                {i.des_gen}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectForm>
                                            </div>

                                            <div className="flex gap-3">
                                                <SelectForm
                                                    name='estado_civil_familiar'
                                                    onChange={editFamiliar.setField}
                                                    label="Estado Civil"
                                                    className="w-48 text-sm"
                                                    classNames={{
                                                        label: "text-sm"
                                                    }}
                                                    isRequired
                                                    defaultValue={
                                                        estadoCivil.find(i => i.cod_est == editFamiliar.data.estado_civil_familiar)?.cod_est.toString() ?? undefined
                                                    }
                                                    validations={editFamiliar.validators}
                                                >
                                                    {
                                                        estadoCivil.map(i => (
                                                            <SelectItem key={i.cod_est} className="text-sm">
                                                                {i.des_est}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectForm>

                                                <SelectForm
                                                    name='ocupacion_familiar'
                                                    onChange={editFamiliar.setField}
                                                    label="Ocupación"
                                                    className="w-48 text-sm"
                                                    classNames={{
                                                        label: "text-sm"
                                                    }}
                                                    isRequired
                                                    defaultValue={
                                                        ocupacion.find(i => i.cod_ocupacion == editFamiliar.data.ocupacion_familiar)?.cod_ocupacion.toString() ?? undefined
                                                    }
                                                    validations={editFamiliar.validators}
                                                >
                                                    {
                                                        ocupacion.map(i => (
                                                            <SelectItem key={i.cod_ocupacion} className="text-sm">
                                                                {i.desc_ocupacion}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectForm>
                                            </div>

                                            <div className="flex gap-3">
                                                <SelectForm
                                                    name='recibe_sub_familiar'
                                                    onChange={editFamiliar.setField}
                                                    label="Recibe Sudsidio"
                                                    className="w-48 text-sm"
                                                    classNames={{
                                                        label: "text-sm"
                                                    }}
                                                    isRequired
                                                    defaultValue={
                                                        editFamiliar.data.recibe_sub_familiar.toString()
                                                    }
                                                    validations={editFamiliar.validators}
                                                >
                                                    <SelectItem value="" key="1" className="text-sm">
                                                        SI
                                                    </SelectItem>
                                                    <SelectItem value="" key="0" className="text-sm">
                                                        NO
                                                    </SelectItem>
                                                </SelectForm>

                                                <SelectForm
                                                    name='beneficiario_pos_familiar'
                                                    onChange={editFamiliar.setField}
                                                    label="Beneficiario POS"
                                                    className="w-48 text-sm"
                                                    classNames={{
                                                        label: "text-sm"
                                                    }}
                                                    isRequired
                                                    defaultValue={
                                                        editFamiliar.data.beneficiario_pos_familiar.toString()
                                                    }
                                                    validations={editFamiliar.validators}
                                                >
                                                    <SelectItem value="" key="2" className="text-sm">
                                                        SI
                                                    </SelectItem>
                                                    <SelectItem value="" key="1" className="text-sm">
                                                        NO
                                                    </SelectItem>
                                                </SelectForm>
                                            </div>

                                            <div className="flex gap-3">
                                                <SelectForm
                                                    name='convive_conmigo_familiar'
                                                    onChange={editFamiliar.setField}
                                                    label="Convive Conmigo"
                                                    className="w-48 text-sm"
                                                    classNames={{
                                                        label: "text-sm"
                                                    }}
                                                    isRequired
                                                    defaultValue={
                                                        editFamiliar.data.termino_estudios_familiar.toString()
                                                    }
                                                    validations={editFamiliar.validators}
                                                >
                                                    <SelectItem key="2" className="text-sm">
                                                        SI
                                                    </SelectItem>
                                                    <SelectItem key="1" className="text-sm">
                                                        NO
                                                    </SelectItem>
                                                </SelectForm>

                                                <SelectForm
                                                    name='nivel_estudios_familiar'
                                                    onChange={editFamiliar.setField}
                                                    label="Nivel Estudios"
                                                    className="w-48 text-sm"
                                                    classNames={{
                                                        label: "text-sm"
                                                    }}
                                                    isRequired
                                                    defaultValue={
                                                        nivelEstudios.find(i => i.tip_est == editFamiliar.data.nivel_estudios_familiar)?.tip_est.toString() ?? undefined
                                                    }
                                                    validations={editFamiliar.validators}
                                                >
                                                    {
                                                        nivelEstudios.map(i => (
                                                            <SelectItem key={i.tip_est} className="text-sm">
                                                                {i.des_est}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectForm>
                                            </div>

                                            <SelectForm
                                                name='termino_estudios_familiar'
                                                onChange={editFamiliar.setField}
                                                label="Terminó Estudios"
                                                className="w-48 text-sm"
                                                classNames={{
                                                    label: "text-sm"
                                                }}
                                                isRequired
                                                defaultValue={
                                                    editFamiliar.data.termino_estudios_familiar.toString()
                                                }
                                                validations={editFamiliar.validators}
                                            >
                                                <SelectItem value="" key="2" className="text-sm">
                                                    SI
                                                </SelectItem>
                                                <SelectItem value="" key="1" className="text-sm">
                                                    NO
                                                </SelectItem>
                                            </SelectForm>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <ButtonNextUI color="danger" variant="light" onPress={onClose}>
                                        Cerrar
                                    </ButtonNextUI>
                                    <ButtonNextUI color="danger" variant="solid" className="text-off-white" onClick={() => {
                                        putFamiliar();
                                        onClose2();
                                    }}
                                        isDisabled={!editFamiliar.validData}
                                    >
                                        Guardar
                                    </ButtonNextUI>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                {/* Familiares Agregados Recientemente */}
                {
                    (familiaresExistentes.length > 0 && !loading) && (
                        <div className="my-6">
                            <h6 className="text-center text-xl font-semibold my-4">Familiares Agregados Recientemente</h6>
                            <Table className="w-96 md:w-2/3 lg:w-full" aria-label="Table Familiares">
                                <TableHeader>
                                    <TableColumn className="text-center">Primer Apellido</TableColumn>
                                    <TableColumn className="text-center">Segundo Apellido</TableColumn>
                                    <TableColumn className="text-center">Nombres</TableColumn>
                                    <TableColumn className="text-center">Parentesco</TableColumn>
                                    <TableColumn className="text-center">Tipo de Documento</TableColumn>
                                    <TableColumn className="text-center">Número de Documento</TableColumn>
                                    <TableColumn className="text-center">Fecha de Nacimiento</TableColumn>
                                    <TableColumn className="text-center">Ver Más</TableColumn>
                                    <TableColumn className="text-center">Editar</TableColumn>
                                    <TableColumn className="text-center">Eliminar</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {
                                        familiaresExistentes.map((familiar: any) => (
                                            <TableRow className="text-center" key={familiar.num_ced}>
                                                <TableCell>{familiar.ap1Fam}</TableCell>
                                                <TableCell>{familiar.ap2_fam}</TableCell>
                                                <TableCell>{familiar.nom_fam}</TableCell>
                                                <TableCell>{parentescos.find(p => p.cod_parentesco == familiar.tip_fam.trim()).nombre_parentesco}</TableCell>
                                                <TableCell>{tipoDocumento.find(tipo => tipo.cod_tip == familiar.tip_ide).des_tip}</TableCell>
                                                <TableCell>{familiar.num_ced}</TableCell>
                                                <TableCell>{formatDate(familiar.fec_nac)}</TableCell>
                                                <TableCell className="hover:cursor-pointer">
                                                    <i className="bi bi-eye-fill text-primary text-2xl" onClick={() => {
                                                        setVerMasFamiliar({
                                                            genero: generos.find(g => g.cod_gen == familiar.sex_fam).des_gen,
                                                            benificiario_pos: (familiar.ind_pro == 0 ? "No" : "Sí"),
                                                            convive_conmigo: (familiar.ind_conv == 0 ? "No" : "Sí"),
                                                            estado_civil: estadoCivil.find(e => e.cod_est == familiar.est_civ_fam).des_est,
                                                            nivel_estudios: familiar.niv_est,
                                                            ocupacion: ocupacion.find(o => o.cod_ocupacion == familiar.ocu_fam).desc_ocupacion,
                                                            recibe_subsidio: (familiar.ind_sub == 0 ? "No" : "Sí"),
                                                            termino_estudios: (familiar.graduado == 0 ? "No" : "Sí")
                                                        });
                                                        onOpen();
                                                    }}></i>
                                                </TableCell>
                                                <TableCell>
                                                    <i title="Editar publicación" className="bi bi-pencil text-default-400 text-lg hover:cursor-pointer hover:text-custom-black transition-all" onClick={() => {
                                                        onOpen2();
                                                        editFamiliar.loadData({
                                                            apellido_uno_familiar: familiar.ap1Fam,
                                                            apellido_dos_familiar: familiar.ap2_fam,
                                                            nombres_familiar: familiar.nom_fam,
                                                            parentesco_familiar: familiar.tip_fam,
                                                            tipo_documento_familiar: familiar.tip_ide,
                                                            numero_documento_familiar: familiar.num_ced,
                                                            fecha_nacimiento_familiar: familiar.fec_nac,
                                                            genero_familiar: familiar.sex_fam,
                                                            estado_civil_familiar: familiar.est_civ_fam,
                                                            ocupacion_familiar: familiar.ocu_fam,
                                                            recibe_sub_familiar: familiar.ind_sub,
                                                            beneficiario_pos_familiar: familiar.ind_pro === 0 ? 1 : 2,
                                                            convive_conmigo_familiar: familiar.ind_conv === 0 ? 1 : 2,
                                                            nivel_estudios_familiar: familiar.niv_est,
                                                            termino_estudios_familiar: familiar.ind_comp === 0 ? 1 : 2,
                                                            id: familiar.id
                                                        })
                                                    }} />
                                                </TableCell>
                                                <TableCell>
                                                    <i title="Eliminar publicación" className="bi bi-trash3 text-default-400 text-lg hover:cursor-pointer hover:text-danger transition-all" onClick={() => {
                                                        setSelectedId(familiar.id);
                                                        onOpen3();
                                                    }} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </div>

                    )
                }
                {/* Familiares Ya Existentes */}
                {
                    (getFamiliaresEmpl.length > 0) && (
                        <div className="mt-4">
                            <h6 className="text-center text-xl font-semibold my-4">Familiares Registrados Actualmente</h6>
                            <Table className="w-96 md:w-2/3 lg:w-full" aria-label="Table Familiares">
                                <TableHeader>
                                    <TableColumn className="text-center">Primer Apellido</TableColumn>
                                    <TableColumn className="text-center">Segundo Apellido</TableColumn>
                                    <TableColumn className="text-center">Nombres</TableColumn>
                                    <TableColumn className="text-center">Parentesco</TableColumn>
                                    <TableColumn className="text-center">Tipo de Documento</TableColumn>
                                    <TableColumn className="text-center">Número de Documento</TableColumn>
                                    <TableColumn className="text-center">Fecha de Nacimiento</TableColumn>
                                    <TableColumn className="text-center">Ver Más</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {
                                        getFamiliaresEmpl.map(familiar => (
                                            <TableRow className="text-center" key={familiar.numero_documento}>
                                                <TableCell>{familiar.primer_apellido}</TableCell>
                                                <TableCell>{familiar.segundo_apellido}</TableCell>
                                                <TableCell>{familiar.nombres}</TableCell>
                                                <TableCell>{familiar.parentesco}</TableCell>
                                                <TableCell>{familiar.tipo_documento}</TableCell>
                                                <TableCell>{familiar.numero_documento}</TableCell>
                                                <TableCell>{familiar.fecha_nacimiento}</TableCell>
                                                <TableCell className="hover:cursor-pointer">
                                                    <i className="bi bi-eye-fill text-primary text-2xl" onClick={() => {
                                                        setVerMasFamiliar({
                                                            genero: familiar.genero,
                                                            benificiario_pos: familiar.benificiario_pos,
                                                            convive_conmigo: familiar.convive_conmigo,
                                                            estado_civil: familiar.estado_civil,
                                                            nivel_estudios: familiar.nivel_estudios,
                                                            ocupacion: familiar.ocupacion,
                                                            recibe_subsidio: familiar.recibe_subsidio,
                                                            termino_estudios: familiar.termino_estudios
                                                        });
                                                        onOpen();
                                                    }}></i>
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

            <div className="flex flex-center mt-8">
                <div className="flex gap-3">
                    <div>
                        <button className="h-10 border-2 select-none justify-center rounded-xl text-base font-medium items-center normal-shadow hover:font-semibold border-borders-light hover:border-primary bg-default-white hover:text-primary transition-all flex gap-1 w-40" onClick={() => changeTab('publicaciones-idiomas')}>
                            <i className='bi bi-caret-left mr-2 text-xl'></i>
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}