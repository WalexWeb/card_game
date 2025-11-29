import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface GameState {
  id: string;
  status: "waiting" | "playing" | "finished";
  players: Array<{
    id: string;
    name: string;
    role: "word" | "meaning";
    handSize: number;
    isReady: boolean;
  }>;
  activeWord: any;
  result: "correct" | "wrong" | null;
  scores: { words: number; meanings: number };
  currentRound: number;
}

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerHand, setPlayerHand] = useState<any[]>([]);
  const [playerRole, setPlayerRole] = useState<"word" | "meaning" | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const socket = io(API_URL, {
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.log("Ошибка подключения:", error);
    });

    socket.on("game_state_update", (state: GameState) => {
      setGameState(state);
    });

    socket.on("player_hand_update", (hand: any[]) => {
      setPlayerHand(hand);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinGame = (
    playerName: string,
    role: "word" | "meaning",
    gameId?: string,
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current) {
        reject(new Error("Socket not connected"));
        return;
      }

      socketRef.current.emit(
        "join_game",
        { playerName, role, gameId },
        (response: any) => {
          if (response.success) {
            setPlayerRole(response.playerRole);
            resolve(response);
          } else {
            reject(new Error(response.error));
          }
        },
      );
    });
  };

  const selectWord = (cardId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current) {
        reject(new Error("Socket not connected"));
        return;
      }

      socketRef.current.emit("select_word", { cardId }, (response: any) => {
        if (response && response.success) {
          resolve(response);
        } else {
          const errorMessage = response?.error || "Cannot select word";
          reject(new Error(errorMessage));
        }
      });
    });
  };

  const selectMeaning = (cardId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current) {
        reject(new Error("Socket not connected"));
        return;
      }

      console.log("🔄 Selecting meaning:", cardId);

      socketRef.current.emit("select_meaning", { cardId }, (response: any) => {
        if (response && response.success) {
          resolve(response);
        } else {
          const errorMessage = response?.error || "Cannot select meaning";
          reject(new Error(errorMessage));
        }
      });
    });
  };

  const nextRound = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current) {
        reject(new Error("Socket not connected"));
        return;
      }

      socketRef.current.emit("next_round", (response: any) => {
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.error));
        }
      });
    });
  };

  const resetGame = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!socketRef.current) {
        reject(new Error("Socket not connected"));
        return;
      }

      socketRef.current.emit("reset_game", (response: any) => {
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.error));
        }
      });
    });
  };

  const leaveGame = () => {
    if (socketRef.current) {
      socketRef.current.emit("leave_game");
    }
  };

  return {
    isConnected,
    gameState,
    playerHand,
    playerRole,
    joinGame,
    selectWord,
    selectMeaning,
    nextRound,
    resetGame,
    leaveGame,
  };
};
