import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, LockKeyhole, RotateCcw } from "lucide-react";
import { rooms } from "../data";
import { nextDay, nightCount, todayInMoscow } from "../booking";

export type RoomSelection = { id: string; revision: number };
type Field = "name" | "phone" | "arrival" | "departure" | "guests" | "room";

export default function BookingForm({
  selection,
}: {
  selection: RoomSelection;
}) {
  const [category, setCategory] = useState(selection.id);
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState("2");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [complete, setComplete] = useState(false);
  const success = useRef<HTMLDivElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const today = todayInMoscow();
  useEffect(() => {
    setCategory(selection.id);
    setComplete(false);
    setErrors({});
  }, [selection]);
  useEffect(() => {
    if (complete) success.current?.focus();
  }, [complete]);
  const clear = (field: Field) =>
    setErrors((value) => ({ ...value, [field]: undefined }));
  const error = (field: Field) =>
    errors[field] && (
      <span className="field-error" id={`${field}-error`}>
        {errors[field]}
      </span>
    );
  const aria = (field: Field) => ({
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "");
    const next: Partial<Record<Field, string>> = {};
    const room = rooms.find((item) => item.id === category);
    if (name.length < 2) next.name = "Введите имя — не менее 2 символов.";
    if (
      !/^[+\d\s()\-]+$/.test(phone) ||
      !/^[78]\d{10}$/.test(phone.replace(/\D/g, ""))
    )
      next.phone = "Введите 11 цифр номера, начиная с +7 или 8.";
    if (!arrival) next.arrival = "Выберите дату заезда.";
    else if (arrival < todayInMoscow())
      next.arrival = "Дата заезда не может быть в прошлом.";
    if (!departure) next.departure = "Выберите дату выезда.";
    else if (departure <= arrival || nightCount(arrival, departure) < 1)
      next.departure = "Выезд должен быть позже заезда хотя бы на день.";
    if (!["1", "2", "3"].includes(guests))
      next.guests = "Выберите количество гостей.";
    if (!room) next.room = "Выберите категорию номера.";
    else if (Number(guests) > room.capacity)
      next.room = "Для трёх гостей выберите семейный номер.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    form.reset();
    setArrival("");
    setDeparture("");
    setCategory("");
    setGuests("2");
    setComplete(true);
  }

  if (complete)
    return (
      <div
        className="booking-success"
        role="status"
        tabIndex={-1}
        ref={success}
      >
        <span className="success-mark">
          <Check size={28} />
        </span>
        <h3>
          Демонстрация завершена.
          <br />
          Заявка не отправлена.
        </h3>
        <p>
          Данные не сохранены и не переданы. Это учебный сайт, реальное
          бронирование не создано.
        </p>
        <button
          className="button"
          onClick={() => {
            setComplete(false);
            requestAnimationFrame(() => nameInput.current?.focus());
          }}
        >
          Заполнить ещё раз <RotateCcw size={17} />
        </button>
      </div>
    );

  return (
    <form className="booking-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="guest-name">
            Ваше имя <span>*</span>
          </label>
          <input
            ref={nameInput}
            id="guest-name"
            name="name"
            autoComplete="given-name"
            placeholder="Как к вам обращаться"
            maxLength={80}
            required
            {...aria("name")}
            onChange={() => clear("name")}
          />
          {error("name")}
        </div>
        <div className="field">
          <label htmlFor="guest-phone">
            Телефон <span>*</span>
          </label>
          <input
            id="guest-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            maxLength={24}
            required
            {...aria("phone")}
            onChange={() => clear("phone")}
          />
          {error("phone")}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="arrival">
            Дата заезда <span>*</span>
          </label>
          <input
            id="arrival"
            name="arrival"
            type="date"
            min={today}
            value={arrival}
            required
            {...aria("arrival")}
            onChange={(event) => {
              setArrival(event.target.value);
              clear("arrival");
              clear("departure");
            }}
          />
          {error("arrival")}
        </div>
        <div className="field">
          <label htmlFor="departure">
            Дата выезда <span>*</span>
          </label>
          <input
            id="departure"
            name="departure"
            type="date"
            min={nextDay(arrival || today)}
            value={departure}
            required
            {...aria("departure")}
            onChange={(event) => {
              setDeparture(event.target.value);
              clear("departure");
            }}
          />
          {error("departure")}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="guests">
            Количество гостей <span>*</span>
          </label>
          <select
            id="guests"
            name="guests"
            value={guests}
            required
            {...aria("guests")}
            onChange={(event) => {
              setGuests(event.target.value);
              clear("guests");
              clear("room");
            }}
          >
            <option value="1">1 гость</option>
            <option value="2">2 гостя</option>
            <option value="3">3 гостя</option>
          </select>
          {error("guests")}
        </div>
        <div className="field">
          <label htmlFor="room">
            Категория номера <span>*</span>
          </label>
          <select
            id="room"
            name="room"
            required
            value={category}
            {...aria("room")}
            onChange={(event) => {
              setCategory(event.target.value);
              clear("room");
            }}
          >
            <option value="">Выберите номер</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.title}
              </option>
            ))}
          </select>
          {error("room")}
        </div>
      </div>
      {nightCount(arrival, departure) > 0 && (
        <p className="stay-summary">
          Ночей: {nightCount(arrival, departure)} · Гостей: {guests}, включая
          детей
        </p>
      )}
      <button className="button form-submit" type="submit">
        Оставить заявку <ArrowRight size={18} />
      </button>
      <p className="form-note">
        <LockKeyhole size={14} />
        <span>
          Демонстрационная форма. Данные никуда не отправляются.
          <br />
          <small>* Обязательные поля</small>
        </span>
      </p>
    </form>
  );
}
