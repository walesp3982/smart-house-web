import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import React from "react";
import { Controller, Control, FieldValues, Path, FieldPath, ControllerRenderProps, ControllerFieldState } from "react-hook-form"

interface FormTextFieldProps
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: string;
    type?: string;
    field_text: React.ReactElement<PropsTextFieldElement<TFieldValues, TName>>
    // icon?: React.ReactElement
}


export default function ControllerFieldText
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
        {
            control,
            name,
            label,
            type,
        }: FormTextFieldProps<TFieldValues, TName>
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

interface PropsTextFieldElement
    <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
    label: string
    type: string
    icon?: React.ReactElement
    field: ControllerRenderProps<TFieldValues, TName>
    fieldState: ControllerFieldState
    id?: string
}

export function TextFieldElement
    <TFieldValues extends FieldValues,
        TName extends FieldPath<TFieldValues>>
    ({ label, type, icon, field, fieldState, id }: PropsTextFieldElement<TFieldValues, TName>) {
    return (
        <FormControl variant="outlined" error={!!fieldState.error}>
            <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
            <OutlinedInput
                id={id ? "outlined-adornment" : id}
                label={label}
                type={type}
                endAdornment={
                    icon &&
                    <InputAdornment position="end">
                        {icon}
                    </InputAdornment>
                }
                {...field}
            />
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>)
}