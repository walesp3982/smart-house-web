// BasicTextField.tsx
import { FieldValues, FieldPath, Controller } from "react-hook-form"
import { Control } from "react-hook-form"
import { FieldTextTemplate } from "./builder"

interface BasicTextFieldProps
    <TFieldValues extends FieldValues,
        TName extends FieldPath<TFieldValues>
    > {
    control: Control<TFieldValues>
    name: TName
    label: string
    id?: string
}

export default function BasicTextField
    <TFieldValues extends FieldValues,
        TName extends FieldPath<TFieldValues>
    >({ control, name, label, id }: BasicTextFieldProps<TFieldValues, TName>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldTextTemplate
                    label={label}
                    type="text"
                    id={id}
                    field={field}
                    fieldState={fieldState}
                />
            )}
        />
    )
}