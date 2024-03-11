interface EstadoCivil {
    descripcion: string;
    valor: string;
    key: string
}

export const estadoCivil: EstadoCivil[] = [
    {
        descripcion: "Casado(a)",
        valor: "casado",
        key: "1"
    },
    {
        descripcion: "Soltero(a)",
        valor: "soltero",
        key: "2"
    },
    {
        descripcion: "Separado(a)",
        valor: "separado",
        key: "3"
    },
    {
        descripcion: "Viudo(a)",
        valor: "viudo",
        key: "4"
    },
    {
        descripcion: "Unión Libre",
        valor: "union-libre",
        key: "5"
    },
    {
        descripcion: "Religioso(a)",
        valor: "religioso",
        key: "6"
    },
    {
        descripcion: "Otro",
        valor: "otro",
        key: "7"
    }
];