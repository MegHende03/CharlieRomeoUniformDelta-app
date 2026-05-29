import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "./FormDialog.css";
import type { Note } from "../../api/noteAPI";
import { createNote } from "../../api/noteAPI";
import save from "../../assets/saveLogo.svg"
import close from "../../assets/closeLogo.svg"

//Pop-up MUI dialog modal for entering the title and contents of a new note when "+ New Note" button is clicked. 
//This form modal takes the selected notebook and associates the desired note with it.
//If a notebook is not selected, an alert message is desplayed to select one. Notes will not be added without selecting a notebook first.

//Props: 
// SelectedListItem -> takes currently selected notebook.
// setNote -> useState array that allows new notes to be added.
// Note -> Array of Note objects.
type FormProps = {
  selectedListItem: number | null;
  setNote: React.Dispatch<React.SetStateAction<Note[]>>;
  note: Note[];
};

function FormDialog({selectedListItem, setNote, note} : FormProps) {
 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (selectedListItem === null) return;

  const formData = new FormData(event.currentTarget);

  //Turns entered form dialog into a JSON object.
  const formJson = Object.fromEntries(formData.entries()) as {
    title: string;
    content: string;
  };

  //Calls createNote API + authenticates the user.
  //Adds Note to the database + expects a response
  try {
    const newNote = await createNote(selectedListItem, {
      title: formJson.title,
      content: formJson.content,
    });

    //Adds the note to the note state array.
    setNote((prev) => [...prev, newNote]);

    handleClose();
  } catch (error) {
    console.error("Failed to create note:", error); //if error occurs
  }
};


  //UI
  return (
    <>
      <button className="new-note-btn" onClick={handleClickOpen}><span className="plus">+</span>
                 New note</button>
      <Dialog
          fullWidth
          maxWidth="lg"
          open={open}
          onClose={handleClose}

          sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'rgb(18, 13, 13) !important',
            backgroundImage: 'none',
            color: 'white',

            border: '1px solid #33cc9966',

            borderRadius: '18px',

            boxShadow: '0px 10px 40px rgba(0,0,0,0.6)',
            },

            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.57)',
              backdropFilter: 'blur(3px)',
            },
          }}
        >
        <DialogTitle className="dialog-title">New Note:</DialogTitle>
        {!selectedListItem &&
            <p className='alert'> ⚠︎ Please select a Notebook before making a note!</p>} 
        <DialogContent>
        
          <form onSubmit={handleSubmit} id="note-form">
          <TextField
            required
            margin="dense"
            id="title"
            name="title"
            label="Title..."
            type="text"
            fullWidth
            variant="outlined"

            slotProps={{
              htmlInput: {
                maxLength: 30,
              },
            }}

            sx={{
              mt: 2,

              '& .MuiOutlinedInput-root': {
                color: 'white',

                '& fieldset': {
                  borderColor: '#33cc9966',
                },

                '&:hover fieldset': {
                  borderColor: '#33cc99',
                },

                '&.Mui-focused fieldset': {
                  borderColor: '#ce7a1a',
                  borderWidth: '2px',
                },

                '&.Mui-focused': {
                  boxShadow: '0 0 8px rgba(206,122,26,0.45)',
                },
              },

              '& .MuiInputLabel-root': {
                color: '#33cc99',
              },

              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ce7a1a',
              },

              '& input': {
                color: 'white',
                caretColor: '#ce7a1a',
              },
            }}
          />
            
          <TextField
            multiline
            className='note-input'
            required
            margin="dense"
            id="content"
            name="content"
            label="Enter a note..."
            type="text"
            rows={15}
            fullWidth
            variant="outlined"

            sx={{
              mt: 3,

              '& .MuiOutlinedInput-root': {
                color: 'white',

                '& fieldset': {
                  borderColor: '#33cc9966',
                },

                '&:hover fieldset': {
                  borderColor: '#33cc99',
                },

                '&.Mui-focused fieldset': {
                  borderColor: '#ce7a1a',
                  borderWidth: '2px',
                },

                '&.Mui-focused': {
                  boxShadow: '0 0 8px rgba(206,122,26,0.45)',
                },
              },

              '& .MuiInputLabel-root': {
                color: '#33cc99',
              },

              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ce7a1a',
              },

              '& textarea': {
                color: 'white',
                caretColor: '#ce7a1a',
              },
            }}
          />
          </form>

        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'flex-end',
            padding: '16px 24px 20px 24px',
          }}
        >
          <Button
            onClick={handleClose}

            sx={{
             
              minWidth: 0,
              width: 40,
              height: 40,

              borderRadius: '10px',
              padding: 0,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',


              '&:hover': {
                backgroundColor: 'rgba(51,204,153,0.09)',
              },

              '& img': {
                width: 30,
                height: 40,
              },
            }}
          >
            <img src={close} alt="close" />
          </Button>

          <Button
            type="submit"
            form="note-form"
            variant="contained"

            sx={{
              minWidth: 0,
              padding: '8px',
              border: 'none',
              borderRadius: '10px',
              background: 'none',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'rgb(185, 109, 22, 0.5)',
                boxShadow: 'none'
              },

              '& img': {
                width: 22,
                height: 22,
              },
            }}
          >
            <img src={save} alt="save" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormDialog;