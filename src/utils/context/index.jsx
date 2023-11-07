import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [loggedUser, setLoggedUser] = useState({});

    return (
        <AppContext.Provider
            value={{
                loggedUser,
                setLoggedUser,
            }}
        >
            { children }
        </AppContext.Provider>
    )
}