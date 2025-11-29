import { motion } from "framer-motion";

interface Card {
  id: string;
  word: string;
  type: "word";
}

interface WordCardProps {
  card: Card;
  onClick?: () => void;
  disabled?: boolean;
}

const SparkleIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.2 6.5 10.266a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
      clipRule="evenodd"
    />
  </svg>
);

export const WordCard = ({
  card,
  onClick,
  disabled = false,
}: WordCardProps) => {
  return (
    <motion.div
      className={`relative flex h-32 w-40 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-purple-400 bg-linear-to-br from-purple-500 to-purple-600 p-4 text-center shadow-lg transition-all duration-200 select-none ${
        disabled
          ? "cursor-not-allowed opacity-50 grayscale"
          : "hover:scale-105 hover:border-purple-300 hover:shadow-xl"
      }`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { y: 0, scale: 0.98 }}
    >
      {/* Декоративные уголки */}
      <div className="absolute top-2 left-2 h-3 w-3 rounded-tl border-t-2 border-l-2 border-white/30"></div>
      <div className="absolute top-2 right-2 h-3 w-3 rounded-tr border-t-2 border-r-2 border-white/30"></div>
      <div className="absolute bottom-2 left-2 h-3 w-3 rounded-bl border-b-2 border-l-2 border-white/30"></div>
      <div className="absolute right-2 bottom-2 h-3 w-3 rounded-br border-r-2 border-b-2 border-white/30"></div>

      <div className="z-10 px-2 text-lg leading-tight font-bold wrap-break-word text-white drop-shadow-sm">
        {card.word}
      </div>

      {/* Бейдж */}
      <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-purple-900 shadow-lg">
        <SparkleIcon />
      </div>
    </motion.div>
  );
};
