import { useState, useEffect } from "react";

/* provides dark mode toggler
https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/ */
export default function useDarkMode(): [string, () => void, boolean] {
  const [mode, setMode] = useState<string>("light");
  const [loadDOM, setLoadDOM] = useState<boolean>(false);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";

    setMode(newMode);
    window.localStorage.setItem("mode", newMode);
  };

  // loads local settings
  useEffect(() => {
    const localTheme = window.localStorage.getItem("mode");
    if (localTheme) {
      setMode(localTheme);
    }
    setLoadDOM(true);
  }, []);

  return [mode, toggleMode, loadDOM];
}
