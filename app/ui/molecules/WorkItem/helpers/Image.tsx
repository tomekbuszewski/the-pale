export function Image({
  image,
  title,
}: {
  image: string | OutputMetadata;
  title: string;
}) {
  if (typeof image === "string") {
    return <img src={image} alt={title} />;
  }

  return (
    <img
      src={image.src}
      alt={title}
      width={image.width}
      height={image.height}
    />
  );
}
