import { useMotionTemplate, useMotionValue, useSpring } from "motion/react";

export function useMouseBackground(gradientStart: string, size = "20%") {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const mouseXSpring = useSpring(mouseX);
  const mouseYSpring = useSpring(mouseY);

  const onMouseMove = ({
    clientX,
    clientY,
    currentTarget,
  }: {
    clientX: number;
    clientY: number;
    currentTarget: Element;
  }) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    mouseX.set(((clientX - left) / width) * 100);
    mouseY.set(((clientY - top) / height) * 100);
  };

  const onMouseLeave = () => {
    mouseX.set(50);
    mouseY.set(50);
  };

  const bg = useMotionTemplate`
    radial-gradient(circle at ${mouseXSpring}% ${mouseYSpring}%, ${gradientStart},transparent ${size})
  `;

  return {
    onMouseMove,
    onMouseLeave,
    style: { background: bg },
  };
}
