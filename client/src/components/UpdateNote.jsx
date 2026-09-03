import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getNoteById, updateNoteById } from "../services/notesService";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getAllCategories } from "../services/categoryService";
import Button from "@mui/material/Button";

function UpdateNote() {
  const noteId = useParams();
  const id = Number(noteId.id);

  const [categories, setCategories] = React.useState([]);
  const [note, setNote] = useState({});
  const [category_id, setCategory_id] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = React.useState({
    title: "",
    content: "",
    category_id: "",
  });
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  console.log("CATEGORY ID: ", category_id);
  const handleGetNoteById = async () => {
    const data = await getNoteById(id);

    setTitle(data.title);
    setContent(data.title);
    setCategory_id(data.category_id);
    setNote(data);
  };

  const handleChangeCategoryId = (event) => {
    setCategory_id(Number(event.target.value));

    setErrors((prev) => ({
      ...prev,
      category_id: "",
    }));
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);

    setErrors((prev) => ({
      ...prev,
      title: "",
    }));
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);

    setErrors((prev) => ({
      ...prev,
      content: "",
    }));
  };

  const handleGetAllCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleUpdateNoteById = async () => {
    const data = await updateNoteById(title, content, category_id, id);

    navigate("/notes");
  };

  useEffect(() => {
    handleGetNoteById();
    handleGetAllCategories();
  }, []);

  return (
    <div>
      <h4>ADD NOTE</h4>
      <div style={{ margin: 10 }}>
        <div style={{ marginBottom: 20 }}>
          <TextField
            onChange={handleChangeTitle}
            size="small"
            id=""
            value={title}
            required
            error={Boolean(errors.title)}
            helperText={errors.title}
            label="Title"
          />
        </div>
        <div>
          <TextField
            onChange={handleChangeContent}
            size="small"
            id=""
            value={content}
            required
            error={Boolean(errors.content)}
            helperText={errors.content}
            label="Content"
          />
        </div>
        <div>
          <Box sx={{ maxWidth: 220, marginTop: 2, size: "small" }}>
            <FormControl fullWidth error={Boolean(errors.category_id)}>
              <InputLabel size="small" id="demo-simple-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category_id}
                label="Category"
                onChange={handleChangeCategoryId}
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.category_id && (
                <p style={{ color: "red", fontSize: 12, marginLeft: 14 }}>
                  {errors.category_id}
                </p>
              )}
            </FormControl>
          </Box>
        </div>
        <Button
          onClick={handleUpdateNoteById}
          disabled={loading}
          variant="outlined"
        >
          {loading ? <CircularProgress /> : "SUBMIT"}
        </Button>
      </div>
    </div>
  );
}

export default UpdateNote;
