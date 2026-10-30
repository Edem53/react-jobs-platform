import {Header} from "../modules/Header.jsx";
import {Stars} from "../modules/Stars.jsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";


import {StepTitle} from "../modules/StepTitle.jsx";
import {Advantages} from "../modules/Advantages.jsx";
import {ProfileCard} from "../modules/ProfileCard.jsx";

import "../scss/pages/user/user.scss";
import "../scss/pages/profiles/profiles.scss";

export function Profiles() {
    const params = useParams();
    const [userTasks, setUserTasks] = useState([]);
    const [userReview, setUserReview] = useState([]);
    const [details, setDetails] = useState(null);
    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3001/profiles?userId=${params.id}`);
            const responseTask = await fetch(`http://localhost:3001/ads?userId=${params.id}`);
            const responseReviews = await fetch(`http://localhost:3001/comments?userId=${params.id}`);
            if (!response.ok || !responseTask.ok || !responseReviews.ok) {
                return;
            }
            const data = await response.json();
            const data2 = await responseTask.json();
            const data3 = await responseReviews.json();
            setDetails(data);
            setUserTasks(data2);
            setUserReview(data3);
        })()

    }, [params]);

    if (!details || details.length === 0) {
        return <p>Загрузка профиля...</p>;
    }
    const fullName = details[0].firstName + " " + details[0].lastName;
    return (

        <>
            <Header
                flag={"профиль заказчика"}
                title={"Информация о заказчике"}
                desc={"Профиль, контактные данные, объявления и отзывы исполнителей в одном месте."}
            />

            <div className="ad-section">
                <StepTitle step={"01"} title={"Заказчик"} />
                <ProfileCard nl={fullName.split(" ")
                                .map((word) => word[0])
                                .join("").toUpperCase()} fullname={fullName} email={details[0].email}/>
                <Advantages
                    tasks={userTasks.length}

                    completed={"15"}

                    rating={(
                    userReview.reduce((sum, review) => sum + Number(review.rating), 0) /
                    userReview.length
                ).toFixed(1)}

                />
            </div>

            <div className="ad-section">
                <StepTitle step={"02"} title={"Информация"} />

                <div className="job-facts">
                    <div className="job-fact">
                        <span className="job-fact__icon">👤</span>
                        <span className="job-fact__label">Имя</span>
                        <span className="job-fact__value">{fullName}</span>
                    </div>

                    <div className="job-fact">
                        <span className="job-fact__icon">📍</span>
                        <span className="job-fact__label">Город</span>
                        <span className="job-fact__value">{details[0].city}</span>
                    </div>

                    <div className="job-fact">
                        <span className="job-fact__icon">🗂</span>
                        <span className="job-fact__label">Сфера деятельности</span>
                        <span className="job-fact__value">{details[0].sphere}</span>
                    </div>

                    <div className="job-fact">
                        <span className="job-fact__icon">🗓</span>
                        <span className="job-fact__label">На сайте с</span>
                        <span className="job-fact__value">15 марта 2024</span>
                    </div>
                </div>
            </div>

            <div className="ad-section">
                <StepTitle step={"03"} title={"О заказчике"} />

                <div className="job-text">
                    <p>
                        {details[0].about}
                    </p>
                </div>
            </div>

            <div className="ad-section">
                <StepTitle step={"04"} title={"Контакты"} />

                <div className="job-author__links">
                    <a className="job-link" href={`tel:${details[0].phone}`}>
                        <span className="job-link__icon">📞</span>
                        <span className="job-link__text">
                            <small>Телефон</small>
                            <b>{details[0].phone}</b>
                        </span>
                    </a>

                    <a className="job-link" href={`mailto:${details[0].email}`}>
                        <span className="job-link__icon">✉️</span>
                        <span className="job-link__text">
                            <small>Почта</small>
                            <b>{details[0].email}</b>
                        </span>
                    </a>

                    <a className="job-link" href="https://t.me/alex_kuznetsov">
                        <span className="job-link__icon">💬</span>
                        <span className="job-link__text">
                            <small>Telegram</small>
                            <b>{details[0].telegram}</b>
                        </span>
                    </a>
                </div>

                <ul className="verify">
                    <li className="verify__item verify__item--ok">Телефон подтверждён</li>
                    <li className="verify__item">Почта подтверждена</li>
                    <li className="verify__item verify__item--ok">Профиль проверен</li>
                </ul>
            </div>

            <div className="ad-section">
                <StepTitle step={"05"} title={"Объявления заказчика"} />
                <ul className="jobs__list">
                    {userTasks.map((task, index) => (
                        <li key={task.id} className={`job-card ${task.urgent ? "job-card--urgent" : ""}`} style={{ "--i": index }}>
                            <div className="job-card__avatar">АК</div>

                            <div className="job-card__main">
                                <div className="job-card__top">
                                    <h3 className="job-card__title">{task.title}</h3>
                                    {task.urgent && <span className="job-card__urgent">Срочно</span>}
                                </div>

                                <div className="job-card__meta">
                                    <span>📍 Ташкент</span>
                                    <span>🗓 {task.date}</span>
                                </div>

                                <div className="job-card__tags">
                                    <span className="job-card__tag">{task.category}</span>
                                    <span className="job-card__tag job-card__tag--alt">{task.employment}</span>
                                </div>
                            </div>

                            <div className="job-card__side">
                                <span className="job-card__salary">{task.salary_from} – {task.salary_to} сум</span>
                                <Link to={`/workinfo/${task.id}`} className="btn btn--ghost btn--sm">
                                    <span>Открыть</span>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="ad-section">
                <StepTitle step={"06"} title={"Отзывы исполнителей"} />

                <ul className="reviews">
                    {userReview.map((review, index) => {
                        const content = (
                            <>
                                <div className="review__avatar">
                                    {review.anonymous
                                        ? "А"
                                        : `${review.lastName} ${review.name}`
                                            .split(" ")
                                            .filter(Boolean)
                                            .map((word) => word[0])
                                            .join("")
                                            .toUpperCase()}
                                </div>

                                <div className="review__body">
                                    <div className="review__head">
                                        <b className="review__author">
                                            {review.anonymous
                                                ? "Аноним"
                                                : `${review.lastName} ${review.name}`}
                                        </b>

                                        <Stars value={review.rating} />

                                        <span className="review__date">
                                            12 октября 2026
                                        </span>
                                    </div>

                                    <p className="review__text">
                                        <span>Отзыв по задаче: </span>
                                        <b style={{ color: "#a855f7" }}>
                                            {review.adTitle}
                                        </b>
                                    </p>

                                    <br />

                                    <p className="review__title">
                                        {review.title}
                                    </p>

                                    <p className="review__text">
                                        {review.text}
                                    </p>
                                </div>
                            </>
                        );

                        return review.anonymous ? (
                            <div
                                key={review.id}
                                className="review"
                                style={{ "--i": index }}
                            >
                                {content}
                            </div>
                        ) : (
                            <Link
                                key={review.id}
                                to={`/profiles/${review.userpostid}`}
                                className="review"
                                style={{ "--i": index }}
                            >
                                {content}
                            </Link>
                        );
                    })}
                    <Link className={"btn"} to={`/reviews/${details[0].userId}`}>
                        Оставить отзыв
                    </Link>
                </ul>
            </div>

            <div className="ad-form__actions">
                <Link className="btn btn--primary" to={`/chat/${details[0].userId}`}>
                    <span>Написать заказчику</span>
                </Link>
                <button
                    className="btn btn--ghost"
                    type="button"
                    onClick={() => window.history.back()}
                >
                    <span>Назад</span>
                </button>
            </div>
        </>
    )
}