"use client";

import { createContext, useContext, useState } from "react";

const DropdownContext = createContext();

const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
};

const Trigger = ({ children, className = "" }) => {
  const { open, setOpen } = useContext(DropdownContext);

  return (
    <>
      <button
        onClick={() => setOpen((current) => !current)}
        className={`rounded-lg ${className}`}
      >
        {children}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40"
        ></div>
      )}
    </>
  );
};

const Content = ({ children, className = "" }) => {
  const { open, setOpen } = useContext(DropdownContext);

  return (
    <div
      onClick={() => setOpen(false)}
      className={`absolute z-50 right-0 rounded-lg shadow-lg p-3 mt-1 bg-primary text-white duration-500 
            ${
              !open
                ? "opacity-0 pointer-events-none -translate-y-5"
                : "opacity-100 translate-y-0"
            } 
            ${className}`}
    >
      <div className="triangle absolute -top-2 right-5" />
      {children}
    </div>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;

export default Dropdown;
