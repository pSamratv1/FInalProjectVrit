import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/store/store";
import { FormValues, FormDataSchema } from "../../../utils/types/GlobalTypes";
import {
  FormErrors,
  validateField,
  generateValidationSchema,
} from "../../../utils/validation/validationYup";
import SubmitButton from "../feilds/SubmitButton";
import * as Yup from "yup";
import FieldRenderer from "./FieldsRender";
import { SelectChangeEvent, Tooltip } from "@mui/material";
import {
  addFormValues,
  removeFormField,
  reorderFormFields, // Add this action in your Redux slice
} from "../../../utils/store/dynamicSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Sortable from "sortablejs";

import Swal from "sweetalert2";

const DynamicBuilder: React.FC = () => {
  const dispatch = useDispatch();

  const formFields = useSelector(
    (state: RootState) => state.dynamicForm.formFields
  );
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(
    null
  );

  const sortableContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize SortableJS on the form fields container
    if (sortableContainerRef.current) {
      Sortable.create(sortableContainerRef.current, {
        animation: 150, // Animation duration in ms
        onEnd: (event) => {
          const { oldIndex, newIndex } = event;
          if (oldIndex !== undefined && newIndex !== undefined) {
            // Dispatch reorder action with the old and new indices
            dispatch(reorderFormFields({ oldIndex, newIndex }));
          }
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const initialValues: FormValues = {};
    formFields.forEach((field: FormDataSchema) => {
      initialValues[field.name] = field.type === "checkbox" ? false : "";
    });
    setFormValues(initialValues);
  }, [formFields]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prev: FormValues) => ({
      ...prev,
      [name]: newValue,
    }));

    try {
      const errorMessage = await validateField(name, newValue, formFields);
      setErrors((prev: FormErrors) => ({
        ...prev,
        [name]: errorMessage || "",
      }));
    } catch (err) {
      setErrors((prev: FormErrors) => ({ ...prev, [name]: err as string }));
    }
  };
  const handleSelectChange = async (
    event: SelectChangeEvent<string | number | boolean | Date | string[] | null>
  ) => {
    const { name, value } = event.target;

    setFormValues((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    try {
      const errorMessage = await validateField(name, value, formFields);
      setErrors((prev) => ({ ...prev, [name]: errorMessage || "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err as string }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const schema = generateValidationSchema(formFields);
    try {
      // Validate form values against the schema
      await schema.validate(formValues, { abortEarly: false });
      setErrors({});

      // Proceed only if there are no validation errors
      setSubmittedValues(formValues);
      console.log(submittedValues);
      dispatch(addFormValues(formValues));

      // Reset form values after successful submission
      const initialValues: FormValues = {};
      formFields.forEach((field: FormDataSchema) => {
        initialValues[field.name] = field.type === "checkbox" ? false : "";
      });
      setFormValues(initialValues);
      const formattedValues = Object.entries(formValues)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

      Swal.fire({
        title: "Form Data",
        html: `<pre>${formattedValues}</pre>`,
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "shadow-lg rounded-lg",
        },
      });
    } catch (err: any) {
      // Handle validation errors
      if (err instanceof Yup.ValidationError) {
        const newErrors: FormErrors = {};
        err.inner.forEach((e: any) => {
          if (e.path) {
            newErrors[e.path] = e.message;
          }
        });
        setErrors(newErrors);

        return;
      }
    }
  };

  const handleRemoveField = (fieldName: string) => {
    const newFormValues = { ...formValues };
    delete newFormValues[fieldName];
    setFormValues(newFormValues);
    dispatch(removeFormField(fieldName));
  };

  return (
    <form className="flex flex-col space-y-4 text-slate-600 rounded-lg ">
      <div ref={sortableContainerRef} className="space-y-4 ">
        {formFields.map((field: FormDataSchema, index: number) => (
          <div
            key={index}
            className="flex w-full justify-between items-center space-x-8 "
          >
            <FieldRenderer
              field={field}
              value={formValues[field.name]}
              error={errors[field.name]}
              onChange={handleChange}
              onSelectChange={handleSelectChange}
              onBlur={() => {}}
            />
            <Tooltip title="Delete Field" arrow>
              <MdOutlineDeleteOutline
                className="text-red-400 font-bold text-3xl cursor-pointer"
                onClick={() => handleRemoveField(field.name)}
              />
            </Tooltip>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-4">
        <SubmitButton onClick={handleSubmit} name="Submit" />
      </div>
    </form>
  );
};

export default DynamicBuilder;
