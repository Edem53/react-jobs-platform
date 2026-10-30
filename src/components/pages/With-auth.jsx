import {useProfile} from "../profile-context/index.jsx";
import {Outlet} from "react-router-dom";

export function WithAuth() {
    const profile = useProfile();

    if (!profile.profile.email) {
        return (
            <h1 style={{ textAlign: "center" }}>
                Доступ к странице ограничен!
            </h1>
        )
    }
    return (
        <Outlet></Outlet>
    )
}