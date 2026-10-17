import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Paperclip, RotateCcw, X } from "lucide-react";
import { fillings } from "../data";
import {
  earliestDate,
  validateFields,
  validateFile,
  type Errors,
  type Fields,
} from "../validation";
export type Selection = {
  name: string;
  occasion?: string;
  filling?: string;
  revision: number;
};
export default function OrderForm({
  selection,
}: {
  selection: Selection | null;
}) {
  const [occasion, setOccasion] = useState(""),
    [filling, setFilling] = useState(""),
    [chosen, setChosen] = useState(""),
    [filename, setFilename] = useState(""),
    [errors, setErrors] = useState<Errors>({}),
    [complete, setComplete] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null),
    nameRef = useRef<HTMLInputElement>(null),
    successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selection) {
      if (selection.occasion) setOccasion(selection.occasion);
      if (selection.filling) setFilling(selection.filling);
      setChosen(selection.name);
      setComplete(false);
      setErrors((previous) => ({
        ...previous,
        occasion: undefined,
        filling: undefined,
      }));
    }
  }, [selection]);
  useEffect(() => {
    if (complete) successRef.current?.focus();
  }, [complete]);
  const clear = (field: keyof Errors) =>
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  const error = (field: keyof Errors) =>
    errors[field] ? (
      <span className="field-error" id={`error-${field}`}>
        {errors[field]}
      </span>
    ) : null;
  const attrs = (field: keyof Errors) => ({
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `error-${field}` : undefined,
  });
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget,
      data = new FormData(form),
      values = Object.fromEntries(
        ["name", "phone", "occasion", "date", "guests", "filling"].map(
          (key) => [key, String(data.get(key) ?? "")],
        ),
      ) as Fields;
    const next = validateFields(
      values,
      fillings.map((item) => item.id),
    );
    const fileError = validateFile(fileRef.current?.files?.[0]);
    if (fileError) next.file = fileError;
    else if (errors.file) next.file = errors.file;
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    form.reset();
    setOccasion("");
    setFilling("");
    setChosen("");
    setFilename("");
    setComplete(true);
  }
  if (complete)
    return (
      <div
        className="form-success"
        role="status"
        tabIndex={-1}
        ref={successRef}
      >
        <span className="success-mark">
          <Check size={32} />
        </span>
        <span className="eyebrow">ВСЁ ПОЛУЧИЛОСЬ</span>
        <h3>Спасибо за вашу идею!</h3>
        <p>
          Спасибо! Это демонстрационная форма учебного проекта — заявка никуда
          не отправлена.
        </p>
        <p className="success-note">
          Введённые данные и выбранный файл не сохранены. Все поля очищены.
        </p>
        <button
          className="button"
          onClick={() => {
            setComplete(false);
            requestAnimationFrame(() => nameRef.current?.focus());
          }}
        >
          Заполнить ещё раз <RotateCcw size={17} />
        </button>
      </div>
    );
  return (
    <form className="order-form" noValidate onSubmit={submit}>
      {chosen && (
        <div className="chosen-cake" aria-live="polite">
          <CakeLabel name={chosen} />
          <button
            type="button"
            aria-label="Убрать выбранный пример"
            onClick={() => setChosen("")}
          >
            <X size={18} />
          </button>
          <input type="hidden" name="example" value={chosen} />
        </div>
      )}
      <div className="form-grid">
        <div className="field">
          <label htmlFor="order-name">Имя *</label>
          <input
            id="order-name"
            name="name"
            ref={nameRef}
            placeholder="Как к вам обращаться"
            autoComplete="given-name"
            required
            maxLength={80}
            {...attrs("name")}
            onChange={() => clear("name")}
          />
          {error("name")}
        </div>
        <div className="field">
          <label htmlFor="order-phone">Телефон *</label>
          <input
            id="order-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            maxLength={24}
            required
            {...attrs("phone")}
            onChange={() => clear("phone")}
          />
          {error("phone")}
        </div>
        <div className="field">
          <label htmlFor="order-occasion">Повод / тип заказа *</label>
          <select
            id="order-occasion"
            name="occasion"
            required
            value={occasion}
            {...attrs("occasion")}
            onChange={(event) => {
              setOccasion(event.target.value);
              clear("occasion");
            }}
          >
            <option value="">Выберите повод</option>
            <option value="birthday">День рождения</option>
            <option value="children">Детский праздник</option>
            <option value="wedding">Свадьба</option>
            <option value="bento">Бенто</option>
            <option value="other">Другое</option>
          </select>
          {error("occasion")}
        </div>
        <div className="field">
          <label htmlFor="order-date">Дата события *</label>
          <input
            type="date"
            id="order-date"
            name="date"
            min={earliestDate()}
            required
            {...attrs("date")}
            onChange={() => clear("date")}
          />
          {error("date")}
          <small>Минимум за 3 дня до события</small>
        </div>
        <div className="field">
          <label htmlFor="order-guests">Гости или примерный вес *</label>
          <input
            id="order-guests"
            name="guests"
            placeholder="Например, 10 гостей или 2 кг"
            required
            maxLength={40}
            {...attrs("guests")}
            onChange={() => clear("guests")}
          />
          {error("guests")}
        </div>
        <div className="field">
          <label htmlFor="order-filling">Начинка *</label>
          <select
            id="order-filling"
            name="filling"
            required
            value={filling}
            {...attrs("filling")}
            onChange={(event) => {
              setFilling(event.target.value);
              clear("filling");
            }}
          >
            <option value="">Выберите начинку</option>
            {fillings.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
            <option value="help">Нужна помощь с выбором</option>
          </select>
          {error("filling")}
        </div>
      </div>
      <div className="field">
        <label htmlFor="order-comment">
          Комментарий <span>необязательно</span>
        </label>
        <textarea
          id="order-comment"
          name="comment"
          rows={3}
          maxLength={1500}
          placeholder="Пожелания к оформлению, вкусу или доставке. Об аллергиях тоже важно рассказать заранее."
        />
      </div>
      <div className="attachment">
        <div className="file-control">
          <Paperclip size={20} />
          <label htmlFor="order-file">Прикрепить пример оформления</label>
          <input
            type="file"
            id="order-file"
            name="file"
            accept="image/jpeg,image/png,image/webp"
            ref={fileRef}
            {...attrs("file")}
            onChange={(event) => {
              const file = event.target.files?.[0];
              const message = validateFile(file);
              setErrors((previous) => ({ ...previous, file: message }));
              setFilename(message ? "" : (file?.name ?? ""));
              if (message) event.target.value = "";
            }}
          />
        </div>
        <p className="file-hint">
          JPG, PNG или WebP, до 10 МБ. Файл не загружается на сервер.
        </p>
        {filename && (
          <div className="filename" aria-live="polite">
            <span>{filename}</span>
            <button
              type="button"
              aria-label="Удалить выбранный файл"
              onClick={() => {
                if (fileRef.current) fileRef.current.value = "";
                setFilename("");
                clear("file");
              }}
            >
              <X size={17} />
            </button>
          </div>
        )}
        {error("file")}
        {errors.file && (
          <button
            type="button"
            className="clear-file-error"
            onClick={() => clear("file")}
          >
            Продолжить без файла
          </button>
        )}
      </div>
      <button className="button submit-button" type="submit">
        Получить расчёт <ArrowUpRight size={20} />
      </button>
      <p className="form-note">
        Демонстрационная форма. Данные и файл никуда не отправляются.
        <br />* Обязательные поля
      </p>
    </form>
  );
}
function CakeLabel({ name }: { name: string }) {
  return (
    <span>
      <small>ВАШ ПРИМЕР</small>
      <strong>{name}</strong>
    </span>
  );
}
