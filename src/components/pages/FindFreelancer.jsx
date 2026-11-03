import { useState} from "react";
import { Header } from "../modules/Header.jsx";
import { toast } from "../../utils/toast/index.js";
import "../scss/form/form.scss";
import {StepTitle} from "../modules/StepTitle.jsx";
import {API_URL} from "../../api/index.js";

export function FindFreelancer() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.currentTarget;

        if (isSubmitting) return;



        const formResult = {
            title: form.elements.title.value,
            category: form.elements.category.value,
            city: form.elements.city.value,
            employment: form.querySelector(
                'input[name="employment"]:checked'
            )?.value,
            description: form.elements.description.value,
            salary_from: form.elements.salary_from.value,
            salary_to: form.elements.salary_to.value,
            urgent: form.elements.urgent.checked,
            date: form.elements.date.value,
            contact_name: form.elements.contact_name.value,
            phone: form.elements.phone.value,
            email: form.elements.email.value,
            agree: form.elements.agree.checked
        };

        try {
            const response = await fetch(`${API_URL}/ads`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formResult)
            });

            if (!response.ok) {
                throw new Error("Не удалось опубликовать объявление");
            }

            await response.json();

            form.reset();

            toast.success("Объявление опубликовано! Спасибо.");
        } catch (error) {
            toast.error("Ошибка отправки. Проверьте соединение и попробуйте ещё раз.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>


            <Header flag={"Новое объявление"}
                    title={"Расскажите, кого вы ищете"}
                    desc={"Заполните форму, и объявление появится на сайте"} />

            <form className="ad-form__body" method="post" onSubmit={handleSubmit}>
                <div className="ad-section">
                    <StepTitle step={"01"} title={"Основное"}/>

                    <div className="ad-grid">
                        <div className="field field--full">
                            <input className="field__input" id="ad-title" name="title" type="text" placeholder=" "
                                   maxLength="80" required/>
                            <label className="field__label" htmlFor="ad-title">Заголовок объявления</label>
                        </div>

                        <div className="field field--select">
                            <select className="field__input field__select" id="ad-category" name="category" required>
                                <option value="" disabled selected hidden></option>
                                <option value="it">IT и разработка</option>
                                <option value="design">Дизайн</option>
                                <option value="sales">Продажи</option>
                                <option value="service">Сервис и услуги</option>
                                <option value="other">Другое</option>
                            </select>
                            <label className="field__label" htmlFor="ad-category">Категория</label>
                        </div>

                        <div className="field">
                            <input className="field__input" id="ad-city" name="city" type="text" placeholder=" "
                                   autoComplete="address-level2" required/>
                            <label className="field__label" htmlFor="ad-city">Город</label>
                        </div>

                        <div className="field">
                            <span className="ad-caption">Тип занятости</span>
                            <div className="chips">
                                    <input id="emp-full" type="radio" name="employment" value="full"/>
                                    <label htmlFor="emp-full">Полная</label>

                                    <input id="emp-part" type="radio" name="employment" value="part"/>
                                    <label htmlFor="emp-part">Частичная</label>

                                    <input id="emp-remote" type="radio" name="employment" value="remote"/>
                                    <label htmlFor="emp-remote">Удалённо</label>

                                    <input id="emp-project" type="radio" name="employment" value="project"/>
                                    <label htmlFor="emp-project">Проект</label>
                                </div>
                            </div>
                        <div className="field">
                            <span className="ad-caption">Дата</span>
                            <input className="field__input" id="ad-date" name="date" type="date" placeholder=" "
                                   autoComplete="date" required/>
                        </div>
                    </div>

                </div>
                <div className="ad-section">
                    <StepTitle step={"02"} title={"Описание"}/>

                    <div className="ad-grid">
                        <div className="field field--textarea field--full">
                            <textarea className="field__input" id="ad-text" name="description" placeholder=" "
                                      maxLength="1000" required></textarea>
                            <label className="field__label" htmlFor="ad-text">Обязанности, требования, условия</label>
                        </div>
                    </div>
                    <p className="ad-hint">До 1000 символов. Чем подробнее, тем больше откликов.</p>
                </div>
                <div className="ad-section">
                    <StepTitle step={"03"} title={"Оплата"}/>

                    <div className="ad-grid">
                        <div className="field">
                            <input className="field__input" id="ad-from" name="salary_from" type="number" min="0"
                                   placeholder=" "/>
                            <label className="field__label" htmlFor="ad-from">Оплата от</label>
                        </div>

                        <div className="field">
                            <input className="field__input" id="ad-to" name="salary_to" type="number" min="0"
                                   placeholder=" "/>
                            <label className="field__label" htmlFor="ad-to">Оплата до</label>
                        </div>

                        <label className="switch field--full">
                            <input type="checkbox" name="urgent"/>
                            <span className="switch__track"><span className="switch__knob"></span></span>
                            <span className="switch__text">
                                <b>Срочное объявление</b>
                                <small>Будет выделено неоном и поднято вверх списка</small>
                            </span>
                        </label>
                    </div>
                </div>
                <div className="ad-section">
                    <StepTitle step={"04"} title={"Контакты"}/>

                    <div className="ad-grid">
                        <div className="field">
                            <input className="field__input" id="ad-name" name="contact_name" type="text" placeholder=" "
                                   autoComplete="name" required/>
                            <label className="field__label" htmlFor="ad-name">Ваше имя</label>
                        </div>

                        <div className="field">
                            <input className="field__input" id="ad-phone" name="phone" type="tel" placeholder=" "
                                   autoComplete="tel" required/>
                            <label className="field__label" htmlFor="ad-phone">Телефон</label>
                        </div>

                        <div className="field field--full">
                            <input className="field__input" id="ad-email" name="email" type="email" placeholder=" "
                                   autoComplete="email"/>
                            <label className="field__label" htmlFor="ad-email">Email (необязательно)</label>
                        </div>
                        <label className="check">
                            <input type="checkbox" name="agree" required/>
                            <span className="check__box"></span>
                            <span className="check__text">Я согласен с правилами размещения объявлений</span>
                        </label>
                    </div>
                </div>



                <div className="ad-form__actions">
                    <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
                        <span>
                            {isSubmitting ? (
                                <>
                                    <span className="form-spinner" />
                                    Отправляем...
                                </>
                            ) : (
                                "Опубликовать"
                            )}
                        </span>
                    </button>
                    <button className="btn btn--ghost" type="reset"><span>Очистить</span></button>
                </div>
            </form>
        </>
    )
}