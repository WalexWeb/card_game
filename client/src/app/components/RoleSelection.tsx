import { motion } from "framer-motion";

interface RoleSelectionProps {
  isConnected: boolean;
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  onRoleSelect: (role: "word" | "meaning") => void;
}

export const RoleSelection = ({
  isConnected,
  playerName,
  onPlayerNameChange,
  onRoleSelect,
}: RoleSelectionProps) => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Сленг Баттл</h1>
          <p className="text-gray-600">Выберите свою роль в игре</p>
        </div>

        <div
          className={`mb-6 rounded-lg p-4 ${
            isConnected
              ? "border border-green-200 bg-green-50"
              : "border border-red-200 bg-red-50"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <div
              className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span
              className={`font-medium ${isConnected ? "text-green-700" : "text-red-700"}`}
            >
              {isConnected ? "Подключено к серверу" : "Не подключено к серверу"}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Ваше имя
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => onPlayerNameChange(e.target.value)}
            placeholder="Введите ваше имя"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-4">
          <motion.button
            onClick={() => onRoleSelect("word")}
            disabled={!playerName.trim() || !isConnected}
            className="group flex w-full items-center justify-between rounded-xl bg-linear-to-r from-purple-500 to-blue-600 p-6 text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-left">
              <div className="text-lg font-semibold">Молодежь</div>
              <div className="text-sm opacity-90">Загадываю слова</div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => onRoleSelect("meaning")}
            disabled={!playerName.trim() || !isConnected}
            className="group flex w-full items-center justify-between rounded-xl bg-linear-to-r from-green-500 to-emerald-600 p-6 text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-left">
              <div className="text-lg font-semibold">Олдскул</div>
              <div className="text-sm opacity-90">Угадываю значения</div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
