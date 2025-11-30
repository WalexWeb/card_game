import { motion } from "framer-motion";

interface RoleSelectionProps {
  isConnected: boolean;
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  onRoleSelect: (role: "word" | "meaning") => void;
}

// Иконки для ролей
const YouthIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21,6H3C1.9,6 1,6.9 1,8V16C1,17.1 1.9,18 3,18H21C22.1,18 23,17.1 23,16V8C23,6.9 22.1,6 21,6M21,16H3V8H21V16M6,15H8V13H10V11H8V9H6V11H4V13H6V15M18,12C18.55,12 19,11.55 19,11C19,10.45 18.55,10 18,10C17.45,10 17,10.45 17,11C17,11.55 17.45,12 18,12M15,15C15.55,15 16,14.55 16,14C16,13.45 15.55,13 15,13C14.45,13 14,13.45 14,14C14,14.55 14.45,15 15,15M18,13C18.55,13 19,12.55 19,12C19,11.45 18.55,11 18,11C17.45,11 17,11.45 17,12C17,12.55 17.45,13 18,13Z" />
  </svg>
);

const OldschoolIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18C5 17.18 8 16 12 16C16 16 19 17.18 19 17.18V13.18C19 13.18 16 14 12 14C8 14 5 13.18 5 13.18Z" />
  </svg>
);

const ConnectionIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
  </svg>
);

const DisconnectionIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M13.5,7H10.5L9.92,9L10.5,11H13.5L14.08,9L13.5,7M1.5,7V9H3.5V15H1.5V17H6.5V15H4.5V9H6.5V7H1.5M10.5,15V17H13.5V15H10.5M18.5,7V9H20.5V15H18.5V17H23.5V15H21.5V9H23.5V7H18.5Z" />
  </svg>
);

const UserIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
  </svg>
);

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
