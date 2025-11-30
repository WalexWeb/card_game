import { motion } from "framer-motion";
import ConnectionIcon from "./ui/icons/ConnectionIcon";
import DisconnectionIcon from "./ui/icons/DisconnectionIcon";
import UserIcon from "./ui/icons/UserIcon";
import YouthIcon from "./ui/icons/YouthIcon";
import OldschoolIcon from "./ui/icons/OldschoolIcon";

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
    <div className="flex min-h-screen w-screen items-center justify-center bg-linear-to-br from-blue-50 via-purple-50 to-indigo-100 p-4">
      <motion.div
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Заголовок */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent">
            Сленг Баттл
          </h1>
          <p className="text-lg text-gray-600">Выберите свою роль в игре</p>
        </div>

        {/* Статус подключения */}
        <motion.div
          className={`mb-8 rounded-2xl border-2 p-4 ${
            isConnected
              ? "border-green-200 bg-linear-to-r from-green-50 to-emerald-50"
              : "border-red-200 bg-linear-to-r from-red-50 to-orange-50"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-3">
            <div
              className={`rounded-full p-2 ${
                isConnected
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {isConnected ? <ConnectionIcon /> : <DisconnectionIcon />}
            </div>
            <span
              className={`text-lg font-semibold ${
                isConnected ? "text-green-700" : "text-red-700"
              }`}
            >
              {isConnected ? "Подключено к серверу" : "Не подключено к серверу"}
            </span>
          </div>
        </motion.div>

        {/* Поле ввода имени */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <UserIcon />
            Ваше имя
          </label>
          <div className="relative">
            <input
              type="text"
              value={playerName}
              onChange={(e) => onPlayerNameChange(e.target.value)}
              placeholder="Введите ваше имя для игры..."
              className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 px-5 py-4 pl-12 text-lg transition-all duration-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-200 focus:outline-none"
            />
            <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Выбор роли */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Роль Молодежь */}
          <motion.button
            onClick={() => onRoleSelect("word")}
            disabled={!playerName.trim() || !isConnected}
            className="group relative flex w-full items-center justify-between rounded-2xl bg-linear-to-r from-purple-500 via-purple-600 to-blue-600 p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
                <YouthIcon />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 text-xl font-bold">
                  Молодежь
                </div>
                <div className="mt-2 flex items-center gap-1 text-sm opacity-75">
                  <span>Выбираю слова из молодежного сленга</span>
                </div>
              </div>
            </div>
            <motion.div
              className="text-2xl opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
              whileHover={{ rotate: 15 }}
            >
              →
            </motion.div>

            {/* Эффект при наведении */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.button>

          {/* Роль Олдскул */}
          <motion.button
            onClick={() => onRoleSelect("meaning")}
            disabled={!playerName.trim() || !isConnected}
            className="group relative flex w-full items-center justify-between rounded-2xl bg-linear-to-r from-green-500 via-emerald-600 to-teal-600 p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
                <OldschoolIcon />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 text-xl font-bold">
                  Олдскул
                </div>

                <div className="mt-2 flex items-center gap-1 text-sm opacity-75">
                  <span>Объясняю значения молодежных выражений</span>
                </div>
              </div>
            </div>
            <motion.div
              className="text-2xl opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
              whileHover={{ rotate: 15 }}
            >
              →
            </motion.div>

            {/* Эффект при наведении */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.button>
        </motion.div>

        {/* Подсказка */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {!isConnected ? (
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center justify-center gap-2 text-amber-700">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                </svg>
                <span className="font-medium">
                  Убедитесь, что бекенд сервер запущен на localhost:3001
                </span>
              </div>
            </div>
          ) : !playerName.trim() ? (
            <div className="text-sm text-gray-500">
              Введите ваше имя, чтобы начать игру
            </div>
          ) : (
            <div className="text-sm font-medium text-green-600">
              Всё готово! Выберите роль для начала игры
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
