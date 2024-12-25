import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store/store";
import {
  windowModalClose,
  windowModalMax,
  windowModalMini,
} from "../../utils/store/modalSlice";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip from MUI

interface WindowContainerProps {
  children: ReactNode;
}

const WindowContainer = ({ children }: WindowContainerProps) => {
  const dispatch = useDispatch();
  const { isWindowModal } = useSelector((state: RootState) => state.modal);
  const { isWindowModalMini } = useSelector((state: RootState) => state.modal);

  const hanldeClose = () => {
    dispatch(windowModalClose());
    alert("Do you want to close?");
    alert("Make sure to restart page to see the builder.");
  };

  return (
    <>
      {isWindowModal && (
        <div
          style={{
            boxShadow:
              "0 10px 20px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 2, // Ensure this modal is above the other
          }}
          className="relative flex flex-col max-w-[50vw] w-[30vw] max-h-[80vh] pb-8 bg-white rounded-lg gap-8 shadow-lg"
        >
          <div className="flex h-10 w-full px-3 items-center justify-start bg-slate-300 rounded-t-lg space-x-3">
            <Tooltip title="Close" arrow>
              <div
                className="bg-red-400 flex h-3 w-3 rounded-full cursor-pointer"
                onClick={() => hanldeClose()}
              ></div>
            </Tooltip>
            <Tooltip title="Minimize" arrow>
              <div
                className="bg-yellow-400 h-3 w-3 rounded-full cursor-pointer"
                onClick={() => dispatch(windowModalMini())}
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
              Form Builder
            </div>
            <div className="text-sm text-slate-600 font-normal font-nunito">
              Create a Dynamic Forms with default validation
            </div>
          </div>
          <div className="px-10">{children}</div>
        </div>
      )}

      {isWindowModalMini && (
        <div
          className="flex absolute bottom-0 left-6 h-10 w-[20vw] bg-slate-300 rounded-t-lg items-center justify-start px-3 space-x-7"
          style={{ zIndex: 1 }} // Ensure this modal is behind the full modal
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
                onClick={() => dispatch(windowModalMax())}
              ></div>
            </Tooltip>
          </div>
          <div className="text-lg font-semibold">FormBuilder.tsx</div>
        </div>
      )}
    </>
  );
};

export default WindowContainer;
