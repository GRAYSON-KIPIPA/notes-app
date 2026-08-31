import api from "./api";

export const getAllNotes = async () => {
  const response = await api.get("/notes");

  return response.data;
};
