import { Header } from "../modules/Header.jsx";
import { ContactsContent } from "./content/ContactsContent.jsx";

import "../scss/form/form.scss";
import "../scss/pages/contacts/contacts.scss";

export function Contacts() {
    return (
        <>
            <Header flag={"Контакты"}
                    title={"Свяжитесь с нами"}
                    desc={"Остались вопросы? Свяжитесь с нами удобным для вас способом — мы будем рады помочь и ответить на все ваши вопросы."} />
            <ContactsContent />
        </>
    )
}