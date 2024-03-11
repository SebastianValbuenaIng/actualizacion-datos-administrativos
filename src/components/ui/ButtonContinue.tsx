"use client";

import { useRouter } from "next/navigation";

interface Props {
    text: string;
    onClick?: any;
    route?: string;
    disabled?: boolean;
    type?: "button" | "submit";
    icon?: string;
}

const Button = ({
    route,
    text,
    onClick,
    type,
    icon,
    disabled = false,
}: Props) => {
    const router = useRouter();

    const classbtn =
        "w-full h-10 border-2 select-none justify-center items-center rounded-xl text-base font-medium items-center normal-shadow hover:font-semibold border-borders-light hover:border-primary bg-default-white hover:text-primary transition-all flex gap-1";

    return (
        <button
            disabled={disabled}
            className={
                disabled
                    ? "w-full h-10 border-2 select-none rounded-xl text-base normal-shadow text-borders opacity-50 hover:none transition-all"
                    : classbtn
            }
            onClick={() => {
                if (onClick) return onClick();
                if (route) return router.push(route);
            }}
            type={type ?? "button"}
        >
            {text}
            <i className={`bi bi-${icon ? `${icon} mr-2` : ""} text-xl`}></i>
        </button>
    );
};

export default Button;