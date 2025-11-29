// ActiveWordCard.tsx
import { motion } from "framer-motion";
import type { Card } from "../store/gameStore";

interface ActiveWordCardProps {
  card: Card;
}

export const ActiveWordCard = ({ card }: ActiveWordCardProps) => {
  return (
    <motion.div
      className="group relative flex h-44 w-64 flex-col items-center justify-center rounded-2xl bg-black/60 backdrop-blur-xl border-2 border-cyan-400/50 p-8 text-center shadow-2xl select-none"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
        `,
      }}
    >
      {/* Мигающий бордер */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Угловые скобки */}
      <div className="absolute top-4 left-4 text-cyan-400 font-mono text-lg">{">"}</div>
      <div className="absolute top-4 right-4 text-cyan-400 font-mono text-lg">{"<"}</div>
      <div className="absolute bottom-4 left-4 text-cyan-400 font-mono text-lg">{"</"}</div>
      <div className="absolute bottom-4 right-4 text-cyan-400 font-mono text-lg">{">"}</div>

      {/* Содержимое */}
      <div className="relative z-10 space-y-5">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 border border-cyan-400/50">
            <svg className="h-6 w-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-cyan-100 font-mono mb-3 tracking-wider">
            {card.word}
          </h2>
          <p className="text-sm text-cyan-400 font-mono uppercase tracking-widest">
            АКТИВНЫЙ_ТЕРМИНАЛ
          </p>
        </div>
      </div>

      {/* Сканирующий луч */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};