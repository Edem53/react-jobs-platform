import {Account} from "./modules/Account.jsx";
import {Choice} from "./modules/Choice.jsx";
import {BurgerMenu} from "./modules/BurgerMenu.jsx";

export function Header() {
    return (
        <div className="header_top" id={"header"}>
            <Account isAuthorized={false}/>
            <Choice/>
            <BurgerMenu/>
        </div>
    )
}