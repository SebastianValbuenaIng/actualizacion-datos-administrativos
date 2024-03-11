'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { emptyValue } from "@/libs/functionsStrings"
import { useInfoPersonaStore } from "@/store";
import fetchFn from "@/utils/fetchFn";

interface Props {
    email?: string;
}

export const HomeRedirect = ({ email }: Props) => {
    const setInfoPersona = useInfoPersonaStore(state => state.setInfoPersona);
    const router = useRouter();

    const getPersona = async (emailParam: string) => {
        const response = await fetchFn(`/personas?email=${emailParam!!.concat("@escuelaing.edu.co")}`);

        if (response.code !== 200) {
            router.push("/eror");
        }

        setInfoPersona(response.data);
    }

    useEffect(() => {
        const emailStorage = sessionStorage.getItem('email');

        if (emptyValue(email) && !emailStorage) {
            router.push('/error');
        }

        if (emailStorage) {
            getPersona(emailStorage);
            router.push('/actualizacion-datos');
        }

        if (!emptyValue(email) && !emailStorage) {
            sessionStorage.setItem('email', email ?? '');
            getPersona(email!);
            router.push('/actualizacion-datos');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    return (
        <>

        </>
    )
}
