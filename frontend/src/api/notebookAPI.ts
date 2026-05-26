import  axiosClient  from './axiosClient';

export type Notebook = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type NotebookRequest ={
    name: String;
};

export type NotebookResponse = {
    id: number;
    name: String;
    createdAt: string;
    updatedAt: string;
}

export async function createNotebook(
  request: NotebookRequest
): Promise<Notebook> {
  const response = await axiosClient.post<Notebook>(
    "/notebooks",
    request
  );

  return response.data;
}

export async function getNotebooks(): Promise<Notebook[]> {
  const response = await axiosClient.get<Notebook[]>("/notebooks");

  return response.data;
}


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


export async function deleteNotebook(id: number): Promise<void> {
  await axiosClient.delete(`/notebooks/${id}`);
}