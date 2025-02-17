export function Image({
  image,
  title,
}: {
  image: string | OutputMetadata;
  title: string;
}) {
  const imgIsString = typeof image === "string";

  return (
    <img
      loading="lazy"
      src={imgIsString ? image : image.src}
      alt={title}
      title={title}
      width={imgIsString ? undefined : image.width}
      height={imgIsString ? undefined : image.height}
    />
  );
}
