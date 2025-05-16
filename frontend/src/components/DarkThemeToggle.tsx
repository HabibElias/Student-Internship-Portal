import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="cursor-pointer rounded bg-black p-2 text-white dark:bg-white dark:text-black"
    >
      {!isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
}
