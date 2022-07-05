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

// to insure that state is saved when editing 
  const back = () => {
    if (history.length === 1) return;

    const newHistory = [...history];
    newHistory.pop();
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  };

  return {mode, transition, back};
}
