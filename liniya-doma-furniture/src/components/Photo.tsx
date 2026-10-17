import type { PhotoData } from "../data";

export default function Photo({
  photo,
  priority = false,
  className = "",
}: {
  photo: PhotoData;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}images/${photo.src}`}
        alt={photo.alt}
        width="1536"
        height="1024"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={photo.cell !== undefined ? "photo-sheet" : ""}
        style={
          photo.cell !== undefined
            ? {
                left: `${-100 * (photo.cell % 2)}%`,
                top: `${-100 * Math.floor(photo.cell / 2)}%`,
              }
            : undefined
        }
      />
    </div>
  );
}
