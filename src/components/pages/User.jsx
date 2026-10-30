import {useEffect, useState} from "react";
import { useLogout } from "../useLogout.js";
import { useProfile } from "./../profile-context/index.jsx";

import {api} from "../../api/index.js";
import {toast} from "../../utils/toast/index.js";

import {StepTitle} from "../modules/StepTitle.jsx";
import {Advantages} from "../modules/Advantages.jsx";

import {ProfileCard} from "../modules/ProfileCard.jsx";

import "../scss/pages/user/user.scss";



function User() {
    const quitAcc = useLogout();
    const { profile, setProfile } = useProfile();

    const [userTasks, setUserTasks] = useState([]);
    const [userReview, setUserReview] = useState([]);

    if (!profile.email) {
        return <p>Загружаем профиль...</p>;
    }

    const [isSubmitting, setIsSubmitting] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        const passwordOld = form.elements.password_old.value;
        const passwordNew = form.elements.password_new.value;
        const passwordRepeat = form.elements.password_repeat.value;

        if (passwordNew || passwordRepeat || passwordOld) {
            if (!passwordOld || !passwordNew || !passwordRepeat) {
                toast.error("Для смены пароля заполните все три поля.");
                return;
            }

            if (passwordNew !== passwordRepeat) {
                toast.error("Новые пароли не совпадают.");
                return;
            }
        }

        const obj = {
            id: profile.id,
            firstName: form.elements.first_name.value,
            lastName: form.elements.last_name.value,
            birth: form.elements.birth.value,
            city: form.elements.city.value,
            gender: form.elements.gender.value,
            email: form.elements.email.value,
            phone: form.elements.phone.value,
            telegram: form.elements.telegram.value,
            sphere: form.elements.sphere.value,
            about: form.elements.about.value,
            notifyEmail: form.elements.notify_email.checked,
            notifyNews: form.elements.notify_news.checked,
        };

        setIsSubmitting(true);

        try {
            const data = await api.updateProfile(obj);
            setProfile(data);

            const fullName = `${data.firstName} ${data.lastName}`;

            const response = await fetch(
                `http://localhost:3001/ads?userId=${profile.userId}`
            );

            const userAds = await response.json();

            await Promise.all(
                userAds.map((ad) =>
                    fetch(`http://localhost:3001/ads/${ad.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            contact_name: fullName,
                            phone: data.phone,
                            email: data.email,
                        }),
                    })
                )
            );
            toast.success("Изменения успешно сохранены!");
        } catch (error) {
            console.error(error);

            toast.error("Не удалось сохранить изменения.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        (async () => {
            const responseTask = await fetch(`http://localhost:3001/ads?userId=${profile.userId}`);
            const responseReviews = await fetch(`http://localhost:3001/comments?userId=${profile.userId}`);
            if (!responseTask.ok || !responseReviews.ok) {
                return;
            }
            const data2 = await responseTask.json();
            const data3 = await responseReviews.json();
            setUserTasks(data2);
            setUserReview(data3);
        })()

    }, [profile]);

    let fullName = profile.firstName + ' ' + profile.lastName;
    return (
        <>

            <div className="ad-section">
                <StepTitle step={"01"} title={"Мой профиль"}/>
                <ProfileCard nl={fullName.split(" ")
                                         .map((word) => word[0])
                                         .join("")
                                         .toUpperCase()} fullname={fullName} email={profile.email}/>

                <Advantages
                    tasks={userTasks.length}

                    completed={"15"}

                    rating={(
                        userReview.reduce((sum, review) => sum + Number(review.rating), 0) /
                        userReview.length
                    ).toFixed(1)}

                />
            </div>

            <form onSubmit={onSubmit}>
                <div className="ad-section">
                    <StepTitle step={"02"} title={"Личные данные"}/>

                    <div className="ad-grid">
                        <div className="field">
                            <input className="field__input" id="user-first" name="first_name" type="text" placeholder=" " defaultValue={profile.firstName || ""} autoComplete="given-name" required />
                            <label className="field__label" htmlFor="user-first">Имя</label>
                        </div>

                        <div className="field">
                            <input className="field__input" id="user-last" name="last_name" type="text" placeholder=" " defaultValue={profile.lastName || ""} autoComplete="family-name" required />
                            <label className="field__label" htmlFor="user-last">Фамилия</label>
                        </div>

                        <div className="field">
                            <input className="field__input" id="user-birth" name="birth" type="date" placeholder=" " defaultValue={profile.birth || ""} autoComplete="bday" />
                            <label className="field__label" htmlFor="user-birth">Дата рождения</label>
                        </div>

                        <div className="field">
                            <input className="field__input" id="user-city" name="city" type="text" placeholder=" " defaultValue={profile.city || ""} autoComplete="address-level2" />
                            <label className="field__label" htmlFor="user-city">Город</label>
                        </div>

                        <div className="field--full">
                            <span className="ad-caption">Пол</span>
                            <div className="chips">
                                <input type="radio" name="gender" id="gender-male" value="male" defaultChecked={profile.gender === "male"} />
                                <label htmlFor="gender-male">Мужской</label>

                                <input type="radio" name="gender" id="gender-female" value="female" defaultChecked={profile.gender === "female"}/>
                                <label htmlFor="gender-female">Женский</label>

                                <input type="radio" name="gender" id="gender-none" value="none" defaultChecked={profile.gender === "none"}/>
                                <label htmlFor="gender-none">Не указывать</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ad-section">
                    <StepTitle step={"03"} title={"Контакты"}/>

                    <div className="ad-grid">
                        <div className="field">
                            <input className="field__input" id="user-email" name="email" type="email" placeholder=" " defaultValue={profile.email || ""} autoComplete="email" required />
                            <label className="field__label" htmlFor="user-email">Email</label>
                        </div>

                        <div className="field">
                            <input className="field__input" id="user-phone" name="phone" type="tel" placeholder=" " defaultValue={profile.phone || ""} autoComplete="tel" />
                            <label className="field__label" htmlFor="user-phone">Телефон</label>
                        </div>

                        <div className="field">
                            <input className="field__input" id="user-telegram" name="telegram" type="text" placeholder=" " defaultValue={profile.telegram || ""} />
                            <label className="field__label" htmlFor="user-telegram">Telegram</label>
                        </div>

                        <div className="field field--select">
                            <select className="field__input field__select" id="user-sphere" name="sphere" defaultValue={profile.sphere || "other"} required>
                                <option value="it">IT и разработка</option>
                                <option value="design">Дизайн</option>
                                <option value="sales">Продажи</option>
                                <option value="service">Сервис и услуги</option>
                                <option value="other">Другое</option>
                            </select>
                            <label className="field__label" htmlFor="user-sphere">Сфера деятельности</label>
                        </div>
                    </div>
                </div>

                <div className="ad-section">
                    <StepTitle step={"04"} title={"О себе"}/>

                    <div className="ad-grid">
                        <div className="field field--textarea field--full">
                            <textarea className="field__input" id="user-about" name="about" placeholder=" " maxLength={500} defaultValue={profile.about || ""} />
                            <label className="field__label" htmlFor="user-about">Расскажите о себе</label>
                        </div>
                    </div>
                    <p className="ad-hint">До 500 символов. Этот текст увидят другие пользователи.</p>
                </div>

                <div className="ad-section">
                    <StepTitle step={"05"} title={"Безопасность"}/>

                    <div className="ad-grid">
                        <div className="field field--full">
                            <input className="field__input" id="user-pass-old" name="password_old" type="password" placeholder=" " autoComplete="current-password" />
                            <label className="field__label" htmlFor="user-pass-old">Текущий пароль</label>
                        </div>

                        <div className="field">
                            <input className="field__input" id="user-pass-new" name="password_new" type="password" placeholder=" " autoComplete="new-password" />
                            <label className="field__label" htmlFor="user-pass-new">Новый пароль</label>
                        </div>

                        <div className="field">
                            <input className="field__input" id="user-pass-repeat" name="password_repeat" type="password" placeholder=" " autoComplete="new-password" />
                            <label className="field__label" htmlFor="user-pass-repeat">Повторите пароль</label>
                        </div>
                    </div>
                    <p className="ad-hint">Оставьте поля пустыми, если не хотите менять пароль.</p>
                </div>

                <div className="ad-section">
                    <StepTitle step={"06"} title={"Уведомления"}/>

                    <div className="ad-grid">
                        <label className="switch field--full">
                            <input type="checkbox" name="notify_email" defaultChecked={profile.notifyEmail ?? true} />
                            <span className="switch__track"><span className="switch__knob"></span></span>
                            <span className="switch__text">
                                <b>Уведомления на почту</b>
                                <small>Новые отклики и сообщения по вашим объявлениям</small>
                            </span>
                        </label>

                        <label className="switch field--full">
                            <input type="checkbox" name="notify_news" defaultChecked={profile.notifyNews ?? false} />
                            <span className="switch__track"><span className="switch__knob"></span></span>
                            <span className="switch__text">
                                <b>Новости сервиса</b>
                                <small>Редкие письма об обновлениях и новых возможностях</small>
                            </span>
                        </label>
                    </div>
                </div>

                <div className="ad-form__actions">

                    <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
                        <span>
                            {isSubmitting ? (
                                <>
                                    <span className="form-spinner" />
                                    Сохраняем...
                                </>
                            ) : (
                                "Сохранить изменения"
                            )}
                        </span>
                    </button>
                    <button className="btn btn--ghost" type="button" onClick={quitAcc}><span>Выйти</span></button>
                </div>
            </form>
        </>
    )
}

export default User