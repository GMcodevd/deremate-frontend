import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isUserLogged, setUserLogged] = useState(false);
    const [user, setUser] = useState(null);

    // Cuando se monta, verifica si hay token en localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUserLogged(true);
            const userData = JSON.parse(localStorage.getItem("user"));
            setUser(userData);
        }
    }, []);

    const login = (token, userData) => {
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));
            setUserLogged(true);
            setUser(userData);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUserLogged(false);
        setUser(null);
    };

    const getToken = () => localStorage.getItem("token");

    return (
        <AuthContext.Provider value={{ isUserLogged, user, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};
