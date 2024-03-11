"use client";

const Icon = ({
    icon,
    className = "",
}: {
    icon: string;
    className?: string;
}) => {
    return (
        <i className={`bi bi-${icon} text-default-white` + className}></i>
    );
};

export default Icon;