import React from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";

interface OptionsAutocompleteProps {
  value: string[];
  error: string | boolean | undefined;
  onChange: (e: React.ChangeEvent<{}>, value: string[]) => void; // Ensure correct types
}

const OptionsAutocomplete: React.FC<OptionsAutocompleteProps> = ({
  value,

  onChange,
}) => {
  return (
    <Autocomplete
      multiple
      freeSolo
      id="free-text-autocomplete"
      options={[]}
      value={value}
      onChange={onChange} // This is where the change handler is used
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...rest } = getTagProps({ index });
          return <Chip key={key} variant="outlined" label={option} {...rest} />;
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Options"
          placeholder="Add options for select field..."
        />
      )}
    />
  );
};

export default OptionsAutocomplete;
