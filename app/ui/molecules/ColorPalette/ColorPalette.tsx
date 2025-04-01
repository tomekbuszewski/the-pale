import { type HTMLProps } from "react";
import clsx from "clsx";

import styles from "./ColorPalette.module.scss";

interface Color {
  name: string;
  value: string;
  dark?: boolean;
}

interface Props extends HTMLProps<HTMLDListElement> {
  items: Color[];
}

/**
 * Determine if a color is a light color
 * @see https://gist.github.com/krabs-github/ec56e4f1c12cddf86ae9c551aa9d9e04
 */
function isLightColor(color: string): boolean {
  let r = 0;
  let g = 0;
  let b = 0;

  // Check the format of the color, HEX or RGB?
  if (/^rgb/.exec(color)) {
    // If HEX --> store the red, green, blue values in separate variables
    const rgb =
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/.exec(color);

    if (rgb) {
      r = Number(rgb[1]);
      g = Number(rgb[2]);
      b = Number(rgb[3]);
    }
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    const replacer = color.length < 5 ? /./g : /g/;

    const hexColor = Number("0x" + color.slice(1).replace(replacer, "$&$&"));

    r = hexColor >> 16;
    g = (hexColor >> 8) & 255;
    b = hexColor & 255;
  }

  // HSP equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  // > 127.5 is 'light', <= 127.5 is 'dark'

  return hsp > 127.5;
}

function ColorPalette({ items, ...rest }: Props) {
  return (
    <dl {...rest} className={styles.wrapper}>
      {items.map((item) => (
        <div
          style={{ background: item.value }}
          key={item.name}
          className={clsx({
            [styles.dark]: !isLightColor(item.value),
          })}
        >
          <dt>{item.name}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default ColorPalette;
