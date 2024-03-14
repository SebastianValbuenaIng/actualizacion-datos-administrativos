import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button as ButtonNextUI, SelectItem } from "@nextui-org/react"
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import toast from "react-hot-toast";
import fetchFileFn from "@/utils/fetchFileFn";
import { useInfoPersonaStore } from "@/store";
import useFormData from "@/app/hooks/useFormData";
import useValidateForm from "@/app/hooks/useValidateForm";
import InputFile from "@/components/forms/InputFile"
import InputForm from "@/components/forms/InputForm";
import SelectForm from "@/components/forms/SelectForm";

interface Props {
    documento: string;
    isOpen: boolean;
    onOpenChange: () => void;
    getTitulos: () => Promise<void>;
    onClose: () => void;
    instituciones: any[];
    estudios: any[];
}

export const ModalAddTitulo = ({ documento, isOpen, onOpenChange, getTitulos, onClose, estudios, instituciones }: Props) => {
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

    const changeNuevoTitulo = useValidateForm<any>([
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

    const addTitulo = async () => {
        const fd = setData({
            nombre: infoPersona.email.replace("@escuelaing.edu.co", ""),
            documento: documento,
            ...changeNuevoTitulo.data
        });

        const tituloResponse = await fetchFileFn('/nuevoPerfil/nuevoTitulo', {
            method: 'POST',
            formData: fd
        });

        if (tituloResponse.code == 200) {
            toast.success('Título añadido correctamente');
            onClose();
            getTitulos();
        } else {
            toast.error('Ha ocurrido un error');
        }
    }

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

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" isDismissable={false} hideCloseButton >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Agregar Nuevo Título</ModalHeader>
                        <ModalBody>
                            <div>
                                <div className="flex gap-2 flex-col flex-center md:flex-row justify-center">
                                    <InputForm
                                        className="w-64"
                                        classNames={{
                                            inputWrapper: "pb-1",
                                            errorMessage: "text-sm font-medium",
                                            input: "ml-2 rounded text-sm",
                                            label: "text-sm mb-5"
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
                                        validations={changeNuevoTitulo.validators}
                                    />

                                    {
                                        titulo && (
                                            <>
                                                <i className="bi bi-arrow-down md:hidden text-primary text-xl flex items-center"></i>
                                                <i className="bi bi-arrow-right hidden text-primary text-xl md:flex items-center"></i>
                                            </>
                                        )
                                    }

                                    <div>
                                        <SelectForm
                                            label="Seleccione el estudio"
                                            name="cod_estudio"
                                            onChange={changeNuevoTitulo.setField}
                                            classNames={{
                                                label: "text-sm",
                                                value: "text-xs",
                                                trigger: titulo ? "w-96 md:w-[550px] hover:cursor-none rounded-xl transition-all" : "w-96 md:w-[550px] hover:cursor-none rounded-xl transition-all"
                                            }}
                                            scrollRef={scrollerRef}
                                            isRequired
                                            isDisabled={!titulo}
                                            validations={changeNuevoTitulo.validators}
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
                                        className="w-64"
                                        classNames={{
                                            inputWrapper: "pb-1",
                                            errorMessage: "text-sm font-medium",
                                            input: "ml-2 rounded text-sm",
                                            label: "text-sm mb-5"
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
                                        validations={changeNuevoTitulo.validators}
                                    />

                                    {
                                        showIns && (
                                            <>
                                                <i className="bi bi-arrow-down md:hidden text-primary text-xl flex items-center"></i>
                                                <i className="bi bi-arrow-right hidden text-primary text-xl md:flex items-center"></i>
                                            </>
                                        )
                                    }

                                    <div>
                                        <SelectForm
                                            label="Seleccione la institución"
                                            name="cod_ins"
                                            onChange={changeNuevoTitulo.setField}
                                            classNames={{
                                                label: "text-sm",
                                                value: "text-xs",
                                                trigger: showIns ? "w-96 md:w-[550px] hover:cursor-none rounded-xl transition-all" : "w-96 md:w-[550px] hover:cursor-none rounded-xl transition-all"
                                            }}
                                            scrollRef={scrollerRef}
                                            isRequired
                                            isDisabled={!showIns}
                                            validations={changeNuevoTitulo.validators}
                                        >
                                            {
                                                institucionesFiltradas.map(institucion => (
                                                    <SelectItem key={institucion.cod_ins}>
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
                                        onChange={changeNuevoTitulo.setField}
                                        validations={changeNuevoTitulo.validators}
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
                                        onChange={changeNuevoTitulo.setField}
                                        validations={changeNuevoTitulo.validators}
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
                                    />
                                </div>

                                <div className="mt-3 flex justify-center">
                                    <InputForm
                                        name="nro_tar"
                                        onChange={changeNuevoTitulo.setField}
                                        validations={changeNuevoTitulo.validators}
                                        type="text"
                                        label="Número de Tarjeta Profesional"
                                        classNames={{
                                            inputWrapper: "pb-1",
                                            errorMessage: "text-sm font-medium",
                                            input: "bg-off-white w-40 text-sm",
                                            label: "text-sm"
                                        }}
                                        className="w-64"
                                    />
                                </div>

                                <div className="flex-center flex-col mt-5">
                                    <p className="text-primary underline text-sm mb-2">Para finalizar el registro de su nuevo título, adjunte el documento que lo acredite: </p>
                                    <InputFile
                                        name="titulo"
                                        getFiles={setFilesField}
                                        minFiles={1}
                                        maxFiles={1}
                                        extensions={{
                                            pdf: true,
                                        }}
                                    />
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
                            <ButtonNextUI color="danger" variant="solid" className="text-off-white" onClick={() => addTitulo()} isDisabled={
                                !validFiles || !changeNuevoTitulo.validData
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