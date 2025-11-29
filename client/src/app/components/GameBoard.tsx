import { motion, AnimatePresence } from "framer-motion";
import { WordCard } from "./WordCard";
import { MeaningCard } from "./MeaningCard";
import { GameResults } from "./GameResults";

// SVG иконки
const SpeakerIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.727 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.727l3.656-3.784a1 1 0 011.617.784zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z"
      clipRule="evenodd"
    />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.5 16.9a.75.75 0 00-1.5 0v.1a2 2 0 104 0v-.1a.75.75 0 00-1.5 0v.1a.5.5 0 11-1 0v-.1z" />
  </svg>
);

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
  // Анимации для карточек
  const cardAnimation = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.9 },
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  };

  const boardAnimation = {
    initial: { opacity: 0, scale: 0.8, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -10 },
    transition: { type: "spring" as const, stiffness: 250, damping: 15 },
  };

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
      {/* Основное игровое поле */}
      <div className="grid min-h-0 flex-1 grid-rows-3 gap-1">
        {/* Игрок 1 - слова (вверху) */}
        {playerRole === "word" && (
          <motion.section
            className="flex min-h-0 flex-col items-center pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-md mb-4 flex items-center gap-2 rounded-full border border-purple-200 bg-white/90 px-3 py-1 font-bold text-purple-800 shadow-sm">
              <SpeakerIcon />
              Слова
            </div>
            <div className="flex h-full max-h-full flex-wrap items-start justify-center gap-2 px-1">
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
                  className={`mb-3 flex items-center gap-1 text-xl font-bold ${
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
                      Правильно!
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
                  className="text-md mb-2 flex items-center gap-1 rounded-lg bg-linear-to-r from-orange-500 to-red-500 px-6 py-2 font-bold text-white shadow hover:scale-105 hover:shadow-md active:scale-95"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Далее
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
            <div className="text-md mb-1 flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-3 py-1 font-bold text-blue-800 shadow-sm">
              <LightbulbIcon />
              Значения
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-center gap-2 px-1">
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
        className="flex shrink-0 justify-center pt-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          onClick={onResetGame}
          className="text-md flex items-center gap-1 rounded-lg bg-linear-to-r from-purple-500 to-blue-500 px-4 py-2 font-bold text-white shadow hover:scale-105 hover:shadow-md active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Новая игра
        </motion.button>
      </motion.footer>
    </div>
  );
};
