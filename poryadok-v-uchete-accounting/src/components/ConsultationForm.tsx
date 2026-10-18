import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, RotateCcw, X } from "lucide-react";
import { money, services } from "../data";
import { describeCalculation, type CalculatorValues } from "../calculation";
import { validate, type Errors, type FormValues } from "../validation";
export type Selection = {
  service?: string;
  business?: string;
  plan?: { name: string; price: number };
  calculation?: { values: CalculatorValues; amount: number };
  revision: number;
};
export default function ConsultationForm({
  selection,
}: {
  selection: Selection | null;
}) {
  const [business, setBusiness] = useState(""),
    [service, setService] = useState(""),
    [context, setContext] = useState<Selection | null>(null),
    [errors, setErrors] = useState<Errors>({}),
    [complete, setComplete] = useState(false);
  const success = useRef<HTMLDivElement>(null),
    name = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (selection) {
      if (selection.business) setBusiness(selection.business);
      if (selection.service) setService(selection.service);
      setContext(selection);
      setComplete(false);
      setErrors((previous) => ({
        ...previous,
        service: undefined,
        business: undefined,
      }));
    }
  }, [selection]);
  useEffect(() => {
    if (complete) success.current?.focus();
  }, [complete]);
  const clear = (field: keyof Errors) =>
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  const attrs = (field: keyof Errors) => ({
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `error-${field}` : undefined,
  });
  const error = (field: keyof Errors) =>
    errors[field] ? (
      <span className="field-error" id={`error-${field}`}>
        {errors[field]}
      </span>
    ) : null;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget,
      data = new FormData(form),
      values = Object.fromEntries(
        ["name", "phone", "business", "service"].map((key) => [
          key,
          String(data.get(key) ?? ""),
        ]),
      ) as FormValues;
    const next = validate(
      values,
      services.map((item) => item.id),
    );
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    form.reset();
    setBusiness("");
    setService("");
    setContext(null);
    setComplete(true);
  }
  if (complete)
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={success}>
        <span className="success-icon">
          <Check size={32} />
        </span>
        <span className="eyebrow">ДЕМОНСТРАЦИЯ ЗАВЕРШЕНА</span>
        <h3>Всё получилось</h3>
        <p>
          Спасибо! Это демонстрационная форма учебного проекта — заявка никуда
          не отправлена.
        </p>
        <p className="success-note">
          Поля очищены. Введённые данные не сохранены и не переданы.
        </p>
        <button
          className="button"
          onClick={() => {
            setComplete(false);
            requestAnimationFrame(() => name.current?.focus());
          }}
        >
          Заполнить ещё раз <RotateCcw size={17} />
        </button>
      </div>
    );
  return (
    <form className="consultation-form" onSubmit={submit} noValidate>
      {(context?.plan || context?.calculation) && (
        <div className="selection-summary" aria-live="polite">
          <div>
            {context.plan ? (
              <>
                <span>ВЫБРАННЫЙ ТАРИФ</span>
                <strong>
                  {context.plan.name} · от {money(context.plan.price)} / мес
                </strong>
              </>
            ) : (
              <>
                <span>ПРЕДВАРИТЕЛЬНЫЙ РАСЧЁТ</span>
                <strong>от {money(context.calculation!.amount)} / мес</strong>
                <p>{describeCalculation(context.calculation!.values)}</p>
              </>
            )}
          </div>
          <button
            type="button"
            aria-label="Убрать выбранный расчёт или тариф"
            onClick={() => setContext(null)}
          >
            <X size={18} />
          </button>
        </div>
      )}
      <div className="form-grid">
        <div className="field">
          <label htmlFor="consult-name">Имя *</label>
          <input
            id="consult-name"
            ref={name}
            name="name"
            placeholder="Как к вам обращаться"
            autoComplete="given-name"
            maxLength={80}
            required
            {...attrs("name")}
            onChange={() => clear("name")}
          />
          {error("name")}
        </div>
        <div className="field">
          <label htmlFor="consult-phone">Телефон *</label>
          <input
            id="consult-phone"
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
          <label htmlFor="consult-business">Ваш бизнес *</label>
          <select
            id="consult-business"
            name="business"
            value={business}
            required
            {...attrs("business")}
            onChange={(event) => {
              setBusiness(event.target.value);
              setContext(null);
              clear("business");
            }}
          >
            <option value="">Выберите форму бизнеса</option>
            <option value="ip">ИП</option>
            <option value="ooo">ООО</option>
          </select>
          {error("business")}
        </div>
        <div className="field">
          <label htmlFor="consult-service">Какая помощь нужна *</label>
          <select
            id="consult-service"
            name="service"
            value={service}
            required
            {...attrs("service")}
            onChange={(event) => {
              setService(event.target.value);
              setContext(null);
              clear("service");
            }}
          >
            <option value="">Выберите услугу</option>
            {services.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
            <option value="consultation">Нужна консультация</option>
          </select>
          {error("service")}
        </div>
      </div>
      <div className="field">
        <label htmlFor="consult-comment">
          Комментарий <span>необязательно</span>
        </label>
        <textarea
          id="consult-comment"
          name="comment"
          rows={3}
          maxLength={1500}
          placeholder="Расскажите о задаче: чем занимаетесь, сколько сотрудников, что хочется привести в порядок."
        />
      </div>
      <button className="button submit-button" type="submit">
        Получить консультацию <ArrowUpRight size={19} />
      </button>
      <p className="form-note">
        Демонстрационная форма. Данные никуда не отправляются.
        <br />* Обязательные поля
      </p>
    </form>
  );
}
