import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addForm } from "../../../utils/store/formSlice";
import { FormMethodSchema } from "../../../utils/types/GlobalTypes";
import { createValidationSchema } from "../../../utils/validation/validationYup";
import CheckboxGroup from "../feilds/CheckboxGroup";
import OptionsAutocomplete from "../feilds/OptionAutoCOmpelete";
import SubmitButton from "../feilds/SubmitButton";
import TextFieldInput from "../feilds/TextFieldInput";
import TypeSelect from "../feilds/TextSelectInput";
import { addFormField } from "../../../utils/store/dynamicSlice";
import { dynamicModalOpen } from "../../../utils/store/modalSlice";

const FormBuilder = () => {
  // Redux
  const dispatch = useDispatch();

  // Usestate variable
  const [formData, setFormData] = useState({
    name: "",
    label: "",
    type: "",
    selectOptions: [
      "Input",
      "Select",
      "Email",
      "Password",
      "ConfirmPassword",
      "Switch",
      "Checkbox",
      "Textarea",
      "Phone",
      "Date",
      "Time",
      "File",
      "Amount",
      "Location",
      "Country",
    ],
    required: false,

    errorMessage: "",
    options: [],
  });

  const [errors, setErrors] = useState<
    Record<string, string | boolean | undefined>
  >({});

  const validateField = async (field: keyof FormMethodSchema, value: any) => {
    try {
      const schema = createValidationSchema(formData);
      await schema.validateAt(field, { [field]: value });
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    } catch (err) {
      const yupError = err as Yup.ValidationError;
      setErrors((prev) => ({
        ...prev,
        [field]: yupError.message,
      }));
    }
  };

  // Function to handle change except Multiple Input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>,
    field: keyof FormMethodSchema
  ) => {
    const value = field === "required" ? e.target.checked : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAutocompleteChange = (
    event: React.ChangeEvent<{}>,
    value: string[]
  ) => {
    event.preventDefault();

    // Update the formData state with the selected options
    setFormData((prev: any) => ({
      ...prev,
      options: value,
    }));

    // Clear the error for the "options" field
    setErrors((prev) => ({
      ...prev,
      options: undefined, // or "" to remove the error
    }));

    // Optionally revalidate the options field
    validateField("options", value);
  };

  // Function to handle Submit event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = ["name", "label", "type", "errorMessage"];
    let validationErrors: Record<string, string | boolean> = {};

    // Loop through required fields and check if they're empty
    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        validationErrors[field] = "This field is required";
      }
    });

    // Handle Select-specific validation
    if (formData.type === "Select" && formData.options.length === 0) {
      validationErrors["options"] = "At least one option must be selected";
    }

    // If there are validation errors, return early and set errors in state
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Dynamically create the validation schema based on formData
      const schema = createValidationSchema(formData);

      // Validate the entire form using the schema
      await schema.validate(formData, { abortEarly: false });
      setErrors({}); // Clear any existing errors

      // Dispatch the form data to the Redux store
      dispatch(addForm(formData));
      dispatch(
        addFormField({
          name: formData.name,
          label: formData.label,
          type: formData.type,
          options: formData.options,
          required: formData.required,
          errorMessage: formData.errorMessage,
        })
      );

      // Reset form after successful submission
      setFormData({
        name: "",
        label: "",
        type: "",
        required: false,
        selectOptions: [
          "Input",
          "Select",
          "Email",
          "Password",
          "ConfirmPassword",
          "Switch",
          "Checkbox",
          "Textarea",
          "Phone",
          "Date",
          "Time",
          "File",
          "Amount",
          "Location",
          "Country",
        ],
        errorMessage: "",
        options: [],
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors); // Set errors in state
      }
    }
    dispatch(dynamicModalOpen());
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col space-y-3 text-slate-600"
    >
      <TextFieldInput
        id="name"
        label="Name"
        value={formData.name}
        error={errors.name}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
        ) => handleChange(e, "name")}
      />

      <TextFieldInput
        id="label"
        label="Label"
        value={formData.label}
        error={errors.label}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
        ) => handleChange(e, "label")}
      />

      <TypeSelect
        value={formData.type}
        error={errors.type}
        options={formData.selectOptions}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
        ) => handleChange(e, "type")}
      />

      {formData.type === "Select" && (
        <OptionsAutocomplete
          value={formData.options} // Pass the current options state as value
          error={errors.options}
          onChange={handleAutocompleteChange} // Pass the change handler
        />
      )}

      <TextFieldInput
        id="error-message"
        label="Error message"
        value={formData.errorMessage}
        error={errors.errorMessage}
        onChange={(e: any) => handleChange(e, "errorMessage")}
      />
      <CheckboxGroup required={formData.required} onChange={handleChange} />
      <SubmitButton onClick={handleSubmit} name="Create Field" />
    </form>
  );
};

export default FormBuilder;
