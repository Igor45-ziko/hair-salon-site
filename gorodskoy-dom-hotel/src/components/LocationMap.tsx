import { MapPin } from "lucide-react";

export default function LocationMap() {
  return (
    <div
      className="location-map"
      role="img"
      aria-label="Демонстрационная схема: гостиница Городской дом в Тихом Садовом переулке, в десяти минутах от метро. Адрес вымышленный."
    >
      <svg
        viewBox="0 0 700 460"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="700" height="460" fill="#e9e7df" />
        <path
          d="M0 20h180v130H0zm220 0h150v130H220zm190 0h120v130H410zm160 0h130v130H570zM0 190h180v130H0zm220 0h150v130H220zm190 0h120v130H410zm160 0h130v130H570zM0 360h180v100H0zm220 0h150v100H220zm190 0h120v100H410zm160 0h130v100H570z"
          fill="#d9d9cf"
        />
        <path
          d="M465 -10Q350 130 465 200T670 470"
          stroke="#cbd6c4"
          strokeWidth="90"
          fill="none"
        />
        <path d="M-20 340L720 75" stroke="#fbfaf7" strokeWidth="32" />
        <path
          d="M205 -20L205 480M390 -20L390 480"
          stroke="#fbfaf7"
          strokeWidth="27"
        />
        <path
          d="M85 301L205 258L205 210L330 210"
          stroke="#6b8064"
          strokeWidth="4"
          strokeDasharray="7 7"
          fill="none"
        />
        <rect x="275" y="192" width="75" height="65" rx="5" fill="#87977e" />
        <circle cx="84" cy="301" r="17" fill="#f8f6ef" />
        <text
          x="76"
          y="307"
          fontSize="17"
          fill="#9d4a3d"
          fontFamily="sans-serif"
          fontWeight="700"
        >
          М
        </text>
        <text
          x="38"
          y="338"
          fill="#5f6659"
          fontFamily="sans-serif"
          fontSize="12"
        >
          10 минут пешком
        </text>
        <text
          x="425"
          y="357"
          fill="#5f6659"
          fontFamily="sans-serif"
          fontSize="12"
        >
          Тихий сквер
        </text>
        <text
          x="430"
          y="161"
          transform="rotate(-20 430 161)"
          fill="#68705f"
          fontFamily="sans-serif"
          fontSize="11"
        >
          Тихий Садовый переулок
        </text>
      </svg>
      <div className="hotel-map-pin">
        <MapPin size={22} />
        <span>
          ГОРОДСКОЙ ДОМ<small>Вы почти дома</small>
        </span>
      </div>
      <span className="map-disclaimer">
        Декоративная схема · вымышленный адрес
      </span>
    </div>
  );
}
