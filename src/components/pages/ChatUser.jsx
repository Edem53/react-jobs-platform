import { Header } from "../modules/Header.jsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { Chat } from "../modules/Chat.jsx";
import {API_URL} from "../../api/index.js";

export function ChatUser() {

    const params = useParams();
    const [details, setDetails] = useState(null);
    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}/profiles?userId=${params.id}`);

            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setDetails(data);
        })()

    }, [params.id]);

    if (!details || details.length === 0) {
        return <p>Загрузка профиля...</p>;
    }
    const fullName = details[0].firstName + " " + details[0].lastName;

    return (
        <>
            <Header
                flag="Общение"
                title="Чат с заказчиком"
                desc="Обсуждение условий и деталей работы"
            />
            <Chat fullname={fullName} person={details[0]} />

            <div className="ad-form__actions">
                <Link to={"/find"} className="btn btn--ghost">
                    <span>Назад к списку</span>
                </Link>
                <Link to={`/profiles/${details[0].userId}`} className="btn btn--ghost" type="button">
                    <span>Профиль заказчика</span>
                </Link>
            </div>
        </>
    )
}