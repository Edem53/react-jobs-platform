import {Link} from "react-router-dom";

export function BurgerMenu() {

    return (
        <div className="burger-menu">
            <div className="burger-menu__title">
                Меню
            </div>
            <div className="burger-menu__menu">
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/information"}>Info</Link>
                    </li>
                    <li>
                        <Link to={"/contacts"}>Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}