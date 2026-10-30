import { useId } from "react";

export function UserIcon() {
    const uid = useId();
    const bg = `${uid}-bg`;
    const user = `${uid}-user`;
    const shadow = `${uid}-shadow`;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
            <defs>
                <linearGradient id={bg} x1="8" y1="8" x2="92" y2="92" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38BDF8" />
                    <stop offset=".5" stopColor="#6366F1" />
                    <stop offset="1" stopColor="#A855F7" />
                </linearGradient>
                <linearGradient id={user} x1="30" y1="24" x2="72" y2="83" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFFFFF" />
                    <stop offset="1" stopColor="#DBEAFE" />
                </linearGradient>
                <filter id={shadow} x="10" y="10" width="80" height="85" filterUnits="userSpaceOnUse">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#312E81" floodOpacity=".25" />
                </filter>
            </defs>

            <circle cx="50" cy="50" r="47" fill={`url(#${bg})`} />
            <circle cx="50" cy="50" r="43.5" stroke="#FFFFFF" strokeOpacity=".2" strokeWidth="1.5" />

            <g filter={`url(#${shadow})`} fill={`url(#${user})`}>
                <circle cx="50" cy="35" r="15" />
                <path d="M19 78C19 63.1 31.1 52 46 52H54C68.9 52 81 63.1 81 78C81 82.4 77.4 86 73 86H27C22.6 86 19 82.4 19 78Z" />
            </g>
        </svg>
    );
}