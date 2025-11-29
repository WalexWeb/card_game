import { useState } from "react";
import { GameBoard } from "./components/GameBoard";
import { RoleSelection } from "./components/RoleSelection";
import { useSocket } from "./hooks/useSocket";
import { GameResults } from "./components/GameResults";

function App() {
  const {
    isConnected,
    gameState,
    playerHand,
    playerRole,
    joinGame,
    selectWord,
    selectMeaning,
    nextRound,
    resetGame,
  } = useSocket();

  const [currentView, setCurrentView] = useState<"role-selection" | "game">(
    "role-selection",
  );
  const [playerName, setPlayerName] = useState("");

  const handleRoleSelect = async (role: "word" | "meaning") => {
    if (!playerName.trim()) {
      alert("Пожалуйста, введите ваше имя");
      return;
    }

    try {
      await joinGame(playerName, role);
      setCurrentView("game");
    } catch (error) {
      console.error("Failed to join game:", error);
      alert("Не удалось присоединиться к игре: " + error);
    }
  };

  const handleNewGame = () => {
    resetGame();
    setCurrentView("role-selection");
    setPlayerName("");
  };
  const isGameFinished =
    gameState?.status === "finished" ||
    (gameState?.players?.every((player) => player.handSize === 0) &&
      gameState?.status === "playing");

  if (currentView === "role-selection") {
    return (
      <RoleSelection
        isConnected={isConnected}
        playerName={playerName}
        onPlayerNameChange={setPlayerName}
        onRoleSelect={handleRoleSelect}
      />
    );
  }

  // Если игра завершена, показываем результаты
  if (isGameFinished) {
    return (
      <GameResults
        gameState={gameState}
        playerRole={playerRole}
        onNewGame={handleNewGame}
      />
    );
  }

  return (
    <GameBoard
      gameState={gameState}
      playerHand={playerHand}
      playerRole={playerRole}
      onSelectWord={selectWord}
      onSelectMeaning={selectMeaning}
      onNextRound={nextRound}
      onResetGame={handleNewGame}
    />
  );
}

export default App;
