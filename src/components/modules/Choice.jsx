import {Link, NavLink} from "react-router-dom";

export function Choice() {
    return (
        <div className="choice">
            <NavLink className="task" to={"/give"}>Дать объявление</NavLink>
            <NavLink className="find_work" to={"/find"}>Найти работу</NavLink>
        </div>
    )
}