import { TypeUseValidateForm } from "@/app/hooks/useValidateForm";
import InputForm from "@/components/forms/InputForm"

interface Props {
    changeBasicDataUser: TypeUseValidateForm;
    setVerifyChangeValue: (changeValue: boolean) => void;
}

export const FormRedesSociales = ({ changeBasicDataUser, setVerifyChangeValue }: Props) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-center my-2">Redes Sociales</h2>

            <div className="flex flex-col md:flex-row gap-6 my-5">
                <InputForm
                    isRequired={false}
                    name="cvlac"
                    onChange={
                        ({ name, value }) => {
                            changeBasicDataUser.setField({ name, value });
                            setVerifyChangeValue(true);
                        }
                    }
                    type="text"
                    label="Link del CVLAC"
                    classNames={{
                        inputWrapper: "pb-1",
                        errorMessage: "text-sm font-medium",
                        input: "bg-off-white w-72 text-sm",
                        label: "text-sm"
                    }}
                    className="max-w-xs"
                    defaultValue={changeBasicDataUser.data.cvlac}
                    validations={changeBasicDataUser.validators}
                />

                <InputForm
                    isRequired={false}
                    name="linkedin"
                    onChange={
                        ({ name, value }) => {
                            changeBasicDataUser.setField({ name, value });
                            setVerifyChangeValue(true);
                        }
                    }
                    type="text"
                    label="LinkedIn"
                    classNames={{
                        inputWrapper: "pb-1",
                        errorMessage: "text-sm font-medium",
                        input: "bg-off-white w-72 text-sm",
                        label: "text-sm"
                    }}
                    className="max-w-xs"
                    defaultValue={changeBasicDataUser.data.linkedin}
                    validations={changeBasicDataUser.validators}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <InputForm
                    isRequired={false}
                    name="youtube"
                    onChange={
                        ({ name, value }) => {
                            changeBasicDataUser.setField({ name, value });
                            setVerifyChangeValue(true);
                        }
                    }
                    type="text"
                    label="Youtube"
                    classNames={{
                        inputWrapper: "pb-1",
                        errorMessage: "text-sm font-medium",
                        input: "bg-off-white w-72 text-sm",
                        label: "text-sm"
                    }}
                    className="max-w-xs"
                    defaultValue={changeBasicDataUser.data.youtube}
                    validations={changeBasicDataUser.validators}
                />

                <InputForm
                    isRequired={false}
                    name="researchGate"
                    onChange={
                        ({ name, value }) => {
                            changeBasicDataUser.setField({ name, value });
                            setVerifyChangeValue(true);
                        }
                    }
                    type="text"
                    label="researchGate"
                    classNames={{
                        inputWrapper: "pb-1",
                        errorMessage: "text-sm font-medium",
                        input: "bg-off-white w-72 text-sm",
                        label: "text-sm"
                    }}
                    className="max-w-xs"
                    defaultValue={changeBasicDataUser.data.researchGate}
                    validations={changeBasicDataUser.validators}
                />
            </div>
        </div>
    )
}