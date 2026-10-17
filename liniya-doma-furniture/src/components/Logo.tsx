export default function Logo() {
  return (
    <a className="logo" href="#top" title="На главную">
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 5v33h33M16 5h23v23H16V5Zm0 23L39 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        <strong>ЛИНИЯ ДОМА</strong>
        <small>МЕБЕЛЬ ПО ВАШИМ РАЗМЕРАМ</small>
      </span>
    </a>
  );
}
