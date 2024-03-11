"use client";

// import { signOut } from "next-auth/react";

export default function Home() {
	return (
		<button
			className="bg-primary w-[120px] h-10 items-center p-1 my-3 hidden lg:block hover:bg-dark-primary text-off-white justify-center rounded-xl"
			onClick={() => {
				// signOut({ callbackUrl: "/" });
			}}
		>
			Cerrar Sesión
		</button>
	);
}