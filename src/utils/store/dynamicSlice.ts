import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FormDataSchema, FormValues } from "../types/GlobalTypes";

// Defined the types for the fields and values
interface DynamicFormLayoutState {
  formFields: FormDataSchema[];
  formValues: FormValues;
}

// Initial state
const initialState: DynamicFormLayoutState = {
  formFields: [],
  formValues: {},
};

// Slice
const dynamicSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormFields: (state, action: PayloadAction<FormDataSchema[]>) => {
      state.formFields = action.payload;
    },

    reorderFormFields(
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) {
      const { oldIndex, newIndex } = action.payload;
      const [movedItem] = state.formFields.splice(oldIndex, 1); // Remove the item
      state.formFields.splice(newIndex, 0, movedItem); // Reinsert at the new index
    },

    addFormField: (state, action: PayloadAction<FormDataSchema>) => {
      state.formFields.push(action.payload);
    },
    addFormValues: (state, action: PayloadAction<{ [key: string]: any }>) => {
      state.formValues = action.payload; // Update the formValues with the new data
    },
    removeFormField(state, action: PayloadAction<string>) {
      state.formFields = state.formFields.filter(
        (field) => field.name !== action.payload
      );
    },
  },
});

// Export actions
export const {
  setFormFields,
  reorderFormFields,
  addFormField,
  addFormValues,
  removeFormField,
} = dynamicSlice.actions;

// Export reducer
export default dynamicSlice.reducer;
