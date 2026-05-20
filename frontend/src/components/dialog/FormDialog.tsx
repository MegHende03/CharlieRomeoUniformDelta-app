import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "./FormDialog.css";
import type { Note } from '../../pages/HomePage';

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

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!selectedListItem) return;
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries()) as {
      title: string;
      content: string;
    };

    const title = formJson.title;
    const content = formJson.content;

    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
      notebookId: selectedListItem };
    
      setNote((prev) => [...prev, newNote]);
  

      handleClose();
  };

   React.useEffect(() => {
        console.log(note);
      }, [note]);

  return (
    <>
      <button className="new-note-btn" onClick={handleClickOpen}><span className="plus">+</span>
                 New note</button>
      <Dialog  fullWidth maxWidth="sm" open={open} onClose={handleClose}>
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
              variant="standard"
              slotProps={{
                htmlInput: {
                  maxLength: 30,
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
              maxRows={10}
            />
          </form>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="note-form">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormDialog;