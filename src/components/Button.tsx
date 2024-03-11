"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface Props {
	route?: string;
	onClick?: any;
	text: string;
	disabled?: boolean;
}

const Button = ({ route, text, onClick, disabled = false }: Props) => {
	const router = useRouter();
	const classbtn =
		"w-full h-11 border-2 slect-none justify-center items-center rounded-xl text-base font-medium items-center normal-shadow hover:font-semibold border-borders-light hover:border-primary bg-default-white hover:text-primary transition-all";
	return (
		<button
			disabled={disabled}
			className={
				disabled
					? "w-full h-11 border-2 select-none rounded-xl text-base normal-shadow text-borders opacity-50 hover:none transition-all"
					: classbtn
			}
			onClick={() => {
				if (onClick) return onClick();
				if (route) return router.push(route);
			}}
		>
			{text}
		</button>
	);
};

export default Button;