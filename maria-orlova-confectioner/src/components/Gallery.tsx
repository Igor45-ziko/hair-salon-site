import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from "lucide-react";
import { filters, works, type Filter } from "../data";
import type { Selection } from "./OrderForm";
import Photo from "./Photo";
import Modal from "./Modal";

export default function Gallery({
  filter,
  onFilter,
  onChoose,
}: {
  filter: Filter;
  onFilter: (value: Filter) => void;
  onChoose: (value: Omit<Selection, "revision">) => void;
}) {
  const [current, setCurrent] = useState<string | null>(null);
  const visible = works.filter(
    (work) => filter === "Все" || work.category === filter,
  );
  const index = visible.findIndex((work) => work.id === current),
    selected = visible[index];
  const move = (step: number) => {
    if (index >= 0)
      setCurrent(visible[(index + step + visible.length) % visible.length].id);
  };
  useEffect(() => {
    if (!selected) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [current, filter]);
  return (
    <>
      <div className="gallery-toolbar">
        <div className="filters" role="group" aria-label="Фильтры работ">
          {filters.map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              onClick={() => {
                onFilter(item);
                setCurrent(null);
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <span aria-live="polite" className="gallery-count">
          {visible.length} из {works.length} работ
        </span>
      </div>
      <div className="gallery-grid">
        {visible.map((work) => (
          <article className="work-card" key={work.id}>
            <button
              className="work-photo"
              aria-label={`${work.category}: увеличить «${work.name}»`}
              onClick={() => setCurrent(work.id)}
            >
              <Photo photo={work.photo} />
              <span className="work-zoom">
                <Expand size={19} />
              </span>
              <span className="work-category">{work.category}</span>
            </button>
            <h3>{work.name}</h3>
          </article>
        ))}
      </div>
      <p className="demo-note">
        Примеры созданы для учебного проекта. Все изображения оригинальные,
        работы вымышлены.
      </p>
      <Modal
        open={!!selected}
        onClose={() => setCurrent(null)}
        titleId="lightbox-title"
        className="lightbox"
        closeLabel="Закрыть фотографию"
      >
        {selected && (
          <>
            <Photo photo={selected.photo} priority />
            <div className="lightbox-info">
              <div className="lightbox-top">
                <span aria-live="polite">
                  {index + 1} / {visible.length} · {selected.category}
                </span>
                <div className="lightbox-controls">
                  <button
                    aria-label="Предыдущая работа"
                    onClick={() => move(-1)}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button aria-label="Следующая работа" onClick={() => move(1)}>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
              <h3 id="lightbox-title">{selected.name}</h3>
              <p>{selected.description}</p>
              <a
                className="button"
                href="#order"
                onClick={() => {
                  onChoose({
                    name: selected.name,
                    occasion: selected.occasion,
                    filling: selected.filling,
                  });
                  setCurrent(null);
                }}
              >
                Хочу похожий торт <ArrowUpRight size={18} />
              </a>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
