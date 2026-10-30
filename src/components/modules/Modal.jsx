import { Portal } from "../portal/index.jsx";

export function Modal({ isOpened, onClose, children }) {
    const active = isOpened ? "modal active" : "modal";
    return (
        <Portal>
            <div className={active}>
                <div className="modal__backdrop" onClick={onClose}></div>
                <div className="modal__window" role="dialog" aria-modal="true" aria-labelledby="auth-title">
                    {children}
                </div>
            </div>
        </Portal>
    )
}