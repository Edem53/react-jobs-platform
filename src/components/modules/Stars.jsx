export function Stars({ value = 0 }) {
    return (
        <div
            className="stars"
            role="img"
            aria-label={`Рейтинг: ${value} из 5`}
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`stars__item${star <= value ? " stars__item--active" : ""}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M12 2.5l2.93 5.94 6.56.95-4.75 4.63 1.12 6.53L12 17.47l-5.86 3.08 1.12-6.53L2.51 9.39l6.56-.95L12 2.5z" />
                </svg>
            ))}
        </div>
    );
}