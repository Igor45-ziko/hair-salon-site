import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { navigation } from "../data";
import Logo from "./Logo";
import Modal from "./Modal";
export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const query = matchMedia("(min-width:1100px)");
    const change = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map(([id, name]) => (
            <a href={`#${id}`} key={id}>
              {name}
            </a>
          ))}
        </nav>
        <a href="#order" className="button header-order">
          Рассчитать заказ <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          aria-label="Открыть меню"
          aria-expanded={open}
          aria-controls="menu-links"
          onClick={() => setOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        titleId="menu-title"
        className="menu-modal"
        closeLabel="Закрыть меню"
      >
        <p className="eyebrow" id="menu-title">
          МАРИЯ ОРЛОВА · МЕНЮ
        </p>
        <nav id="menu-links" aria-label="Мобильная навигация">
          {navigation.map(([id, name]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {name}
              <ArrowUpRight size={22} />
            </a>
          ))}
          <a href="#order" className="button" onClick={() => setOpen(false)}>
            Рассчитать заказ <ArrowUpRight size={18} />
          </a>
        </nav>
        <p className="menu-note">
          Для больших праздников
          <br />и маленьких поводов.
          <br />
          <span>Москва · ежедневно 10:00–20:00</span>
        </p>
      </Modal>
    </header>
  );
}
