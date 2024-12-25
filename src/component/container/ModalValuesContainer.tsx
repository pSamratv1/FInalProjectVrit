import Tooltip from "@mui/material/Tooltip";

import { useSelector } from "react-redux";
import { RootState } from "../../utils/store/store";
import { formModalClose } from "../../utils/store/modalSlice";
import { useDispatch } from "react-redux";

const ModalValuesContainer = () => {
  const dispatch = useDispatch();

  const { formValues } = useSelector((state: RootState) => state.dynamicForm);

  const { isFormModal } = useSelector((state: RootState) => state.modal);
  return (
    <>
      {isFormModal && (
        <div
          className={`flex flex-col gap-8 z-[9999] absolute justify-center  w-[80vw] sm:w-[50vw] lg:w-[35vw]`}
          style={{
            boxShadow:
              "0 10px 20px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex h-10 w-full px-3 items-center justify-start bg-slate-300 rounded-t-lg space-x-3">
            <Tooltip title="Close" arrow>
              <div
                className="bg-red-400 flex h-3 w-3 rounded-full cursor-pointer"
                onClick={() => dispatch(formModalClose())}
              ></div>
            </Tooltip>
            <Tooltip title="Unavailable" arrow>
              <div className="bg-yellow-400 h-3 w-3 rounded-full cursor-pointer"></div>
            </Tooltip>
            <Tooltip title="Unavailable" arrow>
              <div className="bg-green-400 h-3 w-3 rounded-full cursor-pointer"></div>
            </Tooltip>
          </div>
          <div className="w-full flex flex-col px-6 space-y-2">
            <div className="text-sm text-green-700 font-bold font-nunito">
              Form & Value
            </div>
            <div className="text-2xl text-slate-700 font-extrabold font-nunito">
              Dynamic Form Values
            </div>
            <div className="text-sm text-slate-600 font-normal font-nunito">
              Values from the dynamic fields form Redux . . .
            </div>
          </div>
          <div className="px-20">{JSON.stringify(formValues, null, 2)}</div>
        </div>
      )}
    </>
  );
};

export default ModalValuesContainer;
