import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "../data";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector("a")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const links = Array.from(
          panel.current?.querySelectorAll<HTMLElement>("a, button") ?? [],
        );
        const elements = [toggle.current!, ...links];
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
    const mq = window.matchMedia("(min-width: 1100px)");
    const closeOnDesktop = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", closeOnDesktop);
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
        <a className="button button-small header-book" href="#booking">
          Записаться <ArrowUpRight size={17} />
        </a>
        <button
          className="menu-toggle"
          ref={toggle}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mobile-menu" id="mobile-menu" ref={panel}>
          <nav aria-label="Мобильная навигация">
            {navigation.map(([id, title], i) => (
              <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
                <span>0{i + 1}</span>
                {title}
                <ArrowUpRight size={23} />
              </a>
            ))}
            <a
              href="#booking"
              className="button"
              onClick={() => setOpen(false)}
            >
              Записаться <ArrowUpRight size={20} />
            </a>
          </nav>
          <p>Москва · Ежедневно, 09:00–21:00</p>
        </div>
      )}
    </header>
  );
}
