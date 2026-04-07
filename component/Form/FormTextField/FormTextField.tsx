import { TextField } from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form"

interface FormTextFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    type?: string;
}


export default function FormTextField<T extends FieldValues>(
    {
        control,
        name,
        label,
        type,
    }: FormTextFieldProps<T>
) {
    return <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
            <TextField
                {...field}
                label={label}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                type={type}
            />
        )}
    />
}