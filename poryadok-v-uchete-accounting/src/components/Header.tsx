import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { navigation } from "../data";
import Logo from "./Logo";
import Modal from "./Modal";
export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const media = matchMedia("(min-width:1200px)");
    const change = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <nav aria-label="Основная навигация" className="desktop-nav">
          {navigation.map(([id, title]) => (
            <a href={`#${id}`} key={id}>
              {title}
            </a>
          ))}
        </nav>
        <a href="#consultation" className="button header-button">
          Получить консультацию <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          aria-label="Открыть меню"
          aria-expanded={open}
          aria-controls="mobile-links"
          onClick={() => setOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        titleId="menu-title"
        closeLabel="Закрыть меню"
        className="menu-modal"
      >
        <p className="eyebrow" id="menu-title">
          ПОРЯДОК В УЧЁТЕ · МЕНЮ
        </p>
        <nav id="mobile-links" aria-label="Мобильная навигация">
          {navigation.map(([id, title]) => (
            <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
              {title}
              <ArrowUpRight size={21} />
            </a>
          ))}
          <a
            className="button"
            href="#consultation"
            onClick={() => setOpen(false)}
          >
            Получить консультацию <ArrowUpRight size={18} />
          </a>
        </nav>
        <p className="menu-note">
          Небольшая команда.
          <br />
          Большое внимание к вашему бизнесу.
        </p>
      </Modal>
    </header>
  );
}
