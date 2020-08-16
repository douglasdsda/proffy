export interface FormField {
  value: string,
  validation: RegExp,
  valid: boolean,
  touched: boolean
}

export interface FormFields {
  [key: string]: FormField
} 