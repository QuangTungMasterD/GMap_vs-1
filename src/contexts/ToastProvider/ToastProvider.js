import { useState } from "react";
import { createContext } from "react";
import { ToastContainer, toast } from 'react-toastify';

export const ToastContext = createContext()

function ToastProvider({ children }) {
    const values = {
        toast
    }

    return (
        <ToastContext.Provider value={values}>
            {children}
            <ToastContainer closeOnClick draggable position="top-right" />
        </ToastContext.Provider>
    );
}

export default ToastProvider;