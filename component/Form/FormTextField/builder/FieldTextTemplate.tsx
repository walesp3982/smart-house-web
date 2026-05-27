// FieldTextTemplate.tsx
import { FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from "@mui/material"
import { FieldValues, FieldPath, ControllerRenderProps, ControllerFieldState } from "react-hook-form"

export interface FieldTextTemplateProps
    <TFieldValues extends FieldValues,
        TName extends FieldPath<TFieldValues>
    > {
    label: string
    type?: string
    icon?: React.ReactElement
    id?: string
    field: ControllerRenderProps<TFieldValues, TName>
    fieldState: ControllerFieldState
}

export default function FieldTextTemplate
    <TFieldValues extends FieldValues,
        TName extends FieldPath<TFieldValues>
    >({ label, type = "text", icon, field, fieldState, id }: FieldTextTemplateProps<TFieldValues, TName>) {
    return (
        <FormControl variant="outlined" error={!!fieldState.error}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
                id={id}
                label={label}
                type={type}
                endAdornment={
                    icon && <InputAdornment position="end">{icon}</InputAdornment>
                }
                {...field}
            />
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    )
}