import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { navigation } from "../data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector("a")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (event.key === "Tab") {
        const elements = [
          trigger.current!,
          ...Array.from(
            panel.current?.querySelectorAll<HTMLElement>("a") ?? [],
          ),
        ];
        const first = elements[0],
          last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    const query = matchMedia("(min-width: 1100px)");
    const onResize = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", onResize);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", onKey);
      query.removeEventListener("change", onResize);
    };
  }, [open]);
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map(([id, title]) => (
            <a key={id} href={`#${id}`}>
              {title}
            </a>
          ))}
        </nav>
        <a className="button header-cta" href="#measure">
          Вызвать замерщика <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          ref={trigger}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mobile-navigation" id="mobile-navigation" ref={panel}>
          <nav aria-label="Мобильная навигация">
            {navigation.map(([id, title], i) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                <span>0{i + 1}</span>
                {title}
                <ArrowUpRight size={22} />
              </a>
            ))}
            <a
              className="button"
              href="#measure"
              onClick={() => setOpen(false)}
            >
              Вызвать замерщика <ArrowUpRight size={18} />
            </a>
          </nav>
          <p>
            От замера до установки.
            <br />
            Москва и Московская область.
          </p>
        </div>
      )}
    </header>
  );
}
