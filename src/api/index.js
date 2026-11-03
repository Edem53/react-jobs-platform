export const API_URL = "https://react-jobs-platform.onrender.com";

export const api = {
    getTasks: async (queryParams) => {
        const searchParams = new URLSearchParams(queryParams);

        try {
            const response = await fetch(`${API_URL}/ads?${searchParams.toString()}`);

            if (!response.ok) {
                throw new Error("Ошибка при отправке объявления");
            }

            const data = await response.json();

            return data;

        } catch (error) {
            console.error(error);
        }
    },
    updateProfile: async ({ id, ...payload }) => {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/profiles/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Ошибка сервера:", response.status, data);
            throw new Error(data.message || JSON.stringify(data));
        }

        return data;
    },
};