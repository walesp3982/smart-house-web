import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { FieldTextTemplate } from "./builder"
import PasswordIcon from "@/component/Form/Icons/PasswordIcon"
import { useState } from "react"

interface PasswordFieldTextProps
    <TFieldValues extends FieldValues,
        TName extends FieldPath<TFieldValues>
    > {
    control: Control<TFieldValues>
    name: TName
    label: string
    id?: string
}

export default function PasswordFieldText
    <TFieldValues extends FieldValues,
        TName extends FieldPath<TFieldValues>
    >({ control, name, label, id }: PasswordFieldTextProps<TFieldValues, TName>) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((state) => !state)
    }
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldTextTemplate
                    label={label}
                    type={showPassword ? "text" : "password"}
                    id={id}
                    field={field}
                    fieldState={fieldState}
                    icon={<PasswordIcon showPassword={!showPassword} handleClickShowPassword={handleClickShowPassword} />}
                />
            )}
        />
    )
}