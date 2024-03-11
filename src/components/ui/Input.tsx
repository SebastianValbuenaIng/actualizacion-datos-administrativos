import { Input as InputNextUi } from "@nextui-org/react";
import Icon from "../Icon";

const Input: React.FC<{
    type?: string;
    name?: string;
    clearable?: boolean;
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    error?: string;
    onChange?: ({ name, value }: { name: string; value: string | null }) => any;
    disabled?: boolean;
    description?: string;
    label?: string | boolean;
    isRequired: boolean;
    classNames?: any;
    icon?: string;
}> = ({
    className,
    type = "text",
    name,
    clearable = false,
    defaultValue,
    error,
    onChange,
    disabled,
    description,
    label,
    isRequired,
    classNames,
    placeholder,
    icon
}) => {
        return (
            <InputNextUi
                startContent={
                    icon && <Icon icon={icon} className={error ? "text-red" : "text-dark-green"} />
                }
                isClearable={clearable}
                variant="faded"
                classNames={({ ...classNames, errorMessage: 'text-xs' })}
                className={className}
                isDisabled={disabled}
                isInvalid={error ? true : false}
                errorMessage={error ?? null}
                description={description}
                type={type}
                defaultValue={defaultValue}
                name={name}
                onChange={(e) => {
                    if (onChange) {
                        const value = String(e.target.value).trim();
                        onChange({
                            name: String(e.target.name).trim(),
                            value: value !== "" ? value : null,
                        });
                    }
                }}
                autoComplete={
                    name === "password"
                        ? "current-password"
                        : name === "email"
                            ? name
                            : undefined
                }
                label={label}
                isRequired={isRequired}
                size="md"
                placeholder={placeholder}
            />
        );
    };

export default Input;