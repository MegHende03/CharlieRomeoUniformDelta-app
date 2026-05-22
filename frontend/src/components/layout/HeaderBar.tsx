import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import type { Notebook } from '../../pages/HomePage';
import "./HeaderBar.css";
import { useState } from "react";
import { Link } from 'react-router-dom';


type HeaderBarProps ={
  notebook: Notebook[];
  selectedListItem: number | null;
};


function HeaderBar( {notebook, selectedListItem} : HeaderBarProps) {

const matchingElement = notebook.find(item => item.id === selectedListItem);
const [buttonPressed, isButtonPressed] = useState(false);

  return (
    <>
      <header className="header-bar">
        <nav>
          <Link className="sign-up-btn" to="/signin">Log In</Link>
        </nav>
        <div className="theme-icon">
          <FontAwesomeIcon icon={faPalette} size="lg" onClick={()=> {
            if(buttonPressed) isButtonPressed(false);
            if(!buttonPressed)isButtonPressed(true);
            }}/>
        </div>
        {buttonPressed &&
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
        }
        <p className="welcome-text">Good Morning</p>
        <p className="date-text">Thu, Oct 05 2023</p>
        <p className="folder-text">{matchingElement?.name}</p>
      </header>
    </>
  );
}

export default HeaderBar;
