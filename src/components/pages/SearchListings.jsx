import { useState, useEffect } from "react";

import { Header } from "../modules/Header.jsx";
import {useQueryParams} from "../../hooks/useQueryParams.js";
import {api} from "../../api/index.js";
import { Link } from "react-router-dom";

import "../scss/form/form.scss";
import "../scss/find/find.scss";


export function SearchListings() {
    const [ tasks, setTasks ] = useState([]);

    const { queryParams, clearQueryParams, updateQueryParams } = useQueryParams();

    useEffect(() => {
        api.getTasks(queryParams).then(data => setTasks(data));
    }, [queryParams]);

    const handleChangeEmployment = (value) => {
        updateQueryParams({
            employment_like: value,
        });
    };

    const handleChangeSorting = (sortField, order = "asc") => {
        updateQueryParams({
            _sort: sortField,
            _order: order,
        });
    };

    const handleChangeSearch = (searchValue) => {
        updateQueryParams({
            title_like: searchValue,
        });
    };

    return (
        <>
            <Header flag={"Поиск объявлений"}
                    title={"Найдите подходящее объявление"}
                    desc={"Укажите параметры поиска, чтобы найти подходящие предложения"} />

            <div className="ad-form__body">
                <div className="ad-grid">
                    <div className="field">
                        <input className="field__input" id="find-query" type="search" placeholder=" " value={queryParams.title_like} onChange={(e) => handleChangeSearch(e.currentTarget.value)} />
                        <label className="field__label" htmlFor="find-query">Поиск по названию, городу, имени</label>
                    </div>

                    <div className="field field--select">
                        <select
                            className="field__input field__select"
                            id="find-sort"
                            value={`${queryParams._sort || "id"}|${queryParams._order || "desc"}`}
                            onChange={(e) => {
                                const [sortField, order] = e.target.value.split("|");
                                handleChangeSorting(sortField, order);
                            }}
                        >
                            <option value="id|desc">Сначала новые</option>
                            <option value="id|asc">Сначала старые</option>
                            <option value="salary_to|desc">Оплата: по убыванию</option>
                            <option value="salary_to|asc">Оплата: по возрастанию</option>
                            <option value="title|asc">По названию (А–Я)</option>
                        </select>
                        <label className="field__label" htmlFor="find-sort">Сортировка</label>
                    </div>

                    <div className="field">
                        <span className="ad-caption">Тип занятости</span>
                        <div className="chips">
                                <input
                                    type="radio"
                                    name="find-employment"
                                    id="find-emp-all"
                                    value=""
                                    onChange={(e) => handleChangeEmployment(e.currentTarget.value)}
                                />
                                <label htmlFor="find-emp-all">Все</label>

                                <input
                                    type="radio"
                                    name="find-employment"
                                    id="find-emp-full"
                                    value="full"
                                    onChange={(e) => handleChangeEmployment(e.currentTarget.value)}
                                />
                                <label htmlFor="find-emp-full">Полная</label>

                                <input
                                    type="radio"
                                    name="find-employment"
                                    id="find-emp-part"
                                    value="part"
                                    onChange={(e) => handleChangeEmployment(e.currentTarget.value)}
                                />
                                <label htmlFor="find-emp-part">Частичная</label>

                                <input
                                    type="radio"
                                    name="find-employment"
                                    id="find-emp-remote"
                                    value="remote"
                                    onChange={(e) => handleChangeEmployment(e.currentTarget.value)}
                                />
                                <label htmlFor="find-emp-remote">Удалённо</label>

                                <input
                                    type="radio"
                                    name="find-employment"
                                    id="find-emp-project"
                                    value="project"
                                    onChange={(e) => handleChangeEmployment(e.currentTarget.value)}
                                />
                                <label htmlFor="find-emp-project">Проект</label>
                        </div>
                    </div>
                    <div className="field">
                        <span className="ad-caption">Почистить фильтр:</span>
                        <button className={"btn btn--primary"} onClick={clearQueryParams}>Очистить</button>
                    </div>
                </div>
                <div className="jobs">
                    <div className="jobs__bar">
                        <span>Найдено: <b>{tasks.length}</b></span>
                    </div>

                    <ul className="jobs__list">
                        {tasks.map((task, index) => (

                            <li
                                key={task.id}
                                className={`job-card ${task.urgent ? "job-card--urgent" : ""}`}
                                style={{ "--i": index }}>

                                <div className="job-card__avatar">
                                    {task.contact_name
                                        ?.split(" ")
                                        .filter(Boolean)
                                        .map((word) => word[0])
                                        .join("")
                                        .toUpperCase() || "?"}
                                </div>
                                <div className="job-card__main">
                                    <div className="job-card__top">
                                        <h3 className="job-card__title">{task.title}</h3>
                                        {task.urgent ? <span className="job-card__urgent">Срочно</span> : null}
                                    </div>
                                    <div className="job-card__meta">
                                        <span>👤 {task.contact_name}</span>
                                        <span>📍 {task.city}</span>
                                        <span>🗓 {task.date}</span>
                                    </div>
                                    <div className="job-card__tags">
                                        <span className="job-card__tag">{task.category}</span>
                                        <span className="job-card__tag job-card__tag--alt">{task.employment}</span>
                                    </div>
                                </div>
                                <div className="job-card__side">
                                    <span className="job-card__salary">от {Number(task.salary_to).toLocaleString("ru-RU")} сум</span>

                                    <Link to={`/workinfo/${task.id}`} className="btn btn--ghost btn--sm" type="button"><span>Откликнуться</span>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}