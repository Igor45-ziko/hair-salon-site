import { useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  FileCheck2,
  MapPin,
  Plus,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import Header from "./components/Header";
import Logo from "./components/Logo";
import BookingForm from "./components/BookingForm";
import LocationMap from "./components/LocationMap";
import {
  faq,
  navigation,
  prices,
  principles,
  reviews,
  services,
  steps,
  team,
} from "./data";

const asset = (file: string) => `${import.meta.env.BASE_URL}images/${file}`;

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number} /</span>
      {children}
    </div>
  );
}

export default function App() {
  const [bookingRevision, setBookingRevision] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  function chooseService(service: string) {
    setSelectedService(service);
    setBookingRevision((value) => value + 1);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-photo">
            <img
              src={asset("workshop.webp")}
              alt="Графитовый автомобиль в чистом сервисном боксе с подъёмниками"
              fetchPriority="high"
              width="1536"
              height="1024"
            />
          </div>
          <div className="container hero-inner">
            <div className="hero-topline">
              <span className="eyebrow">
                <i /> АВТОСЕРВИС ПОЛНОГО ЦИКЛА
              </span>
              <span className="hero-location">
                <MapPin size={14} /> Москва
              </span>
            </div>
            <div className="hero-copy">
              <h1 id="hero-title">
                Автосервис,
                <br />
                где сначала
                <br />
                <span>объясняют —</span>
                <br />
                потом ремонтируют<span className="orange">.</span>
              </h1>
              <p>
                Диагностика, техническое обслуживание и ремонт автомобилей
                большинства марок. Стоимость согласовываем до начала работ.
              </p>
              <div className="hero-actions">
                <a
                  className="button"
                  href="#booking"
                  onClick={() => chooseService("Диагностика")}
                >
                  Записаться на диагностику <ArrowUpRight size={20} />
                </a>
                <a className="text-link" href="#prices">
                  Посмотреть цены <ArrowDown size={17} />
                </a>
              </div>
            </div>
            <div className="hero-photo-note">
              <span className="status-dot" />
              <span>
                Всё под контролем.
                <br />
                <strong>И ваш автомобиль тоже.</strong>
              </span>
              <span className="photo-corner">01 / 08</span>
            </div>
            <a
              className="hero-scroll"
              href="#services"
              aria-label="Перейти к услугам"
            >
              <ArrowDown size={18} />
            </a>
          </div>
        </section>

        <div className="benefits-bar">
          <div className="container benefits-inner">
            <div>
              <ShieldCheck />
              <span>
                Гарантия <strong>12 месяцев</strong>
              </span>
            </div>
            <div>
              <FileCheck2 />
              <span>
                Стоимость <strong>до начала работ</strong>
              </span>
            </div>
            <div>
              <Wrench />
              <span>
                Запчасти <strong>в наличии</strong>
              </span>
            </div>
            <div>
              <Clock3 />
              <span>
                Ежедневно <strong>09:00–21:00</strong>
              </span>
            </div>
          </div>
        </div>

        <section
          className="section section-light"
          id="services"
          aria-labelledby="services-title"
        >
          <div className="container">
            <SectionLabel number="01">ЧТО МЫ ДЕЛАЕМ</SectionLabel>
            <div className="section-heading">
              <h2 id="services-title">
                Один сервис.
                <br />
                <span className="muted">Все основные задачи.</span>
              </h2>
              <p>
                От планового ТО до сложного ремонта.
                <br />
                Знаем, как устроен ваш автомобиль.
                <br />И умеем объяснить это вам.
              </p>
            </div>
            <div className="service-grid">
              {services.map((service, i) => (
                <article
                  key={service.title}
                  className={`service-card${i === 0 ? " service-featured" : ""}`}
                >
                  <div className="service-card-top">
                    <service.icon size={31} strokeWidth={1.35} />
                    <span>0{i + 1}</span>
                  </div>
                  {service.tag && (
                    <span className="service-tag">{service.tag}</span>
                  )}
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-card-bottom">
                    <span>
                      от <strong>{service.price} ₽</strong>
                    </span>
                    <a
                      href="#booking"
                      onClick={() => chooseService(service.title)}
                      aria-label={`Записаться: ${service.title}`}
                    >
                      <span>Записаться</span>
                      <ArrowUpRight size={21} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="services-footnote">
              <span>Европа · Япония · Корея · Китай</span>
              <span>
                Работаем с большинством марок <ArrowDownRight size={17} />
              </span>
            </div>
          </div>
        </section>

        <section
          className="section about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container">
            <SectionLabel number="02">НАШ ПОДХОД</SectionLabel>
            <div className="about-intro">
              <h2 id="about-title">
                Без лишних работ
                <br />и неожиданных
                <br />
                <span className="orange">расходов.</span>
              </h2>
              <div>
                <p className="lead">
                  Хороший автосервис — это не только инструменты. Это понятный
                  разговор.
                </p>
                <p>
                  Не каждый должен разбираться в устройстве автомобиля. Наша
                  работа — разобраться в неисправности, объяснить варианты и
                  помочь принять решение. Спокойно, честно и по делу.
                </p>
              </div>
            </div>
            <div className="principles-grid">
              {principles.map(([title, text], i) => (
                <div className="principle" key={title}>
                  <span className="principle-number">0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="stats-grid">
              <div>
                <strong>
                  10<span>+</span>
                </strong>
                <span>лет опыта</span>
              </div>
              <div>
                <strong>12</strong>
                <span>месяцев гарантии</span>
              </div>
              <div>
                <strong>8</strong>
                <span>направлений ремонта</span>
              </div>
              <div>
                <strong>
                  4,9<span>★</span>
                </strong>
                <span>рейтинг клиентов · демо</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section section-light"
          id="prices"
          aria-labelledby="prices-title"
        >
          <div className="container price-layout">
            <div className="price-intro">
              <SectionLabel number="03">ПОНЯТНЫЕ ЦЕНЫ</SectionLabel>
              <h2 id="prices-title">
                Сначала цена.
                <br />
                <span className="muted">Потом работа.</span>
              </h2>
              <p>
                Точная стоимость зависит от марки автомобиля и объёма работ. До
                начала ремонта мастер согласует итоговую цену.
              </p>
              <a
                className="button button-dark"
                href="#booking"
                onClick={() => chooseService("Хочу узнать стоимость ремонта")}
              >
                Узнать стоимость ремонта <ArrowUpRight size={19} />
              </a>
              <span className="price-note">
                <Check size={15} /> Ничего не добавим без вашего согласия
              </span>
            </div>
            <div className="price-table">
              <div className="price-table-head">
                <span>ПОПУЛЯРНЫЕ РАБОТЫ</span>
                <span>СТОИМОСТЬ</span>
              </div>
              {prices.map((price) => (
                <a
                  className="price-row"
                  href="#booking"
                  onClick={() => chooseService(price.title)}
                  key={price.title}
                  aria-label={`${price.title}, от ${price.price} рублей. Записаться`}
                >
                  <div>
                    <h3>{price.title}</h3>
                    <span>{price.time}</span>
                  </div>
                  <strong>
                    <small>от</small> {price.price} ₽
                  </strong>
                  <ArrowUpRight size={18} />
                </a>
              ))}
              <p className="table-note">
                Цены за работы, без стоимости запчастей и расходных материалов.
                <br />
                Ориентировочный прайс учебного проекта.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section process-section"
          aria-labelledby="process-title"
        >
          <div className="container">
            <SectionLabel number="04">ВСЁ ПРЕДСКАЗУЕМО</SectionLabel>
            <div className="section-heading">
              <h2 id="process-title">
                От первого звонка
                <br />
                до спокойной поездки.
              </h2>
              <p>
                Пять шагов. На каждом вы понимаете,
                <br />
                что происходит с автомобилем.
              </p>
            </div>
            <ol className="steps">
              {steps.map(([title, text], i) => (
                <li key={title}>
                  <div className="step-top">
                    <span>0{i + 1}</span>
                    {i < steps.length - 1 ? (
                      <ArrowRight size={21} />
                    ) : (
                      <Check size={21} />
                    )}
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="section section-light team-section"
          id="team"
          aria-labelledby="team-title"
        >
          <div className="container">
            <SectionLabel number="05">ЛЮДИ, КОТОРЫМ ДОВЕРЯЮТ</SectionLabel>
            <div className="section-heading">
              <h2 id="team-title">
                За каждой работой —<br />
                <span className="muted">конкретный человек.</span>
              </h2>
              <p>
                Без безымянных мастеров.
                <br />
                Познакомьтесь с теми, кто будет
                <br />
                заниматься вашим автомобилем.
              </p>
            </div>
            <div className="team-grid">
              {team.map((person, i) => (
                <article className="team-card" key={person.name}>
                  <div className="team-photo">
                    <img
                      src={asset("team.webp")}
                      style={{ left: `${-100 * i}%` }}
                      alt={`${person.name}, ${person.role.toLowerCase()}. Сгенерированный образ вымышленного специалиста.`}
                      loading="lazy"
                      width="1536"
                      height="1024"
                    />
                    <span className="experience">Опыт {person.experience}</span>
                    <span className="team-photo-mark">М / 0{i + 1}</span>
                  </div>
                  <div className="team-info">
                    <span>{person.role}</span>
                    <h3>{person.name}</h3>
                    <p>{person.quote}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="section-demo-note">
              Знакомство с командой — часть концепции. Специалисты вымышлены.
            </p>
          </div>
        </section>

        <section
          className="guarantee-section"
          aria-labelledby="guarantee-title"
        >
          <div className="container guarantee-inner">
            <div className="guarantee-number">
              12<span>МЕСЯЦЕВ</span>
              <ShieldCheck strokeWidth={1} aria-hidden="true" />
            </div>
            <div className="guarantee-content">
              <span className="eyebrow">ОТВЕЧАЕМ ЗА ТО, ЧТО ДЕЛАЕМ</span>
              <h2 id="guarantee-title">
                12 месяцев гарантии
                <br />
                на выполненные работы.
              </h2>
              <p>
                Не просто обещание. Обязательство, которое остаётся с вами после
                выезда из сервиса.
              </p>
              <ul>
                <li>
                  <Check /> Все работы фиксируем в заказ-наряде
                </li>
                <li>
                  <Check /> Вы получаете понятный перечень операций
                </li>
                <li>
                  <Check /> Проблему с нашей работой устраняем по гарантии
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          className="section section-light"
          id="reviews"
          aria-labelledby="reviews-title"
        >
          <div className="container">
            <SectionLabel number="06">ОПЫТ КЛИЕНТОВ</SectionLabel>
            <div className="section-heading">
              <h2 id="reviews-title">
                После ремонта
                <br />
                <span className="muted">есть что сказать.</span>
              </h2>
              <div className="rating">
                <strong>4,9</strong>
                <div>
                  <div
                    className="stars"
                    role="img"
                    aria-label="Рейтинг 4,9 из 5"
                  >
                    ★★★★★
                  </div>
                  <span>Демонстрационный рейтинг</span>
                </div>
              </div>
            </div>
            <div className="review-grid">
              {reviews.map((review) => (
                <article className="review-card" key={review.name}>
                  <div className="review-top">
                    <div
                      className="stars"
                      role="img"
                      aria-label={`${review.rating} из 5`}
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span>{review.date}</span>
                  </div>
                  <blockquote>{review.text}</blockquote>
                  <div className="review-person">
                    <span className="avatar">{review.initial}</span>
                    <div>
                      <strong>{review.name}</strong>
                      <span>{review.car}</span>
                    </div>
                    <span className="review-mark">”</span>
                  </div>
                </article>
              ))}
            </div>
            <p className="section-demo-note">
              Отзывы написаны для учебного проекта и не описывают реальный
              клиентский опыт.
            </p>
          </div>
        </section>

        <section
          className="section section-light faq-section"
          aria-labelledby="faq-title"
        >
          <div className="container faq-layout">
            <div>
              <SectionLabel number="07">БЕЗ НЕДОСКАЗАННОСТИ</SectionLabel>
              <h2 id="faq-title">
                Хорошие вопросы.
                <br />
                <span className="muted">Прямые ответы.</span>
              </h2>
              <p>
                Не нашли свой вопрос?
                <br />
                <a className="inline-link" href="#booking">
                  Расскажите, что вас беспокоит <ArrowUpRight size={17} />
                </a>
              </p>
            </div>
            <div className="faq-list">
              {faq.map(([question, answer], i) => (
                <details key={question} name="faq">
                  <summary>
                    <span className="faq-number">0{i + 1}</span>
                    <span>{question}</span>
                    <Plus size={20} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section contacts-section"
          id="contacts"
          aria-labelledby="contacts-title"
        >
          <div className="container">
            <SectionLabel number="08">УВИДИМСЯ В СЕРВИСЕ</SectionLabel>
            <div className="contacts-layout">
              <div className="contacts-copy">
                <h2 id="contacts-title">
                  Ближе,
                  <br />
                  чем кажется.
                </h2>
                <div className="contact-item">
                  <MapPin />
                  <div>
                    <span>МОСКВА</span>
                    <p>ул. Механическая, 18, стр. 2</p>
                    <small>Въезд со стороны двора · парковка у бокса</small>
                  </div>
                </div>
                <div className="contact-item">
                  <Clock3 />
                  <div>
                    <span>БЕЗ ВЫХОДНЫХ</span>
                    <p>Ежедневно, 09:00–21:00</p>
                  </div>
                </div>
                <div className="contact-details">
                  <span className="contact-phone">+7 (495) 000-00-00</span>
                  <span>hello@motornaya.example</span>
                  <small>Демонстрационные контакты</small>
                </div>
              </div>
              <div className="map-wrap">
                <LocationMap />
              </div>
            </div>
          </div>
        </section>

        <section
          className="section booking-section"
          id="booking"
          aria-labelledby="booking-title"
        >
          <div className="container booking-layout">
            <div className="booking-copy">
              <span className="eyebrow">
                <i /> НАЧНЁМ С ПРОСТОГО
              </span>
              <h2 id="booking-title">
                Не знаешь,
                <br />
                что случилось
                <br />с автомобилем?
                <br />
                <span>
                  Начнём
                  <br />с диагностики.
                </span>
              </h2>
              <p>
                Расскажите, что вас беспокоит.
                <br />
                Остальное — наша работа.
              </p>
              <ArrowDownRight
                className="booking-arrow"
                size={90}
                strokeWidth={1}
              />
            </div>
            <BookingForm
              key={bookingRevision}
              selectedService={selectedService}
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <Logo footer />
            <p>
              Ремонт без лишних работ
              <br />и сюрпризов в счёте.
            </p>
            <a href="#top" className="back-to-top">
              Наверх <ArrowUpRight size={19} />
            </a>
          </div>
          <div className="footer-middle">
            <nav aria-label="Навигация в подвале">
              {navigation.map(([id, title]) => (
                <a key={id} href={`#${id}`}>
                  {title}
                </a>
              ))}
            </nav>
            <span>Ежедневно, 09:00–21:00</span>
            <span>
              hello@motornaya.example
              <br />
              +7 (495) 000-00-00
            </span>
          </div>
          <div className="footer-bottom">
            <span>© 2026 МОТОРНАЯ</span>
            <p>
              Учебный проект. Автосервис, сотрудники, отзывы, цены и контакты
              вымышлены. Форма записи демонстрационная.
            </p>
            <span>
              СДЕЛАНО С ВНИМАНИЕМ <Plus size={12} />
            </span>
          </div>
        </div>
      </footer>
      <a className="mobile-book-bar" href="#booking">
        Записаться в сервис <ArrowUpRight size={19} />
      </a>
    </>
  );
}
