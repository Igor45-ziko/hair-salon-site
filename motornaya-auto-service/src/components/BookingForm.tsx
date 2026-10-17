import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, RotateCcw } from "lucide-react";

type Fields = "name" | "phone";

export default function BookingForm({
  selectedService,
}: {
  selectedService: string;
}) {
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [message, setMessage] = useState(selectedService);
  const [complete, setComplete] = useState(false);
  const status = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessage(selectedService);
    setComplete(false);
  }, [selectedService]);
  useEffect(() => {
    if (complete) status.current?.focus();
  }, [complete]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get("name") ?? "").trim();
    const phone = String(fields.get("phone") ?? "");
    const digits = phone.replace(/\D/g, "");
    const nextErrors: Partial<Record<Fields, string>> = {};
    if (name.length < 2) nextErrors.name = "Введите имя — хотя бы 2 символа.";
    if (!/^[+\d\s()\-]+$/.test(phone) || !/^[78]\d{10}$/.test(digits))
      nextErrors.phone = "Укажите 11 цифр, начиная с +7 или 8.";
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    form.reset();
    setMessage("");
    setComplete(true);
  }

  if (complete)
    return (
      <div className="booking-success" ref={status} tabIndex={-1} role="status">
        <span className="success-icon">
          <Check size={32} />
        </span>
        <h3>
          Демонстрация завершена.
          <br />
          Заявка не отправлена.
        </h3>
        <p>
          Это учебный проект. Введённые данные не сохраняются и не передаются.
        </p>
        <button
          className="button button-outline"
          onClick={() => setComplete(false)}
        >
          Заполнить ещё раз <RotateCcw size={18} />
        </button>
      </div>
    );

  return (
    <form className="booking-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="booking-name">
            Ваше имя <span>*</span>
          </label>
          <input
            id="booking-name"
            name="name"
            autoComplete="given-name"
            placeholder="Как к вам обращаться"
            maxLength={80}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={() => setErrors((e) => ({ ...e, name: undefined }))}
          />
          {errors.name && (
            <span className="field-error" id="name-error">
              {errors.name}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="booking-phone">
            Телефон <span>*</span>
          </label>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            maxLength={24}
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            onChange={() => setErrors((e) => ({ ...e, phone: undefined }))}
          />
          {errors.phone && (
            <span className="field-error" id="phone-error">
              {errors.phone}
            </span>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor="booking-car">Марка и модель автомобиля</label>
        <input
          id="booking-car"
          name="car"
          placeholder="Например, Volkswagen Polo, 2019"
          maxLength={100}
        />
      </div>
      <div className="field">
        <label htmlFor="booking-message">Что беспокоит / услуга</label>
        <textarea
          id="booking-message"
          name="message"
          placeholder="Расскажите коротко — разберёмся вместе"
          rows={3}
          maxLength={1500}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button className="button form-submit" type="submit">
        Записаться <ArrowUpRight size={21} />
      </button>
      <p className="form-note">
        Демонстрационная форма. Данные никуда не отправляются.
        <br />
        <span>* Обязательные поля</span>
      </p>
    </form>
  );
}
