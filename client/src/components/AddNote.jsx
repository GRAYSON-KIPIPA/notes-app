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

function AddNote() {
  const [categories, setCategories] = React.useState([]);
  const [category_id, setCategory_id] = React.useState();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleChangeCategoryId = (event) => {
    setCategory_id(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleGetAllCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleAddNote = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await addNote(title, content, category_id);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "Login failed. Please try again",
      );
    }
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  console.log("CATEGORY ID: ", category_id);

  return (
    <div>
      <h4>ADD NOTE</h4>
      <div style={{ margin: 10 }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ marginBottom: 20 }}>
          <TextField
            onChange={handleChangeTitle}
            size="small"
            id=""
            label="Title"
            // defaultValue="Hello World"
          />
        </div>
        <div>
          <TextField
            onChange={handleChangeContent}
            size="small"
            id=""
            label="Content"
            // defaultValue="Hello World"
          />
        </div>
        <div>
          <Box sx={{ maxWidth: 220, marginTop: 2, size: "small" }}>
            <FormControl fullWidth>
              <InputLabel size="small" id="demo-simple-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category_id}
                label="Category"
                onChange={handleChangeCategoryId}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <Button onClick={handleAddNote}>
          {loading ? <CircularProgress /> : "SUBMIT"}
        </Button>
      </div>
    </div>
  );
}

export default AddNote;
