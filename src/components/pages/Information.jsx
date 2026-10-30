import { Header } from "../modules/Header.jsx";
import { InfoContent } from "./content/InfoContent.jsx";

import "../scss/pages/information/information.scss";

export function Information() {
    return (
        <>
            <Header flag={"Информация"}
                    title={"Узнайте больше о нас"}
                    desc={"Оставьте свои данные, чтобы получить подробную информацию о наших услугах и возможностях сотрудничества."} />
            <InfoContent />
        </>
    )
}