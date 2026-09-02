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
