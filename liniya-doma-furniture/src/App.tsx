import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Clock3,
  Factory,
  FileCheck2,
  MapPin,
  Ruler,
  Wrench,
} from "lucide-react";
import Header from "./components/Header";
import MobileCTA from "./components/MobileCTA";
import Logo from "./components/Logo";
import Photo from "./components/Photo";
import Portfolio from "./components/Portfolio";
import Materials from "./components/Materials";
import DemoForm, { type Selection } from "./components/DemoForm";
import Modal from "./components/Modal";
import LocationMap from "./components/LocationMap";
import {
  address,
  categories,
  email,
  faq,
  kitchenPhoto,
  money,
  navigation,
  phone,
  reviews,
  steps,
  trust,
  workshopPhoto,
} from "./data";

export default function App() {
  const [selection, setSelection] = useState<Selection>({
    id: "",
    revision: 0,
  });
  const [callback, setCallback] = useState(false);
  const choose = (id: string) =>
    setSelection((previous) => ({ id, revision: previous.revision + 1 }));
  return (
    <>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container">
            <div className="hero-topline">
              <span className="eyebrow">
                <span className="tiny-square" /> МЕБЕЛЬ ПО ИНДИВИДУАЛЬНЫМ
                РАЗМЕРАМ
              </span>
              <span>МОСКВА И ОБЛАСТЬ</span>
            </div>
            <div className="hero-intro">
              <h1 id="hero-title">
                Мебель, которая
                <br />
                <span>подходит вашему дому.</span>
              </h1>
              <div className="hero-description">
                <p>
                  Изготавливаем кухни, шкафы и системы хранения по
                  индивидуальным размерам. Замер, проект, производство и
                  установка — в одной компании.
                </p>
                <div className="hero-actions">
                  <a className="button" href="#measure">
                    Рассчитать стоимость <ArrowUpRight size={18} />
                  </a>
                  <a
                    className="hero-work-link"
                    href="#works"
                    aria-label="Посмотреть работы"
                  >
                    <ArrowDown size={19} />
                    <span>
                      Посмотреть
                      <br />
                      работы
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <Photo photo={kitchenPhoto} priority />
              <span className="hero-image-tag">01 / КУХНЯ «ТЁПЛЫЙ ДУБ»</span>
              <div className="hero-image-caption">
                <span>
                  Продумано до миллиметра.
                  <br />
                  <strong>Сделано для жизни.</strong>
                </span>
                <a href="#works" aria-label="Посмотреть проект кухни">
                  <ArrowUpRight size={28} strokeWidth={1.4} />
                </a>
              </div>
            </div>
            <div className="hero-benefits">
              <div>
                <Ruler size={22} />
                <span>Бесплатный замер</span>
              </div>
              <div>
                <Factory size={22} />
                <span>Собственное производство</span>
              </div>
              <div>
                <BadgeCheck size={22} />
                <span>Гарантия 3 года</span>
              </div>
              <div>
                <Wrench size={22} />
                <span>Монтаж нашей бригадой</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section furniture-section"
          id="furniture"
          aria-labelledby="furniture-title"
        >
          <div className="container">
            <span className="eyebrow">01 / ЧТО МЫ ДЕЛАЕМ</span>
            <div className="section-heading">
              <h2 id="furniture-title">
                Для каждой комнаты.
                <br />
                <span>Под ваши задачи.</span>
              </h2>
              <p>
                Не подгоняйте дом под готовую мебель.
                <br />
                Сделаем мебель под ваш дом.
              </p>
            </div>
            <div className="categories-grid">
              {categories.map((category) => (
                <article className="category-card" key={category.id}>
                  <Photo photo={category.photo} />
                  <div className="category-body">
                    <h3>{category.title}</h3>
                    <p>{category.text}</p>
                    <div className="category-bottom">
                      <span>
                        от <strong>{money(category.price)}</strong>
                      </span>
                      <a
                        className="text-link"
                        href="#measure"
                        onClick={() => choose(category.id)}
                        aria-label={`Рассчитать: ${category.title}`}
                      >
                        Рассчитать <ArrowUpRight size={19} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section works-section"
          id="works"
          aria-labelledby="works-title"
        >
          <div className="container">
            <span className="eyebrow">02 / НАШИ РАБОТЫ</span>
            <div className="section-heading">
              <h2 id="works-title">
                Разные дома.
                <br />
                <span>Один внимательный подход.</span>
              </h2>
              <p>
                Мебель для реальной жизни:
                <br />
                удобное хранение, точные размеры
                <br />и ничего случайного.
              </p>
            </div>
            <Portfolio onSelect={choose} />
          </div>
        </section>

        <section
          className="section prices-section"
          id="prices"
          aria-labelledby="prices-title"
        >
          <div className="container price-grid">
            <div className="price-copy">
              <span className="eyebrow">03 / ОРИЕНТИР ПО СТОИМОСТИ</span>
              <h2 id="prices-title">
                Понятная цена.
                <br />
                <span>Без догадок.</span>
              </h2>
              <p>
                Точная стоимость зависит от размеров, материалов, фурнитуры и
                наполнения.
              </p>
              <p>
                Подскажем, на чём можно сэкономить, а где лучше выбрать решение
                надёжнее. Итоговую сумму согласуем до производства.
              </p>
              <a className="button" href="#measure">
                Получить расчёт <ArrowUpRight size={18} />
              </a>
              <span className="price-reassurance">
                <Check size={16} /> Стоимость фиксируем в договоре
              </span>
            </div>
            <div className="price-table">
              <div className="price-table-head">
                <span>НАПРАВЛЕНИЕ</span>
                <span>ОРИЕНТИРОВОЧНО</span>
              </div>
              {categories.map((category) => (
                <a
                  href="#measure"
                  onClick={() => choose(category.id)}
                  className="price-row"
                  key={category.id}
                >
                  <h3>{category.title}</h3>
                  <span>
                    от <strong>{money(category.price)}</strong>
                  </span>
                  <ArrowUpRight size={18} />
                </a>
              ))}
              <p className="section-note">
                Учебные цены за базовую комплектацию мебели. Техника, доставка и
                особенности монтажа рассчитываются отдельно.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section trust-section"
          aria-labelledby="trust-title"
        >
          <div className="container">
            <span className="eyebrow">04 / БЕЗ ЛИШНЕГО БЕСПОКОЙСТВА</span>
            <div className="section-heading">
              <h2 id="trust-title">
                Всё важное
                <br />
                <span>обсуждаем заранее.</span>
              </h2>
              <p>
                Удобство начинается ещё до установки.
                <br />С понятных решений и договорённостей.
              </p>
            </div>
            <div className="trust-grid">
              {trust.map((item) => (
                <article key={item.title}>
                  <item.icon size={28} strokeWidth={1.3} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="stats">
              <div>
                <strong>
                  7 <span>лет</span>
                </strong>
                <span>занимаемся мебелью</span>
              </div>
              <div>
                <strong>
                  350<span>+</span>
                </strong>
                <span>выполненных проектов</span>
              </div>
              <div>
                <strong>
                  3 <span>года</span>
                </strong>
                <span>гарантии</span>
              </div>
              <div>
                <strong>14–30</strong>
                <span>дней на изготовление</span>
              </div>
            </div>
            <p className="section-note">
              Показатели и условия приведены для вымышленной учебной мастерской.
            </p>
          </div>
        </section>

        <section
          className="section materials-section"
          id="materials"
          aria-labelledby="materials-title"
        >
          <div className="container">
            <span className="eyebrow">05 / МАТЕРИАЛЫ И ДЕТАЛИ</span>
            <div className="section-heading">
              <h2 id="materials-title">
                Внешний вид — ваш.
                <br />
                <span>Практичность — наша забота.</span>
              </h2>
              <p>
                Покажем образцы, объясним отличия.
                <br />
                Подберём сочетание для вашего интерьера
                <br />и бюджета.
              </p>
            </div>
            <Materials />
          </div>
        </section>

        <section
          className="section process-section"
          id="process"
          aria-labelledby="process-title"
        >
          <div className="container">
            <span className="eyebrow">06 / КАК МЫ РАБОТАЕМ</span>
            <div className="section-heading">
              <h2 id="process-title">
                От первой идеи
                <br />
                <span>до последней ручки.</span>
              </h2>
              <p>
                Пять понятных шагов.
                <br />
                Одна команда на всём пути.
              </p>
            </div>
            <ol className="process-steps">
              {steps.map(([title, text], i) => (
                <li key={title}>
                  <div>
                    <span>0{i + 1}</span>
                    {i < steps.length - 1 ? (
                      <ArrowRight size={20} />
                    ) : (
                      <Check size={20} />
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
          className="section measure-section"
          id="measure"
          aria-labelledby="measure-title"
        >
          <div className="container measure-layout">
            <div className="measure-copy">
              <span className="eyebrow">ВАША ИДЕЯ НАЧИНАЕТСЯ ЗДЕСЬ</span>
              <h2 id="measure-title">
                Начнём
                <br />с замера<span>.</span>
              </h2>
              <p>
                Замерщик приедет, снимет размеры, обсудит материалы и поможет
                подобрать подходящее решение.
              </p>
              <div className="measure-points">
                <span>
                  <Check size={17} /> Бесплатно в пределах Москвы
                </span>
                <span>
                  <Check size={17} /> Образцы материалов с собой
                </span>
                <span>
                  <Check size={17} /> В удобное для вас время
                </span>
              </div>
              <div className="measure-drawing" aria-hidden="true">
                <svg viewBox="0 0 350 90" fill="none">
                  <path
                    d="M20 30h310v42H20zM40 30v18m20-18v10m20-10v18m20-18v10m20-10v18m20-18v10m20-10v18m20-18v10m20-10v18m20-18v10m20-10v18m20-18v10m20-10v18m20-18v10m20-10v18M20 15h310m-310-5v10m310-10v10"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
                <span>ТОЧНО ПОД ВАШЕ ПРОСТРАНСТВО</span>
              </div>
            </div>
            <div className="measure-form-card">
              <div className="form-heading">
                <h3>Расскажите о вашей задаче</h3>
                <span>Начнём с простого</span>
              </div>
              <DemoForm selection={selection} />
            </div>
          </div>
        </section>

        <section
          className="section about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container about-grid">
            <div className="about-photo">
              <Photo photo={workshopPhoto} />
              <span>СВОЯ МАСТЕРСКАЯ. СВОИ РУКИ.</span>
            </div>
            <div className="about-copy">
              <span className="eyebrow">07 / ЗА МЕБЕЛЬЮ СТОЯТ ЛЮДИ</span>
              <h2 id="about-title">
                Небольшая мастерская.
                <br />
                <span>Личное участие.</span>
              </h2>
              <p>
                ЛИНИЯ ДОМА — небольшая мебельная мастерская полного цикла. Мы
                сами делаем замер, проектируем мебель, производим её и
                устанавливаем у заказчика.
              </p>
              <p>
                Нам важно, чтобы шкаф открывался удобно, на кухне хватало места,
                а вещи находились с первого раза. Именно с таких деталей
                начинается хорошая мебель.
              </p>
              <div className="about-tags">
                <span>
                  <Factory size={16} /> Своё производство
                </span>
                <span>
                  <Wrench size={16} /> Свои монтажники
                </span>
                <span>
                  <FileCheck2 size={16} /> Работа по договору
                </span>
                <span>
                  <BadgeCheck size={16} /> Гарантия
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section reviews-section"
          id="reviews"
          aria-labelledby="reviews-title"
        >
          <div className="container">
            <span className="eyebrow">08 / ОПЫТ ЗАКАЗЧИКОВ</span>
            <div className="section-heading">
              <h2 id="reviews-title">
                Когда мебель
                <br />
                <span>на своём месте.</span>
              </h2>
              <p>
                Впечатления о процессе
                <br />и о жизни после установки.
              </p>
            </div>
            <div className="reviews-grid">
              {reviews.map((review) => (
                <article className="review" key={review.name}>
                  <div
                    className="review-stars"
                    role="img"
                    aria-label={`${review.rating} из 5`}
                  >
                    {"★".repeat(review.rating)}
                    <span aria-hidden="true">
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <blockquote>{review.text}</blockquote>
                  <div className="review-person">
                    <span className="avatar">{review.initials}</span>
                    <div>
                      <h3>{review.name}</h3>
                      <span>{review.order}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="section-note">
              Отзывы вымышлены и не описывают опыт реальных заказчиков.
            </p>
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div>
              <span className="eyebrow">09 / ЧАСТЫЕ ВОПРОСЫ</span>
              <h2 id="faq-title">
                До того,
                <br />
                <span>как заказать.</span>
              </h2>
              <p>
                Отвечаем коротко и по делу.
                <br />
                Остальное обсудим лично.
              </p>
            </div>
            <div className="faq-list">
              {faq.map(([question, answer]) => (
                <details key={question} name="furniture-faq">
                  <summary>
                    {question}
                    <ChevronDown size={20} />
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
          <div className="container contacts-grid">
            <div className="contacts-copy">
              <span className="eyebrow">10 / ДАВАЙТЕ ЗНАКОМИТЬСЯ</span>
              <h2 id="contacts-title">
                Покажем образцы.
                <br />
                <span>Обсудим ваш дом.</span>
              </h2>
              <p className="contact-address">
                <MapPin size={19} />
                <span>
                  Шоурум / мастерская
                  <br />
                  <strong>{address}</strong>
                </span>
              </p>
              <p className="contact-hours">
                <Clock3 size={19} />
                <span>
                  Пн–Сб 09:00–19:00
                  <br />
                  <small>Встречи в мастерской — по записи</small>
                </span>
              </p>
              <div className="contact-details">
                <span>{phone}</span>
                <span>{email}</span>
                <small>Телефон, email и адрес вымышлены.</small>
              </div>
              <button
                className="button button-outline"
                onClick={() => setCallback(true)}
              >
                Заказать звонок <ArrowUpRight size={18} />
              </button>
            </div>
            <LocationMap />
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-inner">
            <div>
              <span className="eyebrow">ИЗ ИДЕИ — В ВАШ ДОМ</span>
              <h2>Есть идея для мебели?</h2>
              <p>
                Расскажите, что хотите сделать. Подскажем возможные варианты
                <br />и рассчитаем примерную стоимость.
              </p>
            </div>
            <a href="#measure" className="button">
              Получить расчёт <ArrowUpRight size={19} />
            </a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <Logo />
            <p>
              Мебель по вашим размерам —<br />
              от замера до установки.
            </p>
            <a className="back-top" href="#top">
              Наверх <ArrowUpRight size={18} />
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
            <span>Пн–Сб 09:00–19:00</span>
            <span>
              {phone}
              <br />
              {email}
            </span>
          </div>
          <div className="footer-bottom">
            <span>© 2026 ЛИНИЯ ДОМА</span>
            <p>
              Учебный проект. Компания, проекты, цены, отзывы и контакты
              вымышлены. Формы заявок демонстрационные.
            </p>
          </div>
        </div>
      </footer>
      <Modal
        open={callback}
        onClose={() => setCallback(false)}
        titleId="callback-title"
        className="callback-modal"
      >
        {callback && (
          <>
            <span className="eyebrow">ОБСУДИМ ВАШУ ЗАДАЧУ</span>
            <h2 id="callback-title">Заказать звонок</h2>
            <p className="callback-intro">
              Начать можно с короткого разговора.
              <br />
              Эта форма работает в демонстрационном режиме.
            </p>
            <DemoForm mode="callback" />
          </>
        )}
      </Modal>
      <MobileCTA />
    </>
  );
}
