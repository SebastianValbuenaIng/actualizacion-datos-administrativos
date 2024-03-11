"use client";

import { Image } from "@nextui-org/react";

const Footer = () => {
	return (
		<footer className="bg-gray-box mt-auto z-40">
			<section className="container pt-8 pb-4">
				<div className="flex gap-3 select-none">
					<Image
						src={"/images/ecijg60.png"}
						alt="Logo header"
						className="cursor-pointer"
						onClick={() => window.location.reload()}
					/>
					<Image
						src={"/images/acreditacion60.png"}
						alt="Acreditación Institucional De Alta Calidad"
						className="cursor-pointer"
						onClick={() => window.location.reload()}
					/>
				</div>
				<p className="mt-4 text-sm text-gray font-semibold">
					Todos los derechos reservados ©2024 - Escuela Colombiana de Ingeniería
					Julio Garavito. Personería Jurídica 086 de enero 19 de 1973.
					Renovación de Acreditación Institucional de Alta Calidad. Resolución
					002710 del 18 de marzo de 2019 (vigencia de 6 años). Vigilada por
					Mineducación.
				</p>
			</section>
		</footer>
	);
};

export default Footer;