export const boardAnimation = {
  initial: { opacity: 0, scale: 0.8, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: -10 },
  transition: { type: "spring" as const, stiffness: 250, damping: 15 },
};
