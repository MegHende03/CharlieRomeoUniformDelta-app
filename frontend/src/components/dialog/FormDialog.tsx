import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import "./FormDialog.css";

function FormDialog( {notebookId} : any ) {
 
  type Note = {
        id: number;
        title: string;
        content: string;
        notebookId: number;
    }
  
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = useState<Note[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      notebookId: notebookId };
    
    setNote((prev) => [...prev, newNote]);
    
      console.log(newNote);
      handleClose();
  };

  return (
    <>
      <button className="new-note-btn" onClick={handleClickOpen}><span className="plus">+</span>
                 New note</button>
      <Dialog  fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title">New Note:</DialogTitle>
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
              rows={10}
              
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