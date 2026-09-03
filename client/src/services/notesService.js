import api from "./api";

export const getAllNotes = async () => {
  const response = await api.get("/notes");

  return response.data;
};

export const addNote = async (title, content, category_id) => {
  const response = await api.post("/notes", {
    title,
    content,
    category_id,
  });

  return response.data;
};

export const getNoteById = async (id) => {
  const response = await api.get(`/notes/${id}`);

  return response.data;
};

export const updateNoteById = async (title, content, category_id, id) => {
  const response = await api.put(`/notes/${id}`, {
    title,
    content,
    category_id,
  });

  return response.data;
};
