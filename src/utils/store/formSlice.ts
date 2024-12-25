import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormMethodSchema } from "../types/GlobalTypes";

export interface FormState {
  forms: FormMethodSchema[];
}

const initialState: FormState = {
  forms: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<FormMethodSchema>) => {
      state.forms = [...state.forms, action.payload];
    },
    removeForm: (state, action: PayloadAction<number>) => {
      state.forms = state.forms.filter((_, index) => index !== action.payload);
    },
    updateFormFieldsOrder: (
      state,
      action: PayloadAction<FormMethodSchema[]>
    ) => {
      state.forms = action.payload; // Update the form fields order
    },
  },
});

export const { addForm, removeForm, updateFormFieldsOrder } = formSlice.actions;

export default formSlice.reducer;
