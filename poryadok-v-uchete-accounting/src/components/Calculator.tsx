import { useState } from "react";
import { ArrowUpRight, Check, RotateCcw } from "lucide-react";
import {
  calculate,
  initialCalculator,
  type CalculatorValues,
} from "../calculation";
import { money } from "../data";
import type { Selection } from "./ConsultationForm";
export default function Calculator({
  onChoose,
}: {
  onChoose: (selection: Omit<Selection, "revision">) => void;
}) {
  const [values, setValues] = useState<CalculatorValues>({
    ...initialCalculator,
  });
  const result = calculate(values);
  const update = <K extends keyof CalculatorValues>(
    key: K,
    value: CalculatorValues[K],
  ) => setValues((previous) => ({ ...previous, [key]: value }));
  return (
    <div className="calculator">
      <div className="calculator-inputs">
        <fieldset>
          <legend>Форма бизнеса</legend>
          <div className="segments business-segments">
            {(["ip", "ooo"] as const).map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="calc-business"
                  value={value}
                  checked={values.business === value}
                  onChange={() => update("business", value)}
                />
                <span>{value === "ip" ? "ИП" : "ООО"}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Сотрудники</legend>
          <div className="segments">
            {(
              [
                ["none", "Нет"],
                ["small", "1–5"],
                ["large", "Больше 5"],
              ] as const
            ).map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="calc-employees"
                  value={value}
                  checked={values.employees === value}
                  onChange={() => update("employees", value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Операций в месяц</legend>
          <div className="segments">
            {(
              [
                ["low", "До 50"],
                ["medium", "50–150"],
                ["high", "Больше 150"],
              ] as const
            ).map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="calc-operations"
                  value={value}
                  checked={values.operations === value}
                  onChange={() => update("operations", value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Дополнительно</legend>
          <div className="extras">
            <label>
              <input
                type="checkbox"
                checked={values.marketplaces}
                onChange={(event) =>
                  update("marketplaces", event.target.checked)
                }
              />
              <span className="checkbox-mark">
                <Check size={13} />
              </span>
              <span>Маркетплейсы</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={values.hr}
                onChange={(event) => update("hr", event.target.checked)}
              />
              <span className="checkbox-mark">
                <Check size={13} />
              </span>
              <span>Кадры</span>
            </label>
          </div>
        </fieldset>
        <button
          className="reset-calculator"
          onClick={() => setValues({ ...initialCalculator })}
        >
          <RotateCcw size={14} /> Сбросить параметры
        </button>
      </div>
      <div className="calculator-result">
        <span className="eyebrow">ПРИМЕРНЫЙ ОРИЕНТИР</span>
        <div
          className="estimate"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span>от</span>
          <strong>{money(result.total)}</strong>
          <span>/ месяц</span>
        </div>
        <p>
          Для выбранных параметров бизнеса.
          <br />
          Окончательную стоимость обсудим лично.
        </p>
        <ul className="estimate-items">
          {result.items.map((item) => (
            <li key={item.name}>
              <span>{item.name}</span>
              <strong>{money(item.amount)}</strong>
            </li>
          ))}
        </ul>
        <a
          href="#consultation"
          className="button"
          onClick={() =>
            onChoose({
              business: values.business,
              service: values.marketplaces ? "marketplace" : "support",
              calculation: { values: { ...values }, amount: result.total },
            })
          }
        >
          Получить точный расчёт <ArrowUpRight size={18} />
        </a>
        <p className="calculator-note">
          Демонстрационный расчёт: условная база и надбавки. Без реальной
          бухгалтерской логики.
        </p>
      </div>
    </div>
  );
}
