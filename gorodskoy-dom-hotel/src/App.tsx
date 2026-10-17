import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  Check,
  ChevronDown,
  Clock3,
  Coffee,
  Footprints,
  MapPin,
  MoveUpRight,
  ParkingCircle,
  Phone,
  Ruler,
  Star,
  TrainFront,
  UsersRound,
  Wifi,
  Wind,
} from "lucide-react";
import {
  address,
  amenities,
  email,
  faq,
  heroPhoto,
  navigation,
  phone,
  receptionPhoto,
  reviews,
  rooms,
} from "./data";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Photo from "./components/Photo";
import Gallery from "./components/Gallery";
import Modal from "./components/Modal";
import LocationMap from "./components/LocationMap";
import BookingForm, { type RoomSelection } from "./components/BookingForm";

export default function App() {
  const [selection, setSelection] = useState<RoomSelection>({
    id: "",
    revision: 0,
  });
  const [dialog, setDialog] = useState<"route" | "phone" | null>(null);
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
                <span className="tiny-dot" /> ВАШ ТИХИЙ АДРЕС В БОЛЬШОМ ГОРОДЕ
              </span>
              <h1 id="hero-title">
                Спокойное место
                <br />
                для отдыха
                <br />
                <span>в Москве.</span>
              </h1>
              <p>
                Уютные номера, удобное расположение и всё необходимое для
                короткой поездки или нескольких дней в городе.
              </p>
              <div className="hero-buttons">
                <a className="button" href="#rooms">
                  Посмотреть номера <ArrowRight size={18} />
                </a>
                <a className="text-link" href="#booking">
                  Забронировать <ArrowUpRight size={17} />
                </a>
              </div>
              <div className="hero-personal">
                <span className="hero-house">20</span>
                <p>
                  Всего 20 номеров.
                  <br />
                  <strong>Каждому гостю — внимание.</strong>
                </p>
              </div>
            </div>
            <div className="hero-visual">
              <Photo photo={heroPhoto} priority />
              <div className="hero-image-label">
                <span className="label-dot" /> Город снаружи. Спокойствие
                внутри.
              </div>
              <div className="hero-price">
                Просто хороший отдых
                <span>
                  от 4 500 ₽ <small>/ ночь</small>
                </span>
              </div>
            </div>
          </div>
          <div className="container hero-benefits">
            <div>
              <TrainFront />
              <span>15 минут до центра</span>
            </div>
            <div>
              <Wifi />
              <span>Бесплатный Wi-Fi</span>
            </div>
            <div>
              <ParkingCircle />
              <span>Парковка для гостей</span>
            </div>
            <div>
              <Clock3 />
              <span>Круглосуточная стойка</span>
            </div>
          </div>
        </section>

        <section
          className="section rooms-section"
          id="rooms"
          aria-labelledby="rooms-title"
        >
          <div className="container">
            <span className="eyebrow">НОМЕРА</span>
            <div className="section-heading">
              <h2 id="rooms-title">
                Место, где можно
                <br />
                <span>просто выдохнуть.</span>
              </h2>
              <p>
                Одному, вдвоём или всей семьёй.
                <br />
                Выберите свой вариант спокойного отдыха.
              </p>
            </div>
            <div className="rooms-grid">
              {rooms.map((room, i) => (
                <article className="room-card" key={room.id}>
                  <div className="room-image">
                    <Photo photo={room.photo} />
                    <span className="room-label">
                      {i === 0
                        ? "Для короткой поездки"
                        : i === 1
                          ? "Больше пространства"
                          : "Хорошо вместе"}
                    </span>
                  </div>
                  <div className="room-body">
                    <div className="room-title">
                      <h3>{room.title}</h3>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="room-subtitle">{room.subtitle}</p>
                    <div className="room-meta">
                      <span>
                        <Ruler size={15} /> {room.area} м²
                      </span>
                      <span>
                        <UsersRound size={15} /> до {room.capacity} гостей
                      </span>
                    </div>
                    <p className="room-bed">
                      <BedDouble size={16} /> {room.bed}
                    </p>
                    <div className="room-amenities">
                      <span>
                        <Wifi size={14} /> Wi-Fi
                      </span>
                      <span>
                        <Wind size={14} /> Кондиционер
                      </span>
                      <span>
                        <Bath size={14} /> Своя ванная
                      </span>
                      <span>
                        <Coffee size={14} /> Чайная станция
                      </span>
                      <span className="room-tv">Телевизор в номере</span>
                    </div>
                    <div className="room-price">
                      <span>
                        от{" "}
                        <strong>{room.price.toLocaleString("ru-RU")} ₽</strong>{" "}
                        / ночь
                      </span>
                      <small>за номер</small>
                    </div>
                    <a
                      className="button button-outline"
                      href="#booking"
                      onClick={() =>
                        setSelection((previous) => ({
                          id: room.id,
                          revision: previous.revision + 1,
                        }))
                      }
                      aria-label={`Забронировать номер ${room.title}`}
                    >
                      Забронировать <ArrowUpRight size={17} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <p className="section-note">
              Ориентировочные цены учебного проекта. Завтрак оплачивается
              отдельно. Наличие номеров и итоговая стоимость здесь не
              проверяются.
            </p>
          </div>
        </section>

        <section
          className="section amenities-section"
          id="amenities"
          aria-labelledby="amenities-title"
        >
          <div className="container">
            <div className="centered-heading">
              <span className="eyebrow">ХОРОШО, КОГДА ВСЁ ПРОСТО</span>
              <h2 id="amenities-title">
                Не лишнее. <span>Необходимое.</span>
              </h2>
              <p>
                Мы позаботились о повседневных мелочах,
                <br />
                чтобы вы могли заняться своими планами.
              </p>
            </div>
            <div className="amenities-grid">
              {amenities.map((item) => (
                <div className="amenity" key={item.title}>
                  <span className="amenity-icon">
                    <item.icon size={25} strokeWidth={1.5} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
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
            <div className="about-image">
              <Photo photo={receptionPhoto} />
              <span className="about-image-caption">
                <span className="tiny-dot" /> Здесь вам рады. В любое время.
              </span>
            </div>
            <div className="about-copy">
              <span className="eyebrow">ДАВАЙТЕ ЗНАКОМИТЬСЯ</span>
              <h2 id="about-title">
                Небольшой отель.
                <br />
                <span>Тёплое отношение.</span>
              </h2>
              <p>
                ГОРОДСКОЙ ДОМ — небольшая гостиница для тех, кому важно спокойно
                отдохнуть после насыщенного дня. Мы сделали номера простыми,
                удобными и функциональными.
              </p>
              <p>
                Здесь можно неспешно выпить чай, выспаться перед встречей или
                наметить маршрут прогулки. Без лишней суеты — в своём ритме.
              </p>
              <a className="text-link" href="#gallery">
                Заглянуть к нам <ArrowRight size={17} />
              </a>
            </div>
          </div>
          <div className="container hotel-stats">
            <div>
              <strong>20</strong>
              <span>уютных номеров</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>стойка регистрации</span>
            </div>
            <div>
              <strong>
                10 <small>мин</small>
              </strong>
              <span>пешком до метро</span>
            </div>
            <div>
              <strong>
                4,8 <Star size={19} fill="currentColor" />
              </strong>
              <span>средняя оценка · демо</span>
            </div>
          </div>
        </section>

        <section
          className="section gallery-section"
          id="gallery"
          aria-labelledby="gallery-title"
        >
          <div className="container">
            <span className="eyebrow">ПОСМОТРИТЕ ВОКРУГ</span>
            <div className="section-heading">
              <h2 id="gallery-title">Дом в деталях.</h2>
              <p>
                От первого кофе до мягкой подушки.
                <br />
                Нажмите на фото, чтобы рассмотреть поближе.
              </p>
            </div>
            <Gallery />
            <p className="section-note">
              Оригинальные изображения созданы специально для вымышленной
              гостиницы.
            </p>
          </div>
        </section>

        <section
          className="section location-section"
          id="location"
          aria-labelledby="location-title"
        >
          <div className="container location-grid">
            <div className="location-copy">
              <span className="eyebrow">МОСКВА НА ЛАДОНИ</span>
              <h2 id="location-title">
                Удобно добираться.
                <br />
                <span>Приятно возвращаться.</span>
              </h2>
              <p className="location-address">
                <MapPin size={18} /> {address}
              </p>
              <p>
                Тихая улица, а всё нужное — рядом. Можно отправиться в центр или
                остаться в районе и найти любимую кофейню.
              </p>
              <ul className="nearby">
                <li>
                  <Footprints size={20} />
                  <span>
                    <strong>10 минут пешком</strong> до метро
                  </span>
                </li>
                <li>
                  <TrainFront size={20} />
                  <span>
                    <strong>15 минут</strong> до центра
                  </span>
                </li>
                <li>
                  <Coffee size={20} />
                  <span>
                    Кафе, магазины и сквер <strong>по соседству</strong>
                  </span>
                </li>
              </ul>
              <button
                className="button button-outline"
                onClick={() => setDialog("route")}
              >
                Построить маршрут <MoveUpRight size={17} />
              </button>
            </div>
            <LocationMap />
          </div>
        </section>

        <section
          className="section reviews-section"
          id="reviews"
          aria-labelledby="reviews-title"
        >
          <div className="container">
            <span className="eyebrow">СЛОВА ГОСТЕЙ</span>
            <div className="section-heading">
              <h2 id="reviews-title">
                Хороший отдых
                <br />
                <span>остаётся в памяти.</span>
              </h2>
              <div className="rating-badge">
                <strong>4,8</strong>
                <div>
                  <span
                    className="stars"
                    role="img"
                    aria-label="Демонстрационный рейтинг 4,8 из 5"
                  >
                    ★★★★★
                  </span>
                  <span>Средняя оценка · демо</span>
                </div>
              </div>
            </div>
            <div className="reviews-grid">
              {reviews.map((review) => (
                <article className="review" key={review.name}>
                  <div
                    className="stars"
                    role="img"
                    aria-label={`${review.rating} из 5`}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        size={14}
                        key={i}
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <blockquote>{review.text}</blockquote>
                  <div className="review-author">
                    <span className="avatar">{review.initial}</span>
                    <div>
                      <h3>{review.name}</h3>
                      <span>{review.visit}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="section-note">
              Отзывы и оценка вымышлены и представлены как часть учебной
              концепции.
            </p>
          </div>
        </section>

        <section
          className="section booking-section"
          id="booking"
          aria-labelledby="booking-title"
        >
          <div className="container booking-layout">
            <div className="booking-copy">
              <span className="eyebrow">ПЛАНЫ НА ПОЕЗДКУ</span>
              <h2 id="booking-title">
                Пусть в Москве
                <br />
                вас ждёт
                <br />
                <span>уютный номер.</span>
              </h2>
              <p>
                Расскажите, когда вы планируете приехать.
                <br />
                Подберём уютный номер для вашей поездки.
              </p>
              <div className="booking-facts">
                <span>
                  <Check size={17} /> Заезд с 14:00 · выезд до 12:00
                </span>
                <span>
                  <Check size={17} /> Стойка регистрации 24/7
                </span>
                <span>
                  <Check size={17} /> Без онлайн-оплаты
                </span>
              </div>
              <div className="booking-help">
                <Coffee size={26} strokeWidth={1.3} />
                <span>
                  После дороги хочется одного —<br />
                  почувствовать себя дома.
                </span>
              </div>
            </div>
            <BookingForm selection={selection} />
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div>
              <span className="eyebrow">ПЕРЕД ПОЕЗДКОЙ</span>
              <h2 id="faq-title">Полезно знать.</h2>
              <p>
                Короткие ответы,
                <br />
                чтобы собираться было спокойнее.
              </p>
            </div>
            <div className="faq-list">
              {faq.map(([question, answer]) => (
                <details key={question} name="hotel-faq">
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
          <div className="container">
            <div className="contacts-top">
              <div>
                <span className="eyebrow">МЫ НА СВЯЗИ</span>
                <h2 id="contacts-title">Будем рады знакомству.</h2>
              </div>
              <span className="reception-hours">
                <Clock3 size={17} /> Стойка регистрации — круглосуточно
              </span>
            </div>
            <div className="contacts-grid">
              <div>
                <span className="contact-label">АДРЕС</span>
                <p>{address}</p>
                <small>Вымышленный адрес учебного проекта</small>
              </div>
              <div>
                <span className="contact-label">ТЕЛЕФОН</span>
                <p>{phone}</p>
                <button
                  className="text-link"
                  onClick={() => setDialog("phone")}
                >
                  Позвонить <Phone size={15} />
                </button>
              </div>
              <div>
                <span className="contact-label">ЭЛЕКТРОННАЯ ПОЧТА</span>
                <p className="contact-email">{email}</p>
                <small>Демонстрационный email</small>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-inner">
            <div>
              <span className="eyebrow">ДО СКОРОЙ ВСТРЕЧИ</span>
              <h2>Нужен номер в Москве?</h2>
              <p>
                Оставьте заявку — администратор поможет выбрать подходящий
                вариант.
              </p>
            </div>
            <a className="button button-light" href="#booking">
              Забронировать <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <Logo />
            <p>
              Комфортный отдых в городе
              <br />
              без лишней суеты.
            </p>
            <a className="back-top" href="#top">
              Наверх <ArrowUpRight size={17} />
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
            <span>{address}</span>
            <span>
              {phone}
              <br />
              {email}
            </span>
          </div>
          <div className="footer-bottom">
            <span>© 2026 ГОРОДСКОЙ ДОМ</span>
            <p>
              Учебный проект. Гостиница, цены, отзывы и контакты вымышлены.
              Форма бронирования демонстрационная.
            </p>
          </div>
        </div>
      </footer>
      <Modal
        open={dialog !== null}
        onClose={() => setDialog(null)}
        titleId="info-modal-title"
      >
        <span className="eyebrow">УЧЕБНАЯ ДЕМОНСТРАЦИЯ</span>
        <h2 id="info-modal-title">
          {dialog === "route" ? "Тихий адрес на карте" : "Давайте познакомимся"}
        </h2>
        {dialog === "route" ? (
          <>
            <p>{address}</p>
            <p>
              Гостиница и адрес вымышлены. Реальный маршрут построить нельзя.
              Схема показывает, как может выглядеть блок расположения на сайте
              небольшой гостиницы.
            </p>
          </>
        ) : (
          <>
            <p className="modal-phone">{phone}</p>
            <p>
              Это демонстрационный номер. Звонок не совершается: гостиница
              существует только в учебном проекте.
            </p>
          </>
        )}
        <button className="button" onClick={() => setDialog(null)}>
          Понятно <Check size={17} />
        </button>
      </Modal>
      <a href="#booking" className="mobile-booking">
        Забронировать номер <ArrowRight size={17} />
      </a>
    </>
  );
}
