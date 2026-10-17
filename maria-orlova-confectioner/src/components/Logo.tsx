export default function Logo() {
  return (
    <a href="#top" className="logo" title="На главную">
      <svg
        width="39"
        height="45"
        viewBox="0 0 44 50"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9 24h26v17H9zM6 43h32M9 30q4 5 8 0 5 5 10 0 4 5 8 0M15 24v-8m7 8V12m7 12v-8"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path d="M22 4c-4 5-3 8 0 8s4-3 0-8" fill="currentColor" />
      </svg>
      <span>
        <strong>Мария Орлова</strong>
        <small>КОНДИТЕР НА ЗАКАЗ</small>
      </span>
    </a>
  );
}
