export type FieldOptions = {
    error?: string | undefined
    touched?: boolean
    value: string
}

export type FormOptions = {[f in string]: FieldOptions}
