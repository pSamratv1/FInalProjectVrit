import React from "react";
import { useDraggable } from "@dnd-kit/core";
import FieldRenderer from "./forms/formsContainers/FieldsRender";

const DraggableField: React.FC<{
  field: any;
  formValues: any;
  errors: any;
  handleChange: any;
  handleSelectChange: any;
}> = ({ field, formValues, errors, handleChange, handleSelectChange }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: field.name, // Ensure each field has a unique ID
  });

  // Custom styles for dragging
  const style = {
    cursor: isDragging ? "grabbing" : "pointer", // Change cursor during drag
    opacity: isDragging ? 0.5 : 1, // Adjust opacity when dragging
    transition: "all 0.3s ease", // Smooth transition for drag
    marginBottom: "8px", // Add margin for better drag handling
  };

  return (
    <div
      ref={setNodeRef} // Attach the draggable ref
      {...attributes} // Attach the necessary attributes for drag
      {...listeners} // Attach listeners for mouse/keyboard events
      style={style} // Apply custom styles
    >
      <FieldRenderer
        field={field}
        value={formValues[field.name]}
        error={errors[field.name]}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        onBlur={() => {}}
      />
    </div>
  );
};

export default DraggableField;
