import { Checkbox, FormControl, FormControlLabel } from "@mui/material";

interface CheckboxGroupProps {
  required: boolean;

  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: "required") => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  required,

  onChange,
}) => (
  <div className="w-full flex justify-start px-3">
    <FormControl component="fieldset">
      <FormControlLabel
        control={
          <Checkbox
            checked={required}
            onChange={(e) => onChange(e, "required")}
          />
        }
        label="Required"
      />
    </FormControl>
  </div>
);

export default CheckboxGroup;
