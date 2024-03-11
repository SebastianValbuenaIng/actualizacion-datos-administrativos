import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button as ButtonNextUI, SelectItem } from "@nextui-org/react"
import { formatDate, formatDateToInput } from "@/libs/functionsStrings";
import InputFile from "@/components/forms/InputFile"
import InputForm from "@/components/forms/InputForm";
import SelectForm from "@/components/forms/SelectForm";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import useFormData from "@/app/hooks/useFormData";
import useValidateForm from "@/app/hooks/useValidateForm";
import { useInfoPersonaStore } from "@/store";
import { tituloEdit } from "..";
import toast from "react-hot-toast";
import fetchFileFn from "@/utils/fetchFileFn";

interface Props {
    getTitulos: () => Promise<void>;
    onClose: () => void;
    isOpen: boolean;
    onOpenChange: () => void;
    instituciones: any[];
    estudios: any[];
    tituloEdit: tituloEdit | undefined;
}

export const ModalEditTitulo = ({ getTitulos, onClose, isOpen, onOpenChange, estudios, instituciones, tituloEdit }: Props) => {
    const infoPersona = useInfoPersonaStore(state => state.getInfoPersona());

    const [titulo, setTitulo] = useState<boolean>(false);
    const [showIns, setShowIns] = useState<boolean>(false);

    const [titulosFiltrados, setTitulosFiltrados] = useState<any[]>([]);
    const [institucionesFiltradas, setInstitucionesFiltradas] = useState<any[]>([]);

    const [filtroIns, setFiltroIns] = useState("");
    const [filtroTitulo, setFiltroTitulo] = useState("");

    const [, scrollerRef] = useInfiniteScroll({
        isEnabled: isOpen,
        shouldUseLoader: false
    });

    const { setFilesField, setData, validFiles } = useFormData({
        maxFiles: 1,
        minFiles: 1,
        fdFilesName: "archivo"
    });

    const editNuevoTitulo = useValidateForm<any>([
        {
            name: 'cod_estudio',
            validations: {
                required: 'El campo es requerido.'
            }
        },
        {
            name: 'cod_ins',
            validations: {
                required: 'El campo es requerido.'
            }
        },
        {
            name: 'ano_est',
            number: true,
            validations: {
                required: 'El campo es requerido.'
            }
        },
        {
            name: 'fec_gra',
            validations: {
                required: 'El campo es requerido.'
            }
        },
        {
            name: 'nro_tar'
        }
    ]);

    const requestEditTitulo = async () => {
        const fd = setData({
            ...editNuevoTitulo.data,
            nombre: infoPersona.email.replace("@escuelaing.edu.co", ""),
            id_titulo: tituloEdit?.id,
            fec_gra: editNuevoTitulo.data.fec_gra.length > 11 ? editNuevoTitulo.data.fec_gra.trim().slice(0, 10) : editNuevoTitulo.data.fec_gra
        });

        const tituloResponse = await fetchFileFn('/nuevoPerfil/nuevoTitulo', {
            method: 'PUT',
            formData: fd
        });

        if (tituloResponse.code == 200) {
            toast.success('Título editado correctamente');
            onClose();
            getTitulos();
        } else {
            toast.error('Ha ocurrido un error');
        }
    }

    useEffect(() => {
        if (tituloEdit) {
            editNuevoTitulo.loadData(tituloEdit);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tituloEdit]);

    // Filtrar Instituciones
    useEffect(() => {
        setInstitucionesFiltradas(filtrarInstituciones());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtroIns]);

    const handleChangeIns = (value: string | undefined) => {
        if (value != null) setFiltroIns(value.toUpperCase());
    };

    const filtrarInstituciones = () => {
        return instituciones.filter((item: any) => {
            return item.nom_ins.toUpperCase().includes(filtroIns);
        });
    };

    // Filtrar Estudios
    useEffect(() => {
        setTitulosFiltrados(filtrarTitulos());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtroTitulo]);

    const handleChange = (value: string | undefined) => {
        if (value != null) setFiltroTitulo(value.toUpperCase());
    };

    const filtrarTitulos = () => {
        return estudios.filter((item: any) => {
            return item.nom_est.toUpperCase().includes(filtroTitulo);
        });
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" isDismissable={false} hideCloseButton >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Editar Título</ModalHeader>
                        <ModalBody>
                            <div>
                                <div className="flex gap-2 flex-col md:flex-row justify-center">
                                    <InputForm
                                        icon="search"
                                        className="w-64"
                                        classNames={{
                                            inputWrapper: "pb-1",
                                            errorMessage: "text-sm font-medium",
                                            input: "ml-2 rounded text-sm",
                                            label: "text-sm"
                                        }}
                                        label="Escriba para filtrar el estudio"
                                        name="titulo"
                                        onChange={(e) => {
                                            handleChange(e.value?.toString())
                                            if (e.value) {
                                                setTitulo(true)
                                            } else {
                                                setTitulo(false)
                                            }
                                        }}
                                        type="text"
                                        validations={editNuevoTitulo.validators}
                                    />


                                    <div>
                                        <SelectForm
                                            label="Seleccione el estudio"
                                            name="cod_estudio"
                                            onChange={editNuevoTitulo.setField ?? tituloEdit?.cod_estudio}
                                            classNames={{
                                                label: "text-sm",
                                                value: "text-xs"
                                            }}
                                            className="w-96 hover:cursor-none"
                                            scrollRef={scrollerRef}
                                            isRequired
                                            isDisabled={!titulo}
                                            validations={editNuevoTitulo.validators}
                                            defaultValue={tituloEdit?.cod_estudio}
                                        >
                                            {
                                                titulosFiltrados.map(estudio => (
                                                    <SelectItem key={estudio.cod_est} className="text-sm">
                                                        {estudio.nom_est}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                        {
                                            titulosFiltrados.length == 0 && (
                                                <span className="text-xs text-red">No hay estudios relacionados</span>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="flex gap-2 items-center justify-center mt-3 flex-col md:flex-row">
                                    <InputForm
                                        icon="search"
                                        className="w-64"
                                        classNames={{
                                            inputWrapper: "pb-1",
                                            errorMessage: "text-sm font-medium",
                                            input: "ml-2 rounded text-sm",
                                            label: "text-sm"
                                        }}
                                        label="Escriba para filtrar la institución"
                                        name="institucion"
                                        onChange={(e) => {
                                            handleChangeIns(e.value?.toString())
                                            if (e.value) {
                                                setShowIns(true)
                                            } else {
                                                setShowIns(false)
                                            }
                                        }}
                                        type="text"
                                        validations={editNuevoTitulo.validators}
                                    />

                                    <div>
                                        <SelectForm
                                            label="Seleccione la institución"
                                            name="cod_ins"
                                            onChange={editNuevoTitulo.setField ?? tituloEdit?.cod_ins}
                                            classNames={{
                                                label: "text-sm",
                                                value: "text-xs"
                                            }}
                                            className="w-96 hover:cursor-none"
                                            scrollRef={scrollerRef}
                                            isRequired
                                            isDisabled={!showIns}
                                            validations={editNuevoTitulo.validators}
                                            defaultValue={tituloEdit?.cod_ins}
                                        >
                                            {
                                                institucionesFiltradas.map(institucion => (
                                                    <SelectItem key={institucion.cod_ins} className="text-sm">
                                                        {institucion.nom_ins}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectForm>
                                        {
                                            institucionesFiltradas.length == 0 && (
                                                <span className="text-xs text-red">No hay instituciones relacionadas</span>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="flex gap-2 items-center justify-center mt-3">
                                    <InputForm
                                        name="ano_est"
                                        isRequired
                                        onChange={editNuevoTitulo.setField ?? tituloEdit?.ano_est}
                                        validations={editNuevoTitulo.validators}
                                        defaultValue={tituloEdit?.ano_est.toString()}
                                        type="number"
                                        label="Año de grado"
                                        classNames={{
                                            inputWrapper: "pb-1",
                                            errorMessage: "text-sm font-medium",
                                            input: "bg-off-white text-sm",
                                            label: "text-sm"
                                        }}
                                        className="w-80"
                                    />

                                    <InputForm
                                        placeholder="fecha"
                                        name="fec_gra"
                                        onChange={editNuevoTitulo.setField ?? tituloEdit?.fec_gra}
                                        validations={editNuevoTitulo.validators}
                                        isRequired
                                        type="date"
                                        label="Fecha de Terminación"
                                        classNames={{
                                            inputWrapper: "pb-1",
                                            errorMessage: "text-sm font-medium",
                                            input: "bg-off-white w-40 text-sm",
                                            label: "text-sm"
                                        }}
                                        className="w-64"
                                        defaultValue={formatDateToInput(tituloEdit?.fec_gra!)}
                                    />
                                </div>

                                <div className="mt-3 flex justify-center">
                                    <InputForm
                                        name="nro_tar"
                                        onChange={editNuevoTitulo.setField ?? tituloEdit?.nro_tar}
                                        validations={editNuevoTitulo.validators}
                                        type="text"
                                        label="Número de Tarjeta Profesional"
                                        classNames={{
                                            inputWrapper: "pb-1",
                                            errorMessage: "text-sm font-medium",
                                            input: "bg-off-white w-40 text-sm",
                                            label: "text-sm"
                                        }}
                                        className="w-64"
                                        defaultValue={tituloEdit?.nro_tar}
                                    />
                                </div>

                                <div className="flex-center mt-5 flex-col">
                                    <InputFile
                                        name="titulo"
                                        getFiles={setFilesField}
                                        minFiles={1}
                                        maxFiles={1}
                                        extensions={{
                                            pdf: true,
                                        }}
                                    />
                                    <a
                                        href={process.env.NEXT_PUBLIC_API_URL + `/nuevoPerfil/titulo?name_title=${tituloEdit?.archivo}`}
                                        target="_blank"
                                        className="underline hover:text-primary"
                                    >
                                        Archivo actual: {tituloEdit?.archivo}
                                    </a>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <ButtonNextUI color="danger" variant="light" onPress={(e) => {
                                onClose();
                                setTitulo(false);
                                setShowIns(false);
                            }}>
                                Cerrar
                            </ButtonNextUI>
                            <ButtonNextUI color="danger" variant="solid" className="text-off-white" onClick={() => requestEditTitulo()} isDisabled={
                                !editNuevoTitulo.validData
                            }>
                                Guardar
                            </ButtonNextUI>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
