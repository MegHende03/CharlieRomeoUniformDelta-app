import "./SideBar.css";
import { useState } from 'react';
import Modal from 'react-modal';

function SideBar() {

    const [notebook, setNotebook] = useState<string[]>([]);
    const [notebookInputValue, setNotebookInputValue] = useState<string>('');
    const [isAddNotebookOpen, setIsAddNotebookOpen] = useState(false);
    const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

    const handleNotebookInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotebookInputValue(e.target.value);
  };
    const handleNotebookSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (notebookInputValue.trim()) {
      setNotebook(prevItems => [...prevItems, notebookInputValue]);
      setNotebookInputValue(''); // Reset input field
      setIsAddNotebookOpen(false);
    }
  };

    const setAddNotebookClosed = () => {setIsAddNotebookOpen(false);};
    const setAddNotebookOpen = () => {setIsAddNotebookOpen(true);};
    const setAddNoteOpen = () => {setIsAddNoteOpen(true);};
    const setAddNoteClosed = () => {setIsAddNoteOpen(false);};

    return (
        <>
            <aside className="side-bar">
                <h2>Side Bar Header!</h2>
                <button className="new-note-btn" onClick={setAddNoteOpen}><span className="plus">+</span>
                 New note</button>

                 <Modal isOpen={isAddNoteOpen}
                    style={{
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(46, 45, 45, 0.75)'
                        },
                        content: {
                            position: 'absolute',
                            top: '100px',
                            left: '500px',
                            right: '500px',
                            bottom: '100px',
                            border: '1px solid #070303',
                            background: '#1b1919',
                            overflow: 'auto',
                            borderRadius: '20px',
                            outline: 'none',
                            padding: '20px',
                            boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.5)'
                        }
                    }}
                >
                    <label>
                        Write a note:
                    <textarea className="add-note" placeholder="Enter a note..." />
                    </label>

                    <button onClick={setAddNoteClosed}>Close</button>
                </Modal>


                <div className="notebook">
                    <label>NOTEBOOKS</label>
                    <button className="plus-btn" onClick={setAddNotebookOpen}> + </button>
                </div>

                <Modal isOpen={isAddNotebookOpen}
                    style={{
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(49, 49, 49, 0.75)'
                        },
                        content: {
                            position: 'absolute',
                            top: '300px',
                            left: '600px',
                            right: '600px',
                            bottom: '300px',
                            border: '1px solid #070303',
                            background: '#423232',
                            overflow: 'auto',
                            borderRadius: '20px',
                            outline: 'none',
                            padding: '20px',
                            boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.5)'
                        }
                    }}
                >
                    <h2>Enter input:</h2>
                    <form onSubmit={handleNotebookSubmit}>
                        <input
                            type="text"
                            value={notebookInputValue}
                            onChange={handleNotebookInputChange}
                            placeholder="Add a Notebook..."
                        />
                        <button type="submit">Add to list</button>
                        <button className="close-modal" onClick={setAddNotebookClosed}> X </button>
                    
                    </form>
                </Modal>

                <ul className="notebook-list">
                    {notebook.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

            </aside>
            
        </>
    );
}

export default SideBar;