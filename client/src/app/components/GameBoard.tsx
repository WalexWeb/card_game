import { motion, AnimatePresence } from "framer-motion";
import { WordCard } from "./ui/WordCard";
import { MeaningCard } from "./ui/MeaningCard";
import { GameResults } from "./GameResults";
import SpeakerIcon from "./ui/icons/SpeakerIcon";
import LightbulbIcon from "./ui/icons/LightbulbIcon";
import RoundInfo from "./ui/RoundInfo";
import { boardAnimation } from "./ui/animations/boardAnimation";
import { cardAnimation } from "./ui/animations/cardAnimation";
import ScoreDisplay from "./ui/ScoreDisplay";

interface GameBoardProps {
  gameState: any;
  playerHand: any[];
  playerRole: "word" | "meaning" | null;
  onSelectWord: (cardId: string) => Promise<void>;
  onSelectMeaning: (cardId: string) => Promise<void>;
  onNextRound: () => Promise<void>;
  onResetGame: () => void;
}

export const GameBoard = ({
  gameState,
  playerHand,
  playerRole,
  onSelectWord,
  onSelectMeaning,
  onNextRound,
  onResetGame,
}: GameBoardProps) => {
  const handleWordSelect = (card: any) => {
    onSelectWord(card.id);
  };

  const handleMeaningSelect = (card: any) => {
    onSelectMeaning(card.id);
  };

  // Если игра завершена, показываем результаты
  if (gameState?.status === "finished") {
    return (
      <GameResults
        gameState={gameState}
        playerRole={playerRole}
        onNewGame={onResetGame}
      />
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col gap-2 overflow-hidden bg-linear-to-br from-amber-50 to-orange-100 p-4">
      {/* Шапка с информацией о игре */}
      <motion.header
        className="flex shrink-0 flex-col items-center pt-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Отображение счета */}
        <ScoreDisplay gameState={gameState} playerRole={playerRole} />

        {/* Информация о раунде */}
        <RoundInfo gameState={gameState} />
      </motion.header>

      {/* Основное игровое поле */}
      <div className="grid min-h-0 flex-1 grid-rows-3 gap-1">
        {/* Игрок 1 - слова (вверху) */}
        {playerRole === "word" && (
          <motion.section
            className="flex min-h-0 flex-col items-center pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-md mb-4 flex items-center gap-2 rounded-full border border-purple-200 bg-white/90 px-4 py-2 font-bold text-purple-800 shadow-sm">
              <SpeakerIcon />
              <span>Ваши слова</span>
              <span className="ml-2 text-xs font-normal text-purple-600">
                ({playerHand.length} карт)
              </span>
            </div>
            <div className="flex h-full max-h-full flex-wrap items-start justify-center gap-3 px-1">
              <AnimatePresence mode="popLayout">
                {playerHand.map((card, index) => (
                  <motion.div
                    key={card.id}
                    {...cardAnimation}
                    transition={{
                      ...cardAnimation.transition,
                      delay: index * 0.03,
                    }}
                    className="shrink-0 transform-gpu"
                  >
                    <WordCard
                      card={card}
                      onClick={() => handleWordSelect(card)}
                      disabled={!!gameState?.activeWord}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        )}

        {/* Центральное поле с активным словом */}
        <section className="flex min-h-0 flex-col items-center justify-center gap-1">
          <div className="flex min-h-0 flex-1 items-center justify-center py-1">
            <AnimatePresence mode="wait">
              {gameState?.activeWord ? (
                <motion.div
                  key="active-word"
                  {...boardAnimation}
                  className="shrink-0 transform-gpu"
                >
                  <div className="relative">
                    <WordCard card={gameState.activeWord} />
                    {gameState?.result && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white shadow-lg ${
                          gameState.result === "correct"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {gameState.result === "correct" ? "✓" : "✗"}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-28 w-36 items-center justify-center rounded-xl border-2 border-dashed border-amber-400 bg-amber-50/50 text-amber-600"
                >
                  <span className="text-md px-2 text-center font-medium">
                    Выберите слово
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Результат и кнопка продолжения */}
          <AnimatePresence>
            {gameState?.result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex shrink-0 flex-col items-center gap-2"
              >
                <motion.div
                  className={`mb-3 flex items-center gap-2 text-xl font-bold ${
                    gameState.result === "correct"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {gameState.result === "correct" ? (
                    <>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Правильно! +1 очко
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Неправильно
                    </>
                  )}
                </motion.div>
                <motion.button
                  onClick={onNextRound}
                  className="text-md mb-2 flex items-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-red-500 px-6 py-2 font-bold text-white shadow hover:scale-105 hover:shadow-md active:scale-95"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Следующий раунд
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Игрок 2 - значения (внизу) */}
        {playerRole === "meaning" && (
          <motion.section
            className="flex min-h-0 flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-md mb-1 flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-2 font-bold text-blue-800 shadow-sm">
              <LightbulbIcon />
              <span>Ваши значения</span>
              <span className="ml-2 text-xs font-normal text-blue-600">
                ({playerHand.length} карт)
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-center gap-3 px-1">
              <AnimatePresence mode="popLayout">
                {playerHand.map((card, index) => (
                  <motion.div
                    key={card.id}
                    {...cardAnimation}
                    transition={{
                      ...cardAnimation.transition,
                      delay: index * 0.03,
                    }}
                    className="shrink-0 transform-gpu"
                  >
                    <MeaningCard
                      card={card}
                      onClick={() => handleMeaningSelect(card)}
                      disabled={!gameState?.activeWord || !!gameState?.result}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </div>

      {/* Панель управления */}
      <motion.footer
        className="flex shrink-0 justify-center pt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          onClick={onResetGame}
          className="flex items-center gap-2 rounded-lg bg-linear-to-r from-purple-500 to-blue-500 px-6 py-3 font-bold text-white shadow hover:scale-105 hover:shadow-md active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          Новая игра
        </motion.button>
      </motion.footer>
    </div>
  );
};
