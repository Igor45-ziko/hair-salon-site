import { useState } from "react";
import { Check, GripVertical, PanelTop, Rows3 } from "lucide-react";
import { materials, materialsPhoto, swatches } from "../data";
import Photo from "./Photo";

export default function Materials() {
  const [active, setActive] = useState(0);
  return (
    <div className="materials-grid">
      <div className="materials-copy">
        <div className="material-list">
          {materials.map(([name, text], i) => (
            <div className="material-row" key={name}>
              <span>0{i + 1}</span>
              <div>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="swatches" role="group" aria-label="Образцы оттенков">
          {swatches.map((swatch, i) => (
            <button
              key={swatch.id}
              className={`swatch swatch-${swatch.id}`}
              style={{ backgroundColor: swatch.color }}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={swatch.name}
              title={swatch.name}
            >
              {i === active && <Check size={19} />}
            </button>
          ))}
        </div>
        <div className="swatch-caption" aria-live="polite">
          <strong>{swatches[active].name}</strong>
          <p>{swatches[active].description}</p>
        </div>
        <span className="section-note">
          Названия коллекций вымышлены. Точный цвет выбирают по физическому
          образцу.
        </span>
      </div>
      <div>
        <Photo photo={materialsPhoto} />
        <div className="hardware">
          <div>
            <PanelTop size={20} />
            <span>Надёжные петли</span>
          </div>
          <div>
            <Rows3 size={20} />
            <span>Плавные направляющие</span>
          </div>
          <div>
            <GripVertical size={20} />
            <span>Удобные ручки</span>
          </div>
        </div>
        <p className="hardware-note">
          Подберём фурнитуру под частоту использования и бюджет, объясним
          разницу между вариантами.
        </p>
      </div>
    </div>
  );
}
