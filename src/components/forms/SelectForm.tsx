"use client";

import { useState } from "react";
import Select from "../ui/Select";
import { emptyValue } from "@/libs/functionsStrings";
import { Validations, validateValue } from "@/app/hooks/useValidateForm";

const SelectForm = ({
    name,
    placeholder,
    icon,
    label,
    onChange,
    required,
    isRequired,
    children,
    defaultValue,
    className,
    classNames,
    isDisabled = false,
    defaultValues,
    scrollRef,
    validations: getValidators,
    selectionMode = 'single'
}: {
    type?: string;
    name: string;
    placeholder?: string;
    icon?: string;
    required?: boolean;
    onChange: ({ name, value }: { name: string; value: string | number | null }) => any;
    children?: any;
    defaultValue?: string;
    isRequired?: boolean;
    className?: string;
    classNames?: any;
    label: string | boolean;
    isDisabled?: boolean;
    defaultValues?: string[];
    scrollRef?: any;
    validations?: (nameField: string) => Validations | undefined;
    selectionMode?: "multiple" | "single";
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
        <div>
            <Select
                name={name}
                placeholder={placeholder ?? ''}
                icon={icon}
                error={error}
                onChange={handleChange}
                defaultValue={defaultValue}
                className={className}
                isRequired={isRequired}
                label={label}
                classNames={classNames}
                isDisabled={isDisabled}
                defaultValues={defaultValues}
                scrollRef={scrollRef}
                selectionMode={selectionMode}
            >
                {children}
            </Select>
        </div>
    );
};

export default SelectForm;