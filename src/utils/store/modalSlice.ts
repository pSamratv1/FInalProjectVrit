import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  isWindowModal: boolean;
  isWindowModalMini: boolean;
  isFromModal: boolean;
  isDynamicModal: boolean;
  isDynamicModalMini: boolean;
}

const initialState: ModalState = {
  isWindowModal: true,
  isDynamicModal: false,
  isDynamicModalMini: false,
  isWindowModalMini: false,
  isFromModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    windowModalOpen: (state) => {
      state.isWindowModal = true;
    },
    windowModalMini: (state) => {
      state.isWindowModal = false;
      state.isWindowModalMini = true;
    },
    windowModalMax: (state) => {
      state.isWindowModal = true;
      state.isWindowModalMini = false;
    },
    windowModalClose: (state) => {
      state.isWindowModal = false;
      state.isDynamicModal = false;
    },
    dynamicModalOpen: (state) => {
      state.isDynamicModal = true;
    },
    dynamicModalClose: (state) => {
      state.isDynamicModal = false;
    },
    dynamicModalMini: (state) => {
      state.isDynamicModal = false;
      state.isDynamicModalMini = true;
    },
    dynamicModalMax: (state) => {
      state.isDynamicModal = true;
      state.isDynamicModalMini = false;
    },
    formModalOpen: (state) => {
      state.isFromModal = true;
    },
    formModalClose: (state) => {
      state.isFromModal = false;
    },
  },
});

export const {
  windowModalClose,
  windowModalOpen,
  dynamicModalClose,
  dynamicModalOpen,
  windowModalMax,
  windowModalMini,
  dynamicModalMax,
  dynamicModalMini,
  formModalOpen,
  formModalClose,
} = modalSlice.actions;

export default modalSlice.reducer;
