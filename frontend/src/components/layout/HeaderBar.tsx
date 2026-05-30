import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import type { Notebook } from "../../pages/HomePage";
import "./HeaderBar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

//HeaderBar.tsx contains all the header bar contents for the home page.

//Displays: 
//Good Morning, Afternoon, or Evening depending on the users local time + their name.
//The current date (Day, Month, Year).
//Log Out button -> redirects to log in page.

//Props:
//notebook: an array of notebook objects
//selectedListItem: The currently selected notebook
type HeaderBarProps = {
  notebook: Notebook[];
  selectedListItem: number | null;
};

function HeaderBar({ notebook, selectedListItem }: HeaderBarProps) {

  //Displays the current date of the user
  const getFormattedDate = () => {
    const date = new Date();

    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.toLocaleDateString("en-US", { day: "2-digit" });
    const year = date.getFullYear();

    return `${weekday}, ${month} ${day} ${year}`;
  };

  const currentDate = getFormattedDate();
  const navigate = useNavigate();

  const { authUser, logoutUser } = useAuth();

  const matchingElement = notebook.find((item) => item.id === selectedListItem);
  const [buttonPressed, isButtonPressed] = useState(false);

  // Determine greeting based on local time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
      return "Good Morning,";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon,";
    } else {
      return "Good Evening,";
    }
  };

  //If the user logs out -> page is redirected to the log in page.
  const handleLogout = () => {
    logoutUser();

    navigate("/login");
  }


  return (
    <>
      <header className="header-bar">
        <nav>
          {!authUser ? (
            <Link className="sign-up-btn" to="/login">
              Log In
            </Link>
          ) : (
            <button className="sign-up-btn" onClick={() => handleLogout()}>
              Log Out
            </button>
          )}
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
        <p className="welcome-text">
          {getGreeting()} {authUser?.fullname ?? ""}!
        </p>
        <p className="date-text">{currentDate}</p>
        <p className="notebook-text">{matchingElement?.name}</p>
      </header>
    </>
  );
}

export default HeaderBar;
