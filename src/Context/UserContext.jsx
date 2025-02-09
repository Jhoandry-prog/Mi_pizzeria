import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    console.log(isAuthenticated);

    const signOut = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated, 
                signOut 
            }}>
            {children}
        </AuthContext.Provider>
    );
};
