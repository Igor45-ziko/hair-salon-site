import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "../data";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
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
    const query = matchMedia("(min-width: 1050px)");
    const resize = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", resize);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      query.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map(([id, title]) => (
            <a href={`#${id}`} key={id}>
              {title}
            </a>
          ))}
        </nav>
        <a href="#booking" className="button header-book">
          Забронировать <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          ref={trigger}
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
            {navigation.map(([id, title]) => (
              <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
                {title}
                <ArrowUpRight size={22} />
              </a>
            ))}
            <a
              href="#booking"
              className="button"
              onClick={() => setOpen(false)}
            >
              Забронировать <ArrowUpRight size={18} />
            </a>
          </nav>
          <p>
            Ваш тихий адрес в большом городе.
            <br />
            Стойка регистрации — круглосуточно.
          </p>
        </div>
      )}
    </header>
  );
}
