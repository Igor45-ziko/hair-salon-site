import type { Photo as PhotoData } from "../data";

export default function Photo({
  photo,
  priority = false,
  className = "",
}: {
  photo: PhotoData;
  priority?: boolean;
  className?: string;
}) {
  const tiled = photo.cell !== undefined;
  return (
    <div className={`photo ${className}`}>
      <img
        className={tiled ? "photo-tiled" : ""}
        src={`${import.meta.env.BASE_URL}images/${photo.src}`}
        alt={photo.alt}
        style={
          tiled
            ? {
                left: `${-100 * (photo.cell! % 2)}%`,
                top: `${-100 * Math.floor(photo.cell! / 2)}%`,
              }
            : undefined
        }
        width="1536"
        height="1024"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}
