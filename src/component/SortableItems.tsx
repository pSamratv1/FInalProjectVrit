import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FieldRenderer from "./forms/formsContainers/FieldsRender";
import { SelectChangeEvent } from "@mui/material";

interface SortableItemProps {
  id: string;
  field: any; // Replace with the actual type of the field, such as FormDataSchema
  formValues: Record<string, any>;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (
    e: SelectChangeEvent<string | number | boolean | Date | string[] | null>
  ) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  id,
  field,
  formValues,
  errors,
  handleChange,
  handleSelectChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="flex flex-col">
        <label htmlFor={field.name}>{field.label}</label>
        {/* Use FieldRenderer to render the field */}
        <FieldRenderer
          field={field}
          value={formValues[field.name]}
          error={errors[field.name]}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          onBlur={() => {}}
        />
        {errors[field.name] && <span>{errors[field.name]}</span>}
      </div>
    </div>
  );
};

export default SortableItem;
