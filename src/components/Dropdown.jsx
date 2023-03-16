'use client'

import { createContext, useContext, useState } from "react"

const DropdownContext = createContext()

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false)

    return (
        <DropdownContext.Provider value={{ open, setOpen }}>
            <div className="relative">{children}</div>
        </DropdownContext.Provider>
    )
}

const Trigger = ({ children, className = "" }) => {
    const { open, setOpen } = useContext(DropdownContext)

    return (
        <>
            <button onClick={() => setOpen(current => !current)} className={`${!open ? 'rounded-lg' : 'rounded-t-lg'} 
                ${className}`}
            >
                {children}
            </button>

            {open && (
                <div onClick={() => setOpen(false)} className="fixed inset-0 z-40"></div>
            )}
        </>
    )
}

const Content = ({ children, className = "" }) => {
    const { open, setOpen } = useContext(DropdownContext)

    return (
        <div onClick={() => setOpen(false)}
            className={`absolute z-50 rounded-b-lg border shadow-lg py-2 px-4 mt-1 bg-white duration-500 
            ${!open ? 'opacity-0 pointer-events-none -translate-y-5' : 'opacity-100 translate-y-0'} 
            ${className}`}
        >
            {children}
        </div>
    )
}

Dropdown.Trigger = Trigger
Dropdown.Content = Content

export default Dropdown