'use client';

import { SetStateAction, useEffect, useState } from "react";
import { Tabs, Tab, Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useValidateForm from "@/app/hooks/useValidateForm";
import { useDireccionFinalPersona, useInfoPersonaStore } from "@/store";
import { useInformacionEmpleadoStore } from "@/store/informacion-empleado-store";
import { InformacionEmpleado, PerfilEmpleado, ConsultarExperiencia, ConsultarFamiliares, PublicacionesIdiomas, DetallesDelCargo } from ".";
import Modal from "@/components/Modal";
import fetchFn from "@/utils/fetchFn";

interface Props {
    openModal: boolean;
    setOpenModal: (value: SetStateAction<boolean>) => void;
}

export const PrincipalTabs = ({ openModal, setOpenModal }: Props) => {
    const router = useRouter();

    const infoPersona = useInfoPersonaStore(state => state.getInfoPersona());
    const getInfoEmpleadoData = useInformacionEmpleadoStore(state => state.getInfoEmpleado());
    const getDireccionFinalPersona = useDireccionFinalPersona(state => state.getDireccionFinalPersona());

    const [selected, setSelected] = useState("informacion-empleado");
    const [chargeData, setChargeData] = useState(false);
    const [direccionActual, setDireccionActual] = useState('');
    const [modalGuardarTemporal, setModalGuardarTemporal] = useState(false);
    const [verifyChangeValue, setVerifyChangeValue] = useState(false);

    const [experienciaEmpl, setExperienciaEmpl] = useState<[]>([]);
    const [idiomaEmpl, setIdiomaEmpl] = useState<[]>([]);
    const [familiaresEmpl, setFamiliaresEmpl] = useState<[]>([]);
    const [areasInteres, setAreasInteres] = useState<[]>([]);
    const [parentescos, setParentescos] = useState<[]>([]);
    const [areasExperiencia, setAreasExperiencia] = useState<[]>([]);
    const [estadoCivil, setEstadoCivil] = useState<any[]>([]);
    const [generos, setGeneros] = useState<[]>([]);
    const [tipoDocumento, setTipoDocumento] = useState<[]>([]);
    const [ocupacion, setOcupacion] = useState<[]>([]);
    const [idiomas, setIdiomas] = useState<[]>([]);
    const [habilidadIdioma, setIdiomaHabilidad] = useState<[]>([]);
    const [calificacionIdioma, setCalificacionIdioma] = useState<[]>([]);
    const [duracionExperiencia, setDuracionExperiencia] = useState<[]>([]);
    const [nivelEstudios, setNivelEstudios] = useState<[]>([]);
    const [publicacionesEmpl, setPublicacionesEmpl] = useState<[]>([]);

    const [paises, setPaises] = useState<any[]>([]);
    const [deptos, setDeptos] = useState<any[]>([]);
    const [ciudades, setCiudades] = useState<any[]>([]);
    const [estudios, setEstudios] = useState<any[]>([]);
    const [instituciones, setInstituciones] = useState<any[]>([]);

    const [titulosPregradoActuales, setTitulosPregradoActuales] = useState<any[]>([]);
    const [titulosPosgradoActuales, setTitulosPosgradoActuales] = useState<any[]>([]);
    const [nuevasAreasInteres, setNuevasAreasInteres] = useState<string[]>([]);

    const [tratamientoDatos, setTratamientoDatos] = useState({
        confirmarVericidad: "0",
        aceptarTratamiento: "0",
        adicionoEstudios: "0"
    });

    const changeBasicDataUser = useValidateForm<any>([
        {
            name: 'nom_ciu',
            validations: {
                required: 'La ciudad es requerida.'
            }
        },
        {
            name: 'depto_res',
            validations: {
                required: 'El departamento es requerido.'
            }
        },
        {
            name: 'estado_civil',
            validations: {
                required: 'El campo es requerido.',
            }
        },
        {
            name: 'pais_residencia',
            validations: {
                required: 'El país es requerido.'
            }
        },
        {
            name: 'nombres'
        },
        {
            name: 'cod_emp'
        },
        {
            name: 'fecha_nacimiento'
        },
        {
            name: 'tel_celular',
            number: true,
            validations: {
                onlyNumbers: true,
                required: 'El teléfono es requerido.',
                maxLength: {
                    message: 'El teléfono no puede tener más de 10 caracteres',
                    value: 10
                }
            }
        },
        {
            name: 'des_gen'
        },
        {
            name: 'email'
        },
        {
            name: 'email_alterno',
            validations: {
                validateEmail: true,
                required: 'El email es requerido.'
            }
        },
        {
            name: 'tipo_empleado'
        },
        {
            name: 'linkedin',
            validations: {
                maxLength: {
                    message: 'El enlace a LinkedIn no puede tener más de 100 caracteres.',
                    value: 100
                }
            }
        },
        {
            name: 'youtube',
            validations: {
                maxLength: {
                    message: 'El enlace a YouTube no puede tener más de 100 caracteres.',
                    value: 100
                }
            }
        },
        {
            name: 'researchGate',
            validations: {
                maxLength: {
                    message: 'El enlace a ResearchGate no puede tener más de 100 caracteres.',
                    value: 100
                }
            }
        },
        {
            name: 'cvlac',
            validations: {
                maxLength: {
                    message: 'El enlace a CVLAC no puede tener más de 100 caracteres.',
                    value: 100
                }
            }
        }
    ], true);

    const changePerfilEmpleadoData = useValidateForm<any>([
        {
            name: 'cargosDirectivos',
            validations: {
                maxLength: {
                    message: 'No debe ser mayor a 200 carácteres.',
                    value: 200
                }
            }
        },
        {
            name: 'membresias',
            validations: {
                maxLength: {
                    message: 'No debe ser mayor a 200 carácteres.',
                    value: 200
                }
            }
        },
        {
            name: 'reconocimientos',
            validations: {
                maxLength: {
                    message: 'No debe ser mayor a 200 carácteres.',
                    value: 200
                }
            }
        },
        {
            name: 'perfilGradoObtenido',
            validations: {
                maxLength: {
                    message: 'No debe ser mayor a 100 carácteres.',
                    value: 100
                }
            }
        },
        {
            name: 'perfilParrafoUno',
            validations: {
                maxLength: {
                    message: 'No debe ser mayor a 1000 carácteres.',
                    value: 1000
                }
            }
        },
        {
            name: 'perfilParrafoDos',
            validations: {
                maxLength: {
                    message: 'No debe ser mayor a 1000 carácteres.',
                    value: 1000
                }
            }
        },
    ], true);

    const changeDetallesDelCargo = useValidateForm<any>([
        {
            name: 'cargo'
        },
        {
            name: 'ubicacion_empleado',
            validations: {
                maxLength: {
                    message: 'El campo ubicación no puede tener más de 50 caracteres.',
                    value: 50
                }
            }
        },
        {
            name: 'extension',
            number: true,
            validations: {
                maxLength: {
                    message: 'El campo extensión no puede tener más de 8 caracteres.',
                    value: 8
                }
            }
        },
        {
            name: 'area'
        }
    ], true);

    const objectFinal = {
        pais_residencia: '',
        depto_res: '',
        nom_ciu: '',
        tel_celular: '',
        nombres: '',
        cod_emp: '',
        fecha_nacimiento: '',
        des_gen: '',
        estado_civil: '',
        email: '',
        email_alterno: '',
        tipo_empleado: '',
        cargo: '',
        ubicacion_empleado: '',
        extension: 0,
        area: '',
        linkedin: '',
        youtube: '',
        researchGate: '',
        cvlac: ''
    }

    const getInfoEmpleado = async () => {
        const respActualizaDatos = await fetch(process.env.NEXT_PUBLIC_API_URL + `/datosEmpleado?documento=${infoPersona.nroDocumento}`);
        const respActualizaDatosJson = await respActualizaDatos.json();

        const respParentescos = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/parentesco`)).json();
        setParentescos(respParentescos);

        const respEstadoCivil = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/estadoCivil`)).json();
        setEstadoCivil(respEstadoCivil);

        const respGeneros = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/generos`)).json();
        setGeneros(respGeneros);

        const respTipoDocumento = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/tipoDocumento`)).json();
        setTipoDocumento(respTipoDocumento);

        const respOcupacion = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/ocupacion`)).json();
        setOcupacion(respOcupacion);

        const respIdiomas = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/idiomas`)).json();
        setIdiomas(respIdiomas);

        const respIdiomaHabilidad = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/idiomaHabilidad`)).json();
        setIdiomaHabilidad(respIdiomaHabilidad);

        const resCalificacionIdioma = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/calificacionIdioma`)).json();
        setCalificacionIdioma(resCalificacionIdioma);

        const respDuracionExperiencia = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/duracionExperiencia`)).json();
        setDuracionExperiencia(respDuracionExperiencia);

        const respAreasExperiencia = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/areaExperiencia`)).json();
        setAreasExperiencia(respAreasExperiencia);

        const respNivelEstudios = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/nivelEstudios`)).json();
        setNivelEstudios(respNivelEstudios);

        const respAllEstudios = await fetchFn('/estudios');
        setEstudios(respAllEstudios.data);

        const respInstituciones = await fetchFn('/instituciones');
        setInstituciones(respInstituciones.data);

        const paises = await (await fetch(process.env.NEXT_PUBLIC_API_URL + '/paises')).json();
        setPaises(paises);
        const deptos = await (await fetch(process.env.NEXT_PUBLIC_API_URL + '/departamentos')).json();
        setDeptos(deptos);
        const ciudades = await (await fetch(process.env.NEXT_PUBLIC_API_URL + '/ciudades')).json();
        setCiudades(ciudades);

        if (!infoPersona.nroDocumento) {
            router.push('/error');
        }
        const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + `/empleado/informacionEmpleado?documento=${infoPersona.nroDocumento}`);
        const respJson = await resp.json();

        if (respActualizaDatos.status !== 404) {
            const paisFind = paises.find((pais: any) => pais.cod_pai === respActualizaDatosJson.pais_residencia);

            const departamentoFind = deptos.find((dep: any) => dep.cod_dep === respActualizaDatosJson.depto_res);

            const ciudadFind = ciudades.find((ciu: any) => ciu.cod_ciu === respActualizaDatosJson.nom_ciu && paisFind?.cod_pai === ciu.cod_pai);

            objectFinal.pais_residencia = paisFind?.nom_pai ?? '';
            objectFinal.depto_res = departamentoFind?.nom_dep ?? '';
            objectFinal.nom_ciu = ciudadFind?.nom_dep ?? ''
            objectFinal.tel_celular = respActualizaDatosJson.tel_celular;
            objectFinal.email_alterno = respActualizaDatosJson.e_mail_alt;
            objectFinal.extension = respActualizaDatosJson.usr_num_ext;
            objectFinal.ubicacion_empleado = respActualizaDatosJson.ubicacion;

            const estadoCivilFind: any = respEstadoCivil.find((e: any) => e.cod_est == respActualizaDatosJson.est_civ_emp);
            objectFinal.estado_civil = estadoCivilFind === undefined ? '' : estadoCivilFind.des_est;

            const foundReserchGate = respActualizaDatosJson.redes_sociales.find((r: any) => r.cod_red_soc === 7);
            const foundYoutube = respActualizaDatosJson.redes_sociales.find((r: any) => r.cod_red_soc === 6);
            const foundLinkedin = respActualizaDatosJson.redes_sociales.find((r: any) => r.cod_red_soc === 5);
            const foundCvlac = respActualizaDatosJson.redes_sociales.find((r: any) => r.cod_red_soc === 4);

            objectFinal.researchGate = foundReserchGate != undefined ? foundReserchGate.usuario_red : null;
            objectFinal.youtube = foundYoutube != undefined ? foundYoutube.usuario_red : null;
            objectFinal.linkedin = foundLinkedin != undefined ? foundLinkedin.usuario_red : null;
            objectFinal.cvlac = foundCvlac != undefined ? foundCvlac.usuario_red : null;
        } else {
            // Informacion Empleado
            objectFinal.pais_residencia = respJson.pais_residencia ?? '';
            objectFinal.depto_res = respJson.depto_res ?? '';
            objectFinal.nom_ciu = respJson.nom_ciu ?? ''
            objectFinal.cod_emp = respJson.cod_emp ?? ''
        }

        if (respActualizaDatos.status == 200) {
            setDireccionActual(respActualizaDatosJson.dirRes.trim() == "" ? respJson.dir_res : respActualizaDatosJson.dirRes.trim());
        } else {
            setDireccionActual(respJson.dir_res);
        }

        objectFinal.nombres = respJson.nombres;
        objectFinal.tel_celular = (objectFinal.tel_celular == null || objectFinal.tel_celular.trim() == "") ? respJson.tel_celular : objectFinal.tel_celular;
        objectFinal.cod_emp = respJson.cod_emp;
        objectFinal.fecha_nacimiento = respJson.fecha_nacimiento;
        objectFinal.des_gen = respJson.des_gen;
        objectFinal.estado_civil = (objectFinal.estado_civil == null || objectFinal.estado_civil.trim() == "") ? respJson.estado_civil : objectFinal.estado_civil;
        objectFinal.email = respJson.email;
        objectFinal.email_alterno = (objectFinal.email_alterno == null || objectFinal.email_alterno.trim() == "") ? respJson.email_alterno : objectFinal.email_alterno;
        objectFinal.tipo_empleado = respJson.tipo_empleado;

        const respRedesSociales = await fetch(process.env.NEXT_PUBLIC_API_URL + `/empleado/redesSociales?documento=${infoPersona.nroDocumento}`);
        const respRedesSocialesJson = await respRedesSociales.json();

        const foundReserchGate = respRedesSocialesJson.find((r: any) => r.codigo === 7);
        const foundYoutube = respRedesSocialesJson.find((r: any) => r.codigo === 6);
        const foundLinkedin = respRedesSocialesJson.find((r: any) => r.codigo === 5);
        const foundCvlac = respRedesSocialesJson.find((r: any) => r.codigo === 4);

        objectFinal.researchGate = (objectFinal.researchGate == null || objectFinal.researchGate.trim() == "")
            ? (foundReserchGate != undefined ? foundReserchGate.usuario : '')
            : objectFinal.researchGate;

        objectFinal.youtube = (objectFinal.youtube == null || objectFinal.youtube.trim() == "")
            ? (foundYoutube != undefined ? foundYoutube.usuario : '')
            : objectFinal.youtube;

        objectFinal.linkedin = (objectFinal.linkedin == null || objectFinal.linkedin.trim() == "")
            ? (foundLinkedin != undefined ? foundLinkedin.usuario : '')
            : objectFinal.linkedin;

        objectFinal.cvlac = (objectFinal.cvlac == null || objectFinal.cvlac.trim() == "")
            ? (foundCvlac != undefined ? foundCvlac.usuario : '')
            : objectFinal.cvlac;

        changeBasicDataUser.loadData({
            ...objectFinal,
            nombres: respJson.nombres
        });

        // Perfil empleado
        // const respPerfilEmpl = await fetch(process.env.NEXT_PUBLIC_API_URL + `/empleado/titulos?documento=${infoPersona.nroDocumento}`);
        // TODO: CAMBIAR
        const respPerfilEmpl = await fetch(process.env.NEXT_PUBLIC_API_URL + `/empleado/titulos?documento=19417101`);
        const respJsonPerfilEmpl = await respPerfilEmpl.json();

        const titulosPregrado = respJsonPerfilEmpl.filter((t: any) => t.tip_est === "05" || t.tip_est === "06" || t.tip_est === "07" || t.tip_est === "08");
        const institucionesPre = titulosPregrado.map((titulo: any) => titulo.institucion);
        setTitulosPregradoActuales(institucionesPre);

        const titulosPosgrado = respJsonPerfilEmpl.filter((t: any) => t.tip_est === "01" || t.tip_est === "02" || t.tip_est === "03" || t.tip_est === "04");
        const institucionesPos = titulosPosgrado.map((titulo: any) => titulo.institucion);
        setTitulosPosgradoActuales(institucionesPos);

        const respPerfilWeb = await fetch(process.env.NEXT_PUBLIC_API_URL + `/nuevoPerfil/perfilWeb?documento=${infoPersona.nroDocumento}`);
        // const respPerfilWebNovasoft = await fetchFn(`/empleado/perfil?documento=${infoPersona.nroDocumento}`);
        // TODO: CAMBIAR
        const respPerfilWebNovasoft = await fetchFn(`/empleado/perfil?documento=19417101`);

        if (respPerfilWeb.status == 200) {
            const respPerfilWebJson = await respPerfilWeb.json();

            changePerfilEmpleadoData.loadData({
                cargosDirectivos: respPerfilWebJson.cargo_direc == null ? "" : respPerfilWebJson.cargo_direc,
                membresias: respPerfilWebJson.membresias == null ? "" : respPerfilWebJson.membresias,
                reconocimientos: respPerfilWebJson.reconocimientos == null ? "" : respPerfilWebJson.reconocimientos,
                perfilParrafoUno: (respPerfilWebJson.parrafo1 == null || respPerfilWebJson.parrafo1.trim() == "")
                    ? respPerfilWebNovasoft.data.parrafo1 : respPerfilWebJson.parrafo1,
                perfilParrafoDos: (respPerfilWebJson.parrafo2 == null || respPerfilWebJson.parrafo2.trim() == "")
                    ? respPerfilWebNovasoft.data.parrafo2 : respPerfilWebJson.parrafo2
            });
        }

        // Detalles del Cargo
        const respDetallesCargoEmpl = await (await fetch(process.env.NEXT_PUBLIC_API_URL + `/empleado/detallesCargo?documento=${infoPersona.nroDocumento}`)).json();

        objectFinal.area = respDetallesCargoEmpl.area;
        objectFinal.cargo = respDetallesCargoEmpl.cargo;
        objectFinal.extension = (objectFinal.extension == null || objectFinal.extension.toString().trim() == "" || Number(objectFinal.extension.toString().trim()) == 0)
            ? respDetallesCargoEmpl.extension : objectFinal.extension;
        objectFinal.ubicacion_empleado = (objectFinal.ubicacion_empleado == null || objectFinal.ubicacion_empleado.trim() == "") ? respDetallesCargoEmpl.ubicacion_empleado : objectFinal.ubicacion_empleado;

        changeDetallesDelCargo.loadData({
            ...respDetallesCargoEmpl,
            ubicacion_empleado: objectFinal.ubicacion_empleado,
            extension: objectFinal.extension
        });

        // Experiencia Empleado
        // const respExperienciaEmpl = await fetch(process.env.NEXT_PUBLIC_API_URL + `/empleado/experiencia?documento=${infoPersona.nroDocumento}`);
        const respExperienciaEmpl = await fetch(process.env.NEXT_PUBLIC_API_URL + `/empleado/experiencia?documento=1014216982`);

        if (respExperienciaEmpl.status === 200) {
            const respExperienciaEmplJson = await respExperienciaEmpl.json();
            setExperienciaEmpl(respExperienciaEmplJson);
        }

        // Idiomas
        const respIdiomasEmpl = await fetch(process.env.NEXT_PUBLIC_API_URL + `/empleado/idiomas?documento=${infoPersona.nroDocumento}`);

        if (respIdiomasEmpl.status === 200) {
            const respIdiomasEmplJson = await respIdiomasEmpl.json();
            setIdiomaEmpl(respIdiomasEmplJson);
        }

        // Familiares
        const respFamiliaresEmpl = await fetch(process.env.NEXT_PUBLIC_API_URL + `/empleado/familiares?documento=${infoPersona.nroDocumento}`);

        if (respFamiliaresEmpl.status === 200) {
            const respFamiliaresEmplJson = await respFamiliaresEmpl.json();
            setFamiliaresEmpl(respFamiliaresEmplJson);
        }

        // Areas de Interes
        // const respAreasIntEmpl = await fetch(process.env.NEXT_PUBLIC_API_URL + `/empleado/areasInteres?documento=${infoPersona.nroDocumento}`);
        // TODO: CAMBIAR
        const respAreasIntEmpl = await fetch(process.env.NEXT_PUBLIC_API_URL + `/empleado/areasInteres?documento=19417101`);

        if (respAreasIntEmpl.status === 200) {
            const respAreasIntEmplJson = await respAreasIntEmpl.json();
            setAreasInteres(respAreasIntEmplJson);
        }

        // Publicaciones Ya existentes
        // const respPubliccionclsesEmpl = await fetchFn(`/empleado/publicaciones?documento=${infoPersona.nroDocumento}`);
        // TODO: CAMBIAR
        const respPubliccionesEmpl = await fetchFn(`/empleado/publicaciones?documento=79151838`);

        if (respPubliccionesEmpl.code === 200) {
            setPublicacionesEmpl(respPubliccionesEmpl.data);
        }
    }

    const postInfoEmpleado = async () => {
        const respInfoEmpleado = await fetchFn(`/datosEmpleado?documento=${infoPersona.nroDocumento}`, {
            method: 'POST',
            body: {
                tel_celular: changeBasicDataUser.data.tel_celular,
                cod_pais: paises.find(pais => pais.nom_pai === changeBasicDataUser.data.pais_residencia)!.cod_pai,
                cod_departamento: deptos.find((dep: any) => dep.nom_dep === changeBasicDataUser.data.depto_res)!.cod_dep,
                cod_ciudad: ciudades.find((ciu: any) => ciu.nom_dep == changeBasicDataUser.data.nom_ciu)!.cod_ciu,
                cod_estado_civil: estadoCivil.find((estado: any) => estado.des_est == changeBasicDataUser.data.estado_civil)!.cod_est,
                email_alterno: changeBasicDataUser.data.email_alterno,
                direccion_residencia: getDireccionFinalPersona.trim() == "" ? direccionActual : getDireccionFinalPersona,
                ubicacion: changeDetallesDelCargo.data.ubicacion_empleado,
                usr_num_ext: changeDetallesDelCargo.data.extension,
                confirmarVericidad: Number(tratamientoDatos.confirmarVericidad),
                aceptarTratamiento: Number(tratamientoDatos.aceptarTratamiento),
                adicionoEstudios: Number(tratamientoDatos.adicionoEstudios),
                red_social: [
                    {
                        cod_red_soc: 7,
                        usuario_red: changeBasicDataUser.data.researchGate
                    },
                    {
                        cod_red_soc: 6,
                        usuario_red: changeBasicDataUser.data.youtube
                    },
                    {
                        cod_red_soc: 5,
                        usuario_red: changeBasicDataUser.data.linkedin
                    },
                    {
                        cod_red_soc: 4,
                        usuario_red: changeBasicDataUser.data.cvlac
                    }
                ]
            }
        });

        if (respInfoEmpleado.code !== 200) {
            toast.error('Ha ocurrido un error', {
                id: 'error-peticion'
            });
            return;
        }

        setTratamientoDatos({
            aceptarTratamiento: "",
            adicionoEstudios: "",
            confirmarVericidad: ""
        });

        return true;
    }

    const postPerfilEmplado = async () => {
        const respPerfilEmpleado = await fetchFn(`/nuevoPerfil/perfilWeb?documento=${infoPersona.nroDocumento}`, {
            method: 'POST',
            body: {
                cargos_directivos: changePerfilEmpleadoData.data.cargosDirectivos,
                membresias: changePerfilEmpleadoData.data.membresias,
                reconocimientos: changePerfilEmpleadoData.data.reconocimientos,
                parrafoUno: changePerfilEmpleadoData.data.perfilParrafoUno,
                parrafoDos: changePerfilEmpleadoData.data.perfilParrafoDos
            }
        });
    }

    const postAreasInteres = async () => {
        const respAreasInteres = await fetchFn(`/areasInteres?documento=${infoPersona.nroDocumento}`, {
            method: 'POST',
            body: nuevasAreasInteres
        });

        if (respAreasInteres.code !== 200) {
            toast.error('Ha ocurrido un error', {
                id: 'error-peticion'
            });
            return;
        }
    }

    useEffect(() => {
        getInfoEmpleado();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <Tabs
                aria-label="menu-empleado"
                className="hidden lg:block"
                selectedKey={selected}
                onSelectionChange={
                    (key) => {
                        if (getDireccionFinalPersona.length > 40) {
                            toast.error('La dirección nueva no es válida');
                            return;
                        } else if (verifyChangeValue) {
                            setModalGuardarTemporal(true);
                        }
                        postInfoEmpleado();
                        postPerfilEmplado();
                        setSelected(key.toString());
                    }
                }
            >
                <Tab key='informacion-empleado' title='Información Empleado' className="select-none">
                    {/* Información empleado */}
                    {
                        changeBasicDataUser.isReady && (
                            <InformacionEmpleado
                                verifyChangeValue={verifyChangeValue}
                                changeTab={setSelected}
                                chargeData={chargeData}
                                setChargeData={setChargeData}
                                changeBasicDataUser={changeBasicDataUser}
                                direccionActual={direccionActual}
                                setVerifyChangeValue={setVerifyChangeValue}
                                setModalGuardarTemporal={setModalGuardarTemporal}
                                postInfoEmpleado={postInfoEmpleado}
                                ciudades={ciudades}
                                deptos={deptos}
                                paises={paises}
                            />
                        )
                    }
                </Tab>

                <Tab key='perfil-empleado' title='Perfil Empleado' className="select-none">
                    {/* Perfil Empleado */}
                    {
                        <PerfilEmpleado
                            setModalGuardarTemporal={setModalGuardarTemporal}
                            verifyChangeValue={verifyChangeValue}
                            titulosPregradoActuales={titulosPregradoActuales}
                            titulosPosgradoActuales={titulosPosgradoActuales}
                            estudios={estudios}
                            instituciones={instituciones}
                            changeTab={setSelected}
                            changePerfilEmpleadoData={changePerfilEmpleadoData}
                            setVerifyChangeValue={setVerifyChangeValue}
                            postPerfilEmplado={postPerfilEmplado}
                        />
                    }
                </Tab>

                <Tab key='detalles-cargo' title='Detalles del Cargo' className="select-none" >
                    {/* Detalles del Cargo */}
                    <DetallesDelCargo
                        nuevasAreasInteres={nuevasAreasInteres}
                        setNuevasAreasInteres={setNuevasAreasInteres}
                        setModalGuardarTemporal={setModalGuardarTemporal}
                        verifyChangeValue={verifyChangeValue}
                        changeTab={setSelected}
                        changeDetallesDelCargo={changeDetallesDelCargo}
                        areasInteres={areasInteres}
                        setVerifyChangeValue={setVerifyChangeValue}
                    />
                </Tab>

                <Tab key='consultar-experiencia' title='Consultar Experiencia' className="select-none">
                    {/* Consultar Experiencia */}
                    <ConsultarExperiencia
                        changeTab={setSelected}
                        getExperienciaEmpl={experienciaEmpl}
                        duracionExperiencia={duracionExperiencia}
                        areasExperiencia={areasExperiencia}
                    />
                </Tab>

                <Tab key='publicaciones-idiomas' title='Publicaciones e Idiomas' className="select-none">
                    {/* Consultar Publicaciones e Idiomas */}
                    <PublicacionesIdiomas
                        changeTab={setSelected}
                        getIdiomaEmpl={idiomaEmpl}
                        calificacionIdioma={calificacionIdioma}
                        habilidadIdioma={habilidadIdioma}
                        idiomas={idiomas}
                        publicacionesEmpl={publicacionesEmpl}
                    />
                </Tab>

                <Tab key='consultar-familiares' title='Consultar Familiares' className="select-none">
                    {/* Consultar Familiares */}
                    <ConsultarFamiliares
                        changeTab={setSelected}
                        getFamiliaresEmpl={familiaresEmpl}
                        parentescos={parentescos}
                        estadoCivil={estadoCivil}
                        generos={generos}
                        tipoDocumento={tipoDocumento}
                        ocupacion={ocupacion}
                        nivelEstudios={nivelEstudios}
                    />
                </Tab>
            </Tabs>

            {/* Guardar cambios GENERAL */}
            {
                getDireccionFinalPersona.length < 40 && (
                    <Modal isOpen={openModal} setIsOpen={setOpenModal} classContainer="max-w-[95%] md:max-w-[50%] mt-14" closeDisabled>
                        <i
                            className="bi bi-x absolute text-borders top-2 right-3 hover:text-primary text-3xl transition-all cursor-pointer"
                            onClick={() => setOpenModal(false)}
                        ></i>

                        <div>
                            <h5 className="text-3xl font-semibold my-2">Confirmación</h5>
                            <div className="my-5">
                                <div className="my-2 flex flex-col md:flex-row md:items-center gap-2">
                                    <p>- Confirmo que la información por mi consignada en este documento, es verídica y corresponde a la realidad: </p>
                                    <div>
                                        <Select
                                            classNames={{
                                                trigger: "bg-gray-box",

                                            }}
                                            variant="faded"
                                            placeholder="Seleccione"
                                            className="w-44"
                                            onChange={(value) => setTratamientoDatos({
                                                ...tratamientoDatos,
                                                confirmarVericidad: String(value.target.value)
                                            })}
                                        >
                                            <SelectItem key={"1"} className="text-sm" classNames={{ title: "text-md" }}>SÍ</SelectItem>
                                            <SelectItem key={"0"}>NO</SelectItem>
                                        </Select>
                                    </div>
                                    <i className="bi bi-asterisk text-primary text-xs mt-[-25px]"></i>
                                </div>
                                <div className="my-3 flex flex-col md:flex-row md:items-center gap-2">
                                    <p>- Acepto el tratamiento de mis datos personales por parte de la Escuela Colombiana de Ingeniería Julio Garavito: </p>
                                    <div>
                                        <Select
                                            classNames={{ trigger: "bg-gray-box" }}
                                            variant="faded"
                                            placeholder="Seleccione"
                                            className="w-44"
                                            onChange={(value) => setTratamientoDatos({
                                                ...tratamientoDatos,
                                                aceptarTratamiento: String(value.target.value)
                                            })}>
                                            <SelectItem key={"1"}>SÍ</SelectItem>
                                            <SelectItem key={"0"}>NO</SelectItem>
                                        </Select>
                                    </div>
                                    <i className="bi bi-asterisk text-primary text-xs mt-[-25px]"></i>
                                </div>
                                <div className="my-2 flex flex-col md:flex-row md:items-center gap-2">
                                    <p>- Adicionó usted estudios diferentes a los que fueron consultados desde Gestión Humana: </p>
                                    <Select
                                        classNames={{ trigger: "bg-gray-box" }}
                                        variant="faded" placeholder="Seleccione"
                                        className="w-44 mr-4"
                                        onChange={(value) => setTratamientoDatos({
                                            ...tratamientoDatos,
                                            adicionoEstudios: String(value.target.value)
                                        })}
                                        defaultSelectedKeys={["0"]}
                                    >
                                        <SelectItem key={"1"}>SÍ</SelectItem>
                                        <SelectItem key={"0"}>NO</SelectItem>
                                    </Select>
                                </div>
                            </div>

                            <Button
                                color="primary"
                                onClick={async () => {
                                    setVerifyChangeValue(false);
                                    const resp = await postInfoEmpleado();
                                    postAreasInteres();
                                    postPerfilEmplado();
                                    setOpenModal(false);
                                    resp && toast.success('Datos actualizados correctamente.', {
                                        id: 'success'
                                    });
                                }}
                                isDisabled={
                                    (tratamientoDatos.aceptarTratamiento == "0" || tratamientoDatos.aceptarTratamiento == "") ||
                                    (tratamientoDatos.confirmarVericidad == "0" || tratamientoDatos.confirmarVericidad == "")
                                }>Aceptar</Button>
                            <Button className="bg-off-white font-semibold" onClick={() => setOpenModal(false)}>Cancelar</Button>
                        </div>
                    </Modal>
                )
            }

            {/* Guardar cambios TEMPORAL */}
            <Modal isOpen={modalGuardarTemporal} setIsOpen={setModalGuardarTemporal} classContainer="max-w-[95%] md:max-w-[50%] mt-14" closeDisabled>
                <div>
                    <h5 className="text-3xl font-semibold my-2">Guardar datos</h5>
                    <div className="my-5">
                        <div className="my-2 flex flex-col md:flex-row md:items-center gap-2">
                            <p>- Confirmo que la información por mi consignada en este documento, es verídica y corresponde a la realidad: </p>
                            <div>
                                <Select
                                    classNames={{
                                        trigger: "bg-gray-box",

                                    }}
                                    variant="faded"
                                    placeholder="Seleccione"
                                    className="w-44"
                                    onChange={(value) => setTratamientoDatos({
                                        ...tratamientoDatos,
                                        confirmarVericidad: String(value.target.value)
                                    })}
                                >
                                    <SelectItem key={"1"} className="text-sm" classNames={{ title: "text-md" }}>SÍ</SelectItem>
                                    <SelectItem key={"0"}>NO</SelectItem>
                                </Select>
                            </div>
                            <i className="bi bi-asterisk text-primary text-xs mt-[-25px]"></i>
                        </div>
                        <div className="my-3 flex flex-col md:flex-row md:items-center gap-2">
                            <p>- Acepto el tratamiento de mis datos personales por parte de la Escuela Colombiana de Ingeniería Julio Garavito: </p>
                            <div>
                                <Select
                                    classNames={{ trigger: "bg-gray-box" }}
                                    variant="faded"
                                    placeholder="Seleccione"
                                    className="w-44"
                                    onChange={(value) => setTratamientoDatos({
                                        ...tratamientoDatos,
                                        aceptarTratamiento: String(value.target.value)
                                    })}>
                                    <SelectItem key={"1"}>SÍ</SelectItem>
                                    <SelectItem key={"0"}>NO</SelectItem>
                                </Select>
                            </div>
                            <i className="bi bi-asterisk text-primary text-xs mt-[-25px]"></i>
                        </div>
                        <div className="my-2 flex flex-col md:flex-row md:items-center gap-2">
                            <p>- Adicionó usted estudios diferentes a los que fueron consultados desde Gestión Humana: </p>
                            <Select
                                classNames={{ trigger: "bg-gray-box" }}
                                variant="faded" placeholder="Seleccione"
                                className="w-44 mr-4"
                                onChange={(value) => setTratamientoDatos({
                                    ...tratamientoDatos,
                                    adicionoEstudios: String(value.target.value)
                                })}
                                defaultSelectedKeys={["0"]}
                            >
                                <SelectItem key={"1"}>SÍ</SelectItem>
                                <SelectItem key={"0"}>NO</SelectItem>
                            </Select>
                        </div>
                    </div>

                    <Button
                        color="primary"
                        onClick={async () => {
                            setVerifyChangeValue(false);
                            const resp = await postInfoEmpleado();
                            postPerfilEmplado();
                            postAreasInteres();
                            setModalGuardarTemporal(false);
                            resp && toast.success('Datos actualizados correctamente.', {
                                id: 'success'
                            });
                        }}
                        isDisabled={(tratamientoDatos.aceptarTratamiento == "0" || tratamientoDatos.aceptarTratamiento == "") || (tratamientoDatos.confirmarVericidad == "0" || tratamientoDatos.confirmarVericidad == "")}
                    >Aceptar</Button>
                </div>
            </Modal>
        </div>
    )
}