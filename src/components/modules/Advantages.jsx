export function Advantages({ tasks, completed, rating }) {
    return (
        <div className="stats">
            <div className="stat">
                <span className="stat__value">{tasks}</span>
                <span className="stat__label">объявлений</span>
            </div>
            <div className="stat">
                <span className="stat__value">{completed}</span>
                <span className="stat__label">завершённых заказов</span>
            </div>
            <div className="stat">
                <span className="stat__value">
                    {rating}
                </span>
                <span className="stat__label">рейтинг</span>
            </div>
        </div>
    )
}