import { createContext, useContext, useState } from "react";
import {API_URL} from "../../api/index.js";

const profileContext = createContext({});

export const ProfileContextProvider = ({ children }) => {
    const [profile, setProfile] = useState({});

    async function fetchProfile(userId) {
        const token = localStorage.getItem("token");

        if (!token || !userId) {
            setProfile({});
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/profiles?userId=${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка при загрузке профиля");
            }

            const data = await response.json();

            setProfile(data[0] || {});
        } catch (error) {
            console.error(error);
            setProfile({});
        }
    }

    function updateProfile(data) {
        setProfile((prevProfile) => ({
            ...prevProfile,
            ...data,
        }));
    }

    return (
        <profileContext.Provider
            value={{ profile, setProfile, updateProfile, fetchProfile }}
        >
            {children}
        </profileContext.Provider>
    );
};

export const useProfile = () => useContext(profileContext);