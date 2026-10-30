import "../scss/module/chat.scss";
import {Link} from "react-router-dom";
export function Chat({ fullname, person, tasks }) {
    return (
        <div className="chat">

            <div className="chat-head">
                <div className="chat-head__avatar">{fullname.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}</div>

                <div className="chat-head__info">
                    <h3 className="chat-head__name">{fullname}</h3>
                    <span className="chat-head__status">В сети</span>
                </div>

                <div className="chat-head__actions">
                    <a className="chat-icon" href={`tel:${person.phone}`} aria-label="Позвонить">📞</a>
                </div>
            </div>



            {tasks && tasks.filter((task) => task.userId === person.userId).map((task) => (
                <Link key={task.id} className="chat-ad" to={`/workinfo/${task.id}`}>
                    <span className="chat-ad__icon">💼</span>

                    <span className="chat-ad__text">
                        <small>Объявление</small>
                        <b>{task.title}</b>
                    </span>

                    <span className="chat-ad__side">
                        <span className="chat-ad__urgent">Срочно</span>
                        <span className="chat-ad__salary">
                            {task.salary_from} – {task.salary_to} сум
                        </span>
                    </span>
                </Link>
            ))}


            <div className="chat-body">

                <div className="chat-day"><span>Вчера</span></div>

                <div className="msg msg--in" style={{ "--i": 0 }}>
                    <div className="msg__avatar">{fullname.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}</div>
                    <div className="msg__bubble">
                        <p className="msg__text">Здравствуйте! Увидела ваш отклик на вакансию веб-дизайнера. Расскажете немного о своём опыте?</p>
                        <span className="msg__time">18:24</span>
                    </div>
                </div>

                <div className="msg msg--out" style={{ "--i": 1 }}>
                    <div className="msg__bubble">
                        <p className="msg__text">Добрый вечер! Занимаюсь интерфейсами уже 4 года: сайты, мобильные приложения, дизайн-системы. Работаю в Figma.</p>
                        <span className="msg__time">18:31 <i className="msg__check">✓✓</i></span>
                    </div>
                </div>

                <div className="msg msg--in" style={{ "--i": 2 }}>
                    <div className="msg__avatar">{fullname.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}</div>
                    <div className="msg__bubble">
                        <p className="msg__text">Отлично, это именно то, что нам нужно. Можете прислать ссылку на портфолио?</p>
                        <span className="msg__time">18:36</span>
                    </div>
                </div>

                <div className="chat-day"><span>Сегодня</span></div>

                <div className="msg msg--out" style={{ "--i": 3 }}>
                    <div className="msg__bubble">
                        <p className="msg__text">Конечно! Вот ссылка: behance.net/example-portfolio. Там есть примеры адаптивных интерфейсов и пара дизайн-систем.</p>
                        <span className="msg__time">09:12 <i className="msg__check">✓✓</i></span>
                    </div>
                </div>

                <div className="chat-note" style={{ "--i": 4 }}>
                    <span>Алина просмотрела ваше портфолио</span>
                </div>

                <div className="msg msg--in" style={{ "--i": 5 }}>
                    <div className="msg__avatar">{fullname.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}</div>
                    <div className="msg__bubble">
                        <p className="msg__text">Работы очень понравились! Давайте созвонимся сегодня в 15:00 и обсудим задачи и условия?</p>
                        <span className="msg__time">09:40</span>
                    </div>
                </div>

                <div className="msg msg--out" style={{ "--i": 6 }}>
                    <div className="msg__bubble">
                        <p className="msg__text">Да, 15:00 мне подходит. Буду на связи.</p>
                        <span className="msg__time">09:42 <i className="msg__check msg__check--sent">✓</i></span>
                    </div>
                </div>

                <div className="msg msg--in" style={{ "--i": 7 }}>
                    <div className="msg__avatar">{fullname.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}</div>
                    <div className="msg__bubble msg__bubble--typing" aria-label="Алина печатает">
                        <span className="msg__dot"></span>
                        <span className="msg__dot"></span>
                        <span className="msg__dot"></span>
                    </div>
                </div>
            </div>

            <div className="chat-quick">
                <button className="chat-quick__item" type="button">Спасибо, договорились</button>
                <button className="chat-quick__item" type="button">Когда можно начать?</button>
                <button className="chat-quick__item" type="button">Уточните условия оплаты</button>
            </div>
            <form className="chat-composer" action="#" method="post">
                <button className="chat-icon" type="button" aria-label="Прикрепить файл">📎</button>

                <input
                    className="field__input chat-composer__input"
                    type="text"
                    name="message"
                    placeholder="Напишите сообщение..."
                    autoComplete="off"
                />

                <button className="btn btn--primary chat-composer__send" type="submit">
                    <span>Отправить</span>
                </button>
            </form>
        </div>
    )
}