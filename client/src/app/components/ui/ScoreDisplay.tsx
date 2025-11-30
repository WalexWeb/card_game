import { motion } from "framer-motion";
import TrophyIcon from "./icons/TrophyIcon";

const ScoreDisplay = ({
  gameState,
  playerRole,
}: {
  gameState: any;
  playerRole: string | null;
}) => {
  if (!gameState?.scores) return null;

  const { words, meanings } = gameState.scores;
  const isWordPlayer = playerRole === "word";
  const isMeaningPlayer = playerRole === "meaning";

  return (
    <motion.div
      className="mb-4 flex items-center justify-center gap-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Счет молодежи */}
      <div
        className={`flex items-center gap-3 rounded-lg px-4 py-2 ${
          isWordPlayer
            ? "border-2 border-purple-300 bg-purple-100 shadow-md"
            : "border border-purple-200 bg-purple-50"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
          <span className="text-sm font-semibold text-purple-800">
            Молодежь
          </span>
        </div>
        <div
          className={`text-lg font-bold ${
            isWordPlayer ? "text-purple-700" : "text-purple-600"
          }`}
        >
          {words}
        </div>
      </div>

      {/* Разделитель */}
      <div className="flex items-center gap-2 text-gray-400">
        <TrophyIcon />
        <span className="text-xs font-medium">VS</span>
        <TrophyIcon />
      </div>

      {/* Счет олдскула */}
      <div
        className={`flex items-center gap-3 rounded-lg px-4 py-2 ${
          isMeaningPlayer
            ? "border-2 border-blue-300 bg-blue-100 shadow-md"
            : "border border-blue-200 bg-blue-50"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span className="text-sm font-semibold text-blue-800">Олдскул</span>
        </div>
        <div
          className={`text-lg font-bold ${
            isMeaningPlayer ? "text-blue-700" : "text-blue-600"
          }`}
        >
          {meanings}
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreDisplay;
