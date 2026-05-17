import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

import "./HeaderBar.css";

type HeaderBarProps = {
  selectedNotebookName: string;
};

function HeaderBar({ selectedNotebookName }: HeaderBarProps) {
  const getFormattedDate = () => {
    const date = new Date();

    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.toLocaleDateString("en-US", { day: "2-digit" });
    const year = date.getFullYear();

    return `${weekday}, ${month} ${day} ${year}`;
  };

  const currentDate = getFormattedDate();

  return (
    <>
      <header className="header-bar">
        <div className="theme-icon">
          <FontAwesomeIcon icon={faPalette} size="lg" />
        </div>
        <p className="welcome-text">Good Morning</p>
        <p className="date-text">{currentDate}</p>
        <p className="notebook-text">{selectedNotebookName}</p>
      </header>
    </>
  );
}

export default HeaderBar;
