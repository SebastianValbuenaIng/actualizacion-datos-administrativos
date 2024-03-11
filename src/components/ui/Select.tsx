import React from "react";
import { Select as SelectNextUi } from "@nextui-org/react";

interface Props {
    name?: string;
    icon?: string;
    placeholder: string;
    disallowEmptySelection?: boolean;
    value?: string;
    defaultValue?: string;
    defaultValues?: string[];
    selectedKeys?: string[];
    selectionMode?: "multiple" | "single";
    className?: string;
    isDisabled?: boolean;
    disabledKeys?: string[];
    error?: string;
    onChange?: ({ name, value }: { name: string; value: string | null }) => any;
    children?: any;
    isRequired?: boolean;
    label?: string | boolean;
    classNames?: any;
    scrollRef?: any;
}

const Select = ({
    name,
    icon,
    placeholder,
    disallowEmptySelection,
    className,
    isDisabled = false,
    disabledKeys,
    error,
    value,
    defaultValue,
    defaultValues,
    selectionMode,
    onChange,
    children,
    isRequired = false,
    label,
    classNames,
    scrollRef
}: Props) => {
    return (
        <SelectNextUi
            aria-label={name}
            size="md"
            startContent={
                icon && <i className={`bi bi-${icon ? `${icon} mr-2` : ""} text-md`
                }
                ></i>
            }
            placeholder={placeholder}
            errorMessage={error ?? null}
            isInvalid={error ? true : false}
            classNames={classNames}
            isDisabled={isDisabled}
            value={value}
            disabledKeys={disabledKeys}
            className={className}
            variant="faded"
            selectionMode={selectionMode}
            disallowEmptySelection={disallowEmptySelection}
            onChange={(e) => {
                if (onChange) {
                    const value = String(e.target.value).trim();
                    onChange({
                        name: String(e.target.name).trim(),
                        value: value !== "" ? value : null,
                    });
                }
            }}
            name={name}
            defaultSelectedKeys={
                defaultValues
                    ? defaultValues
                    : defaultValue
                        ? [defaultValue]
                        : undefined
            }
            isRequired={isRequired}
            label={label}
            scrollRef={scrollRef}
        >
            {children}
        </SelectNextUi>
    );
};

export default Select;