import {Link, NavLink} from "react-router-dom";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="footer__brand">
                    <div className="footer__logo">
                        <span className="footer__logo-mark"></span>
                        <span className="footer__logo-text">JobBoard</span>
                    </div>
                    <p className="footer__text">
                        Находите работу и размещайте объявления быстро, красиво и без лишних шагов.
                    </p>
                </div>
                <nav className="footer__nav" aria-label="Меню в подвале">
                    <ul className="footer__menu">
                        <li>
                            <NavLink className="footer__link" to={"/give"}>Главнва</NavLink>
                        </li>
                        <li>
                            <NavLink className="footer__link" to={"/contacts"}>Контакты</NavLink>
                        </li>
                        <li>
                            <NavLink className="footer__link" to={"/information"}>Инфомация</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="footer__cta">
                    <Link to={"/contacts"} className="btn btn--primary">
                        Помощь
                    </Link>
                </div>
            </div>

            <div className="footer__bottom">
                <span className="footer__copy">© 2026 JobBoard. Все права защищены.</span>
                <span className="footer__status">Сервис работает</span>
                <a className="footer__up" href="#header">Наверх ↑</a>
            </div>
        </footer>
    )
}