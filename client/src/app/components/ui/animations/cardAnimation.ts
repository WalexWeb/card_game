export const cardAnimation = {
  initial: { opacity: 0, y: 20, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.9 },
  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
};
