import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import dynamicReducer from "./dynamicSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    dynamicForm: dynamicReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
