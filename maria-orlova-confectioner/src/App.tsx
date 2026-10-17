import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  Asterisk,
} from "lucide-react";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Photo from "./components/Photo";
import Gallery from "./components/Gallery";
import OrderForm, { type Selection } from "./components/OrderForm";
import Modal from "./components/Modal";
import Enhancements from "./components/Enhancements";
import {
  advantages,
  bestsellers,
  disclaimer,
  faq,
  fillings,
  heroPhoto,
  navigation,
  occasions,
  portraitPhoto,
  reviews,
  steps,
  type Filter,
} from "./data";

export default function App() {
  const [filter, setFilter] = useState<Filter>("Все"),
    [selection, setSelection] = useState<Selection | null>(null),
    [messenger, setMessenger] = useState<string | null>(null);
  const choose = (value: Omit<Selection, "revision">) =>
    setSelection((previous) => ({
      ...value,
      revision: (previous?.revision ?? 0) + 1,
    }));
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                ЧАСТНЫЙ КОНДИТЕР · МОСКВА
              </span>
              <h1 id="hero-title">
                Торты и десерты,
                <br />
                которые хочется
                <br />
                <em>запомнить</em>
                <span className="hero-spark" aria-hidden="true">
                  <Asterisk size={40} strokeWidth={1.2} />
                </span>
              </h1>
              <p>
                Домашний кондитер в Москве. Готовлю торты, бенто и десерты для
                дней рождения, свадеб и семейных праздников. Дизайн и стоимость
                согласуем заранее.
              </p>
              <div className="hero-actions">
                <a href="#order" className="button">
                  Рассчитать торт <ArrowUpRight size={19} />
                </a>
                <a href="#works" className="text-link">
                  Смотреть работы <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-facts">
                <span>
                  <strong>от 2 700 ₽ / кг</strong>понятная стоимость
                </span>
                <span>
                  <strong>от 3 дней</strong>на ваш заказ
                </span>
                <span>
                  <strong>Москва</strong>самовывоз и доставка
                </span>
              </div>
              <a className="hero-scroll" href="#cakes">
                <ArrowDown size={16} /> Найдём ваш любимый вкус
              </a>
            </div>
            <div className="hero-visual">
              <div className="hero-photo">
                <Photo photo={heroPhoto} priority />
              </div>
              <div className="hero-stamp">
                <Heart size={21} strokeWidth={1.2} />
                <span>
                  Для больших
                  <br />и маленьких
                  <br />
                  <em>поводов</em>
                </span>
              </div>
              <div className="hero-caption">
                <span className="caption-dot" />
                <span>
                  Не просто торт.
                  <br />
                  <strong>Часть вашего праздника.</strong>
                </span>
              </div>
              <span className="hero-photo-note">
                СОЗДАНО С ВНИМАНИЕМ К ДЕТАЛЯМ
              </span>
            </div>
          </div>
        </section>
        <div className="ribbon" aria-hidden="true">
          <span>Тот самый вкус</span>
          <span>
            <Asterisk size={18} strokeWidth={1.2} />
          </span>
          <span>Ваше настроение</span>
          <span>
            <Asterisk size={18} strokeWidth={1.2} />
          </span>
          <span>Особенный повод</span>
          <span>
            <Asterisk size={18} strokeWidth={1.2} />
          </span>
          <span>Маленькое счастье</span>
        </div>

        <section
          className="section bestsellers"
          id="cakes"
          aria-labelledby="cakes-title"
        >
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">ЗНАКОМСТВО СО ВКУСОМ</span>
                <h2 id="cakes-title">
                  Чаще всего <em>выбирают</em>
                </h2>
              </div>
              <p>
                Проверенные сочетания, к которым
                <br />
                хочется возвращаться.
              </p>
            </div>
            <div className="bestseller-grid">
              {bestsellers.map((cake, index) => (
                <article className="cake-card reveal" key={cake.id}>
                  <div className="cake-image">
                    <Photo photo={cake.photo} />
                    {index === 0 && (
                      <span className="cake-badge">Любимый медовик</span>
                    )}
                  </div>
                  <div className="cake-body">
                    <span className="cake-tag">{cake.tag}</span>
                    <h3>{cake.name}</h3>
                    <p>{cake.description}</p>
                    <div className="cake-bottom">
                      <strong>{cake.price}</strong>
                      <a
                        href="#order"
                        onClick={() =>
                          choose({
                            name: cake.name,
                            occasion: cake.occasion,
                            filling: cake.filling,
                          })
                        }
                        className="cake-choose"
                        aria-label={`Хочу такой: ${cake.name}`}
                      >
                        Хочу такой <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="demo-note">
              Учебные цены. Итог зависит от начинки, веса и сложности декора.
              Доставка рассчитывается отдельно.
            </p>
          </div>
        </section>

        <section
          className="section occasion-section"
          aria-labelledby="occasion-title"
        >
          <div className="container">
            <div className="center-heading reveal">
              <span className="eyebrow">ВАШ ПОВОД — МОЁ ВДОХНОВЕНИЕ</span>
              <h2 id="occasion-title">
                Выберите торт <em>по случаю</em>
              </h2>
              <p>
                Не обязательно ждать круглой даты, чтобы порадовать близких.
              </p>
            </div>
            <div className="occasion-grid">
              {occasions.map((item) => (
                <a
                  className="occasion-card reveal"
                  href="#works"
                  key={item.name}
                  onClick={() => setFilter(item.filter)}
                >
                  <span className="occasion-icon">
                    <item.icon size={29} strokeWidth={1.3} />
                  </span>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                  <ArrowUpRight className="occasion-arrow" size={17} />
                </a>
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
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">У КАЖДОГО ТОРТА СВОЯ ИСТОРИЯ</span>
                <h2 id="works-title">
                  Мои <em>работы</em>
                </h2>
              </div>
              <p>
                Нежные, яркие, совсем небольшие.
                <br />И каждый — для чьего-то особенного дня.
              </p>
            </div>
            <Gallery filter={filter} onFilter={setFilter} onChoose={choose} />
          </div>
        </section>

        <section
          className="section fillings-section"
          id="fillings"
          aria-labelledby="fillings-title"
        >
          <div className="container">
            <div className="center-heading reveal">
              <span className="eyebrow">САМОЕ ИНТЕРЕСНОЕ — ВНУТРИ</span>
              <h2 id="fillings-title">
                Начинки, которые хочется
                <br />
                попробовать <em>ещё раз</em>
              </h2>
              <p>Шесть сочетаний. Какое станет вашим любимым?</p>
            </div>
            <div className="fillings-grid">
              {fillings.map((filling, index) => (
                <article className="filling-card reveal" key={filling.id}>
                  <Photo
                    photo={{
                      src: "fillings.webp",
                      alt: `Разрез торта «${filling.name}»: ${filling.ingredients}`,
                      cell: index,
                      columns: 3,
                      rows: 2,
                    }}
                  />
                  <div className="filling-body">
                    <span
                      className="filling-number"
                      style={{ borderColor: filling.color }}
                    >
                      0{index + 1}
                    </span>
                    <h3>{filling.name}</h3>
                    <p className="ingredients">{filling.ingredients}</p>
                    <p>{filling.note}</p>
                    <a
                      href="#order"
                      className="text-link"
                      onClick={() =>
                        choose({
                          name: `Начинка: ${filling.name}`,
                          filling: filling.id,
                        })
                      }
                      aria-label={`Выбрать начинку: ${filling.name}`}
                    >
                      Выбрать начинку <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="filling-help">
              <div>
                <h3>Не знаешь, что выбрать?</h3>
                <p>Подскажу начинку под событие и предпочтения гостей.</p>
              </div>
              <a
                href="#order"
                className="button button-outline"
                onClick={() =>
                  choose({ name: "Помощь с выбором начинки", filling: "help" })
                }
              >
                Помочь выбрать <ArrowUpRight size={18} />
              </a>
            </div>
            <p className="allergen-note">
              Десерты могут содержать молоко, яйца, орехи, арахис и глютен. Об
              аллергиях важно сообщить заранее.
            </p>
          </div>
        </section>

        <section className="section care-section" aria-labelledby="care-title">
          <div className="container">
            <div className="center-heading reveal">
              <span className="eyebrow">ВКУСНО — ЭТО ТОЛЬКО НАЧАЛО</span>
              <h2 id="care-title">
                С заботой о вашем <em>празднике</em>
              </h2>
            </div>
            <div className="advantages-grid">
              {advantages.map((item) => (
                <article className="reveal" key={item.title}>
                  <span>
                    <item.icon size={27} strokeWidth={1.3} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container about-grid">
            <div className="about-visual reveal">
              <Photo photo={portraitPhoto} />
              <span className="about-label">
                Руки в муке.
                <br />
                <em>Мысли — о вашем празднике.</em>
              </span>
            </div>
            <div className="about-copy reveal">
              <span className="eyebrow">ДАВАЙТЕ ЗНАКОМИТЬСЯ</span>
              <h2 id="about-title">
                Привет, я <em>Мария</em>
              </h2>
              <span className="about-subtitle">
                Мария Орлова · частный кондитер
              </span>
              <p className="about-lead">
                Мне нравится делать десерты частью хороших воспоминаний.
              </p>
              <p>
                Поэтому я не собираю заказы по одному шаблону: обсуждаю повод,
                вкусы и оформление, а потом предлагаю несколько вариантов.
              </p>
              <p>
                Работаю в небольшой домашней мастерской. Не беру десятки тортов
                на один день — мне важно уделить внимание каждому. И тому, как
                он выглядит, и тому, что у него внутри.
              </p>
              <div className="about-stats">
                <div>
                  <strong>
                    6 <em>лет</em>
                  </strong>
                  <span>занимаюсь любимым делом</span>
                </div>
                <div>
                  <strong>500+</strong>
                  <span>вкусных поводов для радости</span>
                </div>
              </div>
              <p className="demo-note">
                Мария, её история и показатели вымышлены. Портрет создан для
                проекта.
              </p>
              <a href="#order" className="text-link">
                Давайте придумаем ваш торт <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section
          className="section process-section"
          aria-labelledby="process-title"
        >
          <div className="container">
            <div className="center-heading reveal">
              <span className="eyebrow">ОТ ПЕРВОЙ ИДЕИ ДО ПЕРВОГО КУСОЧКА</span>
              <h2 id="process-title">
                Всё начинается <em>с разговора</em>
              </h2>
            </div>
            <ol className="steps">
              {steps.map(([title, text], index) => (
                <li className="reveal" key={title}>
                  <div className="step-top">
                    <span>0{index + 1}</span>
                    {index < 3 ? <ArrowRight size={21} /> : <Heart size={21} />}
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="section reviews-section"
          id="reviews"
          aria-labelledby="reviews-title"
        >
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">ПОСЛЕ ПРАЗДНИКА</span>
                <h2 id="reviews-title">
                  Самые тёплые <em>слова</em>
                </h2>
              </div>
              <span className="reviews-side">
                <MessageCircle size={21} strokeWidth={1.3} /> О вкусе, деталях и
                маленьких радостях
              </span>
            </div>
            <div className="reviews-grid">
              {reviews.map((review) => (
                <article className="review-card reveal" key={review.name}>
                  <span className="quote-mark" aria-hidden="true">
                    “
                  </span>
                  <blockquote>{review.text}</blockquote>
                  <div className="review-author">
                    <span className="review-avatar">{review.initial}</span>
                    <div>
                      <h3>{review.name}</h3>
                      <span>{review.event}</span>
                    </div>
                  </div>
                  <span className="review-date">{review.date}</span>
                </article>
              ))}
            </div>
            <p className="demo-note">
              Все отзывы вымышлены и не описывают опыт реальных заказчиков.
            </p>
          </div>
        </section>

        <section
          className="section order-section"
          id="order"
          aria-labelledby="order-title"
        >
          <div className="container order-layout">
            <div className="order-copy">
              <span className="eyebrow">ДАВАЙТЕ ПРИДУМАЕМ ЧТО-ТО ВКУСНОЕ</span>
              <h2 id="order-title">
                Расскажи, какой
                <br />
                торт нужен —<br />
                <em>
                  я помогу рассчитать
                  <br />
                  стоимость
                </em>
              </h2>
              <p>
                Не нужно знать все детали заранее. Расскажи о празднике, а с
                начинкой, размером и оформлением я помогу.
              </p>
              <div className="order-points">
                <span>
                  <Check size={17} /> Согласуем вкус, дизайн и цену
                </span>
                <span>
                  <Check size={17} /> Подберём вес под количество гостей
                </span>
                <span>
                  <Check size={17} /> Обсудим самовывоз или доставку
                </span>
              </div>
              <div className="order-aside">
                <Sparkles size={24} strokeWidth={1.2} />
                <p>
                  Можно начать просто с идеи.
                  <br />
                  <em>Остальное придумаем вместе.</em>
                </p>
              </div>
              <p className="demo-note">
                Учебный проект: форма показывает процесс обращения, но не
                принимает реальные заказы.
              </p>
            </div>
            <div className="order-card">
              <div className="form-heading">
                <h3>Немного о вашем празднике</h3>
                <span>Примерно две минуты — и идея станет понятнее</span>
              </div>
              <OrderForm selection={selection} />
            </div>
          </div>
        </section>

        <section
          className="section faq-section"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className="container faq-layout">
            <div className="faq-intro reveal">
              <span className="eyebrow">МОЖНО СПРОСИТЬ</span>
              <h2 id="faq-title">
                Перед тем,
                <br />
                как <em>заказать</em>
              </h2>
              <p>
                Собрала ответы на вопросы,
                <br />
                которые задают чаще всего.
              </p>
              <span className="faq-doodle" aria-hidden="true">
                <CakeDrawing />
              </span>
            </div>
            <div className="faq-list">
              {faq.map(([question, answer]) => (
                <details key={question} name="cake-faq">
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
          aria-labelledby="contacts-title"
        >
          <div className="container contact-layout">
            <div className="contact-intro">
              <span className="eyebrow">БУДЕМ НА СВЯЗИ</span>
              <h2 id="contacts-title">
                Ближе, чем <em>кажется</em>
              </h2>
              <p>
                Москва. Небольшая мастерская
                <br />и большое внимание к вашему заказу.
              </p>
            </div>
            <div className="contact-info">
              <div>
                <MapPin size={23} strokeWidth={1.4} />
                <span>
                  <strong>Самовывоз в Москве</strong>
                  <small>По предварительной договорённости</small>
                </span>
              </div>
              <div>
                <Clock3 size={23} strokeWidth={1.4} />
                <span>
                  <strong>Ежедневно 10:00–20:00</strong>
                  <small>Приём и обсуждение заказов</small>
                </span>
              </div>
              <p>Контактные данные и условия вымышлены.</p>
            </div>
            <div className="socials">
              <button
                className="button button-outline"
                onClick={() => setMessenger("Telegram")}
              >
                <Send size={18} /> Написать в Telegram{" "}
                <ArrowUpRight size={17} />
              </button>
              <button
                className="button button-outline"
                onClick={() => setMessenger("WhatsApp")}
              >
                <MessageCircle size={18} /> Написать в WhatsApp{" "}
                <ArrowUpRight size={17} />
              </button>
              <span>Демонстрационные кнопки, без реальных аккаунтов</span>
            </div>
          </div>
        </section>

        <section className="final-section">
          <div className="container">
            <div className="final-card">
              <Photo photo={heroPhoto} />
              <div className="final-copy">
                <span className="eyebrow">ПОВОД НАЙДЁТСЯ</span>
                <h2>
                  Есть идея торта?
                  <br />
                  Давай превратим её
                  <br />
                  <em>в десерт</em>
                </h2>
                <p>Для дня, который хочется запомнить.</p>
                <a href="#order" className="button">
                  Рассчитать заказ <ArrowUpRight size={19} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <Logo />
            <span>
              Торты и десерты,
              <br />
              которые хочется запомнить.
            </span>
            <a className="back-top" href="#top">
              Наверх <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="footer-nav">
            <nav aria-label="Навигация в подвале">
              {navigation.map(([id, name]) => (
                <a href={`#${id}`} key={id}>
                  {name}
                </a>
              ))}
            </nav>
            <span>Москва · ежедневно 10:00–20:00</span>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Мария Орлова</span>
            <p>{disclaimer}</p>
          </div>
        </div>
      </footer>
      <Modal
        open={!!messenger}
        onClose={() => setMessenger(null)}
        titleId="messenger-title"
        className="messenger-modal"
      >
        {messenger && (
          <>
            <span className="eyebrow">УЧЕБНЫЙ ПРОЕКТ</span>
            <h2 id="messenger-title">Связь через {messenger}</h2>
            <p>
              Это демонстрационная кнопка. Реальный аккаунт не подключён,
              сообщение никому не отправлено.
            </p>
            <p>
              Посмотреть, как работает обращение к кондитеру, можно в форме
              расчёта.
            </p>
            <a
              href="#order"
              className="button"
              onClick={() => setMessenger(null)}
            >
              Попробовать форму <ArrowUpRight size={18} />
            </a>
          </>
        )}
      </Modal>
      <Enhancements />
    </>
  );
}
function CakeDrawing() {
  return (
    <svg viewBox="0 0 160 120" width="140" height="105" fill="none">
      <path
        d="M26 58c0-16 108-16 108 0v38c0 17-108 17-108 0V58Zm0 0c0 16 108 16 108 0M20 105h120M50 50V28m30 18V20m30 30V28M26 73q12 18 24 0 15 18 30 0 15 18 30 0 12 18 24 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M50 19c-4 5-3 9 0 9s4-4 0-9m30-8c-4 5-3 9 0 9s4-4 0-9m30 8c-4 5-3 9 0 9s4-4 0-9"
        fill="currentColor"
      />
    </svg>
  );
}
