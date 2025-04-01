import { getColumnCount } from "./getColumnCount";
import type { Props } from "../CaseImages.types";

export function distributeImages(
  images: string[],
  mode: Props["mode"],
): string[][] {
  const columnCount = getColumnCount(mode);
  const result: string[][] = Array.from({ length: columnCount }, () => []);

  // If we have no images, return empty columns
  if (images.length === 0) {
    return result;
  }

  // Calculate base number of images per column
  const baseImagesPerColumn = Math.ceil(images.length / columnCount);

  let imageIndex = 0;

  // Distribute images sequentially by column
  for (let col = 0; col < columnCount; col++) {
    // Calculate how many images this column should get
    const imagesForThisColumn = Math.min(
      baseImagesPerColumn,
      images.length - imageIndex,
    );

    // Add images to this column
    for (
      let i = 0;
      i < imagesForThisColumn && imageIndex < images.length;
      i++
    ) {
      result[col].push(images[imageIndex++]);
    }

    // For odd columns (1, 3, 5...), duplicate the first image of the column at the end
    if (col % 2 === 1 && result[col].length > 0) {
      result[col].push(result[col][0]);
    }
    // For even columns (0, 2, 4...), duplicate the first and second images at the end
    else if (col % 2 === 0 && result[col].length > 0) {
      // Add the first image
      result[col].push(result[col][0]);

      // Add the second image if it exists
      if (result[col].length > 1) {
        result[col].push(result[col][1]);
      }
    }
  }

  return result;
}
