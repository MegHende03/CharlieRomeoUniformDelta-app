import "./SideBar.css";
import { useState, useEffect } from 'react';
import logo from '../../assets/noteLogo.svg';
import edit from '../../assets/editLogo.svg';
import erase from '../../assets/deleteLogo.svg';
import checkmark from '../../assets/checkmark.svg';
import close from '../../assets/closeLogo.svg';
import FormDialog from '../dialog/FormDialog'
import type { Note } from '../../api/noteAPI';
import { ThemeProvider, createTheme } from '@mui/material/styles';

//All noteobook CRUD functions.
import { getNotebooks,
        createNotebook,
        updateNotebook,
        deleteNotebook,
        type Notebook,
}   from "../../api/notebookAPI";

//SideBar.tsx displays all UI elements for the side bar. This includes:
//The app name and logo
//Creating a new note button
//Creating a new notebook button
//All notebooks in a list
//Buttons to edit or delete a notebook

//All CRUD functions go through authenication to verify the user is who they say they are (in the backend).

//Props:
//selectedListItem / setSelectedListItem: Sets and store the ID of the currently selected notebook.
//setNote / note: Sets and stores a new note when the user clicks "+ New note".
//notebook / setNotebook: Sets, Updates, and stores notebooks created by the user.
interface SidebarProps {
    selectedListItem: number | null;
    setSelectedListItem: React.Dispatch<React.SetStateAction<number | null>>;
    setNote: React.Dispatch<React.SetStateAction<Note[]>>;
    note: Note[];
    notebook: Notebook[];
    setNotebook: React.Dispatch<React.SetStateAction<Notebook[]>>;
};

//Specifies any MUI elements as "dark mode"
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



function SideBar({ selectedListItem, setSelectedListItem, setNote, note, notebook, setNotebook} : SidebarProps) {

    const [notebookInputValue, setNotebookInputValue] = useState<string>('');
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    //Read CRUD function. Calls API to fetch notebooks from the database and displays them as a list in the side bar.
    //useEffect -> refereshes the list when a change is made to notebook[] using setNotebook.
    useEffect(() => {
        async function loadNotebooks() {
            try {
                const data = await getNotebooks();
                setNotebook(data);
                } catch (error) {
                console.error("Failed to load notebooks:", error);
                }
        }

        loadNotebooks();
        }, [setNotebook]);

    //Create CRUD function. Calls API to add a new notebook to the database.
    //User is not allowed to enter an empty string as the name.
    const addNotebook = async () => {
        setEditingId(null);

        if (!notebookInputValue.trim()) return;

        try {
            const newNotebook = await createNotebook({
                name: notebookInputValue,
            });

            setNotebook((prev) => [newNotebook, ...prev]);
            setNotebookInputValue("");
            setIsAdding(false);
        } catch (error) {
            console.error("Failed to create notebook:", error);
        }
        };

    //Update CRUD function. Calls the backend API to update a notebooks name.
    //User is not allowed to enter an empty string as the name.
    const handleNameChangeSubmit = async (
        id: number,
        newName: string
        ): Promise<void> => {
        if (!newName.trim()) {
            setEditingId(null);
            setNotebookInputValue("");
            return;
    }

    //wait for a resonse from the backend before continuing 
    try {
        const updatedNotebook = await updateNotebook(id, {
            name: newName,
        });

        setNotebook((prevNotebook) =>
            prevNotebook.map((notebook) =>
                notebook.id === id ? updatedNotebook : notebook
        )
        );

        setEditingId(null);
        setNotebookInputValue("");
    } catch (error) {
        console.error("Failed to update notebook:", error);
    }
    };

    const handleEdit = (id: number, currentName: string) => {
        setIsAdding(false);
        setEditingId(id);
        setNotebookInputValue(currentName);
    };

    //Delete CRUD function. Calls API + allows the user to delete a notebook.
    //If a notebook is deleted. Its removed from the database + all associated notes are deleted.
    const handleDelete = async (id: number) => {
        try {
            await deleteNotebook(id);

            setNotebook((prev) =>
            prev.filter((notebook) => notebook.id !== id)
            );

            setNote((prev) =>
            prev.filter((note) => note.notebookId !== id)
            );

            if (selectedListItem === id) {
            setSelectedListItem(null);
            }
        } catch (error) {
            console.error("Failed to delete notebook:", error);
        }
    };


    return (
        <>
            <aside className="side-bar">
                
                <div className = "logo-title">
                    <img className="logo-img" src={logo} alt="Logo" />
                    <h1>notekeeper</h1>
                </div>

                <ThemeProvider theme={darkTheme}>
                    
                <FormDialog selectedListItem={selectedListItem} setNote={setNote} note={note} />
                
                </ThemeProvider>
                
                <div className="notebook">
                    <label><h2>NOTEBOOKS</h2></label>
                    <button className="plus-btn" onClick={() => setIsAdding(true)}> + </button>
                </div>

                <ul className="notebook-list">

                    {isAdding && 
                    <div className="add-notebook">
                        <input 
                            autoFocus
                            maxLength={15}
                            className="add-notebook-input"
                            type="text"
                            placeholder="New Notebook..."
                            value={notebookInputValue}
                            onChange={(e) => setNotebookInputValue(e.target.value)}
                            onKeyDown={(e) => { 
                                if (e.key === "Enter") {
                                    addNotebook();
                                }
                            }}
                        />
                        {!notebookInputValue.trim() ? 
                        (<button type="submit" onClick={() => setIsAdding(false)} className="checkmark"><img src={close} alt="close" /></button>) : 
                        (<button type="submit" onClick={addNotebook} className="checkmark"><img src={checkmark} alt="checkmark" /></button>)}

                    </div>
                }

                    
                    {notebook.map((notebook) => (
                        <div key={notebook.id}>
                                <li onClick={() => 
                                    setSelectedListItem(notebook.id)}
                                    className={selectedListItem === notebook.id ? "notebook-item-active" : "notebook-item"}>
                                    {(editingId === notebook.id && !isAdding) ? (
                                        <>
                                            <input
                                                autoFocus
                                                key={notebook.id}
                                                maxLength={15}
                                                className="add-notebook-input"
                                                type="text"
                                                placeholder={`${notebook.name}...`}
                                                value={notebookInputValue}
                                                onChange={(e) => setNotebookInputValue(e.target.value)} 
                                                onKeyDown={(e) => { 
                                                    if (e.key === "Enter") {
                                                        handleNameChangeSubmit(notebook.id, notebookInputValue);
                                                    }
                                                }}
                                            />
                                    
                                            {!notebookInputValue.trim() ? (<button type="submit" onClick={() => handleNameChangeSubmit(notebook.id, notebookInputValue)} className="checkmark">
                                                <img src={close} alt="close" /></button>) :
                                                (<button type="submit" onClick={() => handleNameChangeSubmit(notebook.id, notebookInputValue)} className="checkmark">
                                                    <img src={checkmark} alt="checkmark" /></button>)
                                            }
                                        </>
                                    ) : (
                                        <>
                                            {notebook.name}
                                            <button className="edit-btn" onClick={(e) => {e.stopPropagation();
                                                handleEdit(notebook.id, notebook.name);}}><img src={edit} alt="edit button" /></button>
                                            <button className="delete-btn" onClick={(e) => {e.stopPropagation();
                                                handleDelete(notebook.id);
                                                }}><img src={erase} alt="edit button" /></button>
                                        </>
                                    )}   
                                </li>
                    
                        </div>    
                    ))}

                </ul>
 

            </aside>
            
        </>
    );
}

export default SideBar;