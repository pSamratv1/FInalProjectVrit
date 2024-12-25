import { MenuItem, TextField } from "@mui/material";

interface TypeSelectProps {
  value: string;
  error: string | boolean | undefined;
  options: string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const TypeSelect: React.FC<TypeSelectProps> = ({
  value,
  error,
  options,
  onChange,
}) => (
  <TextField
    select
    label="Type"
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={error}
    slotProps={{
      select: {
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: "300px",
              overflowY: "auto",
            },
          },
        },
      },
    }}
  >
    {(options || []).map((option: string, idx: number) => (
      <MenuItem
        key={idx}
        value={option}
        sx={{
          height: "32px",
          fontSize: "0.875rem",
          padding: "4px 16px",
          "&:hover": {
            backgroundColor: "#E3F2FD",
          },
        }}
      >
        {option}
      </MenuItem>
    ))}
  </TextField>
);

export default TypeSelect;
