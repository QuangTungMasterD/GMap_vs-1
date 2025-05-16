
import { createContext, useState } from "react";

export const adminContext = createContext()

function AdminProvider({ children }) {

    const [admin, setAdmin] = useState(false)

    return (
        <adminContext.Provider value={{ admin, setAdmin }}>
            {children}
        </adminContext.Provider>
    );
}

export default AdminProvider;