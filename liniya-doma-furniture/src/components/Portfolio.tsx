import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from "lucide-react";
import { filters, projects, money, type Filter } from "../data";
import Photo from "./Photo";
import Modal from "./Modal";

export default function Portfolio({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [filter, setFilter] = useState<Filter>("Все");
  const [current, setCurrent] = useState<string | null>(null);
  const visible = projects.filter(
    (project) => filter === "Все" || project.type === filter,
  );
  const index = visible.findIndex((project) => project.id === current);
  const selected = visible[index];
  const move = (direction: number) => {
    if (index >= 0)
      setCurrent(
        visible[(index + direction + visible.length) % visible.length].id,
      );
  };
  useEffect(() => {
    if (!current) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current, filter]);

  return (
    <>
      <div className="portfolio-toolbar">
        <div className="filters" role="group" aria-label="Фильтры работ">
          {filters.map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              onClick={() => {
                setFilter(item);
                setCurrent(null);
              }}
            >
              {item}
              <span>
                {item === "Все"
                  ? projects.length
                  : projects.filter((project) => project.type === item).length}
              </span>
            </button>
          ))}
        </div>
        <span className="filter-status" aria-live="polite">
          Показано: {visible.length} из {projects.length}
        </span>
      </div>
      <div className="projects-grid">
        {visible.map((project) => (
          <article className="project-card" key={project.id}>
            <button
              className="project-photo"
              onClick={() => setCurrent(project.id)}
              aria-label={`${project.type}. Увеличить: ${project.name}`}
            >
              <Photo photo={project.photo} />
              <span className="project-expand">
                <Expand size={20} />
              </span>
              <span className="project-tag">{project.type}</span>
            </button>
            <div className="project-heading">
              <h3>{project.name}</h3>
              <span>{money(project.price)}</span>
            </div>
            <p className="project-meta">
              {project.size}
              <span />
              {project.material}
            </p>
          </article>
        ))}
        {visible.length % 2 !== 0 && (
          <div className="project-invite">
            <svg viewBox="0 0 240 145" aria-hidden="true" fill="none">
              <path
                d="M38 22h164v101H38V22Zm54 0v101m56-101v101m-56-48h56M38 90h54m56-27h54M23 22v101m-5-101h10m-10 101h10M38 137h164m-164-5v10m164-10v10"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M83 56v11m18-11v11m38-11v11m18 18v11"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <span className="eyebrow">СЛЕДУЮЩИЙ ПРОЕКТ — ВАШ</span>
            <h3>
              А что нужно
              <br />
              вашему дому?
            </h3>
            <a className="text-link" href="#measure">
              Обсудить идею <ArrowUpRight size={19} />
            </a>
          </div>
        )}
      </div>
      <p className="section-note">
        Все проекты и цены вымышлены. Изображения созданы специально для этой
        учебной концепции.
      </p>
      <Modal
        open={!!selected}
        onClose={() => setCurrent(null)}
        titleId="project-modal-title"
        className="project-modal"
        closeLabel="Закрыть фотографию"
      >
        {selected && (
          <>
            <Photo photo={selected.photo} priority />
            <div className="project-modal-info">
              <div className="lightbox-counter" aria-live="polite">
                {index + 1} / {visible.length} · {selected.type}
              </div>
              <div className="lightbox-controls">
                <button aria-label="Предыдущая работа" onClick={() => move(-1)}>
                  <ArrowLeft size={20} />
                </button>
                <button aria-label="Следующая работа" onClick={() => move(1)}>
                  <ArrowRight size={20} />
                </button>
              </div>
              <h3 id="project-modal-title">{selected.name}</h3>
              <p>{selected.detail}</p>
              <div className="lightbox-specs">
                <span>{selected.size}</span>
                <span>{selected.material}</span>
                <strong>{money(selected.price)}</strong>
              </div>
              <a
                href="#measure"
                className="button"
                onClick={() => {
                  onSelect(selected.categoryId);
                  setCurrent(null);
                }}
              >
                Рассчитать похожий проект <ArrowUpRight size={17} />
              </a>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
