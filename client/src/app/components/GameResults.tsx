import { motion } from "framer-motion";

interface GameResultsProps {
  gameState: any;
  playerRole: "word" | "meaning" | null;
  onNewGame: () => void;
}

export const GameResults = ({
  gameState,
  playerRole,
  onNewGame,
}: GameResultsProps) => {
  const getWinner = () => {
    if (!gameState?.scores) return "draw";
    const { words, meanings } = gameState.scores;
    if (words === meanings) return "draw";
    return words > meanings ? "words" : "meanings";
  };

  const isWinner = () => {
    const winner = getWinner();
    if (winner === "draw") return "draw";
    return (
      (playerRole === "word" && winner === "words") ||
      (playerRole === "meaning" && winner === "meanings")
    );
  };

  const userWon = isWinner();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-linear-to-br from-amber-50 to-orange-100 p-4">
      <motion.div
        className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            {userWon === "draw"
              ? "Ничья!"
              : userWon
                ? "Поздравляем!"
                : "Игра завершена"}
          </h1>

          <p className="text-gray-600">
            {userWon === "draw"
              ? "Оба игрока показали одинаковый результат!"
              : userWon
                ? "Вы победили в этой игре!"
                : "Попробуйте еще раз!"}
          </p>
        </div>

        <div className="mb-6 rounded-lg bg-gray-50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Итоговый счет
          </h2>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-purple-100 p-4">
              <div className="text-2xl font-bold text-purple-600">
                {gameState?.scores?.words || 0}
              </div>
              <div className="text-sm font-medium text-purple-700">
                Молодежь (слова)
              </div>
            </div>
            <div className="rounded-lg bg-blue-100 p-4">
              <div className="text-2xl font-bold text-blue-600">
                {gameState?.scores?.meanings || 0}
              </div>
              <div className="text-sm font-medium text-blue-700">
                Олдскул (значения)
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Раундов сыграно: {gameState?.currentRound || 0}
          </div>
        </div>

        <motion.button
          onClick={onNewGame}
          className="w-full rounded-lg bg-linear-to-r from-purple-500 to-blue-600 py-3 font-semibold text-white shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Начать новую игру
        </motion.button>
      </motion.div>
    </div>
  );
};
