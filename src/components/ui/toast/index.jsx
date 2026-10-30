
import { useEffect, useState } from "react";
import { eventBus } from "./../../../utils/toast/eventBus.js";
import styles from "./styles.module.css";
export function Toast() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const timers = new Map();


        const unsubscribe = eventBus.on("toast", (data) => {
            // Удаляем таймеры предыдущих тостов
            timers.forEach((timer) => {
                clearTimeout(timer);
            });

            timers.clear();

            // Создаём новый тост
            const id = Date.now() + Math.random();

            setToasts([{ ...data, id }]);

            // Автоматически скрываем его через 4 секунды
            const timer = setTimeout(() => {
                setToasts((prev) =>
                    prev.filter((item) => item.id !== id)
                );

                timers.delete(id);
            }, 4000);

            timers.set(id, timer);
        });


        return () => {
            unsubscribe();

            timers.forEach((timer) => {
                clearTimeout(timer);
            });
        };
    }, []);

    const removeToast = (id) => {
        setToasts((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    return (
        <div className="toast-wrapper">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`toast toast--${toast.type}`}
                >
                    <span className={styles.title}>{toast.message}</span>

                    <button
                        className="close"
                        type="button"
                        onClick={() => removeToast(toast.id)}
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
}
