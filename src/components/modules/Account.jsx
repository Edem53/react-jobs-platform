import {Modal} from "./Modal.jsx";
import {Auth} from "./Auth.jsx";
import {useAuthModal} from "../auth-modal-context/index.jsx";
import { useProfile } from "../profile-context/index.jsx";
import { UserIcon } from "../ui/Usersvg.jsx";
import { Link } from "react-router-dom";

import "../scss/module/account.scss"

export function Account() {
    const modal = useAuthModal();
    const { profile } = useProfile();

    let fullName = profile.firstName + ' ' + profile.lastName;

    if  ( profile.email ) {
        return (
            <Link to={"/user"} className="account">
                <div className="icon">
                    <UserIcon />
                </div>
                <span>
                     {fullName}
                </span>
            </Link>
        )
    }


    return (
        <>
            <div className="login" onClick={() => modal.openModal()}>
                <div className="icon">
                    <UserIcon />
                </div>
                <span>
                     Войти
                </span>
            </div>
            <Modal isOpened={modal.isOpened} onClose={modal.closeModal}>
                <Auth/>
            </Modal>
        </>
    )
}