'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Divider, SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { Triangle } from "react-loader-spinner";
import InputForm from "@/components/forms/InputForm";
import SelectForm from "@/components/forms/SelectForm";
import Button from "@/components/ui/ButtonContinue";
import { FormDireccionCompleta } from "./informacion-empleado-ui/FormDireccionCompleta";
import { FormRedesSociales } from "./informacion-empleado-ui/FormRedesSociales";
import { TypeUseValidateForm } from "@/app/hooks/useValidateForm";
import { useInformacionEmpleadoStore } from "@/store/informacion-empleado-store";
import { useUbicacionStore } from "@/store/persona/ubicacion-store";
import { useDireccionFinalPersona } from "@/store";
import toast from "react-hot-toast";

interface Props {
    changeTab: (tab: string) => void;
    setChargeData: Dispatch<SetStateAction<boolean>>
    chargeData: boolean;
    changeBasicDataUser: TypeUseValidateForm;
    direccionActual: string;
    verifyChangeValue: boolean;
    setVerifyChangeValue: (changeValue: boolean) => void;
    setModalGuardarTemporal: (open: boolean) => void;
    postInfoEmpleado: () => Promise<true | undefined>;
    paises: any[];
    deptos: any[];
    ciudades: any[];
}

export const InformacionEmpleado = ({ changeTab, chargeData, setChargeData, changeBasicDataUser, direccionActual, setVerifyChangeValue, setModalGuardarTemporal, verifyChangeValue, postInfoEmpleado, ciudades, deptos, paises }: Props) => {
    const [loading, setLoading] = useState(false);
    const [ubicacionFilter, setUbicacionFilter] = useState({
        departamentos: [] as any,
        ciudades: [] as any
    });

    const setInfoEmpleado = useInformacionEmpleadoStore(state => state.setInfoEmpleado);
    const getInfoEmpleado = useInformacionEmpleadoStore(state => state.getInfoEmpleado());
    const getInfoUbicacion = useUbicacionStore(state => state.getInfoUbicacion());
    const setInfoUbicacion = useUbicacionStore(state => state.setInfoUbicacion);
    const getDireccionFinalPersona = useDireccionFinalPersona(state => state.getDireccionFinalPersona());

    const [, scrollerRef] = useInfiniteScroll({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getBasicData = async () => {
        setLoading(true);
        const peticiones = [
            (await fetch(process.env.NEXT_PUBLIC_API_URL + '/generos')).json(),
            (await fetch(process.env.NEXT_PUBLIC_API_URL + '/estadoCivil')).json(),
            (await fetch(process.env.NEXT_PUBLIC_API_URL + '/tipoEmpleado')).json(),
        ];

        const responses = await Promise.all(peticiones);

        setInfoEmpleado({
            paises,
            ciudades,
            departamentos: deptos,
            generos: responses[0],
            estadoCivil: responses[1],
            tipoEmpleado: responses[2]
        })

        setLoading(false);
        setChargeData(true);
    }

    const handleChangeUbicacion = ({ name, value }: any) => {
        if (name === 'pais_residencia') {
            setInfoUbicacion({
                pais: value,
                departamento: '',
                ciudad: ''
            });

            const paisFind = getInfoEmpleado.paises.find(pais => pais.nom_pai === value);

            const departamentosFilter = getInfoEmpleado.departamentos.filter(dep => dep.cod_pai === paisFind?.cod_pai);

            setUbicacionFilter({
                departamentos: departamentosFilter,
                ciudades: []
            });
        }

        if (name === 'depto_res') {
            setInfoUbicacion({
                ...getInfoUbicacion,
                departamento: value,
                ciudad: ''
            });

            const departamentoFind = getInfoEmpleado.departamentos.find(dep => dep.nom_dep === value);

            const ciudadesFilter = getInfoEmpleado.ciudades.filter(ciud => ciud.cod_dep === departamentoFind?.cod_dep && ciud.cod_pai === departamentoFind.cod_pai);

            setUbicacionFilter({
                ...ubicacionFilter,
                ciudades: ciudadesFilter
            });
        }

        if (name === 'nom_ciu') {
            setInfoUbicacion({
                ...getInfoUbicacion,
                ciudad: value
            });
        }
    }

    useEffect(() => {
        if (!chargeData) {
            getBasicData();
        }
    }, [chargeData, getBasicData]);

    useEffect(() => {
        const paisFind = getInfoEmpleado.paises.find(pais => pais.nom_pai === changeBasicDataUser.data.pais_residencia);

        const departamentoFind = getInfoEmpleado.departamentos.find(dep => dep.nom_dep === changeBasicDataUser.data.depto_res);

        setUbicacionFilter({
            departamentos: getInfoEmpleado.departamentos.filter(dep => dep.cod_pai === paisFind?.cod_pai),
            ciudades: getInfoEmpleado.ciudades.filter(ciud => ciud.cod_dep === departamentoFind?.cod_dep && ciud.cod_pai === departamentoFind.cod_pai)
        });
    }, [changeBasicDataUser.data.depto_res, changeBasicDataUser.data.pais_residencia, getInfoEmpleado.ciudades, getInfoEmpleado.departamentos, getInfoEmpleado.paises]);

    return (
        <section>
            <h2 className="text-2xl font-semibold text-center my-8">Información Empleado</h2>

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

            {!loading && (
                <form className="w-full max-w-[1400px]">
                    <div className="flex flex-col justify-between flex-wrap md:flex-row gap-4 items-center">
                        {/* Nombre */}
                        <div>
                            <InputForm
                                onChange={
                                    ({ name, value }) => {
                                        changeBasicDataUser.setField({ name, value });
                                        setVerifyChangeValue(true);
                                    }
                                }
                                disabled
                                name="nombres"
                                defaultValue={changeBasicDataUser.data.nombres}
                                type="text"
                                label="Nombre Completo"
                                classNames={{
                                    inputWrapper: "pb-1",
                                    errorMessage: "text-sm font-medium",
                                    input: "bg-off-white w-60 text-xs",
                                    label: "text-sm"
                                }}
                                className="max-w-xs"
                            />
                        </div>

                        {/* Documento */}
                        <div>
                            <InputForm
                                name="cod_emp"
                                onChange={
                                    ({ name, value }) => {
                                        changeBasicDataUser.setField({ name, value });
                                        setVerifyChangeValue(true);
                                    }
                                }
                                type="number"
                                label="Documento"
                                classNames={{
                                    inputWrapper: "pb-1",
                                    errorMessage: "text-sm font-medium",
                                    input: "bg-off-white w-36 text-xs",
                                    label: "text-sm"
                                }}
                                className="max-w-xs"
                                disabled={changeBasicDataUser.data.cod_emp != undefined}
                                defaultValue={changeBasicDataUser.data.cod_emp}
                            />
                        </div>

                        {/* Nacimiento */}
                        <div>
                            <InputForm
                                placeholder="fecha"
                                name="fecha_nacimiento"
                                onChange={
                                    ({ name, value }) => {
                                        changeBasicDataUser.setField({ name, value });
                                        setVerifyChangeValue(true);
                                    }
                                }
                                type="date"
                                label="Nacimiento"
                                classNames={{
                                    inputWrapper: "pb-1",
                                    errorMessage: "text-sm font-medium",
                                    input: "bg-off-white w-36 text-xs",
                                    label: "text-sm"
                                }}
                                className="max-w-xs"
                                disabled={changeBasicDataUser.data.fecha_nacimiento != undefined}
                                defaultValue={changeBasicDataUser.data.fecha_nacimiento}
                            />
                        </div>

                        {/* Telefono */}
                        <div>
                            <InputForm
                                name="tel_celular"
                                onChange={
                                    ({ name, value }) => {
                                        changeBasicDataUser.setField({ name, value });
                                        setVerifyChangeValue(true);
                                    }
                                }
                                isRequired
                                type="number"
                                label="Teléfono"
                                classNames={{
                                    inputWrapper: "py-0 pb-1",
                                    errorMessage: "text-sm font-medium",
                                    input: "bg-off-white w-28 text-xs",
                                    label: "text-sm"
                                }}
                                className="max-w-xs"
                                defaultValue={changeBasicDataUser.data.tel_celular}
                                validations={changeBasicDataUser.validators}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between flex-wrap md:flex-row gap-4 mt-4 items-center">
                        {/* Sexo */}
                        {
                            (getInfoEmpleado.generos && getInfoEmpleado.generos.length > 0) && (
                                <SelectForm
                                    name="des_gen"
                                    onChange={
                                        ({ name, value }) => {
                                            changeBasicDataUser.setField({ name, value });
                                            setVerifyChangeValue(true);
                                        }
                                    }
                                    label="Sexo"
                                    placeholder="Seleccione"
                                    className="w-40 text-xs"
                                    classNames={{
                                        label: "text-sm",
                                        value: "text-xs"
                                    }}
                                    required
                                    isDisabled={changeBasicDataUser.data.des_gen != undefined}
                                    defaultValue={changeBasicDataUser.data.des_gen}
                                >
                                    {
                                        getInfoEmpleado.generos?.map((gen, ind) => (
                                            <SelectItem value={gen.des_gen} key={gen.des_gen} className="text-xs" classNames={{ title: "text-xs" }}>
                                                {gen.des_gen}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectForm>
                            )
                        }

                        {/* Estado Civil */}
                        {
                            (getInfoEmpleado.estadoCivil && getInfoEmpleado.estadoCivil.length > 0) && (
                                <SelectForm
                                    name="estado_civil"
                                    onChange={
                                        ({ name, value }) => {
                                            changeBasicDataUser.setField({ name, value });
                                            setVerifyChangeValue(true);
                                        }
                                    }
                                    label="Estado Civil"
                                    placeholder="Seleccione el estado civil"
                                    className="w-40"
                                    classNames={{
                                        label: "text-sm",
                                        value: 'text-xs'
                                    }}
                                    isRequired
                                    validations={changeBasicDataUser.validators}
                                    defaultValue={changeBasicDataUser.data.estado_civil ?? undefined}
                                    required>
                                    {
                                        getInfoEmpleado.estadoCivil?.map(estado => (
                                            <SelectItem value={estado.des_est} key={estado.des_est} className="text-xs" classNames={{ title: "text-xs" }}>
                                                {estado.des_est}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectForm>
                            )
                        }

                        {/*Correo */}
                        <div>
                            <InputForm
                                name="email"
                                onChange={
                                    ({ name, value }) => {
                                        changeBasicDataUser.setField({ name, value });
                                        setVerifyChangeValue(true);
                                    }
                                }
                                type="email"
                                label="Correo Electrónico"
                                classNames={{
                                    inputWrapper: "py-0 pb-1",
                                    errorMessage: "text-sm font-medium",
                                    input: "bg-off-white w-56 text-xs",
                                    label: "text-xs"
                                }}
                                className="max-w-xs"
                                disabled={changeBasicDataUser.data.email != undefined}
                                defaultValue={changeBasicDataUser.data.email}
                            />
                        </div>

                        {/* Correo alterno */}
                        <div>
                            <InputForm
                                isRequired
                                name="email_alterno"
                                onChange={
                                    ({ name, value }) => {
                                        changeBasicDataUser.setField({ name, value });
                                        setVerifyChangeValue(true);
                                    }
                                }
                                type="email"
                                label="Correo Alterno"
                                classNames={{
                                    inputWrapper: "py-0 pb-1",
                                    errorMessage: "text-sm font-medium",
                                    input: "bg-off-white w-56 text-xs",
                                    label: "text-sm"
                                }}
                                className="max-w-xs"
                                defaultValue={changeBasicDataUser.data.email_alterno}
                                validations={changeBasicDataUser.validators}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between flex-wrap md:flex-row gap-4 md:gap-4 mt-4 items-center">
                        {/* Tipo Empleado */}
                        {
                            (getInfoEmpleado.tipoEmpleado && getInfoEmpleado.tipoEmpleado.length > 0) && (
                                <SelectForm
                                    name="tipo_empleado"
                                    onChange={
                                        ({ name, value }) => {
                                            changeBasicDataUser.setField({ name, value });
                                            setVerifyChangeValue(true);
                                        }
                                    }
                                    label="Tipo Empleado"
                                    placeholder="Seleccione el tipo"
                                    className="w-64 hover:cursor-none"
                                    classNames={{
                                        label: "text-sm",
                                        value: "text-xs"
                                    }}
                                    isDisabled={changeBasicDataUser.data.tipo_empleado != undefined}
                                    defaultValue={changeBasicDataUser.data.tipo_empleado}
                                >
                                    {
                                        getInfoEmpleado.tipoEmpleado?.map((tipo, ind) => (
                                            <SelectItem value={tipo.nombre} key={tipo.nombre} className="text-sm">
                                                {tipo.nombre}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectForm>
                            )
                        }

                        {/* Select con todos los paises */}
                        {
                            (paises.length > 0) && (
                                <SelectForm
                                    name="pais_residencia"
                                    onChange={
                                        ({ name, value }) => {
                                            handleChangeUbicacion({ name, value });
                                            setVerifyChangeValue(true);
                                        }
                                    }
                                    label="País Residencia"
                                    placeholder="Seleccione su país"
                                    className="w-44"
                                    classNames={{
                                        label: "text-sm",
                                        value: "text-xs"
                                    }}
                                    isRequired
                                    defaultValue={getInfoUbicacion.pais ?? changeBasicDataUser.data.pais_residencia ?? undefined}
                                    scrollRef={scrollerRef}
                                    validations={changeBasicDataUser.validators}
                                >
                                    {
                                        paises?.map((pais) => (
                                            <SelectItem key={pais.nom_pai} className="text-md" classNames={{ title: 'text-md' }}>
                                                {pais.nom_pai}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectForm>
                            )
                        }

                        {/* Select con todos los departamentos */}
                        {
                            (getInfoEmpleado.departamentos && getInfoEmpleado.departamentos.length > 0) && (
                                <SelectForm
                                    name="depto_res"
                                    onChange={
                                        ({ name, value }) => {
                                            handleChangeUbicacion({ name, value });
                                            setVerifyChangeValue(true);
                                        }
                                    }
                                    label="Departamento Residencia"
                                    placeholder="Seleccione departamento"
                                    className="w-56"
                                    classNames={{
                                        label: "text-sm",
                                        value: "text-xs"
                                    }}
                                    isRequired
                                    defaultValue={getInfoUbicacion.departamento ?? changeBasicDataUser.data.depto_res ?? undefined}
                                    scrollRef={scrollerRef}
                                    validations={changeBasicDataUser.validators}
                                >
                                    {
                                        ubicacionFilter.departamentos?.map((dep: any) => (
                                            <SelectItem key={dep.nom_dep} className="text-sm" classNames={{ title: "text-md" }}>
                                                {dep.nom_dep}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectForm>
                            )
                        }

                        {/* Select con todas las ciudades */}
                        {
                            (getInfoEmpleado.ciudades && getInfoEmpleado.ciudades.length > 0) && (
                                <SelectForm
                                    name="nom_ciu"
                                    onChange={
                                        ({ name, value }) => {
                                            handleChangeUbicacion({ name, value });
                                            setVerifyChangeValue(true);
                                        }
                                    }
                                    label="Ciudad Residencia"
                                    placeholder="Seleccione su ciudad"
                                    className="w-48"
                                    classNames={{
                                        label: "text-sm",
                                        value: "text-xs"
                                    }}
                                    isRequired
                                    // defaultValue={getInfoUbicacion.ciudad ?? changeBasicDataUser.data.nom_ciu ?? undefined}
                                    defaultValue={
                                        "BOGOTA"
                                    }
                                    scrollRef={scrollerRef}
                                    validations={changeBasicDataUser.validators}
                                >
                                    {
                                        ubicacionFilter.ciudades?.map((ciudad: any) => (
                                            <SelectItem key={ciudad.nom_dep} className="text-md" classNames={{ title: "text-md" }}>
                                                {ciudad.nom_dep}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectForm>
                            )
                        }
                    </div>

                    <Divider className="my-4" />

                    <div className="flex flex-col flex-wrap justify-between gap-2">
                        <FormDireccionCompleta direccionActual={direccionActual} setVerifyChangeValue={setVerifyChangeValue} />
                    </div>

                    <Divider className="my-6" />

                    <div>
                        <FormRedesSociales changeBasicDataUser={changeBasicDataUser} setVerifyChangeValue={setVerifyChangeValue} />
                    </div>
                </form>
            )}

            <div className="flex flex-center mt-8">
                <div className="w-48">
                    <Button text="Continuar" icon="caret-right" onClick={() => {
                        if (getDireccionFinalPersona.length > 40) {
                            toast.error('La dirección nueva no es válida')
                            return;
                        } else if (verifyChangeValue) {
                            setModalGuardarTemporal(true);
                        }
                        changeTab('perfil-empleado');
                    }} />
                </div>
            </div>
        </section>
    )
}