export function ProfileCard({ nl, fullname, email }) {
    return (
        <div className="profile-card">
            <div className="profile-card__avatar">
                {nl}
            </div>

            <div className="profile-card__info">
                <h4 className="profile-card__name">{fullname}</h4>
                <span className="profile-card__email">{email}</span>

                <div className="profile-card__badges">
                    <span className="profile-card__badge profile-card__badge--ok">Аккаунт подтверждён</span>
                    <span className="profile-card__badge">С нами с октября 2026</span>
                </div>
            </div>

            <button className="btn btn--ghost btn--sm" type="button"><span>Сменить фото</span></button>
        </div>
    )
}