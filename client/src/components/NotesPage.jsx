import React, { useEffect, useState } from "react";
import { getAllNotes } from "../services/notesService";
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

  const handleGetAllNote = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllNotes();
      setNotes(data.notes);
      // console.log("Notes: ", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllNote();
  }, []);
  console.log("NOTES: ", notes);
  return (
    <div>
      <h4>NOTES</h4>
      <Box sx={{ display: "flex" }}>
        <div>{loading && <CircularProgress />}</div>
        <div>{error && error}</div>
        <div>
          {!loading && !error && notes.length === 0 && (
            <p>You don't have any notes yet.</p>
          )}
        </div>
      </Box>
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
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default NotesPage;
