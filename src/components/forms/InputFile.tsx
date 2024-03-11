"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
    name: string;
    getFiles: (files: FileList | null) => void;
    minFiles?: number;
    maxFiles?: number;
    multiple?: boolean;
    extensions: {
        pdf?: boolean;
        docx?: boolean;
        pptx?: boolean;
        txt?: boolean;
        xslx?: boolean;
        png?: boolean;
        jpg?: boolean;
        jpeg?: boolean;
    };
}

const InputFile = ({
    name,
    getFiles,
    minFiles = 0,
    maxFiles,
    multiple = false,
    extensions,
}: Props) => {
    const selectedExtensions: string[] = Object.keys(extensions);

    // CREATE TITLE
    let formatsText = "";
    for (let i = 0; i < selectedExtensions.length; i++) {
        formatsText += `${String(selectedExtensions[i]).toUpperCase()}${i === selectedExtensions.length - 1 ? "." : ","
            } `;
    }

    const [filesSelected, setFilesSelected] = useState<{
        filesNames: string[];
        valid: boolean | null;
        files: FileList | null;
    }>({
        filesNames: ["camosda.pdf", "mi test.png", "documento.docx"],
        valid: null,
        files: null,
    });

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filesInput = e.target.files;

        // VALIDATE EMPTY FILES
        if (!filesInput || (filesInput && filesInput.length === 0)) {
            if (minFiles > 0) {
                toast.error(
                    `Debe seleccionar al menos ${minFiles} ${minFiles > 1 ? "archivos" : "archivo"
                    }`
                );
            }
            setFilesSelected({
                filesNames: [],
                valid: minFiles > 0 ? false : null,
                files: null,
            });
            return;
        }

        //VALIDATE AMOUNT FILES
        if (filesInput.length < minFiles) {
            toast.error(
                `Debe seleccionar al menos ${minFiles} ${minFiles > 1 ? "archivos" : "archivo"
                }`
            );
            setFilesSelected({
                filesNames: [],
                valid: false,
                files: null,
            });
            return;
        }
        if (filesInput.length >= minFiles) {
            if (maxFiles) {
                if (filesInput.length > maxFiles) {
                    toast.error(
                        `Debe seleccionar máximo ${maxFiles} ${maxFiles > 1 ? "archivos" : "archivo"
                        }`
                    );
                    setFilesSelected({
                        filesNames: [],
                        valid: false,
                        files: null,
                    });
                    return;
                }
            }
        }

        // VALIDATE EXTENSIONS
        const extensionRegExp = new RegExp(
            `(${selectedExtensions.map((extension) => `.${extension}`).join("|")})$`,
            "i"
        );
        const filesNames: string[] = [];
        const invalidFiles: number[] = [];
        for (let i = 0; i < filesInput.length; i++) {
            const allowedExtensions = extensionRegExp.exec(filesInput[i].name);
            if (!allowedExtensions) {
                toast.error(`${filesInput[i].name} no válido`);
                invalidFiles.push(i);
            } else {
                filesNames.push(filesInput[i].name);
            }
        }

        if (invalidFiles.length > 0) {
            setFilesSelected({
                filesNames: [],
                valid: minFiles > 0 ? false : null,
                files: null,
            });
            return;
        }

        setFilesSelected({
            filesNames,
            valid: true,
            files: filesInput,
        });
    };

    useEffect(() => {
        if (filesSelected.files && filesSelected.valid) {
            return getFiles(filesSelected.files);
        }
        getFiles(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filesSelected]);

    return (
        <div className="text-start w-full">
            <input
                type="file"
                name={name}
                id={name}
                className="w-0 h-0 opacity-0 overflow-hidden absolute z-0"
                onChange={handleChangeFile}
                multiple={multiple}
            />
            <label title={formatsText} htmlFor={name}>
                <div
                    className={`w-full h-[48px] bg-[#ffff] transition-all select-none outline-none rounded-full border-2 ${filesSelected.valid
                            ? "border-primary hover:border-primary"
                            : filesSelected.valid === false
                                ? "border-soft-red hover:border-red"
                                : "border-borders-light hover:border-borders"
                        } cursor-pointer flex-center`}
                >
                    <p className="text-base font-bold text-borders">
                        <i className="bi bi-hand-index-thumb-fill"></i>{" "}
                        {multiple ? "Seleccionar archivos" : "Seleccionar archivo"}
                    </p>
                </div>
            </label>
            <p
                className={`font-semibold select-none ${filesSelected.valid ? "text-dark-gray" : "text-primary"
                    } mt-1 mb-[10px]`}
            >
                {filesSelected.valid &&
                    filesSelected.filesNames.map(
                        (name, i) =>
                            `${name}${i === filesSelected.filesNames.length - 1 ? "." : ","} `
                    )}
                {!filesSelected.valid && `Formato: ${formatsText}`}
            </p>
        </div>
    );
};

export default InputFile;
