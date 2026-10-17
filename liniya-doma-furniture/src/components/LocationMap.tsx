import { MapPin } from "lucide-react";

export default function LocationMap() {
  return (
    <div
      className="location-map"
      role="img"
      aria-label="Декоративная схема: мастерская Линия дома на Столярном проезде, 18, строение 4. Адрес вымышленный."
    >
      <svg
        viewBox="0 0 700 440"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="700" height="440" fill="#e8e6dd" />
        <path
          d="M15 10h130v90H15zm165 0h155v90H180zm190 0h130v90H370zm165 0h165v90H535zM15 135h130v130H15zm165 0h155v130H180zm190 0h130v130H370zm165 0h165v130H535zM15 300h130v130H15zm165 0h155v130H180zm190 0h130v130H370zm165 0h165v130H535z"
          fill="#d5d6ca"
        />
        <path d="M-30 350L730 130" stroke="#f9f8f2" strokeWidth="36" />
        <path d="M350 -10V450" stroke="#f9f8f2" strokeWidth="25" />
        <path
          d="M65 325L350 243L350 177L410 177"
          fill="none"
          stroke="#6e7754"
          strokeWidth="3"
          strokeDasharray="6 7"
        />
        <rect x="394" y="143" width="90" height="65" rx="2" fill="#929c7e" />
        <circle cx="65" cy="325" r="7" fill="#586442" />
        <text
          x="100"
          y="330"
          transform="rotate(-16 100 330)"
          fontFamily="sans-serif"
          fontSize="12"
          fill="#5d674f"
        >
          Столярный проезд
        </text>
        <text
          x="405"
          y="335"
          fontFamily="sans-serif"
          fontSize="11"
          fill="#5d674f"
        >
          Мастерские
        </text>
      </svg>
      <div className="map-pin">
        <MapPin size={24} />
        <span>
          ЛИНИЯ ДОМА<small>Мастерская и образцы материалов</small>
        </span>
      </div>
      <span className="map-note">Декоративная схема · адрес вымышленный</span>
    </div>
  );
}
