import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/manrope";
import "@fontsource/prata/cyrillic-400.css";
import "@fontsource/prata/latin-400.css";
import {
  benefits,
  filters,
  masters,
  navigation,
  reviews,
  services,
  works,
} from "./data";
import { validateBooking } from "./validation.mjs";
import "./styles.css";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function Spark() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 4v40M4 24h40M10 10l28 28M38 10 10 38"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#top"
      aria-label="СВОЙ СРЕЗ — в начало"
    >
      <span>
        свой срез<span className="brand-star">{<Spark />}</span>
      </span>
      <small>САЛОН ВОЛОС · МОСКВА</small>
    </a>
  );
}
function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number} /</span> {children}
    </div>
  );
}
function BookingButton({
  children = "Записаться",
  onClick,
  className = "",
}: {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
      <Arrow diagonal />
    </button>
  );
}
function Photo({
  work,
  className = "",
}: {
  work: (typeof works)[number];
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={work.alt}
      className={`work-photo ${className}`}
      style={{
        backgroundImage: `url(/images/${work.sheet}.webp)`,
        backgroundPosition: work.position,
      }}
    />
  );
}
function Dialog({
  labelId,
  children,
  onClose,
  className = "",
}: {
  labelId: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const trigger = document.activeElement as HTMLElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
      trigger?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-labelledby={labelId}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const nodes = Array.from(
          e.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], input, select, [tabindex="0"]',
          ),
        ).filter((node) => node.getClientRects().length);
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const rect = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="icon-button dialog-close"
        onClick={onClose}
        aria-label="Закрыть"
      >
        <CloseIcon />
      </button>
      {children}
    </dialog>
  );
}
function BookingDialog({
  initial,
  master,
  onClose,
}: {
  initial: string;
  master?: string;
  onClose: () => void;
}) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    service: initial,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState(false);
  const resultRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (complete) resultRef.current?.focus();
  }, [complete]);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = validateBooking(values, [
      "Помогите выбрать",
      ...services.map((s) => s.name),
    ]);
    setErrors(result);
    if (Object.keys(result).length) {
      const key = Object.keys(result)[0];
      (e.currentTarget.elements.namedItem(key) as HTMLInputElement)?.focus();
    } else {
      setValues({ name: "", phone: "", service: initial });
      setComplete(true);
    }
  }
  return (
    <Dialog
      labelId="booking-title"
      onClose={onClose}
      className="booking-dialog"
    >
      {complete ? (
        <div className="success">
          <span className="success-mark">✓</span>
          <p className="eyebrow">ДО СКОРОЙ ВСТРЕЧИ</p>
          <h2 id="booking-title" ref={resultRef} tabIndex={-1}>
            Всё получилось.
          </h2>
          <p role="status">Демонстрация завершена. Заявка не отправлена.</p>
          <button className="button" onClick={onClose}>
            Вернуться на сайт
            <Arrow />
          </button>
        </div>
      ) : (
        <>
          <p className="eyebrow">ВРЕМЯ ДЛЯ СЕБЯ</p>
          <h2 id="booking-title">Начнём знакомство.</h2>
          <p className="dialog-intro">
            Выберите услугу — или оставьте выбор нам.
            {master && (
              <span className="master-choice">Ваш мастер: {master}</span>
            )}
          </p>
          <form onSubmit={submit} noValidate>
            <label htmlFor="booking-name">Ваше имя</label>
            <input
              autoFocus
              id="booking-name"
              name="name"
              autoComplete="off"
              maxLength={80}
              placeholder="Как к вам обращаться?"
              value={values.name}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <p className="field-error" id="name-error">
              {errors.name}
            </p>
            <label htmlFor="booking-phone">Телефон</label>
            <input
              id="booking-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="off"
              maxLength={24}
              placeholder="+7 (___) ___-__-__"
              value={values.phone}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
            <p className="field-error" id="phone-error">
              {errors.phone}
            </p>
            <label htmlFor="booking-service">Услуга</label>
            <select
              id="booking-service"
              name="service"
              value={values.service}
              onChange={(e) =>
                setValues({ ...values, service: e.target.value })
              }
            >
              <option>Помогите выбрать</option>
              {services.map((s) => (
                <option key={s.name}>{s.name}</option>
              ))}
            </select>
            <p className="field-error">{errors.service}</p>
            <button className="button" type="submit">
              Записаться
              <Arrow diagonal />
            </button>
          </form>
        </>
      )}
    </Dialog>
  );
}
function ImageViewer({
  items,
  initial,
  onClose,
}: {
  items: typeof works;
  initial: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initial);
  const item = items[index];
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setIndex((i) => Math.min(items.length - 1, i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [items.length]);
  return (
    <Dialog labelId="viewer-title" onClose={onClose} className="viewer-dialog">
      <Photo work={item} />
      <div className="viewer-bottom">
        <div aria-live="polite">
          <h2 id="viewer-title">{item.name}</h2>
          <p>
            {item.type}{" "}
            <span>
              {" "}
              / {index + 1} из {items.length}
            </span>
          </p>
        </div>
        <div className="viewer-arrows">
          <button
            className="icon-button previous"
            aria-label="Предыдущая работа"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            <Arrow />
          </button>
          <button
            className="icon-button"
            aria-label="Следующая работа"
            disabled={index === items.length - 1}
            onClick={() => setIndex(index + 1)}
          >
            <Arrow />
          </button>
        </div>
      </div>
    </Dialog>
  );
}
function MapIllustration() {
  return (
    <div
      className="map"
      role="img"
      aria-label="Схематичная карта: переулок Тихой Линии, 7"
    >
      <svg viewBox="0 0 620 460" fill="none" aria-hidden="true">
        <rect width="620" height="460" fill="#e7e8de" />
        <g fill="#d9ddd0">
          <rect x="24" y="22" width="140" height="110" rx="8" />
          <rect x="190" y="22" width="174" height="110" rx="8" />
          <rect x="410" y="22" width="188" height="110" rx="8" />
          <rect x="24" y="170" width="140" height="120" rx="8" />
          <rect x="188" y="170" width="177" height="120" rx="8" />
          <rect x="410" y="170" width="188" height="120" rx="8" />
          <rect x="24" y="328" width="140" height="110" rx="8" />
          <rect x="188" y="328" width="177" height="110" rx="8" />
          <rect x="410" y="328" width="188" height="110" rx="8" />
        </g>
        <path
          d="M-20 151H640M-20 309H640M385-20V480M176-20V480"
          stroke="#f6f3ed"
          strokeWidth="19"
        />
        <path d="M-25 445 640 20" stroke="#f6f3ed" strokeWidth="29" />
        <path
          d="M-25 445 640 20"
          stroke="#d3d7cb"
          strokeWidth="1"
          strokeDasharray="6 6"
        />
        <g fill="#c5ceb9">
          <circle cx="63" cy="218" r="26" />
          <circle cx="96" cy="242" r="33" />
          <circle cx="64" cy="263" r="20" />
          <circle cx="465" cy="380" r="25" />
          <circle cx="507" cy="384" r="37" />
          <circle cx="548" cy="370" r="23" />
        </g>
      </svg>
      <div className="map-pin">
        <span>{<Spark />}</span>
        <strong>свой срез</strong>
        <small>переулок Тихой Линии, 7</small>
      </div>
      <span className="map-note">Схема расположения</span>
      <span className="map-compass">N ↑</span>
    </div>
  );
}
function App() {
  const [booking, setBooking] = useState<{
    service: string;
    master?: string;
  } | null>(null);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("Все");
  const [viewer, setViewer] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const [showBar, setShowBar] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const filtered = works.filter(
    (w) => filter === "Все" || w.categories.includes(filter),
  );
  const openBooking = (service = "Помогите выбрать", master?: string) => {
    setMenu(false);
    setBooking({ service, master });
  };
  useEffect(() => {
    let heroVisible = true;
    let ctaVisible = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === heroRef.current) heroVisible = e.isIntersecting;
        if (e.target === ctaRef.current) ctaVisible = e.isIntersecting;
      });
      setShowBar(!heroVisible && !ctaVisible);
    });
    if (heroRef.current) observer.observe(heroRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(timer);
  }, [toast]);
  const contact = () =>
    setToast(
      "Демонстрационный контакт. Для знакомства с формой нажмите «Записаться».",
    );
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <header className="header">
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Основная навигация">
            {navigation.map(([name, id]) => (
              <a key={id} href={`#${id}`}>
                {name}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <BookingButton
              onClick={() => openBooking()}
              className="header-book"
            />
            <button
              className="icon-button menu-toggle"
              aria-label="Открыть меню"
              aria-expanded={menu}
              onClick={() => setMenu(true)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section id="top" className="hero container" ref={heroRef}>
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-dot" /> ВАША ФОРМА. ВАШ ХАРАКТЕР.
            </p>
            <h1>
              Волосы,
              <br />с которыми
              <br />
              <em>вам по пути.</em>
            </h1>
            <p className="hero-description">
              Стрижки, цвет и уход, которые подходят
              <br className="desktop-break" /> вашим волосам и вашему ритму
              жизни.
            </p>
            <div className="hero-buttons">
              <BookingButton onClick={() => openBooking()} />
              <a className="text-link" href="#works">
                Посмотреть работы
                <Arrow />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="asterisk">{<Spark />}</span>
              <p>
                Для привычного образа.
                <br />И для красивых перемен.
              </p>
              <span className="hero-index">МОСКВА / 01</span>
            </div>
          </div>
          <figure className="hero-visual">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/images/hero-mobile.webp"
              />
              <img
                src="/images/hero.webp"
                alt="Текстурное каре на тёмных волосах в мягком солнечном свете"
                width="1122"
                height="1402"
                fetchPriority="high"
              />
            </picture>
            <figcaption>
              <span>ЕСТЕСТВЕННО БЫТЬ СОБОЙ</span>
              <span>
                <Arrow diagonal />
              </span>
            </figcaption>
          </figure>
        </section>
        <section className="benefits-section">
          <div className="container">
            <div className="benefits-heading">
              <SectionLabel number="01">НАШ ПОДХОД</SectionLabel>
              <h2>
                Красиво в салоне.
                <br />
                <span className="muted">Удобно каждый день.</span>
              </h2>
            </div>
            <div className="benefits-grid">
              {benefits.map(([title, text], i) => (
                <article key={title}>
                  <span className="benefit-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="services" className="section container">
          <div className="section-heading">
            <div>
              <SectionLabel number="02">УСЛУГИ И ЦЕНЫ</SectionLabel>
              <h2>
                Ваша длина.
                <br />
                Ваш цвет. Ваш план.
              </h2>
            </div>
            <p>
              Освежить привычное или попробовать новое.
              <br />
              Начнём с того, чего хочется вам.
            </p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <article className="service-card" key={s.name}>
                <div className="service-top">
                  <span className="service-number">0{i + 1}</span>
                  <span>{s.time}</span>
                </div>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <div className="service-bottom">
                  <strong>{s.price}</strong>
                  <button
                    className="service-select"
                    aria-label={`Выбрать услугу: ${s.name}`}
                    onClick={() => openBooking(s.name)}
                  >
                    <span>Выбрать</span>
                    <Arrow diagonal />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="services-note">
            <p>
              Стоимость окрашивания зависит от длины, густоты и расхода
              материалов. Итоговую сумму согласуем до начала работы. Стрижка
              оплачивается отдельно.
            </p>
            <button className="text-link" onClick={() => openBooking()}>
              Помочь с выбором
              <Arrow />
            </button>
          </div>
        </section>
        <section id="works" className="works-section section">
          <div className="container">
            <div className="section-heading">
              <div>
                <SectionLabel number="03">РАБОТЫ МАСТЕРОВ</SectionLabel>
                <h2>
                  Форма, цвет,
                  <br />
                  <em>движение.</em>
                </h2>
              </div>
              <p>
                Не меняем вас. Помогаем увидеть
                <br />
                то, что хочется подчеркнуть.
              </p>
            </div>
            <div className="filters" role="group" aria-label="Категории работ">
              {filters.map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  className={filter === f ? "active" : ""}
                  onClick={() => setFilter(f)}
                >
                  {f}
                  {filter === f && (
                    <span>{filtered.length.toString().padStart(2, "0")}</span>
                  )}
                </button>
              ))}
            </div>
            <p className="sr-only" aria-live="polite">
              Показано работ: {filtered.length}
            </p>
            <div className="works-grid">
              {filtered.map((w, i) => (
                <button
                  className="work-card"
                  key={w.id}
                  onClick={() => setViewer(i)}
                  aria-label={`Увеличить: ${w.name}`}
                >
                  <div className="work-image-wrap">
                    <Photo work={w} />
                    <span className="work-expand">
                      <Arrow diagonal />
                    </span>
                  </div>
                  <div className="work-caption">
                    <h3>{w.name}</h3>
                    <p>{w.type}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="works-bottom">
              <span>У каждой формы — свой характер.</span>
              <span>
                НАЙДЁМ ВАШ <Arrow diagonal />
              </span>
            </div>
          </div>
        </section>
        <section id="team" className="section container">
          <div className="section-heading">
            <div>
              <SectionLabel number="04">НАШИ МАСТЕРА</SectionLabel>
              <h2>
                Хорошие руки.
                <br />
                Близкий подход.
              </h2>
            </div>
            <p>
              Выберите своего специалиста.
              <br />
              Или доверьте этот выбор нам.
            </p>
          </div>
          <div className="team-grid">
            {masters.map((m) => (
              <article className="master-card" key={m.name}>
                <div
                  className="master-photo"
                  role="img"
                  aria-label={`Портрет: ${m.name}`}
                  style={{ backgroundPosition: m.position }}
                >
                  <span>{m.experience}</span>
                </div>
                <div className="master-heading">
                  <h3>{m.name}</h3>
                  <Arrow diagonal />
                </div>
                <p className="master-role">{m.role}</p>
                <p className="master-description">{m.description}</p>
                <p className="master-tags">{m.tags}</p>
                <button
                  className="text-link"
                  onClick={() => openBooking("Помогите выбрать", m.name)}
                >
                  Записаться к мастеру
                  <Arrow />
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className="offer container">
          <div className="offer-symbol" aria-hidden="true">
            {<Spark />}
          </div>
          <div className="offer-copy">
            <p className="eyebrow">ПЕРВОЕ ЗНАКОМСТВО</p>
            <h2>
              Чуть больше заботы.
              <br />
              <em>За наш счёт.</em>
            </h2>
            <p>
              Увлажняющий экспресс-уход — в подарок
              <br className="desktop-break" /> к вашей первой женской или
              мужской стрижке.
            </p>
            <BookingButton
              className="button-light"
              onClick={() => openBooking("Женская стрижка")}
            >
              На первое посещение
            </BookingButton>
            <small>
              Для новых клиентов при записи через сайт. Один раз на человека.
              <br />
              Около 10 минут. Не суммируется с другими предложениями.
            </small>
          </div>
          <div className="offer-side">
            ЗНАКОМСТВО, КОТОРОЕ ХОЧЕТСЯ ПРОДОЛЖИТЬ
          </div>
        </section>
        <section id="reviews" className="section container">
          <div className="section-heading">
            <div>
              <SectionLabel number="05">ОТЗЫВЫ</SectionLabel>
              <h2>
                Ощущение, с которым
                <br />
                хочется вернуться.
              </h2>
            </div>
            <p>
              Про волосы, утренние укладки
              <br />и маленькие перемены.
            </p>
          </div>
          <div className="reviews-grid">
            {reviews.map((r) => (
              <article className="review-card" key={r.name}>
                <span className="quote" aria-hidden="true">
                  “
                </span>
                <blockquote>{r.text}</blockquote>
                <div className="review-person">
                  <span className="review-avatar">{r.name[0]}</span>
                  <div>
                    <strong>{r.name}</strong>
                    <p>{r.service}</p>
                  </div>
                  <span className="review-star" aria-hidden="true">
                    {<Spark />}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="contacts" className="contacts-section">
          <div className="container contacts-grid">
            <div className="contacts-copy">
              <SectionLabel number="06">КОНТАКТЫ</SectionLabel>
              <h2>
                Увидимся
                <br />
                <em>в кресле.</em>
              </h2>
              <div className="contact-detail">
                <span>АДРЕС</span>
                <p>
                  Москва, переулок Тихой Линии, 7<br />
                  Пространство 2
                </p>
              </div>
              <div className="contact-detail">
                <span>КАЖДЫЙ ДЕНЬ</span>
                <p>
                  10:00 — 21:00
                  <span className="contact-sub">По предварительной записи</span>
                </p>
              </div>
              <button className="phone" onClick={contact}>
                +7 (000) 000-00-00
              </button>
              <div className="socials">
                <button onClick={contact}>
                  Telegram
                  <Arrow diagonal />
                </button>
                <button onClick={contact}>
                  WhatsApp
                  <Arrow diagonal />
                </button>
              </div>
              <BookingButton onClick={() => openBooking()} />
            </div>
            <MapIllustration />
          </div>
        </section>
        <section className="final-cta container" ref={ctaRef}>
          <span className="asterisk" aria-hidden="true">
            {<Spark />}
          </span>
          <p className="eyebrow">ВАШ СЛЕДУЮЩИЙ ХОРОШИЙ ДЕНЬ</p>
          <h2>
            Начнём с того,
            <br />
            <em>чего хочется вам.</em>
          </h2>
          <p>Новая форма, другой оттенок или просто время для себя.</p>
          <BookingButton onClick={() => openBooking()} />
          <small>Пока не определились? Поможем выбрать.</small>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <Brand footer />
            <nav aria-label="Навигация в подвале">
              {navigation.map(([name, id]) => (
                <a key={id} href={`#${id}`}>
                  {name}
                </a>
              ))}
            </nav>
            <div className="footer-social">
              <button onClick={contact}>
                Telegram
                <Arrow diagonal />
              </button>
              <button onClick={contact}>
                WhatsApp
                <Arrow diagonal />
              </button>
              <button onClick={contact}>
                VK
                <Arrow diagonal />
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} СВОЙ СРЕЗ</span>
            <span>Форма и цвет, с которыми удобно жить.</span>
            <a href="#top">Наверх ↑</a>
          </div>
          <p className="demo-note">
            Учебный проект. Салон, команда, отзывы и контакты вымышлены.
            Изображения созданы с помощью ИИ. Запись демонстрационная.
          </p>
        </div>
      </footer>
      {showBar && !menu && !booking && viewer === null && (
        <div className="mobile-booking">
          <BookingButton onClick={() => openBooking()} />
        </div>
      )}
      {menu && (
        <Dialog
          labelId="menu-title"
          onClose={() => setMenu(false)}
          className="mobile-menu"
        >
          <h2 id="menu-title">
            свой срез<span>{<Spark />}</span>
          </h2>
          <nav aria-label="Мобильная навигация">
            {navigation.map(([name, id], i) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                <span>0{i + 1}</span>
                {name}
                <Arrow diagonal />
              </a>
            ))}
          </nav>
          <BookingButton onClick={() => openBooking()} />
          <p>Москва · ежедневно, 10:00–21:00</p>
        </Dialog>
      )}
      {booking && (
        <BookingDialog
          initial={booking.service}
          master={booking.master}
          onClose={() => setBooking(null)}
        />
      )}
      {viewer !== null && (
        <ImageViewer
          items={filtered}
          initial={viewer}
          onClose={() => setViewer(null)}
        />
      )}
      <div className={`toast ${toast ? "visible" : ""}`} role="status">
        {toast}
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
