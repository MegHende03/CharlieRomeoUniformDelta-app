import  axiosClient  from './axiosClient';


//NoteResponse, matches backend NoteReponse requirements.
export type Note = {
  id: number;
  title: string;
  content: string;
  notebookId: number;
  createdAt: string;
  updatedAt: string;
};

//Request matches backend NoteRequest.
export type NoteRequest = {
    title: String;
    content: String;
}

//HTTP post request to create a new note when endpoint is hit.
//takes arguments required in backend + Promises a response + returns response.
export async function createNote (
    notebookId: number,
    request: NoteRequest
): Promise<Note> {
    const response = await axiosClient.post<Note>(`/notebooks/${notebookId}/notes`,
    request);

    return response.data;
}

//HTTP get request. Request all notes correlating to notebookId when endpoint is hit.
//Promises a response, returns a array of NoteResponses.
export async function getNotesByNotebook(notebookId: number | null)
    :Promise<Note[]> {
        const response = await axiosClient.get<Note[]>(`/notebooks/${notebookId}/notes`);

    return response.data;
}

//HTTP get request. Requests Note data of a single note when endpoint is hit.
//Promises a NoteResponse for that note.
export async function getNote(noteId: number): Promise<Note> {
    const response = await axiosClient.get<Note>(`/notes/${noteId}`);

    return response.data;
}

//HTTP put request. Updates a note and saves the changes to the database
//takes in same arguments as backend and promises a NoteReponse of the updated note.
export async function updateNote(
    noteId: number,
    request: NoteRequest): Promise<Note> {
        const response = await axiosClient.put<Note>(`/notes/${noteId}`, request);

        return response.data;
    }

//HTTP delete request.
//Deletes a note from the database.
export async function deleteNote(noteId: number): Promise<void> {
    await axiosClient.delete(`notes/${noteId}`);
}