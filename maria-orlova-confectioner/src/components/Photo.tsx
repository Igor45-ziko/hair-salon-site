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
  const columns = photo.columns ?? 2,
    rows = photo.rows ?? 2;
  return (
    <div className={`photo ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}images/${photo.src}`}
        alt={photo.alt}
        width={
          photo.src === "hero.webp" || photo.src === "portrait.webp"
            ? 1024
            : 1536
        }
        height={
          photo.src === "hero.webp" || photo.src === "portrait.webp"
            ? 1536
            : 1024
        }
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        style={
          photo.cell === undefined
            ? undefined
            : {
                width: `${columns * 100}%`,
                height: `${rows * 100}%`,
                left: `${-(photo.cell % columns) * 100}%`,
                top: `${-Math.floor(photo.cell / columns) * 100}%`,
                objectFit: "fill",
              }
        }
      />
    </div>
  );
}
