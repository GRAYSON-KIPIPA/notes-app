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
import CircularProgress from "@mui/material/CircularProgress";

function UpdateNote() {
  const noteId = useParams();
  const id = Number(noteId.id);

  const [categories, setCategories] = React.useState([]);
  const [category_id, setCategory_id] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = React.useState({
    title: "",
    content: "",
    category_id: "",
  });
  const [error, setError] = useState("");

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const handleGetNoteById = async () => {
    const data = await getNoteById(id);

    setTitle(data.title);
    setContent(data.content);
    setCategory_id(data.category_id);
  };

  const validateForm = () => {
    const newErrors = {
      title: "",
      content: "",
      category_id: "",
    };

    let isValid = true;

    if (!title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (title.trim().length < 2) {
      newErrors.title = "Title must have at least 2 characters";
      isValid = false;
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
      isValid = false;
    } else if (content.trim().length < 2) {
      newErrors.content = "Content must have at least 2 characters";
      isValid = false;
    }

    if (!category_id) {
      newErrors.category_id = "Please select a category";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
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
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await updateNoteById(title, content, category_id, id);

      navigate("/notes");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetNoteById();
    handleGetAllCategories();
  }, []);

  return (
    <div>
      <h4>UPDATE NOTE</h4>
      <div style={{ margin: 10 }}>
        <div style={{ marginBottom: 20 }}>
          <div>{error && <p>{error}</p>}</div>
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
