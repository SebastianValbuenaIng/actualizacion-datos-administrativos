'use client';

import InputForm from "@/components/forms/InputForm";
import Button from "@/components/ui/ButtonContinue";
import { TypeUseValidateForm } from "@/app/hooks/useValidateForm";
import { Divider, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import fetchFn from "@/utils/fetchFn";
import { useInfoPersonaStore } from "@/store";
import { Triangle } from "react-loader-spinner";

interface Props {
    changeDetallesDelCargo: TypeUseValidateForm;
    changeTab: (tab: string) => void;
    areasInteres: any[];
    setVerifyChangeValue: (change: boolean) => void;
    verifyChangeValue: boolean;
    setModalGuardarTemporal: (guardar: boolean) => void;
    setNuevasAreasInteres: (areas: string[]) => void;
    nuevasAreasInteres: string[];

}

export const DetallesDelCargo = ({ changeTab, changeDetallesDelCargo, areasInteres, setVerifyChangeValue, verifyChangeValue, setModalGuardarTemporal, setNuevasAreasInteres, nuevasAreasInteres }: Props) => {
    const infoPersona = useInfoPersonaStore(state => state.getInfoPersona());

    const [loading, setLoading] = useState(true);

    const getAreasInteres = async () => {
        setLoading(true);
        const respAreasInteres = await fetchFn(`/areasInteres?documento=${infoPersona.nroDocumento}`);

        if (respAreasInteres.code == 200) {
            setNuevasAreasInteres(respAreasInteres.data.map((a: any) => a.cod_area.toString()));
        }
        setLoading(false);
    }

    useEffect(() => {
        getAreasInteres();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section>
            <h2 className="text-2xl font-semibold text-center my-8">Detalles del Cargo</h2>

            <form className="w-full max-w-[700px] flex flex-wrap flex-center gap-4">
                <div>
                    <InputForm
                        isRequired
                        name="ubicacion_empleado"
                        type="text"
                        onChange={({ name, value }) => {
                            changeDetallesDelCargo.setField({ name, value });
                            setVerifyChangeValue(true);
                        }}
                        label='Ubicación (Bloque y oficina)'
                        classNames={{
                            inputWrapper: "pb-1",
                            errorMessage: "text-sm font-medium",
                            input: "bg-off-white w-56 text-sm",
                            label: "text-sm"
                        }}
                        className="max-w-xs"
                        defaultValue={changeDetallesDelCargo.data.ubicacion_empleado}
                        validations={changeDetallesDelCargo.validators}
                    />
                </div>

                <div>
                    <InputForm
                        name="area"
                        type="text"
                        onChange={changeDetallesDelCargo.setField}
                        label='Área a la que pertenece'
                        classNames={{
                            inputWrapper: "pb-1",
                            errorMessage: "text-sm font-medium",
                            input: "bg-off-white w-56 text-sm",
                            label: "text-sm"
                        }}
                        className="max-w-xs"
                        defaultValue={changeDetallesDelCargo.data.area}
                        disabled
                    />
                </div>

                <div>
                    <InputForm
                        name="cargo"
                        type="text"
                        onChange={changeDetallesDelCargo.setField}
                        label='Cargo'
                        classNames={{
                            inputWrapper: "pb-1",
                            errorMessage: "text-sm font-medium",
                            input: "bg-off-white w-56 text-sm",
                            label: "text-sm"
                        }}
                        className="max-w-xs"
                        defaultValue={changeDetallesDelCargo.data.cargo}
                        disabled
                    />
                </div>

                <div>
                    <InputForm
                        name="extension"
                        type="number"
                        onChange={({ name, value }) => {
                            changeDetallesDelCargo.setField({ name, value })
                            setVerifyChangeValue(true);
                        }}
                        label="Extensión"
                        classNames={{
                            inputWrapper: "pb-1",
                            errorMessage: "text-sm font-medium",
                            input: "bg-off-white w-52 text-sm",
                            label: "text-sm"
                        }}
                        className="max-w-xs"
                        defaultValue={changeDetallesDelCargo.data.extension.toString().trim()}
                        validations={changeDetallesDelCargo.validators}
                    />
                </div>

                <div className="flex-center w-full gap-4">
                    <div>
                        <Divider className="w-full" />

                        {
                            (areasInteres.length > 0 && !loading) && (
                                <div className="mt-4">
                                    <p className="text-xl font-semibold text-center my-4">Áreas de Interés</p>

                                    <div className="flex flex-wrap justify-center gap-3 mb-4">
                                        <CheckboxGroup
                                            onValueChange={(value) => {
                                                setNuevasAreasInteres(value);
                                                setVerifyChangeValue(true);
                                            }}
                                            defaultValue={nuevasAreasInteres}
                                        >
                                            {
                                                areasInteres.map(area => (
                                                    <Checkbox
                                                        key={area.id_interes.toString()}
                                                        value={area.id_interes.toString()}
                                                    >
                                                        {area.descripcion}
                                                    </Checkbox>
                                                ))
                                            }

                                        </CheckboxGroup>
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
                    </div>
                </div>
            </form>

            <div className="flex flex-center mt-8">
                <div className="flex gap-3">
                    <div>
                        <button
                            className="h-10 border-2 select-none justify-center rounded-xl text-base font-medium items-center normal-shadow hover:font-semibold border-borders-light hover:border-primary bg-default-white hover:text-primary transition-all flex gap-1 w-40"
                            onClick={() => {
                                changeTab('perfil-empleado');
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
                            changeTab('consultar-experiencia');
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