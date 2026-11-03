import {Header} from "../modules/Header.jsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useProfile} from "../profile-context/index.jsx";
import {toast} from "../../utils/toast/index.js";
import {StepTitle} from "../modules/StepTitle.jsx";

import "../scss/pages/reviews/reviews.scss";
import {API_URL} from "../../api/index.js";

export function Reviews() {
    const params = useParams();
    const [userTasks, setUserTasks] = useState([]);
    const [details, setDetails] = useState(null);
    const [anonymous, setAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { profile } = useProfile();
    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}/profiles?userId=${params.id}`);
            const responseTask = await fetch(`${API_URL}/ads?userId=${params.id}`);

            if (!response.ok || !responseTask.ok) {
                return;
            }
            const data = await response.json();
            const data2 = await responseTask.json();
            setDetails(data);
            setUserTasks(data2);
        })()

    }, [params]);

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.currentTarget;

        const formResult = {
            rating: form.querySelector('input[name="rating"]:checked')?.value,
            title: form.elements.title.value,
            text: form.elements.text.value,
            adTitle: form.elements.ad.selectedOptions[0].text || null,
            tags: Array.from(
                form.querySelectorAll('input[name="tags"]:checked')
            ).map(input => input.value),
            recommend: form.elements.recommend.checked,
            anonymous: form.elements.anonymous.checked,
            name: form.elements.username.value || null,
            lastName: form.elements.userlastname.value || null,
            userId: form.elements.userid.value || null,
            agree: form.elements.agree.checked
        };

        try {
            const response = await fetch(`${API_URL}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formResult)
            });

            if (!response.ok) {
                throw new Error("Не удалось опубликовать отзыв");
            }

            await response.json();

            form.reset();

            toast.success("Отзыв опубликован! Спасибо.");
        } catch (error) {
            toast.error("Ошибка отправки. Проверьте соединение и попробуйте ещё раз.");
        } finally {
            setIsSubmitting(false);
            setAnonymous(!anonymous);
        }
    }

    if (!details || details.length === 0) {
        return <p>Загрузка контента...</p>;
    }
    const fullName = details[0].firstName + " " + details[0].lastName;
    return (
        <>

            <Header
                flag={"отзывы о пользователе"}
                title={"Отзыв о сотрудничестве"}
                desc={"Читайте отзывы исполнителей, оценивайте опыт сотрудничества и узнавайте, насколько заказчик надёжен."}
            />
            <div className="profile-card">
                <div className="profile-card__avatar">
                    {fullName.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                </div>

                <div className="profile-card__info">
                    <h4 className="profile-card__name">{fullName}</h4>
                    <span className="profile-card__email">{details[0].email}</span>

                    <div className="profile-card__badges">
                <span className="profile-card__badge profile-card__badge--ok">
                    Проверенный заказчик
                </span>
                        <span className="profile-card__badge">На сайте с 15 марта 2024</span>
                    </div>
                </div>
                <Link className="btn btn--ghost btn--sm" to={`/chat/${details[0].userId}`}>
                    <span>Написать</span>
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="ad-section">
                    <StepTitle step={"01"} title={"Ваша оценка"}/>

                    <div className="ad-grid">
                        <div className="field field--select field--full">
                            <select className="field__input field__select" id="review-ad" name="ad" defaultValue="" required>
                                <option value="" disabled hidden></option>
                                {userTasks.map((task, index) => (
                                     <option key={task.id} value={index+1}>{task.title}</option>
                                ))}
                            </select>
                            <label className="field__label" htmlFor="review-ad">Объявление</label>
                        </div>

                        <div className="field--full">
                            <span className="ad-caption">Как всё прошло?</span>

                            <div className="rate">
                                <div className="rate__stars">
                                    <input type="radio" name="rating" id="rate-5" value="5" required />
                                    <label htmlFor="rate-5" title="Отлично">★</label>

                                    <input type="radio" name="rating" id="rate-4" value="4" />
                                    <label htmlFor="rate-4" title="Хорошо">★</label>

                                    <input type="radio" name="rating" id="rate-3" value="3" />
                                    <label htmlFor="rate-3" title="Нормально">★</label>

                                    <input type="radio" name="rating" id="rate-2" value="2" />
                                    <label htmlFor="rate-2" title="Плохо">★</label>

                                    <input type="radio" name="rating" id="rate-1" value="1" />
                                    <label htmlFor="rate-1" title="Ужасно">★</label>
                                </div>

                                <div className="rate__hints">
                                    <span className="rate__hint rate__hint--empty">Нажмите на звезду, чтобы поставить оценку</span>
                                    <span className="rate__hint rate__hint--5">Отлично! Всё прошло идеально</span>
                                    <span className="rate__hint rate__hint--4">Хорошо, были небольшие недочёты</span>
                                    <span className="rate__hint rate__hint--3">Нормально, но можно лучше</span>
                                    <span className="rate__hint rate__hint--2">Плохо, остались вопросы</span>
                                    <span className="rate__hint rate__hint--1">Ужасно, не рекомендую</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ad-section">
                    <StepTitle step={"02"} title={"Ваш отзыв"}/>
                    <div className="ad-grid">
                        <div className="field field--full">
                            <input className="field__input" id="review-title" name="title" type="text" placeholder=" " maxLength="80" required />
                            <label className="field__label" htmlFor="review-title">Заголовок отзыва</label>
                        </div>

                        <div className="field field--textarea field--full">
                            <textarea className="field__input" id="review-text" name="text" placeholder=" " maxLength="1000" required></textarea>
                            <label className="field__label" htmlFor="review-text">Расскажите, как всё прошло</label>
                        </div>
                    </div>
                    <p className="ad-hint">До 1000 символов. Опишите, что понравилось, а что можно улучшить.</p>

                    <div className="field--full review-tags">
                        <span className="ad-caption">Что можно отметить</span>
                        <div className="chips">
                            <input type="checkbox" name="tags" id="tag-fast" value="fast" />
                            <label htmlFor="tag-fast">Быстро</label>

                            <input type="checkbox" name="tags" id="tag-neat" value="neat" />
                            <label htmlFor="tag-neat">Аккуратно</label>

                            <input type="checkbox" name="tags" id="tag-talk" value="talk" />
                            <label htmlFor="tag-talk">Общительный</label>

                            <input type="checkbox" name="tags" id="tag-time" value="time" />
                            <label htmlFor="tag-time">В срок</label>

                            <input type="checkbox" name="tags" id="tag-quality" value="quality" />
                            <label htmlFor="tag-quality">Качественно</label>

                            <input type="checkbox" name="tags" id="tag-polite" value="polite" />
                            <label htmlFor="tag-polite">Вежливый</label>
                        </div>
                    </div>
                </div>

                <div className="ad-section">
                    <StepTitle step={"03"} title={"Публикация"}/>
                    <div className="ad-grid">
                        <label className="switch field--full">
                            <input type="checkbox" name="recommend" defaultChecked />
                            <span className="switch__track"><span className="switch__knob"></span></span>
                            <span className="switch__text">
                    <b>Рекомендую</b>
                    <small>Отметка «рекомендую» будет видна рядом с вашим отзывом</small>
                </span>
                        </label>

                        <label className="switch field--full">
                            <input type="checkbox" name="anonymous" onChange={() => setAnonymous(!anonymous)} />
                            <span className="switch__track"><span className="switch__knob"></span></span>
                            <span className="switch__text">
                                <b>Опубликовать анонимно</b>
                                <small>Ваше имя не будет показано в отзыве</small>
                            </span>
                        </label>
                        {!anonymous ? (
                            <>
                                <input
                                    value={profile.firstName ?? ""}
                                    className="field__input"
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder=" "
                                    maxLength={80}
                                    required
                                    readOnly
                                />

                                <input
                                    value={profile.lastName ?? ""}
                                    className="field__input"
                                    id="userlastname"
                                    name="userlastname"
                                    type="text"
                                    placeholder=" "
                                    maxLength={80}
                                    required
                                    readOnly
                                />
                            </>
                        ) : (
                            <>
                                <input type="hidden" name="username" value="" />
                                <input type="hidden" name="userlastname" value="" />
                            </>
                        )}
                    </div>

                    <label className="check review-agree">
                        <input type="hidden" name="userid" value={details[0].userId} />
                        <input type="hidden" name="userpostid" value={profile.userId} />
                        <input type="checkbox" name="agree" required />
                        <span className="check__box"></span>
                        <span className="check__text">Отзыв основан на моём личном опыте и не нарушает правила сайта</span>
                    </label>
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
                    <button className="btn btn--ghost" type="reset">
                        <span>Очистить</span>
                    </button>
                </div>
            </form>
        </>
    )
}