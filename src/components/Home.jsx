import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function Home() {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])
    return (
        <section className="ad-form">
            <Outlet>

            </Outlet>
        </section>
    )
}