import {Link} from "react-router-dom";

export function BurgerMenu() {

    return (
        <div className="burger-menu">
            <div className="burger-menu__title">
                Меню
            </div>
            <div className="burger-menu__menu">
                <ul>
                    <Link to={"/"}>
                        <span>
                            Home
                        </span>
                    </Link>
                    <Link to={"/information"}>
                        <span>
                            Info
                        </span>
                    </Link>
                    <Link to={"/contacts"}>
                        <span>
                            Contact
                        </span>
                    </Link>
                </ul>
            </div>
        </div>
    );
}