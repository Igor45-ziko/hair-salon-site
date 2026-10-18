import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  UserRound,
  UsersRound,
} from "lucide-react";
import Header from "./components/Header";
import Logo from "./components/Logo";
import HeroIllustration from "./components/HeroIllustration";
import Photo from "./components/Photo";
import Calculator from "./components/Calculator";
import ConsultationForm, {
  type Selection,
} from "./components/ConsultationForm";
import Modal from "./components/Modal";
import Enhancements from "./components/Enhancements";
import {
  disclaimer,
  faq,
  money,
  navigation,
  plans,
  reviews,
  services,
  steps,
  team,
  trust,
} from "./data";

export default function App() {
  const [selection, setSelection] = useState<Selection | null>(null),
    [telegram, setTelegram] = useState(false);
  const choose = (value: Omit<Selection, "revision">) =>
    setSelection((previous) => ({
      ...value,
      revision: (previous?.revision ?? 0) + 1,
    }));
  return (
    <>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-layout">
            <div className="hero-copy">
              <span className="eyebrow">
                <span className="status-dot" />
                НЕБОЛЬШОЕ БУХГАЛТЕРСКОЕ БЮРО
              </span>
              <p className="hero-specialty">
                Бухгалтерское сопровождение для ИП и ООО
              </p>
              <h1 id="hero-title">
                Бухгалтерия
                <br /> <span>без авралов, штрафов</span>
                <br /> и непонятных цифр
              </h1>
              <p className="hero-description">
                Ведём учёт ИП и ООО, сдаём отчётность, считаем налоги и отвечаем
                на требования. Работаем удалённо и объясняем человеческим
                языком.
              </p>
              <div className="hero-actions">
                <a href="#consultation" className="button">
                  Получить консультацию <ArrowUpRight size={18} />
                </a>
                <a href="#prices" className="text-link">
                  Посмотреть цены <ArrowDown size={16} />
                </a>
              </div>
              <div className="hero-benefits">
                <span>
                  <FileCheck2 size={16} />
                  Работаем по договору
                </span>
                <span>
                  <UserRound size={16} />
                  Персональный бухгалтер
                </span>
                <span>
                  <UsersRound size={16} />
                  ИП и ООО
                </span>
                <span>
                  <Globe2 size={16} />
                  Удалённо по России
                </span>
              </div>
            </div>
            <HeroIllustration />
          </div>
        </section>
        <div className="audience">
          <div className="container audience-inner">
            <p>
              Берём бухгалтерию на себя —<br />{" "}
              <strong>ты занимаешься бизнесом.</strong>
            </p>
            <div>
              <span>Услуги</span>
              <span>Торговля</span>
              <span>Маркетплейсы</span>
              <span>Интернет-магазины</span>
            </div>
          </div>
        </div>

        <section
          className="section services-section"
          id="services"
          aria-labelledby="services-title"
        >
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">01 / ЧЕМ ПОМОЖЕМ</span>
                <h2 id="services-title">
                  Всё, что нужно учёту.
                  <br /> <span>И ничего лишнего.</span>
                </h2>
              </div>
              <p>
                Можно передать бухгалтерию целиком
                <br /> или начать с отдельной задачи.
              </p>
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <article key={service.id} className="service-card reveal">
                  <div className="service-top">
                    <span className="service-icon">
                      <service.icon size={25} strokeWidth={1.4} />
                    </span>
                    <span>0{index + 1}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <small>{service.details}</small>
                  <a
                    href="#consultation"
                    className="service-link"
                    onClick={() => choose({ service: service.id })}
                    aria-label={`Узнать стоимость: ${service.title}`}
                  >
                    Узнать стоимость <ArrowUpRight size={18} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section trust-section"
          aria-labelledby="trust-title"
        >
          <div className="container trust-layout">
            <div className="trust-intro reveal">
              <span className="eyebrow">02 / ЛЮДИ, А НЕ ТИКЕТЫ</span>
              <h2 id="trust-title">
                Не безликий сервис —<br />{" "}
                <span>
                  у твоего бизнеса
                  <br /> есть свой бухгалтер
                </span>
              </h2>
              <p>
                Знаем, как устроена ваша работа.
                <br /> Помним контекст. Остаёмся на связи.
              </p>
              <div className="trust-photo">
                <Photo
                  cell={3}
                  alt="Вымышленная команда бюро обсуждает документы за столом небольшого офиса"
                />
                <span>
                  <span className="status-dot" />
                  ВНИМАНИЕ К КАЖДОЙ ЗАДАЧЕ
                </span>
              </div>
            </div>
            <div className="trust-list">
              {trust.map((item, index) => (
                <article className="reveal" key={item.title}>
                  <span className="trust-number">0{index + 1}</span>
                  <div>
                    <item.icon size={24} strokeWidth={1.4} />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section prices-section"
          id="prices"
          aria-labelledby="prices-title"
        >
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">03 / ПОНЯТНАЯ СТОИМОСТЬ</span>
                <h2 id="prices-title">
                  Под размер бизнеса.
                  <br /> <span>Без сюрпризов в счёте.</span>
                </h2>
              </div>
              <a href="#calculator" className="text-link">
                Прикинуть стоимость <ArrowDown size={16} />
              </a>
            </div>
            <div className="plans-grid">
              {plans.map((plan) => (
                <article
                  key={plan.id}
                  className={`plan-card reveal ${plan.id === "business" ? "plan-featured" : ""}`}
                >
                  <div className="plan-title">
                    <h3>{plan.name}</h3>
                    {plan.id === "business" && <span>Оптимальный выбор</span>}
                  </div>
                  <p className="plan-description">{plan.description}</p>
                  <div className="plan-price">
                    <span>от</span>
                    <strong>{money(plan.price)}</strong>
                    <span>/ мес</span>
                  </div>
                  <p className="plan-note">{plan.note}</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#consultation"
                    className={`button ${plan.id === "business" ? "button-light" : "button-outline"}`}
                    onClick={() =>
                      choose({
                        service: "support",
                        business: plan.business,
                        plan: { name: plan.name, price: plan.price },
                      })
                    }
                  >
                    Выбрать «{plan.name}» <ArrowUpRight size={18} />
                  </a>
                </article>
              ))}
            </div>
            <p className="price-explanation">
              Стоимость зависит от системы налогообложения, количества операций
              и сотрудников. Точную цену согласуем до начала работы.
            </p>
            <p className="demo-note">
              Тарифы и условия вымышлены и приведены для учебного проекта.
            </p>
          </div>
        </section>

        <section
          className="section calculator-section"
          id="calculator"
          aria-labelledby="calculator-title"
        >
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">04 / НЕБОЛЬШОЙ РАСЧЁТ</span>
                <h2 id="calculator-title">
                  Сколько может стоить
                  <br /> <span>порядок в вашем учёте?</span>
                </h2>
              </div>
              <p>
                Несколько параметров — и примерный ориентир.
                <br /> Это демонстрация, а не окончательное предложение.
              </p>
            </div>
            <Calculator onChoose={choose} />
          </div>
        </section>

        <section
          className="section process-section"
          id="process"
          aria-labelledby="process-title"
        >
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">05 / КАК НАЧАТЬ</span>
                <h2 id="process-title">
                  Переход без суеты.
                  <br /> <span>Четыре понятных шага.</span>
                </h2>
              </div>
              <p>
                Вы не останетесь один на один
                <br /> со списком непонятных документов.
              </p>
            </div>
            <ol className="steps">
              {steps.map(([title, text], index) => (
                <li className="reveal" key={title}>
                  <div>
                    <span>0{index + 1}</span>
                    {index < 3 ? <ArrowRight size={21} /> : <Check size={21} />}
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="section about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">06 / НАША КОМАНДА</span>
                <h2 id="about-title">
                  За порядком в цифрах —<br /> <span>конкретные люди.</span>
                </h2>
              </div>
              <p>
                Мы небольшая команда, поэтому клиент не теряется между отделами
                и менеджерами. Каждый знает, кто ведёт его учёт.
              </p>
            </div>
            <div className="team-grid">
              {team.map((person) => (
                <article className="team-card reveal" key={person.name}>
                  <div className="team-photo">
                    <Photo
                      cell={person.cell}
                      alt={`${person.name}, вымышленный специалист: ${person.role}`}
                    />
                    <span>{person.experience}</span>
                  </div>
                  <h3>{person.name}</h3>
                  <span className="team-role">{person.role}</span>
                  <p>{person.text}</p>
                </article>
              ))}
            </div>
            <p className="demo-note">
              Специалисты, их опыт и истории вымышлены. Портреты созданы
              специально для проекта.
            </p>
            <div className="stats">
              <div>
                <strong>
                  10<span>+</span>
                </strong>
                <p>лет опыта</p>
              </div>
              <div>
                <strong>
                  120<span>+</span>
                </strong>
                <p>компаний на сопровождении</p>
              </div>
              <div>
                <strong>
                  1 <span>рабочий день</span>
                </strong>
                <p>обычный срок ответа</p>
              </div>
              <div>
                <strong>
                  100<span>%</span>
                </strong>
                <p>работа по договору</p>
              </div>
            </div>
            <p className="demo-note stats-note">
              Все показатели демонстрационные.
            </p>
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
                <span className="eyebrow">07 / ОПЫТ КЛИЕНТОВ</span>
                <h2 id="reviews-title">
                  Когда стало понятнее.
                  <br /> <span>И немного спокойнее.</span>
                </h2>
              </div>
              <p>
                Разные задачи, один принцип:
                <br /> разобраться и объяснить.
              </p>
            </div>
            <div className="reviews-grid">
              {reviews.map((review) => (
                <article className="review-card reveal" key={review.name}>
                  <span className="review-tag">{review.tag}</span>
                  <blockquote>{review.text}</blockquote>
                  <div className="review-author">
                    <span>{review.initial}</span>
                    <div>
                      <h3>{review.name}</h3>
                      <p>{review.business}</p>
                    </div>
                    <MessageCircle size={22} strokeWidth={1.3} />
                  </div>
                </article>
              ))}
            </div>
            <p className="demo-note">
              Отзывы вымышлены и не отражают опыт реальных клиентов.
            </p>
          </div>
        </section>

        <section
          className="section faq-section"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className="container faq-layout">
            <div className="faq-copy reveal">
              <span className="eyebrow">08 / БЕЗ СЛОЖНЫХ ТЕРМИНОВ</span>
              <h2 id="faq-title">
                Вопросы,
                <br />{" "}
                <span>
                  которые возникают
                  <br /> до начала работы.
                </span>
              </h2>
              <p>
                Если вашего вопроса здесь нет,
                <br /> начните с консультации.
              </p>
              <a
                href="#consultation"
                className="text-link"
                onClick={() => choose({ service: "consultation" })}
              >
                Обсудить задачу <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="faq-list">
              {faq.map(([question, answer]) => (
                <details key={question} name="accounting-faq">
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
          className="section consultation-section"
          id="consultation"
          aria-labelledby="consultation-title"
        >
          <div className="container consultation-layout">
            <div className="consultation-copy">
              <span className="eyebrow">09 / НАЧНЁМ С РАЗГОВОРА</span>
              <h2 id="consultation-title">
                Расскажите о бизнесе.
                <br /> <span>С учётом поможем.</span>
              </h2>
              <p>
                Обсудим вашу ситуацию, ответим на вопросы и предложим понятный
                формат работы. Без обязательства сразу заключать договор.
              </p>
              <div className="consultation-benefits">
                <span>
                  <Check size={17} /> Разберёмся в вашей задаче
                </span>
                <span>
                  <Check size={17} /> Подскажем, с чего начать
                </span>
                <span>
                  <Check size={17} /> Согласуем состав работ и цену
                </span>
              </div>
              <div className="consultation-person">
                <span>АМ</span>
                <div>
                  <strong>Анна Миронова</strong>
                  <p>Главный бухгалтер</p>
                  <small>«Сначала разберёмся. Потом посчитаем».</small>
                </div>
              </div>
              <p className="consultation-demo">
                Учебный проект: форма демонстрирует обращение в бюро и не
                принимает реальные заявки.
              </p>
            </div>
            <div className="form-card">
              <div className="form-heading">
                <h3>Получить консультацию</h3>
                <span>Оставьте несколько деталей о вашей задаче</span>
              </div>
              <ConsultationForm selection={selection} />
            </div>
          </div>
        </section>

        <section
          className="section contacts-section"
          id="contacts"
          aria-labelledby="contacts-title"
        >
          <div className="container contacts-layout">
            <div className="contact-intro">
              <span className="eyebrow">10 / МЫ НА СВЯЗИ</span>
              <h2 id="contacts-title">
                В Москве.
                <br />{" "}
                <span>
                  И рядом с вашим
                  <br /> бизнесом онлайн.
                </span>
              </h2>
              <p>Офис по записи + удалённо по России.</p>
            </div>
            <div className="contact-details">
              <div>
                <MapPin size={21} />
                <span>
                  <strong>Москва, Учётный переулок, 12</strong>
                  <small>Офис 4 · встреча по предварительной записи</small>
                </span>
              </div>
              <div>
                <Clock3 size={21} />
                <span>
                  <strong>Пн–Пт, 09:00–18:00</strong>
                  <small>По московскому времени</small>
                </span>
              </div>
              <div>
                <Globe2 size={21} />
                <span>
                  <strong>Работаем удалённо по России</strong>
                  <small>Документы и вопросы — в удобном формате</small>
                </span>
              </div>
              <p className="demo-note">Адрес и условия вымышлены.</p>
            </div>
            <div className="contact-channels">
              <p>
                <Phone size={17} />
                <span>+7 (495) 000-00-00</span>
              </p>
              <p>
                <Mail size={17} />
                <span>hello@poryadok.example</span>
              </p>
              <button
                className="button button-outline"
                onClick={() => setTelegram(true)}
              >
                Написать в Telegram <ArrowUpRight size={18} />
              </button>
              <small>
                Телефон, email и Telegram — демонстрационные. Реальный аккаунт
                не подключён.
              </small>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-inner">
            <div>
              <span className="eyebrow">ПОРЯДОК НАЧИНАЕТСЯ С ПЕРВОГО ШАГА</span>
              <h2>
                Хочешь перестать вспоминать
                <br /> о бухгалтерии <span>в последний день?</span>
              </h2>
              <p>Давайте обсудим, что можно передать нашей команде.</p>
            </div>
            <a href="#consultation" className="button button-light">
              Получить консультацию <ArrowUpRight size={19} />
            </a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <Logo />
            <p>
              Бухгалтерское сопровождение
              <br /> для ИП и ООО
            </p>
            <a className="back-top" href="#top">
              Наверх <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="footer-nav">
            <nav aria-label="Навигация в подвале">
              {navigation.map(([id, title]) => (
                <a href={`#${id}`} key={id}>
                  {title}
                </a>
              ))}
            </nav>
            <span>Удалённо по России · офис в Москве</span>
          </div>
          <div className="footer-bottom">
            <span>© 2026 ПОРЯДОК В УЧЁТЕ</span>
            <p>{disclaimer}</p>
          </div>
        </div>
      </footer>
      <Modal
        open={telegram}
        onClose={() => setTelegram(false)}
        titleId="telegram-title"
        className="telegram-modal"
      >
        {telegram && (
          <>
            <span className="eyebrow">УЧЕБНЫЙ ПРОЕКТ</span>
            <h2 id="telegram-title">Связь через Telegram</h2>
            <p>
              Это демонстрационный контакт. Реальный аккаунт не подключён,
              сообщение никому не отправлено.
            </p>
            <p>Попробовать сценарий обращения можно в форме консультации.</p>
            <a
              href="#consultation"
              className="button"
              onClick={() => setTelegram(false)}
            >
              Перейти к форме <ArrowUpRight size={18} />
            </a>
          </>
        )}
      </Modal>
      <Enhancements />
    </>
  );
}
