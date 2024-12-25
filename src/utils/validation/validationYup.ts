import * as Yup from "yup";
import { FormDataSchema, FormMethodSchema } from "../types/GlobalTypes";

export type FormValues = Record<
  string,
  string | number | boolean | Date | string[] | null
>;
export type FormErrors = Record<string, string>;

// Generate a validation schema for the entire form dynamically
export const generateValidationSchema = (formFields: FormMethodSchema[]) => {
  // Define the maximum file size (e.g., 5MB)
  // const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const schemaFields: any = {};

  formFields.forEach((field) => {
    let fieldValidation: Yup.AnySchema = Yup.mixed(); // Initialize with a mixed schema to allow flexibility

    // Conditional validation based on field type
    if (field.required) {
      fieldValidation = fieldValidation.required(`${field.label} is required.`);
    }

    switch (field.type) {
      case "Input":
        fieldValidation = Yup.string()
          .max(100, "Cannot exceed 100 characters")
          .required(`${field.errorMessage}`);
        break;

      case "Email":
        fieldValidation = Yup.string()
          .email("Invalid email format")
          .required(`${field.errorMessage}`);

        break;

      case "Password":
        fieldValidation = Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required(`${field.errorMessage}`);

        break;

      case "ConfirmPassword":
        fieldValidation = Yup.string()
          .oneOf([Yup.ref("password"), undefined], "Passwords must match")
          .required(`${field.errorMessage}`);

        break;

      case "Checkbox":
        fieldValidation = Yup.boolean()
          .oneOf([true], "This checkbox must be checked")
          .required(`${field.errorMessage}`);

        break;

      case "Select":
        fieldValidation = Yup.string().required(`${field.errorMessage}`);
        break;

      case "Radio":
        fieldValidation = Yup.string().required(`${field.errorMessage}`);
        break;

      case "Number":
        fieldValidation = Yup.number()
          .min(1, "Value must be greater than 1")
          .max(100, "Value must be less than 100")
          .required(`${field.errorMessage}`);

        break;

      // case "file":
      //   fieldValidation = Yup.mixed()
      //     .required("File is required")
      //     .test("fileSize", "File size is too large", (value) => {
      //       if (value && value.size) {
      //         return value.size <= MAX_SIZE; // Check file size
      //       }
      //       return true;
      //     });
      //   break;

      case "Date":
        fieldValidation = Yup.date().required(`${field.errorMessage}`);
        break;

      case "Textarea":
        fieldValidation = Yup.string()
          .max(500, "Maximum 500 characters")
          .required(`${field.errorMessage}`);

        break;

      default:
        fieldValidation = Yup.string().required(`${field.errorMessage}`);
        break;
    }

    schemaFields[field.name] = fieldValidation;
  });

  return Yup.object().shape(schemaFields);
};

// Validate a single field on change or blur
export const validateField = async (
  fieldName: string,
  value: any,
  formFields: FormMethodSchema[]
) => {
  const field = formFields.find((field) => field.name === fieldName);
  if (!field) return;

  let validationSchema: Yup.AnySchema = Yup.mixed().required(
    "This field is required"
  );

  // Skip required validation if 'required' is false
  if (!field.required) {
    validationSchema = Yup.mixed(); // Optional validation
  }

  // Validate based on field type
  if (field.type === "email") {
    validationSchema = Yup.string().email("Invalid email format");
  }

  if (field.type === "password") {
    validationSchema = Yup.string().min(
      8,
      "Password must be at least 8 characters"
    );
  }

  if (field.type === "checkbox") {
    validationSchema = Yup.boolean().oneOf(
      [true],
      "This checkbox must be checked"
    );
  }

  if (field.type === "select") {
    validationSchema = Yup.array()
      .of(Yup.string().required("Option cannot be empty"))
      .min(1, "Please select at least one option");
  }
  if (field.type === "options") {
    Yup.array()
      .of(Yup.string().required("Option must be a string"))
      .min(2, "You must provide at least one option");
  }

  try {
    await validationSchema.validate(value);
    return null; // Valid field
  } catch (error: any) {
    return error.message; // Return error message if invalid
  }
};

export const createValidationSchema = (formData: FormDataSchema) => {
  let schemaFields: any = {
    name: Yup.string().required("Name is required."),
    label: Yup.string().required("Label is required."),
    type: Yup.string().required("Type is required."),
    errorMessage: Yup.string().required("Error message is required."),
  };

  if (formData.type === "select") {
    schemaFields.options = Yup.array()
      .of(Yup.string().min(1, "Option cannot be empty."))
      .min(2, "At least two options are required.")
      .required("Options are required.");
  }

  return Yup.object().shape(schemaFields);
};
