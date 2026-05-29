import  axiosClient  from './axiosClient';

//Same thing as NotebookResponse. Better syntax for frontend rather than NotebookResponse + seperates UI from API functions.
export type Notebook = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

//NotebookRequest -> follows backend requirements
export type NotebookRequest ={
    name: String;
};

//NotebookResponse -> follows backend requirements
export type NotebookResponse = {
    id: number;
    name: String;
    createdAt: string;
    updatedAt: string;
}

//when post API endpoint is hit -> send request to backend + promise a response.
//HTTP post request for creating a new notebook
export async function createNotebook(
  request: NotebookRequest
): Promise<Notebook> {
  const response = await axiosClient.post<Notebook>(
    "/notebooks",
    request
  );

  return response.data;
}

//HTTP get request to retrieve an array response of all notebooks
export async function getNotebooks(): Promise<Notebook[]> {
  const response = await axiosClient.get<Notebook[]>("/notebooks");

  return response.data;
}

//HTTP put response to update the name of a notebook + saves changes to the database.
//Promises a response of the updated notebook
export async function updateNotebook(
  id: number,
  request: NotebookRequest
): Promise<Notebook> {
  const response = await axiosClient.put<Notebook>(
    `/notebooks/${id}`,
    request
  );

  return response.data;
}

//HTTP delete request -> deletes a notebook from the database.
export async function deleteNotebook(id: number): Promise<void> {
  await axiosClient.delete(`/notebooks/${id}`);
}