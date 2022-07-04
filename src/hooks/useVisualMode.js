import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, shouldReplaceCurrentMode = false) => {
    setMode(newMode);

    if(shouldReplaceCurrentMode) {
      setHistory((history) => {
        history[history.length - 1] = newMode;
        return [...history];
      })
    } else {
      setHistory([...history, newMode]);
    }
  };

  const back = () => {
    if (history.length === 1) return;

    const newHistory = [...history].pop();
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  };

  return {mode, transition, back};
}
