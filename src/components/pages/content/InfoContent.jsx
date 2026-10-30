import {StepTitle} from "../../modules/StepTitle.jsx";

export function InfoContent() {
    return (
        <>
            <div className="ad-section">
                <StepTitle step={"01"} title={"О нашем сервисе"}/>

                <div className="about-intro">
                    <div className="about-intro__text">
                        <p className="about-intro__lead">
                            JobBoard помогает людям находить работу, а работодателям находить людей, без лишних шагов.
                        </p>
                        <p>
                            Мы собрали в одном месте объявления о работе и услугах. Разместить объявление можно за пару
                            минут,
                            а найти подходящее по городу, оплате и типу занятости ещё быстрее.
                        </p>
                        <p>
                            Никаких сложных анкет и скрытых условий. Только понятные карточки, честные фильтры и прямой
                            контакт между людьми.
                        </p>
                    </div>

                    <blockquote className="about-quote">
                        <span className="about-quote__mark">“</span>
                        <p className="about-quote__text">Работа должна находиться легко, а размещение объявления
                            занимать минуты.</p>
                        <footer className="about-quote__author">Наша миссия</footer>
                    </blockquote>
                </div>

                <div className="stats">
                    <div className="stat">
                        <span className="stat__value">12 000+</span>
                        <span className="stat__label">объявлений на сайте</span>
                    </div>
                    <div className="stat">
                        <span className="stat__value">5 000+</span>
                        <span className="stat__label">активных пользователей</span>
                    </div>
                    <div className="stat">
                        <span className="stat__value">40+</span>
                        <span className="stat__label">городов</span>
                    </div>
                    <div className="stat">
                        <span className="stat__value">24/7</span>
                        <span className="stat__label">работа сервиса</span>
                    </div>
                </div>
            </div>

            <div className="ad-section">
                <StepTitle step={"02"} title={"Как это работает"}/>

                <ol className="steps">
                    <li className="step">
                        <span className="step__num">1</span>
                        <h4 className="step__title">Регистрация</h4>
                        <p className="step__text">Создайте аккаунт за минуту: достаточно имени и пароля.</p>
                    </li>
                    <li className="step">
                        <span className="step__num">2</span>
                        <h4 className="step__title">Объявление или поиск</h4>
                        <p className="step__text">Разместите своё объявление или найдите подходящее в каталоге.</p>
                    </li>
                    <li className="step">
                        <span className="step__num">3</span>
                        <h4 className="step__title">Связь напрямую</h4>
                        <p className="step__text">Откликайтесь и договаривайтесь напрямую, без посредников.</p>
                    </li>
                    <li className="step">
                        <span className="step__num">4</span>
                        <h4 className="step__title">Результат</h4>
                        <p className="step__text">Получите работу или нужного специалиста в короткие сроки.</p>
                    </li>
                </ol>
            </div>

            <div className="ad-section">
                <StepTitle step={"03"} title={"Почему выбирают нас"}/>

                <div className="features">
                    <div className="feature">
                        <span className="feature__icon">⚡</span>
                        <h4 className="feature__title">Быстро</h4>
                        <p className="feature__text">Объявление публикуется за пару минут и сразу попадает в
                            каталог.</p>
                    </div>
                    <div className="feature">
                        <span className="feature__icon">🔎</span>
                        <h4 className="feature__title">Удобный поиск</h4>
                        <p className="feature__text">Поиск, сортировка и фильтры по типу занятости помогают найти
                            нужное.</p>
                    </div>
                    <div className="feature">
                        <span className="feature__icon">🤝</span>
                        <h4 className="feature__title">Прямой контакт</h4>
                        <p className="feature__text">Связывайтесь с автором объявления напрямую, без комиссий.</p>
                    </div>
                    <div className="feature">
                        <span className="feature__icon">🔥</span>
                        <h4 className="feature__title">Срочные объявления</h4>
                        <p className="feature__text">Срочные объявления выделяются и поднимаются вверх списка.</p>
                    </div>
                    <div className="feature">
                        <span className="feature__icon">🛡</span>
                        <h4 className="feature__title">Безопасность</h4>
                        <p className="feature__text">Мы следим за порядком и проверяем жалобы пользователей.</p>
                    </div>
                    <div className="feature">
                        <span className="feature__icon">📱</span>
                        <h4 className="feature__title">На любом устройстве</h4>
                        <p className="feature__text">Сайт одинаково удобно работает на компьютере, планшете и
                            телефоне.</p>
                    </div>
                </div>
            </div>

            <div className="ad-section">
                <StepTitle step={"04"} title={"Частые вопросы"}/>

                <div className="faq">
                    <details className="faq__item" open>
                        <summary className="faq__question">Сколько стоит размещение объявления?</summary>
                        <p className="faq__answer">Базовое размещение бесплатно. Платно только выделение срочного
                            объявления.</p>
                    </details>

                    <details className="faq__item">
                        <summary className="faq__question">Как быстро появится моё объявление?</summary>
                        <p className="faq__answer">Сразу после публикации. Если объявление требует проверки, это
                            занимает не больше нескольких часов.</p>
                    </details>

                    <details className="faq__item">
                        <summary className="faq__question">Можно ли отредактировать или удалить объявление?</summary>
                        <p className="faq__answer">Да, в любой момент. Откройте своё объявление и измените данные или
                            снимите его с публикации.</p>
                    </details>

                    <details className="faq__item">
                        <summary className="faq__question">Как связаться с поддержкой?</summary>
                        <p className="faq__answer">Напишите нам через форму на странице «Контакты» или на почту.
                            Отвечаем в течение рабочего дня.</p>
                    </details>
                </div>
            </div>

            <div className="cta-banner">
                <div className="cta-banner__text">
                    <h4 className="cta-banner__title">Готовы начать?</h4>
                    <p className="cta-banner__sub">Разместите первое объявление прямо сейчас.</p>
                </div>
                <button className="btn btn--primary" type="button"><span>Дать объявление</span></button>
            </div>
        </>
    )
}