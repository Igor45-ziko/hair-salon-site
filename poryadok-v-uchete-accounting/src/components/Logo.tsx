export default function Logo() {
  return (
    <a href="#top" className="logo" title="На главную">
      <svg
        width="39"
        height="39"
        viewBox="0 0 44 44"
        fill="none"
        aria-hidden="true"
      >
        <rect width="44" height="44" rx="11" fill="currentColor" />
        <path
          d="M11 13h16M11 21h11M11 29h9m4-1 5 5 9-13"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        <strong>ПОРЯДОК В УЧЁТЕ</strong>
        <small>БУХГАЛТЕРСКОЕ БЮРО</small>
      </span>
    </a>
  );
}
