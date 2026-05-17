import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

import "./HeaderBar.css";
function HeaderBar() {
  return (
    <>
      <header className="header-bar">

        <div className="theme-icon">
          <FontAwesomeIcon icon={faPalette} size="lg" />
        </div>
        <p className="welcome-text">Good Morning</p>
        <p className="date-text">Thu, Oct 05 2023</p>
        <p className="folder-text">JavaScript guide</p>
      </header>
    </>
  );
}

export default HeaderBar;
