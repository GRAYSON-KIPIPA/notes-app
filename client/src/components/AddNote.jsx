import React, { useEffect } from "react";
import { getAllCategories } from "../services/categoryService";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addNote } from "../services/notesService";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";

function AddNote() {
  const [categories, setCategories] = React.useState([]);
  const [category_id, setCategory_id] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [errors, setErrors] = React.useState({
    title: "",
    content: "",
    category_id: "",
  });
  const navigate = useNavigate();

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

  const handleAddNote = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);
      setError("");
      await addNote(title, content, category_id);

      setCategory_id("");
      setTitle("");
      setContent("");
      navigate("/notes");
    } catch (error) {
      console.error(error);

      const serverErrors = error.response?.data?.errors;

      if (serverErrors) {
        const newErrors = {
          title: "",
          content: "",
          category_id: "",
        };

        serverErrors.forEach((err) => {
          newErrors[err.path] = err.msg;
        });

        setErrors(newErrors);
      } else {
        setError(error.response?.data?.message || "Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  return (
    <div>
      <h4>ADD NOTE</h4>
      <div
        style={{
          margin: 10,
          minWidth: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            border: "solid",
            borderRadius: 10,
            borderColor: "aqua",
            padding: 64,
          }}
        >
          <div style={{ marginBottom: 20, minWidth: 500 }}>
            <TextField
              fullWidth
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
              fullWidth
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
            <Box
              sx={{
                maxWidth: 6000,
                minWidth: 500,
                marginTop: 2,
                size: "small",
              }}
            >
              <FormControl fullWidth error={Boolean(errors.category_id)}>
                <InputLabel size="small" id="demo-simple-select-label">
                  Select Category
                </InputLabel>
                <Select
                  fullWidth
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
          <div style={{ marginTop: 10 }}>
            <Button
              style={{
                backgroundColor: "aqua",
                color: "indigo",
                fontSize: "16px",
              }}
              size="xl"
              disabled={loading}
              variant="outlined"
              onClick={handleAddNote}
            >
              {loading ? <CircularProgress /> : "SUBMIT"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
