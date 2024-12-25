import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

import { useSelector } from "react-redux";
import { RootState } from "../../utils/store/store";
import modalSlice, { formModalClose } from "../../utils/store/modalSlice";
import { useDispatch } from "react-redux";

const ModalValuesContainer = () => {
  const dispatch = useDispatch();

  const { formValues } = useSelector((state: RootState) => state.dynamicForm);

  const { isFromModal } = useSelector((state: RootState) => state.modal);
  return (
    <>
      {isFromModal && (
        <div
          style={{
            boxShadow:
              "0 10px 20px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 9999, // Ensure this modal is on top of everything
            position: "fixed", // Fixed position to overlay it on top of the screen
            top: "50%", // Center it vertically
            left: "50%", // Center it horizontally
            transform: "translate(-50%, -50%)", // Ensure centering
            width: "50vw", // Adjust the width as per requirement
            height: "80vh", // Adjust the height
            backgroundColor: "white", // Background color
            borderRadius: "8px", // Rounded corners
            padding: "20px", // Padding for content inside the modal
          }}
          className="relative flex flex-col gap-8"
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
