import { Link } from "react-router-dom";
import { VscColorMode } from "react-icons/vsc";
import Button from "./components/Button";
import IconButton from "./components/IconButton";

interface TopNavProps {
  mode: string;
  toggleMode: () => void;
}
export default function TopNav({ mode, toggleMode }: TopNavProps) {
  const buttonClassName = "dark:hover:bg-gray-700 dark:active:bg-gray-600";
  return (
    <nav
      className="dark sticky top-0 z-[99] self-stretch
      p-2 px-8 shadow-black drop-shadow-xl
      bg-gray-800 font-semibold
      flex flex-row items-center"
    >
      <div className="text-2xl">Web Comment Generator v2</div>
      <div className="flex-grow"></div>
      <Button as={Link} to="/" className={buttonClassName}>
        Home
      </Button>
      <Button as={Link} to="/comments/write" className={buttonClassName}>
        Comments
      </Button>
      <Button as={Link} to="/comments/admin" className={buttonClassName}>
        Admin
      </Button>
      <IconButton
        onClick={toggleMode}
        className={buttonClassName}
        icon={
          <VscColorMode
            size="1.5em"
            style={{
              transition: "transform 150ms ease-in-out",
              transform: mode === "dark" ? "rotate(180deg)" : "",
            }}
          />
        }
        aria-label="toggle color mode"
      />
    </nav>
  );
}
