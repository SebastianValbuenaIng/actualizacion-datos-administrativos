import { HomeRedirect } from "@/components/HomeRedirect";
import { PersonaActiva } from "@/types";
import fetchFn from "@/utils/fetchFn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
    const session = await getServerSession();

    let infoPersona: PersonaActiva = {
        id: 0,
        nombre: "",
        nroDocumento: "",
        emplId: "",
        email: "",
        tipoDocumento: ""
    };

    if (session) {
        const email = session.user?.email || "";
        const domain = email.split("@")[1];
        if (domain === "escuelaing.edu.co") {
            const response = await fetchFn(`/personas?email=${email}`);
            if (response.code === 400) return redirect("/logout?error=auth");

            infoPersona = response.data;
        } else {
            return redirect("/logout?error=rol");
        }
    }

    return (
        <>
            <HomeRedirect infoPersona={infoPersona} />
        </>
    );
}
