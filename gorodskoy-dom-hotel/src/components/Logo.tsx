export default function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Городской дом — на главную">
      <svg viewBox="0 0 44 48" fill="none" aria-hidden="true">
        <path
          d="M5 21L22 7l17 14v23H5V21Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M17 44V28h10v16M15 19h14"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
      <span>
        ГОРОДСКОЙ ДОМ<small>НЕБОЛЬШАЯ ГОСТИНИЦА В МОСКВЕ</small>
      </span>
    </a>
  );
}
