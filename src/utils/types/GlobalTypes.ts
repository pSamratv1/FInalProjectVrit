export interface FormMethodSchema {
  name: string;
  label: string;
  type: string;
  required?: boolean;

  errorMessage?: string;
  value?: string | number;
  options?: string[];
}

export interface FormDataSchema {
  name: string;
  label: string;
  type: string;
  required: boolean;

  errorMessage: string;
  options: string[];
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  options?: string[];
}

export type FormValues = {
  [key: string]: any;
};

export interface FormRowSchema {
  rowId: number;
  fields: FormDataSchema[];
}
