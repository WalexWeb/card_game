import { motion } from "framer-motion";

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

export default RoundInfo;
