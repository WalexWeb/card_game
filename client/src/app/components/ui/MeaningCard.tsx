import { motion } from "framer-motion";

interface Card {
  id: string;
  meaning: string;
  type: "meaning";
}

interface MeaningCardProps {
  card: Card;
  onClick: () => void;
  disabled?: boolean;
}

const IdeaIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
  </svg>
);

export const MeaningCard = ({
  card,
  onClick,
  disabled = false,
}: MeaningCardProps) => {
  return (
    <motion.div
      className={`relative flex h-32 w-48 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-blue-400 bg-linear-to-br from-blue-500 to-blue-600 p-4 text-center shadow-lg transition-all duration-200 select-none ${
        disabled
          ? "cursor-not-allowed opacity-50 grayscale"
          : "hover:scale-105 hover:border-blue-300 hover:shadow-xl"
      }`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { y: -2, scale: 1.05 }}
      whileTap={disabled ? {} : { y: 0, scale: 0.98 }}
    >
      {/* Декоративные уголки */}
      <div className="absolute top-2 left-2 h-3 w-3 rounded-tl border-t-2 border-l-2 border-white/30"></div>
      <div className="absolute top-2 right-2 h-3 w-3 rounded-tr border-t-2 border-r-2 border-white/30"></div>
      <div className="absolute bottom-2 left-2 h-3 w-3 rounded-bl border-b-2 border-l-2 border-white/30"></div>
      <div className="absolute right-2 bottom-2 h-3 w-3 rounded-br border-r-2 border-b-2 border-white/30"></div>

      <div className="z-10 px-2 text-base leading-tight font-medium wrap-break-word text-white drop-shadow-sm">
        {card.meaning}
      </div>

      {/* Бейдж */}
      <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-blue-900 shadow-lg">
        <IdeaIcon />
      </div>
    </motion.div>
  );
};
