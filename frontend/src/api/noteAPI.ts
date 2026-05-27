import  axiosClient  from './axiosClient';


//NoteResponse
export type Note = {
  id: number;
  title: string;
  content: string;
  notebookId: number;
  createdAt: string;
  updatedAt: string;
};


export type NoteRequest = {
    title: String;
    content: String;
}

export async function createNote (
    notebookId: number,
    request: NoteRequest
): Promise<Note> {
    const response = await axiosClient.post<Note>(`/notebooks/${notebookId}/notes`,
    request);

    return response.data;
}

export async function getNotesByNotebook(notebookId: number | null)
    :Promise<Note[]> {
        const response = await axiosClient.get<Note[]>(`/notebooks/${notebookId}/notes`);

    return response.data;
}

//what do we not have request as a parameter?
export async function getNote(noteId: number): Promise<Note> {
    const response = await axiosClient.get<Note>(`/notes/${noteId}`);

    return response.data;
}

export async function updateNote(
    noteId: number,
    request: NoteRequest): Promise<Note> {
        const response = await axiosClient.put<Note>(`/notes/${noteId}`, request);

        return response.data;
    }

export async function deleteNote(noteId: number): Promise<void> {
    await axiosClient.delete(`notes/${noteId}`);
}