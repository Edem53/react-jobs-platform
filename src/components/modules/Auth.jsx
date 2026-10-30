
import { useState } from "react";
import { useAuthModal } from "../auth-modal-context/index.jsx";
import { useProfile } from "../profile-context/index.jsx";
import "../scss/form/form.scss";

export function Auth() {
    const [activeForm, setActiveForm] = useState("login");
    const modal = useAuthModal();
    const { fetchProfile } = useProfile();


    async function handleLogin(e) {
        e.preventDefault();

        const email = e.currentTarget.elements.email.value;
        const password = e.currentTarget.elements.password.value;

        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data);
                return;
            }

            localStorage.setItem("token", data.accessToken);

            await fetchProfile(data.user.id);

            modal.closeModal();
        } catch (error) {
            console.error("Ошибка авторизации:", error);
        }
    }


    function handleRegister(e) {
        e.preventDefault();
        let userData = {}
        if ( e.currentTarget.elements.password.value === e.currentTarget.elements.password_repeat.value ) {
            const email = e.currentTarget.elements.email.value;
            const password = e.currentTarget.elements.password.value;
            userData = {
                email,
                password
            }
        } else {
            console.log("Не совпадают пароль ошибка!");
            return;
        }

        fetch("http://localhost:3001/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
            }),
        }).then(async (response) => {
            const data = await response.json();
            const obj= {
                   ok: response.ok,
                   data: data
                }
                return obj;
        }).then((obj) => {

            if ( obj.ok ) {
                console.log("Регистрация успешна");
                localStorage.setItem("token", obj.data.accessToken);
                setActiveForm("login");
            } else {
                console.log(obj.data);
            }
        });
    }
    return (
        <>
            <div className={`auth auth--login ${activeForm === "login" ? "active" : ""}`}>
                <h2 className="auth__title">Авторизация</h2>
                <p className="auth__subtitle">
                    Войдите в свой аккаунт
                </p>

                <form className="auth__form" onSubmit={handleLogin}>
                    <div className="field">
                        <input
                            className="field__input"
                            id="login-email"
                            name="email"
                            type="email"
                            placeholder=" "
                            autoComplete="username"
                            required
                        />
                        <label
                            className="field__label"
                            htmlFor="login-email"
                        >
                            E-mail
                        </label>
                    </div>

                    <div className="field">
                        <input
                            className="field__input"
                            id="login-password"
                            name="password"
                            type="password"
                            placeholder=" "
                            autoComplete="current-password"
                            required
                        />
                        <label
                            className="field__label"
                            htmlFor="login-password"
                        >
                            Пароль
                        </label>
                    </div>

                    <div className="auth__actions">
                        <button
                            className="btn btn--primary"
                            type="submit"
                        >
                            <span>Войти</span>
                        </button>

                        <button
                            className="btn btn--ghost"
                            type="button"
                            onClick={() => setActiveForm("register")}
                        >
                            <span>Регистрация</span>
                        </button>
                    </div>
                </form>
            </div>

            <div className={`auth auth--register ${activeForm === "register" ? "active" : ""}`}>
                <h2 className="auth__title">Регистрация</h2>
                <p className="auth__subtitle">
                    Создайте новый аккаунт
                </p>

                <form className="auth__form" onSubmit={handleRegister}>
                    <div className="field">
                        <input
                            className="field__input"
                            id="reg-email"
                            name="email"
                            type="email"
                            placeholder=" "
                            autoComplete="username"
                            required
                        />
                        <label
                            className="field__label"
                            htmlFor="reg-email"
                        >
                            E-mail
                        </label>
                    </div>

                    <div className="field">
                        <input
                            className="field__input"
                            id="reg-password"
                            name="password"
                            type="password"
                            placeholder=" "
                            autoComplete="new-password"
                            required
                        />
                        <label
                            className="field__label"
                            htmlFor="reg-password"
                        >
                            Пароль
                        </label>
                    </div>

                    <div className="field">
                        <input
                            className="field__input"
                            id="reg-password-repeat"
                            name="password_repeat"
                            type="password"
                            placeholder=" "
                            autoComplete="new-password"
                            required
                        />
                        <label
                            className="field__label"
                            htmlFor="reg-password-repeat"
                        >
                            Повторите пароль
                        </label>
                    </div>

                    <div className="auth__actions">
                        <button
                            className="btn btn--primary"
                            type="submit"
                        >
                            <span>Создать аккаунт</span>
                        </button>

                        <button
                            className="btn btn--ghost"
                            type="button"
                            onClick={() => setActiveForm("login")}
                        >
                            <span>Авторизация</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
