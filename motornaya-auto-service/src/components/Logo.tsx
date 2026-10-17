export default function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`logo${footer ? " logo-footer" : ""}`}
      href="#top"
      aria-label="МОТОРНАЯ — на главную"
    >
      <svg viewBox="0 0 36 32" aria-hidden="true">
        <path
          d="M0 30V2h9l9 12L27 2h9v28H25V18l-7 10-7-10v12z"
          fill="currentColor"
        />
      </svg>
      <span>
        МОТОРНАЯ<small>АВТОСЕРВИС ПОЛНОГО ЦИКЛА</small>
      </span>
    </a>
  );
}
