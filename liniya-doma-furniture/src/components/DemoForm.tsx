import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, RotateCcw } from "lucide-react";
import { categories } from "../data";
import { validateContact, type ContactErrors } from "../validation";

export type Selection = { id: string; revision: number };
export default function DemoForm({
  mode = "measure",
  selection,
}: {
  mode?: "measure" | "callback";
  selection?: Selection;
}) {
  const [kind, setKind] = useState(selection?.id ?? "");
  const [errors, setErrors] = useState<ContactErrors & { furniture?: string }>(
    {},
  );
  const [complete, setComplete] = useState(false);
  const success = useRef<HTMLDivElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (selection) {
      setKind(selection.id);
      setComplete(false);
      setErrors({});
    }
  }, [selection]);
  useEffect(() => {
    if (complete) success.current?.focus();
  }, [complete]);
  const labelId = (name: string) => `${mode}-${name}`;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: ContactErrors & { furniture?: string } = validateContact(
      String(data.get("name") ?? ""),
      String(data.get("phone") ?? ""),
    );
    if (
      mode === "measure" &&
      !categories.some((category) => category.id === kind) &&
      kind !== "consultation"
    )
      next.furniture = "Выберите тип мебели или консультацию.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    form.reset();
    setKind("");
    setComplete(true);
  }
  if (complete)
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={success}>
        <span className="success-icon">
          <Check size={29} />
        </span>
        <h3>
          Демонстрация завершена.
          <br />
          Заявка не отправлена.
        </h3>
        <p>Введённые данные не сохранены и не переданы. Это учебный проект.</p>
        <button
          className="button button-outline"
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
    <form className={`demo-form ${mode}-form`} onSubmit={submit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor={labelId("name")}>
            Имя <span>*</span>
          </label>
          <input
            ref={nameInput}
            id={labelId("name")}
            name="name"
            autoComplete="given-name"
            placeholder="Как к вам обращаться"
            maxLength={80}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? labelId("name-error") : undefined}
            onChange={() =>
              setErrors((value) => ({ ...value, name: undefined }))
            }
          />
          {errors.name && (
            <span className="field-error" id={labelId("name-error")}>
              {errors.name}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor={labelId("phone")}>
            Телефон <span>*</span>
          </label>
          <input
            id={labelId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            maxLength={24}
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? labelId("phone-error") : undefined}
            onChange={() =>
              setErrors((value) => ({ ...value, phone: undefined }))
            }
          />
          {errors.phone && (
            <span className="field-error" id={labelId("phone-error")}>
              {errors.phone}
            </span>
          )}
        </div>
      </div>
      {mode === "measure" && (
        <>
          <div className="field">
            <label htmlFor={labelId("furniture")}>
              Что нужно изготовить <span>*</span>
            </label>
            <select
              name="furniture"
              id={labelId("furniture")}
              required
              value={kind}
              aria-invalid={!!errors.furniture}
              aria-describedby={
                errors.furniture ? labelId("furniture-error") : undefined
              }
              onChange={(event) => {
                setKind(event.target.value);
                setErrors((value) => ({ ...value, furniture: undefined }));
              }}
            >
              <option value="">Выберите тип мебели</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
              <option value="consultation">Пока нужна консультация</option>
            </select>
            {errors.furniture && (
              <span className="field-error" id={labelId("furniture-error")}>
                {errors.furniture}
              </span>
            )}
          </div>
          <div className="field">
            <label htmlFor={labelId("comment")}>
              Комментарий <small>необязательно</small>
            </label>
            <textarea
              id={labelId("comment")}
              name="comment"
              placeholder="Примерные размеры, пожелания или ваша идея"
              rows={3}
              maxLength={1500}
            />
          </div>
        </>
      )}
      <button className="button form-submit" type="submit">
        {mode === "measure" ? "Вызвать замерщика" : "Заказать звонок"}{" "}
        <ArrowUpRight size={19} />
      </button>
      <p className="form-note">
        Демонстрационная форма. Данные никуда не отправляются.
        <br />
        <span>* Обязательные поля</span>
      </p>
    </form>
  );
}
