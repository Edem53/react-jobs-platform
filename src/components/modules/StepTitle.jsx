export function StepTitle({ step, title }) {
    return (
        <h3 className="ad-section__title">
            <span className="ad-section__num">{step}</span>{title}
        </h3>
    )
}