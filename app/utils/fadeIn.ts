export function createMotionConfig(index: number) {
  return {
    initial: {
      opacity: 0,
      y: -20,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
    },
    transition: {
      delay: index * 0.125,
      duration: 0.5,
      ease: "easeOut",
    },
  };
}
