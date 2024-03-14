'use client';

import { useEffect, useState } from "react";
import { SelectItem } from "@nextui-org/react"
import { NomenclaturaUrbana, NomenclaturaUrbana2, NomenclaturaUrbana3, NomenclaturaUrbanaCorta, abecedarioCalles } from "@/data/Direccion"
import InputForm from "@/components/forms/InputForm"
import SelectForm from "@/components/forms/SelectForm"
import { useDireccionFinalPersona, useDireccionPersona } from "@/store";
import { emptyValue } from "@/libs/functionsStrings";

interface Props {
    direccionActual: string;
    setVerifyChangeValue: (changeValue: boolean) => void;
}

export const FormDireccionCompleta = ({ direccionActual, setVerifyChangeValue }: Props) => {
    const setDireccionPersona = useDireccionPersona(state => state.setDireccionPersona);
    const getDireccionPersona = useDireccionPersona(state => state.getDireccionPersona());
    const getDireccionFinalPersona = useDireccionFinalPersona(state => state.getDireccionFinalPersona());
    const setDireccionFinalPersona = useDireccionFinalPersona(state => state.setDireccionFinalPersona);

    const [result, setResult] = useState('')

    const handleChange: any = ({ name, value }: { name: string, value: string | null }) => {
        setDireccionPersona({ name, value });

        if (result.length > 0) setVerifyChangeValue(true);
    };

    useEffect(() => {
        let result = '';
        const entries = Object.entries(getDireccionPersona);

        for (const entry of entries) {
            if (!emptyValue(entry[1])) result += ' ' + entry[1];
        }

        setDireccionFinalPersona(result.trim());
        setResult(result.trim())
    }, [getDireccionFinalPersona.length, getDireccionPersona, setDireccionFinalPersona, setVerifyChangeValue]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <p>Dirección: </p>
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex gap-4 md:gap-2">
                        <SelectForm
                            name="primerCampoCalle"
                            onChange={handleChange}
                            label="Vía Principal"
                            className="w-48 text-sm"
                            classNames={{
                                label: "text-sm",
                                value: "text-xs"
                            }}
                            isRequired
                            required
                            validations={function campo(nameField: string) {
                                return {
                                    required: 'Campo requerido'
                                }
                            }}
                            defaultValue={getDireccionPersona.primerCampoCalle ?? ''}
                        >
                            {
                                NomenclaturaUrbana.map(nom => (
                                    <SelectItem value={nom.descr} key={nom.descr} className="text-sm">
                                        {nom.descr}
                                    </SelectItem>
                                ))
                            }
                        </SelectForm>

                        <div>
                            <InputForm
                                name="primerNumeroCalle"
                                onChange={handleChange}
                                isRequired
                                type="text"
                                label="Número"
                                classNames={{
                                    inputWrapper: "py-0 pb-1",
                                    errorMessage: "text-sm font-medium",
                                    input: "bg-off-white w-16 text-sm",
                                    label: "text-sm"
                                }}
                                className="max-w-xs"
                                validations={function campo(nameField: string) {
                                    return {
                                        required: 'Campo requerido'
                                    }
                                }}
                                defaultValue={getDireccionPersona.primerNumeroCalle ?? ''}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 md:gap-2">
                        <SelectForm
                            name="primeraLetraCalle"
                            onChange={handleChange}
                            label="Letra"
                            className="w-20"
                            classNames={{
                                label: "text-sm",
                                value: "text-xs"
                            }}
                            defaultValue={getDireccionPersona.primeraLetraCalle ?? ''}
                        >
                            {
                                abecedarioCalles.map(nom => (
                                    <SelectItem value={nom} key={nom} className="text-sm">
                                        {nom}
                                    </SelectItem>
                                ))
                            }
                        </SelectForm>

                        <SelectForm
                            name="segundoCampoCalle"
                            onChange={handleChange}
                            label="Bis"
                            className="w-48 text-sm"
                            classNames={{
                                label: "text-sm",
                                value: "text-xs"
                            }}
                            defaultValue={getDireccionPersona.segundoCampoCalle ?? ''}
                        >
                            {
                                NomenclaturaUrbana2.map(nom => (
                                    <SelectItem value={nom.descr} key={nom.descr} className="text-sm">
                                        {nom.descr}
                                    </SelectItem>
                                ))
                            }
                        </SelectForm>
                    </div>

                    <div>
                        <InputForm
                            name="segundoNumeroCalle"
                            onChange={handleChange}
                            isRequired
                            type="text"
                            label="Número"
                            classNames={{
                                inputWrapper: "py-0 pb-1",
                                errorMessage: "text-sm font-medium",
                                input: "bg-off-white w-20 text-sm",
                                label: "text-sm"
                            }}
                            className="max-w-xs"
                            validations={function campo(nameField: string) {
                                return {
                                    required: 'Campo requerido'
                                }
                            }}
                            defaultValue={getDireccionPersona.segundoNumeroCalle ?? ''}
                        />
                    </div>

                    <div className="flex gap-4 md:gap-2">
                        <SelectForm
                            name="segundaLetraCalle"
                            onChange={handleChange}
                            label="Letra"
                            className="w-20"
                            classNames={{
                                label: "text-sm",
                                value: "text-xs"
                            }}
                            defaultValue={getDireccionPersona.segundaLetraCalle ?? ''}
                        >
                            {
                                abecedarioCalles.map(nom => (
                                    <SelectItem value={nom} key={nom} className="text-sm">
                                        {nom}
                                    </SelectItem>
                                ))
                            }
                        </SelectForm>

                        <div>
                            <InputForm
                                isRequired={false}
                                name="tercerNumeroCalle"
                                onChange={handleChange}
                                type="text"
                                label="Número"
                                classNames={{
                                    inputWrapper: "py-0 pb-1",
                                    errorMessage: "text-sm font-medium",
                                    input: "bg-off-white w-20 text-sm",
                                    label: "text-sm"
                                }}
                                className="max-w-xs"
                                defaultValue={getDireccionPersona.tercerNumeroCalle ?? ''}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex gap-4 md:gap-2">
                        <SelectForm
                            name="terceraLetraCalle"
                            onChange={handleChange}
                            label="Letra"
                            className="w-20"
                            classNames={{
                                label: "text-sm",
                                value: "text-xs"
                            }}
                            defaultValue={getDireccionPersona.terceraLetraCalle ?? ''}
                        >
                            {
                                abecedarioCalles.map(nom => (
                                    <SelectItem value={nom} key={nom} className="text-sm">
                                        {nom}
                                    </SelectItem>
                                ))
                            }
                        </SelectForm>

                        <SelectForm
                            name="tercerCampoCalle"
                            onChange={handleChange}
                            label="Bis"
                            className="w-40"
                            classNames={{
                                label: "text-sm",
                                value: "text-xs"
                            }}
                            defaultValue={getDireccionPersona.tercerCampoCalle ?? ''}
                        >
                            {
                                NomenclaturaUrbana3.map(nom => (
                                    <SelectItem value={nom.value} key={nom.value} className="text-sm">
                                        {nom.descr}
                                    </SelectItem>
                                ))
                            }
                        </SelectForm>
                    </div>

                    <div className="flex gap-4 md:gap-2">
                        <div>
                            <InputForm
                                name="cuartoNumeroCalle"
                                onChange={handleChange}
                                type="text"
                                label="Número"
                                classNames={{
                                    inputWrapper: "py-0 pb-1",
                                    errorMessage: "text-sm font-medium",
                                    input: "bg-off-white w-14 text-sm",
                                    label: "text-sm"
                                }}
                                className="max-w-xs"
                                defaultValue={getDireccionPersona.cuartoNumeroCalle ?? ''}
                            />
                        </div>

                        <SelectForm
                            name="cuartoCampoCalle"
                            onChange={handleChange}
                            label="Bis"
                            className="w-36"
                            classNames={{
                                label: "text-sm",
                                value: "text-xs"
                            }}
                            defaultValue={getDireccionPersona.cuartoCampoCalle ?? ''}
                        >
                            {
                                NomenclaturaUrbanaCorta.map(nom => (
                                    <SelectItem value={nom.descr} key={nom.descr} className="text-sm">
                                        {nom.descr}
                                    </SelectItem>
                                ))
                            }
                        </SelectForm>
                    </div>

                    <div>
                        <InputForm
                            isRequired={false}
                            name="quintoNumeroCalle"
                            onChange={handleChange}
                            type="text"
                            label="Número"
                            classNames={{
                                inputWrapper: "py-0 pb-1",
                                errorMessage: "text-sm font-medium",
                                input: "bg-off-white w-20 text-sm",
                                label: "text-sm"
                            }}
                            className="max-w-xs"
                            defaultValue={getDireccionPersona.quintoNumeroCalle ?? ''}
                        />
                    </div>

                    <div className="flex gap-4 md:gap-2">
                        <SelectForm
                            name="quintoCampoCalle"
                            onChange={handleChange}
                            label="Complemento"
                            className="w-36"
                            classNames={{
                                label: "text-sm",
                                value: "text-xs"
                            }}
                            defaultValue={getDireccionPersona.quintoCampoCalle ?? ''}
                        >
                            {
                                NomenclaturaUrbanaCorta.map(nom => (
                                    <SelectItem value={nom.descr} key={nom.descr} className="text-sm">
                                        {nom.descr}
                                    </SelectItem>
                                ))
                            }
                        </SelectForm>

                        <div>
                            <InputForm
                                name="primeraReferencia"
                                onChange={handleChange}
                                label="Complemento adicional"
                                type="text"
                                classNames={{
                                    inputWrapper: "py-0 pb-1",
                                    errorMessage: "text-sm font-medium",
                                    input: "bg-off-white w-36 text-sm",
                                    label: "text-xs"
                                }}
                                className="max-w-xs"
                                defaultValue={getDireccionPersona.primeraReferencia ?? ''}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 justify-center items-center">
                <span className="text-sm">Su dirección actual es: {direccionActual}</span>
                {
                    getDireccionFinalPersona.length > 0 && (
                        <>
                            <span className="text-sm text-dark-green">Su nueva dirección es: {getDireccionFinalPersona}</span>
                            {
                                getDireccionFinalPersona.length > 40 && (
                                    <p className="text-danger font-medium">La dirección no puede tener más de 40 caracteres.</p>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}