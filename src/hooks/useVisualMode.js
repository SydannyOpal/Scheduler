import DayList from "components/DayList";
import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, shouldReplaceCurrentMode = false) => {
    setMode(newMode);

    if(shouldReplaceCurrentMode) {
      history[history.length - 1] = newMode;
    } else {
      history.push(newMode);
    }

    setHistory([...history]);
  };

  const back = () => {
    if (history.length === 1) return;

    history.pop();
    setMode(history[history.length - 1]);
    setHistory([...history]);
  };

  return {mode, transition, back};
}
