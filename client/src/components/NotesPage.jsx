import React, { useEffect, useState } from "react";
import { deleteNoteById, getAllNotes } from "../services/notesService";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAllCategories } from "../services/categoryService";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function NotesPage() {
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalNotes, setTotalNotes] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [category_id, setCategory_id] = useState("");

  const handleClickOpen = (id) => {
    setSelectedNoteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNoteId(null);
  };

  const handleGetAllNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllNotes(page, limit, search, category_id);
      setNotes(data.notes);
      setTotalNotes(data.totalNotes);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNoteById = async (id) => {
    try {
      await deleteNoteById(id);
      handleClose();
      await handleGetAllNotes();
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to delete note");
    }
  };

  //Fetch all categories
  const handleGetAllCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  //Select CategoryId
  const handleSelectCategory = (e) => {
    setCategory_id(e.target.value);
    setPage(1);
  };

  //Function for searching
  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };
  useEffect(() => {
    handleGetAllNotes();
    handleGetAllCategories();
  }, [page, search, category_id]);

  const handleEditNote = (id) => {
    navigate(`/update-note/${id}`);
  };

  return (
    <div>
      <h4>NOTES</h4>

      <Box sx={{ display: "flex" }}>
        <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog"
          >
            <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
            <DialogContent>
              <DialogContentText
                style={{ color: "red" }}
                id="alert-dialog-description"
              >
                Are You sure want to delete a note?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                size="small"
                style={{ color: "green" }}
                onClick={handleClose}
                autoFocus
              >
                Disagree
              </Button>
              <Button
                size="small"
                variant="outlined"
                style={{ color: "red" }}
                onClick={() => {
                  handleDeleteNoteById(selectedNoteId);
                }}
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
        <div>{loading && <CircularProgress />}</div>
        <div>{error && error}</div>
        <div>
          {!loading && !error && notes.length === 0 && (
            <p>You don't have any notes yet.</p>
          )}
        </div>
      </Box>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
        <button
          style={{ marginLeft: 8 }}
          onClick={() => {
            setSearchInput("");
            setSearch("");
            setPage(1);
          }}
        >
          Clear
        </button>
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <FormHelperText>Filter by category name</FormHelperText>
          <Select
            size="small"
            value={category_id}
            onChange={handleSelectCategory}
            displayEmpty
            inputProps={{ "aria-label": "Age" }}
          >
            <MenuItem value="">All categories</MenuItem>

            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: 752,
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">S/N</StyledTableCell>
                <StyledTableCell align="center">Title</StyledTableCell>
                <StyledTableCell align="center">Content</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Owner</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.content}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.category}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.owner}</StyledTableCell>

                  <StyledTableCell align="center">
                    <div style={{ display: "flex" }}>
                      <div>
                        <button
                          onClick={() => handleEditNote(row.id)}
                          size="small"
                          variant="outlined"
                          style={{
                            backgroundColor: "lightpink",
                            borderRadius: 6,
                          }}
                        >
                          edit
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => handleClickOpen(row.id)}
                          size="small"
                          variant="outlined"
                          style={{
                            backgroundColor: "red",
                            borderRadius: 6,
                          }}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <div>
        <Stack spacing={2}>
          <Pagination
            onChange={(e, p) => setPage(p)}
            count={totalPages}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
}

export default NotesPage;
