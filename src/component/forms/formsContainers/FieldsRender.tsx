import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Select,
  InputLabel,
  Radio,
  Switch,
  MenuItem,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";

import "react-phone-number-input/style.css";
import { useFetchData } from "../../../hooks/useFetchData";
// Define the field interface
interface FieldMethod {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  value?: string | boolean | string[] | Date | number | null;
  validation?: boolean;
  errorMessage?: string;
}

interface FieldRendererProps {
  field: FieldMethod;
  value: string | boolean | string[] | Date | number | undefined | null;
  error: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (
    e: SelectChangeEvent<string | number | boolean | Date | string[] | null>
  ) => void;
  onBlur: () => void;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  error,
  onChange,
  onSelectChange,
  onBlur,
}) => {
  // Fetch country names when the component mounts
  const { data: countries, loading } = useFetchData(
    "https://restcountries.com/v3.1/all"
  );
  const location: string[] = ["Bhairahawa"];

  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false); // To control menu open state
  const menuRef = useRef<HTMLDivElement>(null); // To reference the dropdown menu
  const selectRef = useRef<HTMLDivElement>(null); // To reference the select field

  // Handle click outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Close menu if clicked outside of Select or its dropdown
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false); // Close the menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    if (selectedFile) {
      onChange(e); // Update parent component's state
    }
  };

  switch (field.type) {
    case "Input":
      return (
        <TextField
          id={field.name}
          label={field.label}
          variant="outlined"
          name={field.name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          required={field.required}
          error={Boolean(error)}
          helperText={error}
          style={{ width: "290px" }}
        />
      );

    case "Select":
      return (
        <FormControl
          fullWidth
          error={Boolean(error)}
          required={field.required}
          ref={selectRef} // Add reference to the select container
        >
          <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
          <Select
            labelId={`${field.name}-label`}
            id={field.name}
            label={field.label}
            name={field.name}
            value={value || ""}
            onChange={onSelectChange}
            onBlur={onBlur}
            open={open} // Control menu open state
            onOpen={() => setOpen(true)} // Open the menu
            onClose={() => setOpen(false)} // Close the menu
            MenuProps={{
              PaperProps: {
                ref: menuRef, // Reference to the dropdown menu
                onMouseDown: (e: any) => e.stopPropagation(), // Prevent drag interference
              },
            }}
            style={{ width: "5/6" }}
          >
            {(field.options || []).map((option, idx) => (
              <MenuItem key={idx} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {error && <span>{error}</span>} {/* Display error message */}
        </FormControl>
      );

    case "Checkbox":
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={typeof value === "boolean" ? value : false}
              onChange={onChange}
              onBlur={onBlur}
              style={{ width: "290px" }}
              name={field.name}
            />
          }
          label={field.label}
        />
      );

    case "Radio":
      return (
        <FormControl component="fieldset">
          <FormLabel component="legend">{field.label}</FormLabel>
          <RadioGroup
            name={field.name}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
          >
            {(field.options || []).map((option, idx) => (
              <FormControlLabel
                key={idx}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );

    case "Switch":
      return (
        <FormControlLabel
          control={
            <Switch
              checked={typeof value === "boolean" ? value : false}
              onChange={onChange}
              onBlur={onBlur}
              name={field.name}
            />
          }
          label={field.label}
        />
      );

    case "Email":
      return (
        <TextField
          id={field.name}
          label={field.label}
          type="email"
          variant="outlined"
          name={field.name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          required={field.required}
          error={Boolean(error)}
          style={{ width: "290px" }}
          helperText={error}
        />
      );

    case "Password":
      return (
        <TextField
          id={field.name}
          label={field.label}
          type="password"
          variant="outlined"
          name={field.name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          required={field.required}
          error={Boolean(error)}
          style={{ width: "290px" }}
          helperText={error}
        />
      );

    case "ConfirmPassword":
      return (
        <TextField
          id={field.name}
          label="Confirm Password"
          type="password"
          variant="outlined"
          name={field.name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          required={field.required}
          error={Boolean(error)}
          helperText={error}
          style={{ width: "290px" }}
        />
      );

    case "Textarea":
      return (
        <TextField
          id={field.name}
          label={field.label}
          variant="outlined"
          name={field.name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          required={field.required}
          error={Boolean(error)}
          helperText={error}
          multiline
          rows={4}
          style={{ width: "290px" }}
        />
      );

    case "Phone":
      return (
        <TextField
          id={field.name}
          label={field.label}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          required={field.required}
          error={Boolean(error)}
          helperText={error}
          style={{ width: "290px" }}
        />
      );

    case "Date":
      return (
        <TextField
          id={field.name}
          label={field.label}
          type="date"
          variant="outlined"
          name={field.name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          required={field.required}
          error={Boolean(error)}
          helperText={error}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ width: "290px" }}
        />
      );

    case "Time":
      return (
        <TextField
          id={field.name}
          label={field.label}
          type="time"
          variant="outlined"
          name={field.name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          required={field.required}
          error={Boolean(error)}
          helperText={error}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ width: "290px" }}
        />
      );

    case "File":
      return (
        <TextField
          id={field.name}
          label={field.label}
          type="file"
          name={field.name}
          onChange={handleFileChange}
          onBlur={onBlur}
          required={field.required}
          error={Boolean(error)}
          helperText={error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {file && (
                  // Display file name and size if a file is selected
                  <span>
                    {file.name} - {Math.round(file.size / 1024)} KB
                  </span>
                )}
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInput-root": {
              display: "flex",
              alignItems: "center",
            },
            "& .MuiInputAdornment-root": {
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
            },
          }}
          style={{ width: "290px" }}
        />
      );

    case "Amount":
      return (
        <TextField
          id={field.name}
          label={field.label}
          variant="outlined"
          name={field.name}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          required={field.required}
          error={Boolean(error)}
          helperText={error}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          style={{ width: "290px" }}
        />
      );

    case "Location":
      return (
        <TextField
          id={field.name}
          label={field.label}
          select
          name={field.name}
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
          onBlur={onBlur}
          required={field.required}
          error={Boolean(error)}
          helperText={error}
          slotProps={{
            select: {
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: "300px", // Adjust the height of the dropdown menu
                    overflowY: "auto", // Ensure the scrollbar appears if needed
                  },
                },
              },
            },
          }}
          style={{ width: "290px" }}
        >
          {location.map((location, idx) => (
            <MenuItem
              key={idx}
              value={location}
              sx={{
                height: "32px", // Reduce the height of the MenuItem
                fontSize: "0.875rem", // Adjust font size for better readability
                padding: "4px 16px", // Adjust padding to reduce height
                "&:hover": {
                  backgroundColor: "#E3F2FD", // Light blue on hover for better UI feedback
                },
              }}
            >
              {location}
            </MenuItem>
          ))}
        </TextField>
      );

    case "Country":
      // Sort the countries alphabetically
      const sortedCountries = countries.sort((a, b) => a.localeCompare(b));
      return (
        <TextField
          id={field.name}
          label={field.label}
          select
          name={field.name}
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
          onBlur={onBlur}
          required={field.required}
          error={Boolean(error)}
          helperText={error}
          slotProps={{
            select: {
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: "300px", // Adjust the height of the dropdown menu
                    overflowY: "auto", // Ensure the scrollbar appears if needed
                  },
                },
              },
            },
          }}
          style={{ width: "290px" }}
        >
          {loading ? (
            <MenuItem disabled>Loading countries...</MenuItem>
          ) : (
            sortedCountries.map((country, idx) => (
              <MenuItem
                key={idx}
                value={country}
                sx={{
                  height: "32px", // Reduce the height of the MenuItem
                  fontSize: "0.875rem", // Adjust font size for better readability
                  padding: "4px 16px", // Adjust padding to reduce height
                  "&:hover": {
                    backgroundColor: "#E3F2FD", // Light blue on hover for better UI feedback
                  },
                }}
              >
                {country}
              </MenuItem>
            ))
          )}
        </TextField>
      );

    default:
      return null;
  }
};

export default FieldRenderer;
