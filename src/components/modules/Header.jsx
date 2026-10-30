export function Header({ flag, title, desc }) {
    return (
        <header className="ad-form__head">
            <span className="ad-form__badge">{flag}</span>
            <h2 className="ad-form__title">{title}</h2>
            <p className="ad-form__subtitle">
                {desc}
            </p>
        </header>
    )
}