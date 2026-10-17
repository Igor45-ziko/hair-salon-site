import { useRef } from "react";
import { ArrowUpRight, MapPin, X } from "lucide-react";

export default function LocationMap() {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <div
        className="location-map"
        role="img"
        aria-label="Декоративная схема: автосервис МОТОРНАЯ на улице Механической, 18, строение 2. Адрес вымышленный."
      >
        <svg
          className="map-art"
          viewBox="0 0 720 470"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="map-grid"
              width="110"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="10"
                y="10"
                width="90"
                height="80"
                rx="5"
                fill="#deddd5"
              />
            </pattern>
          </defs>
          <rect width="720" height="470" fill="#eeede7" />
          <rect width="720" height="470" fill="url(#map-grid)" />
          <path
            d="M-40 410Q170 360 245 430T760 360"
            stroke="#c2d1cc"
            strokeWidth="70"
            fill="none"
          />
          <path
            d="M120 -40L390 510M-50 220L760 120"
            stroke="#f9f8f4"
            strokeWidth="32"
          />
          <path d="M550 -40L440 510" stroke="#f9f8f4" strokeWidth="24" />
          <path
            d="M90 204L310 175L367 294L467 294"
            fill="none"
            stroke="#ee603b"
            strokeWidth="4"
            strokeDasharray="9 7"
          />
          <rect x="405" y="230" width="90" height="55" rx="4" fill="#b5b7ab" />
          <text
            x="90"
            y="184"
            transform="rotate(-8 90 184)"
            fill="#797b72"
            fontSize="13"
            fontFamily="sans-serif"
          >
            ул. Механическая
          </text>
          <text
            x="510"
            y="340"
            fill="#797b72"
            fontSize="12"
            fontFamily="sans-serif"
          >
            Технический квартал
          </text>
          <circle cx="90" cy="204" r="7" fill="#232623" />
          <circle cx="90" cy="204" r="3" fill="white" />
        </svg>
        <div className="map-marker">
          <span className="map-pin">
            <MapPin size={25} />
          </span>
          <strong>
            МОТОРНАЯ<small>Въезд со стороны двора</small>
          </strong>
        </div>
        <span className="map-caption">СХЕМА РАСПОЛОЖЕНИЯ · ДЕМО</span>
      </div>
      <button
        className="button button-dark route-button"
        onClick={() => dialog.current?.showModal()}
      >
        Построить маршрут <ArrowUpRight size={19} />
      </button>
      <dialog
        ref={dialog}
        className="route-dialog"
        aria-labelledby="route-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="dialog-inner">
          <button
            className="dialog-close"
            aria-label="Закрыть схему проезда"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
          <span className="eyebrow">КАК НАС НАЙТИ</span>
          <h2 id="route-title">Схема проезда</h2>
          <p>Москва, ул. Механическая, 18, стр. 2</p>
          <ol>
            <li>Сверните с улицы Механической в Технический квартал.</li>
            <li>Проезжайте прямо до второго корпуса.</li>
            <li>Въезд в сервис — со стороны двора, у оранжевой вывески.</li>
          </ol>
          <p className="demo-route-note">
            Это демонстрационная схема. Автосервис и адрес вымышлены, реальный
            маршрут построить нельзя.
          </p>
          <button
            className="button button-dark"
            onClick={() => dialog.current?.close()}
          >
            Понятно <ArrowUpRight size={18} />
          </button>
        </div>
      </dialog>
    </>
  );
}
