import { useSelector } from "react-redux";
import DynamicContainer from "./component/container/DynamicContainer";
import WindowContainer from "./component/container/WindowContainer";
import DynamicBuilder from "./component/forms/formsContainers/DynamicBuilder";
import FormBuilder from "./component/forms/formsContainers/FormBuilder";
import { RootState } from "./utils/store/store";
import ModalValuesContainer from "./component/container/ModalValuesContainer";

const App = () => {
  const formFields = useSelector(
    (state: RootState) => state.dynamicForm.formFields
  );

  const isFormFieldsEmpty = formFields.length === 0;
  const isFormModal = useSelector((state: RootState) => state.modal);

  return (
    <>
      <ModalValuesContainer />
      {/* <div
        className={` ${
          isFormModal ? "absolute h-full w-screen bg-black bg-opacity-50" : ""
        }`}
      ></div> */}
      <main
        className={`content absolute h-full w-screen bg-slate-100 grid lg:grid-cols-2 grid-cols-1 space-y-16 pt-8 "`}
      >
        <div
          className={`${!isFormModal ? "opacity-[50%]" : ""} ${
            isFormFieldsEmpty
              ? "lg:col-span-2 col-span-1"
              : "lg:col-span-1 col-span-1"
          } relative flex justify-center items-center`}
        >
          <WindowContainer>
            <FormBuilder />
          </WindowContainer>
        </div>

        {!isFormFieldsEmpty && (
          <div
            className={`"${
              !isFormModal ? "opacity-[50%]" : ""
            } w-full flex col-span-1 justify-center items-center pb-8"`}
          >
            <DynamicContainer>
              <DynamicBuilder />
            </DynamicContainer>
          </div>
        )}
      </main>
    </>
  );
};

export default App;
