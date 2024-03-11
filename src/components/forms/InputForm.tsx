"use client";

import { useState } from "react";
import Input from "../ui/Input";
import { validateValue } from "@/app/hooks/useValidateForm";

interface Validations {
    required?: string;
    validateEmail?: boolean;
    onlyNumbers?: boolean;
    onlyLetters?: boolean;
    minLength?: {
        value: number;
        message: string;
    };
    maxLength?: {
        value: number;
        message: string;
    };
}

const InputForm = ({
    type = "text",
    name,
    defaultValue,
    className,
	validations: getValidators,
    onChange,
    label,
    isRequired = false,
    classNames,
    placeholder,
    disabled = false,
    icon
}: {
    type?: string;
    name: string;
    icon?: string;
    className?: string;
    defaultValue?: string;
    validations?: (nameField: string) => Validations | undefined;
    onChange: ({ name, value }: { name: string; value: string | number | null }) => any;
    label: string | boolean;
    isRequired?: boolean;
    classNames: any;
    placeholder?: string;
    disabled?: boolean;
}) => {
    const [error, setError] = useState<string | undefined>(undefined);

    const validations =
        typeof getValidators === "function" ? getValidators(name) : undefined;

    const handleChange = ({
        name,
        value,
    }: {
        name: string;
        value: string | null;
    }) => {
        const result = validateValue(value, validations);

        if (result.error) {
            setError(result.error);
        } else {
            setError(undefined);
        }

        if (onChange)
            onChange({
                name,
                value: result.value,
            });
        return { name, value: result.value };
    };

    return (
        <Input
            type={validations?.onlyNumbers ? "number" : validations?.validateEmail ? "email" : type}
            name={name}
            className={className}
            defaultValue={defaultValue}
            error={error}
            onChange={handleChange}
            label={label}
            isRequired={isRequired}
            classNames={classNames}
            placeholder={placeholder}
            disabled={disabled}
            icon={icon}
        />
    );
};

export default InputForm;