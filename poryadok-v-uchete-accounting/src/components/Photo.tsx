export default function Photo({
  cell,
  alt,
  className = "",
}: {
  cell: number;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}images/team.webp`}
        alt={alt}
        width="1536"
        height="1024"
        loading="lazy"
        style={{
          left: `${-(cell % 2) * 100}%`,
          top: `${-Math.floor(cell / 2) * 100}%`,
        }}
      />
    </div>
  );
}
