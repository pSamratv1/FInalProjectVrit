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

  return (
    <>
      <ModalValuesContainer />
      <main className="h-screen w-screen bg-slate-100 grid grid-cols-2">
        <div
          className={`${
            isFormFieldsEmpty ? "col-span-2" : "col-span-1"
          } relative flex justify-center items-center`}
        >
          <WindowContainer>
            <FormBuilder />
          </WindowContainer>
        </div>

        {!isFormFieldsEmpty && (
          <div className="flex col-span-1 justify-center items-center">
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
