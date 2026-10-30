import {StepTitle} from "../../modules/StepTitle.jsx";

export function ContactsContent() {
    return (
        <>
            <div className="ad-section">
                <StepTitle step={"01"} title={"Как с нами связаться"}/>

                <div className="contact-grid">
                    <a className="contact-card" href="tel:+79000000000">
                        <span className="contact-card__icon">📞</span>
                        <span className="contact-card__label">Телефон</span>
                        <span className="contact-card__value">+7 (900) 000-00-00</span>
                        <span className="contact-card__hint">Звонки принимаем ежедневно</span>
                        <span className="contact-card__arrow">↗</span>
                    </a>

                    <a className="contact-card" href="mailto:support@jobboard.ru">
                        <span className="contact-card__icon">✉️</span>
                        <span className="contact-card__label">Почта</span>
                        <span className="contact-card__value">support@jobboard.ru</span>
                        <span className="contact-card__hint">Ответим в течение дня</span>
                        <span className="contact-card__arrow">↗</span>
                    </a>

                    <div className="contact-card">
                        <span className="contact-card__icon">📍</span>
                        <span className="contact-card__label">Адрес</span>
                        <span className="contact-card__value">г. Москва, ул. Примерная, 1</span>
                        <span className="contact-card__hint">Офис 305, 3 этаж</span>
                    </div>
                </div>
            </div>
            <div className="ad-section">
                <StepTitle step={"02"} title={"График и соцсети"}/>

                <div className="contact-split">
                    <div className="panel">
                        <div className="panel__head">
                            <h4 className="panel__title">График работы</h4>
                            <span className="panel__status">Сейчас открыто</span>
                        </div>

                        <ul className="hours">
                            <li className="hours__row hours__row--today">
                                <span className="hours__day">Понедельник <i className="hours__tag">Сегодня</i></span>
                                <span className="hours__time">09:00 – 19:00</span>
                            </li>
                            <li className="hours__row">
                                <span className="hours__day">Вторник</span>
                                <span className="hours__time">09:00 – 19:00</span>
                            </li>
                            <li className="hours__row">
                                <span className="hours__day">Среда</span>
                                <span className="hours__time">09:00 – 19:00</span>
                            </li>
                            <li className="hours__row">
                                <span className="hours__day">Четверг</span>
                                <span className="hours__time">09:00 – 19:00</span>
                            </li>
                            <li className="hours__row">
                                <span className="hours__day">Пятница</span>
                                <span className="hours__time">09:00 – 18:00</span>
                            </li>
                            <li className="hours__row">
                                <span className="hours__day">Суббота</span>
                                <span className="hours__time">10:00 – 15:00</span>
                            </li>
                            <li className="hours__row hours__row--off">
                                <span className="hours__day">Воскресенье</span>
                                <span className="hours__time">Выходной</span>
                            </li>
                        </ul>
                    </div>
                    <div className="panel">
                        <div className="panel__head">
                            <h4 className="panel__title">Мы в соцсетях</h4>
                        </div>

                        <ul className="socials">
                            <li>
                                <a className="social" href="#">
                                    <span className="social__icon">TG</span>
                                    <span className="social__text">
                                      <b>Telegram</b>
                                      <small>@jobboard</small>
                                    </span>
                                    <span className="social__arrow">↗</span>
                                </a>
                            </li>
                            <li>
                                <a className="social" href="#">
                                    <span className="social__icon">VK</span>
                                    <span className="social__text">
                                      <b>ВКонтакте</b>
                                      <small>vk.com/jobboard</small>
                                    </span>
                                    <span className="social__arrow">↗</span>
                                </a>
                            </li>
                            <li>
                                <a className="social" href="#">
                                    <span className="social__icon">WA</span>
                                    <span className="social__text">
                                      <b>WhatsApp</b>
                                      <small>Написать в чат</small>
                                    </span>
                                    <span className="social__arrow">↗</span>
                                </a>
                            </li>
                            <li>
                                <a className="social" href="#">
                                    <span className="social__icon">YT</span>
                                    <span className="social__text">
                                      <b>YouTube</b>
                                      <small>Видеоинструкции</small>
                                    </span>
                                    <span className="social__arrow">↗</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="ad-section">
                <StepTitle step={"03"} title={"Напишите нам"}/>

                <form action="#" method="post">
                    <div className="ad-grid">
                        <div className="field">
                            <input className="field__input" id="contact-name" name="name" type="text" placeholder=" "
                                   autoComplete="name" required/>
                            <label className="field__label" htmlFor="contact-name">Ваше имя</label>
                        </div>

                        <div className="field">
                            <input className="field__input" id="contact-email" name="email" type="email" placeholder=" "
                                   autoComplete="email" required/>
                            <label className="field__label" htmlFor="contact-email">Email</label>
                        </div>

                        <div className="field field--select field--full">
                            <select className="field__input field__select" id="contact-topic" name="topic" required>
                                <option value="" disabled selected hidden></option>
                                <option value="question">Вопрос по сайту</option>
                                <option value="ad">Проблема с объявлением</option>
                                <option value="partner">Сотрудничество</option>
                                <option value="other">Другое</option>
                            </select>
                            <label className="field__label" htmlFor="contact-topic">Тема обращения</label>
                        </div>

                        <div className="field field--textarea field--full">
                            <textarea className="field__input" id="contact-text" name="message" placeholder=" "
                                      maxLength="1000" required></textarea>
                            <label className="field__label" htmlFor="contact-text">Ваше сообщение</label>
                        </div>
                    </div>

                    <p className="ad-hint">Мы ответим на указанную почту в течение рабочего дня.</p>

                    <label className="check contact-check">
                        <input type="checkbox" name="agree" required/>
                        <span className="check__box"></span>
                        <span className="check__text">Я согласен на обработку персональных данных</span>
                    </label>

                    <div className="ad-form__actions">
                        <button className="btn btn--primary" type="submit"><span>Отправить сообщение</span></button>
                        <button className="btn btn--ghost" type="reset"><span>Очистить</span></button>
                    </div>
                </form>
            </div>
        </>
    )
}