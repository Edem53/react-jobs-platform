import {useProfile} from "./profile-context/index.jsx";
import {useNavigate} from "react-router-dom";
import {useAuthModal} from "./auth-modal-context/index.jsx";

export function useLogout() {
    const navigate = useNavigate();
    const modal = useAuthModal();

    const { setProfile } = useProfile();
    return function quitAcc() {
        localStorage.clear();
        setProfile({});
        navigate("/give")
        modal.openModal();
    }
}