
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthModalContextProvider } from "./components/auth-modal-context/index.jsx";
import {ProfileContextProvider} from "./components/profile-context/index.jsx";

createRoot(document.getElementById('root')).render(
    <ProfileContextProvider>
        <AuthModalContextProvider>
            <App />
        </AuthModalContextProvider>
    </ProfileContextProvider>
)
