import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store/store";
import {
  dynamicModalClose,
  dynamicModalMax,
  dynamicModalMini,
} from "../../utils/store/modalSlice";
import Tooltip from "@mui/material/Tooltip";

interface DynamicContainerProps {
  children: ReactNode;
}
const DynamicContainer = ({ children }: DynamicContainerProps) => {
  const dispatch = useDispatch();
  const { isDynamicModal } = useSelector((state: RootState) => state.modal);
  const { isDynamicModalMini } = useSelector((state: RootState) => state.modal);

  return (
    <>
      {isDynamicModal && (
        <div
          style={{
            boxShadow:
              "0 10px 20px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1,
          }}
          className="relative flex flex-col max-w-[50vw] w-[30vw] max-h-[80vh] pb-8 bg-white rounded-lg gap-8 shadow-lg"
        >
          <div className="flex h-10 w-full px-3 items-center justify-start bg-slate-300  rounded-t-lg space-x-3">
            <Tooltip title="Close" arrow>
              <div
                className="bg-red-400 flex h-3 w-3 rounded-full cursor-pointer"
                onClick={() => dispatch(dynamicModalClose())}
              ></div>
            </Tooltip>
            <Tooltip title="Minimize" arrow>
              <div
                className="bg-yellow-400 h-3 w-3 rounded-full cursor-pointer"
                onClick={() => dispatch(dynamicModalMini())}
              ></div>
            </Tooltip>
            <Tooltip title="Maximize" arrow>
              <div className="bg-green-400 h-3 w-3 rounded-full cursor-pointer"></div>
            </Tooltip>
          </div>
          <div className="w-full flex flex-col px-6 space-y-2">
            <div className="text-sm text-green-700 font-bold font-nunito">
              Form Builder
            </div>
            <div className="text-2xl text-slate-700 font-extrabold font-nunito">
              Dynamic Form
            </div>
            <div className="text-sm text-slate-600 font-normal font-nunito">
              Ready to use Form Fields with proper validations . . .
            </div>
          </div>
          <div className="px-20">{children}</div>
        </div>
      )}

      {isDynamicModalMini && (
        <div
          className="flex absolute bottom-0 left-6 h-10 w-[20vw] bg-slate-300 rounded-t-lg items-center justify-start px-3 space-x-7"
          style={{ zIndex: 0, left: "850px" }}
        >
          <div className="flex space-x-3">
            <Tooltip title="Close" arrow>
              <div className="bg-red-400 flex h-3 w-3 rounded-full cursor-pointer"></div>
            </Tooltip>
            <Tooltip title="Minimize" arrow>
              <div className="bg-yellow-400 h-3 w-3 rounded-full cursor-pointer"></div>
            </Tooltip>
            <Tooltip title="Maximize" arrow>
              <div
                className="bg-green-400 h-3 w-3 rounded-full cursor-pointer"
                onClick={() => dispatch(dynamicModalMax())}
              ></div>
            </Tooltip>
          </div>
          <div className="text-lg font-semibold">DynamicForm.tsx</div>
        </div>
      )}
    </>
  );
};

export default DynamicContainer;
