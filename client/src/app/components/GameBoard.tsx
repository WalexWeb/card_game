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

const TrophyIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
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

// Компонент для отображения счета
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

// Компонент для отображения информации о раунде
const RoundInfo = ({ gameState }: { gameState: any }) => {
  if (!gameState) return null;

  return (
    <motion.div
      className="mb-2 flex items-center gap-4 text-sm text-gray-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1">
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">Раунд {gameState.currentRound || 1}</span>
      </div>

      <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1">
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path
            fillRule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">
          {gameState.players?.reduce(
            (total: number, player: any) => total + (player.handSize || 0),
            0,
          ) || 0}{" "}
          карт осталось
        </span>
      </div>
    </motion.div>
  );
};

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
