import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import type { Notebook } from "../../pages/HomePage";
import "./HeaderBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

type HeaderBarProps = {
  notebook: Notebook[];
  selectedListItem: number | null;
};

function HeaderBar({ notebook, selectedListItem }: HeaderBarProps) {
  const getFormattedDate = () => {
    const date = new Date();

    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.toLocaleDateString("en-US", { day: "2-digit" });
    const year = date.getFullYear();

    return `${weekday}, ${month} ${day} ${year}`;
  };

  const currentDate = getFormattedDate();

  const matchingElement = notebook.find((item) => item.id === selectedListItem);
  const [buttonPressed, isButtonPressed] = useState(false);

  // Determine greeting based on local time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <>
      <header className="header-bar">
        <nav>
          <Link className="sign-up-btn" to="/signin">
            Log In
          </Link>
        </nav>
        <div className="theme-icon">
          <FontAwesomeIcon
            icon={faPalette}
            size="lg"
            onClick={() => {
              if (buttonPressed) isButtonPressed(false);
              if (!buttonPressed) isButtonPressed(true);
            }}
          />
        </div>
        {buttonPressed && (
          <div className="box">
            <p className="scheme-title">Coming Soon!</p>
            <div className="color-buttons">
              {/* <button className="original"><img src={original} alt="original scheme" /></button>
            <button className="original"><img src={original} alt="original scheme" /></button>
            <button className="original"><img src={original} alt="original scheme" /></button>
            <button className="original"><img src={original} alt="original scheme" /></button>
            <button className="original"><img src={original} alt="original scheme" /></button>
            <button className="original"><img src={original} alt="original scheme" /></button> */}
            </div>
          </div>
        )}
        <p className="welcome-text">{getGreeting()}, Name!</p>
        <p className="date-text">{currentDate}</p>
        <p className="folder-text">{matchingElement?.name}</p>
      </header>
    </>
  );
}

export default HeaderBar;
