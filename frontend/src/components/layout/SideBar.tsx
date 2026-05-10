import '../../styles/SideBar.css';
import { useState } from 'react';
import Modal from 'react-modal';

function SideBar() {

    const [notebook, setNotebook] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
    const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // 3. Create a NEW array with the existing items plus the new one
      setNotebook(prevItems => [...prevItems, inputValue]);
      setInputValue(''); // Reset input field
      setOpenModal(false);
    }
  };

    function setIsOpen() {
        setOpenModal(true);
    }

    function setCloseModal() {
        setOpenModal(false);
    }
    

    return (
        <>
            <aside className="side-bar">
                <h2>Side Bar Header!</h2>
                <button className="new-note-btn"><span className="plus">+</span>
                 New note</button>
                <div className="notebook">
                    <label>NOTEBOOKS</label>
                    <button className="plus-btn" onClick={setIsOpen}> + </button>
                </div>

                <Modal isOpen={openModal}
                    style={{
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(223, 145, 164, 0.75)'
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
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Add a Notebook..."
                        />
                        <button type="submit">Add to list</button>
                        <button className="close-modal" onClick={setCloseModal}> X </button>
                    
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