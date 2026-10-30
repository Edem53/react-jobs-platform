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
            <div className="account">
                <div className="icon">
                    <UserIcon />
                </div>
                <span>
                     <Link to={"/user"}>{fullName}</Link>
                </span>
            </div>
        )
    }


    return (
        <>
            <div className="login" onClick={() => modal.openModal()}>
                <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
                        <defs>
                            <linearGradient id="bg" x1="8" y1="8" x2="92" y2="92" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#38BDF8"/>
                                <stop offset=".5" stop-color="#6366F1"/>
                                <stop offset="1" stop-color="#A855F7"/>
                            </linearGradient>
                            <linearGradient id="user" x1="30" y1="24" x2="72" y2="83" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#FFFFFF"/>
                                <stop offset="1" stop-color="#DBEAFE"/>
                            </linearGradient>
                            <filter id="shadow" x="10" y="10" width="80" height="85" filterUnits="userSpaceOnUse">
                                <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#312E81" flood-opacity=".25"/>
                            </filter>
                        </defs>

                        <circle cx="50" cy="50" r="47" fill="url(#bg)"/>
                        <circle cx="50" cy="50" r="43.5" stroke="#FFFFFF" stroke-opacity=".2" stroke-width="1.5"/>

                        <g filter="url(#shadow)" fill="url(#user)">
                            <circle cx="50" cy="35" r="15"/>
                            <path d="M19 78C19 63.1 31.1 52 46 52H54C68.9 52 81 63.1 81 78C81 82.4 77.4 86 73 86H27C22.6 86 19 82.4 19 78Z"/>
                        </g>
                    </svg>
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