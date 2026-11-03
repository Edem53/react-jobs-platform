import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Header} from "../modules/Header.jsx";
import {StepTitle} from "../modules/StepTitle.jsx";

import "../scss/module/steptitle.scss";
import "../scss/pages/workinfo/workinfo.scss";
import {API_URL} from "../../api/index.js";

export function WorkInfo() {
    const params = useParams();
    const [details, setDetails] = useState(null);
    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}/ads/${params.id}`);
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setDetails(data);
        })()
    }, [params]);
    if ( !details ) {
        return null;
    }
    return (
        <>
            <Header flag={"задача"}
                    title={details.title}
                    desc={"Подробная информация о задаче и заказчике"} />

            <div className="ad-section">
                <StepTitle step={"01"} title={"Описание"} />

                <div className="job-text">
                    <p>
                        {details.description}
                    </p>
                </div>
            </div>

            <div className="ad-section">
                <StepTitle step={"02"} title={"Условия"} />
                <div className="job-facts">
                    <div className="job-fact">
                        <span className="job-fact__icon">💰</span>
                        <span className="job-fact__label">Оплата</span>
                        <span className="job-fact__value">{details.salary_from} – {details.salary_to} сум</span>
                    </div>

                    <div className="job-fact">
                        <span className="job-fact__icon">🕒</span>
                        <span className="job-fact__label">Занятость</span>
                        <span className="job-fact__value">{details.employment}</span>
                    </div>

                    <div className="job-fact">
                        <span className="job-fact__icon">📍</span>
                        <span className="job-fact__label">Город</span>
                        <span className="job-fact__value">{details.city}</span>
                    </div>

                    <div className="job-fact">
                        <span className="job-fact__icon">🗂</span>
                        <span className="job-fact__label">Категория</span>
                        <span className="job-fact__value">{details.category}</span>
                    </div>

                    <div className="job-fact">
                        <span className="job-fact__icon">🗓</span>
                        <span className="job-fact__label">Опубликовано</span>
                        <span className="job-fact__value">{details.date}</span>
                    </div>
                    {details.agree && (
                        <div className="job-fact job-fact--urgent">
                            <span className="job-fact__icon">🔥</span>
                            <span className="job-fact__label">Срочность</span>
                            <span className="job-fact__value">Срочное объявление</span>
                        </div>
                    )}

                </div>
            </div>

            <div className="ad-section">
                <StepTitle step={"03"} title={"Контакты автора"} />

                <div className="job-author">
                    <Link to={`/profiles/${details.userId}`} className="job-author__avatar">
                        {details.contact_name.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}</Link>

                    <div className="job-author__info">
                        <Link to={`/profiles/${details.userId}`} className="job-author__name">{details.contact_name}</Link>
                        <span className="job-author__role">Автор объявления</span>

                        <div className="job-author__links">
                            <a className="job-link" href={`tel:${details.phone}`}>
                                <span className="job-link__icon">📞</span>
                                <span className="job-link__text">
                                    <small>Телефон</small>
                                    <b>{details.phone}</b>
                                </span>
                            </a>

                            <a className="job-link" href={`mailto:${details.email}`}>
                                <span className="job-link__icon">✉️</span>
                                <span className="job-link__text">
                                    <small>Почта</small>
                                    <b>{details.email}</b>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ad-form__actions">
                <Link to={`/workinfo/${details.id}/chat/${details.userId}`} className="btn btn--primary">
                    <span>Откликнуться</span>
                </Link>

                <Link to={"/find"} className="btn btn--ghost">
                    <span>Назад к списку</span>
                </Link>
            </div>
        </>
    )
}