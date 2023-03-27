"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";

// const ModalContext = createContext();

// const Modal = ({ children }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <ModalContext.Provider value={{ open, setOpen }}>
//       <div>{children}</div>
//     </ModalContext.Provider>
//   );
// };

// const Trigger = ({ children }) => {
//   const { setOpen } = useContext(ModalContext);

//   return <div onClick={() => setOpen((current) => !current)}>{children}</div>;
// };

// const Content = ({ children }) => {
//   const { open, setOpen } = useContext(ModalContext);

//   if (!open) return null;

//   return createPortal(
//     <>
//       <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[20rem] bg-white rounded-lg p-5 z-[99] max-h-[90vh] overflow-auto">
//         <div className="flex justify-end">
//           <RxCross2
//             onClick={() => setOpen(false)}
//             size={25}
//             className="cursor-pointer"
//           />
//         </div>
//         <div className="mt-5">{children}</div>
//       </div>

//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 opacity-50 bg-gray-500 z-[98]"
//         />
//       )}
//     </>,

//     document.getElementById("modal-root")
//   );
// };

// Modal.Trigger = Trigger;
// Modal.Content = Content;

const Modal = ({ children, isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[20rem] bg-white dark:bg-dark rounded-lg p-5 z-[99] max-h-[90vh] overflow-auto">
        <div className="flex justify-end">
          <RxCross2
            onClick={() => setIsOpen(false)}
            size={25}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-5">{children}</div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 opacity-50 bg-gray-500 z-[98]"
        />
      )}
    </>,

    document.getElementById("modal-root")
  );
};

export default Modal;
