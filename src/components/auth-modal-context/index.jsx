import {createContext, useContext, useState} from "react";

const authModalContext = createContext({});

export const AuthModalContextProvider = (props) => {
    const { children } = props;

    const [isOpened, setIsOpened] = useState(false);

    const openModal = () => {
        setIsOpened(true);
    };

    const closeModal = () => {
        setIsOpened(false);
    };

    const value = {
        isOpened,
        openModal,
        closeModal
    };

    return (
        <authModalContext.Provider value={value}>
            {children}
        </authModalContext.Provider>
    )
};

export const useAuthModal = () => {
    const context = useContext(authModalContext);

    if (!context) new Error("useAuthModal should be used within the AuthModalContextProvider");

    return context;
};