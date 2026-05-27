import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { FieldTextTemplate } from "./builder"
import EmailIcon from '@mui/icons-material/Email'

interface EmailTextFieldProps
    <TFieldValues extends FieldValues,
        TName extends FieldPath<TFieldValues>
    > {
    control: Control<TFieldValues>
    name: TName
    label: string
    id?: string
}

export default function EmailTextField
    <TFieldValues extends FieldValues,
        TName extends FieldPath<TFieldValues>
    >({ control, name, label, id }: EmailTextFieldProps<TFieldValues, TName>) {

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
                    icon={<EmailIcon />}
                />
            )}
        />
    )
}