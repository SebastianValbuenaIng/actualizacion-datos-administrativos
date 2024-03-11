export interface InformacionBasicaEmpleado {
    ciudades: Ciudades[];
    departamentos: Departamentos[];
    paises: Paises[];
    generos: Generos[];
    estadoCivil: EstadoCivil[];
    tipoEmpleado: TipoEmpleado[];
}

interface Paises {
    cod_pai: string;
    nom_pai: string;
}

interface Ciudades {
    cod_pai: string;
    cod_dep: string;
    cod_ciu: string;
    nom_dep: string;
}

interface Departamentos {
    cod_pai: string;
    cod_dep: string;
    nom_dep: string;
}

interface Generos {
    cod_gen: number;
    des_gen: string;
}

interface EstadoCivil {
    cod_est: number;
    des_est: string;
}

interface TipoEmpleado {
    estado: string;
    nombre: string;
    codigo: number;
}
