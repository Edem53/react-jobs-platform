import "./styles.css";

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {useEffect} from "react";
import { useProfile } from "./components/profile-context/index.jsx";

import { Account } from './components/modules/Account.jsx';
import { Choice } from "./components/modules/Choice.jsx";
import { BurgerMenu } from "./components/modules/BurgerMenu.jsx";
import { Home } from "./components/Home.jsx";
import { Information } from "./components/pages/Information.jsx";
import { Contacts } from "./components/pages/Contacts.jsx";
import { WithAuth } from "./components/pages/With-auth.jsx";
import { FindFreelancer } from "./components/pages/FindFreelancer.jsx";
import { SearchListings } from "./components/pages/SearchListings.jsx";
import { Footer } from "./components/Footer.jsx";
import User from "./components/pages/User.jsx";
import {Toast} from "./components/ui/toast/index.jsx";
import {WorkInfo} from "./components/pages/WorkInfo.jsx";
import {Profiles} from "./components/pages/Profiles.jsx";
import {ChatUser} from "./components/pages/ChatUser.jsx";
import {ChatWork} from "./components/pages/ChatWork.jsx";
import {Reviews} from "./components/pages/Reviews.jsx";
import {Header} from "./components/Header.jsx";

function App() {
    const profile = useProfile();


    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return;

        fetch("http://localhost:3001/profiles/5", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Ошибка получения профиля");
                }

                return response.json();
            })
            .then((data) => {
                profile.setProfile(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home></Home>}>
                        <Route index element={<Navigate to={"/give"}/>} />
                        <Route path="/give" element={<FindFreelancer />} />
                        <Route path="/find" element={<SearchListings />} />
                        <Route element={<WithAuth></WithAuth>}>
                            <Route path="/user" element={<User />} />
                            <Route path="/information" element={<Information />} />
                            <Route path="/contacts" element={<Contacts />} />
                            <Route path="/workinfo/:id" element={<WorkInfo />} />
                            <Route path="/workinfo/:id/chat/:userId" element={<ChatWork />} />
                            <Route path="/profiles/:id" element={<Profiles />} />
                            <Route path="/chat/:id" element={<ChatUser />} />
                            <Route path="/reviews/:id" element={<Reviews />} />
                        </Route>
                    </Route>

                </Routes>

                <Footer />
            </BrowserRouter>
            <Toast />
        </>
    );
}

export default App;