'use client';

import { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { validateValue } from "@/app/hooks/useValidateForm";
import Textarea from "../ui/Textarea";

interface Validations {
    required?: string;
    minLength?: {
        value: number;
        message: string;
    };
    maxLength?: {
        value: number;
        message: string;
    };
}

interface Props {
    name: string;
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    onChange: ({
        name,
        value,
    }: {
        name: string;
        value: string | number | null;
    }) => any;
    validations?: (nameField: string) => Validations | undefined;
    disabled?: boolean;
    description?: string;
    isRequired?: boolean;
    classNames: any;
    label: string;
    endContent?: React.ReactNode
    minRows?: number;
    maxRows?: number;
    readonly?: boolean;
}

const TextAreaForm = ({
    name,
    placeholder,
    className,
    defaultValue,
    onChange,
    validations: getValidators,
    disabled,
    description,
    isRequired = false,
    classNames,
    label,
    endContent,
    minRows,
    maxRows,
    readonly = false
}: Props) => {
    const [error, setError] = useState<string | undefined>(undefined);

    const validationsType =
        typeof getValidators === "function" ? getValidators(name) : undefined;

    const handleChange = ({
        name,
        value,
    }: {
        name: string;
        value: any;
    }) => {
        const result = validateValue(value, validationsType);

        if (result.error) {
            setError(result.error);
        } else {
            setError(undefined);
        }

        onChange({
            name,
            value: result.value,
        });
        return { name, value: result.value };
    };

    return (
        <Textarea
            error={error}
            label={label}
            classNames={classNames}
            className={twMerge(clsx(className))}
            isDisabled={disabled}
            isInvalid={error ? true : false}
            isRequired={isRequired}
            description={description}
            placeholder={placeholder}
            defaultValue={defaultValue}
            name={name}
            onChange={handleChange}
            endContent={endContent}
            minRows={minRows}
            maxRows={maxRows}
            readOnly={readonly}
        />
    );
};

export default TextAreaForm;