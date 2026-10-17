import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { gallery } from "../data";
import Photo from "./Photo";
import Modal from "./Modal";

export default function Gallery() {
  const [current, setCurrent] = useState<number | null>(null);
  const move = (offset: number) =>
    setCurrent((value) =>
      value === null
        ? null
        : (value + offset + gallery.length) % gallery.length,
    );
  useEffect(() => {
    if (current === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current]);
  return (
    <>
      <div className="gallery-grid">
        {gallery.map((photo, i) => (
          <button
            className="gallery-item"
            key={photo.title}
            onClick={() => setCurrent(i)}
            aria-label={`Увеличить фото: ${photo.title}`}
          >
            <Photo photo={photo} />
            <span className="gallery-caption">
              {photo.title}
              <Maximize2 size={16} />
            </span>
          </button>
        ))}
      </div>
      <Modal
        open={current !== null}
        onClose={() => setCurrent(null)}
        titleId="gallery-modal-title"
        className="gallery-modal"
        closeLabel="Закрыть фотографию"
      >
        {current !== null && (
          <>
            <Photo photo={gallery[current]} priority />
            <div className="lightbox-bottom">
              <div aria-live="polite">
                <h3 id="gallery-modal-title">{gallery[current].title}</h3>
                <span>
                  {current + 1} / {gallery.length}
                </span>
              </div>
              <div className="lightbox-controls">
                <button onClick={() => move(-1)} aria-label="Предыдущее фото">
                  <ArrowLeft size={20} />
                </button>
                <button onClick={() => move(1)} aria-label="Следующее фото">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
