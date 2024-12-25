import { TextField } from "@mui/material";

interface CustomTextFieldProps {
  id: string;
  label: string;
  value: string | number;
  error?: string | boolean; // Accepts a string for the error message
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const TextFieldInput: React.FC<CustomTextFieldProps> = ({
  id,
  label,
  value,
  error,
  onChange,
}) => (
  <TextField
    id={id}
    label={label}
    variant="outlined"
    value={value}
    onChange={onChange}
    error={!!error} // Pass boolean value to `error` prop
    helperText={error || ""} // Pass the error message (or empty string if no error) to `helperText`
  />
);

export default TextFieldInput;
