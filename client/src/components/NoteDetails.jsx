import React, { useEffect, useState } from "react";
import { deleteNoteById, getNoteById } from "../services/notesService";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";

function NoteDetails() {
  const [note, setNote] = useState({});
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const noteId = useParams();
  const id = Number(noteId.id);

  console.log("NOTE: ", note);

  const handleGetNoteById = async () => {
    const data = await getNoteById(id);

    setNote(data);
  };

  const handleDeleteNoteById = async () => {
    try {
      await deleteNoteById(note.id);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  useEffect(() => {
    handleGetNoteById();
  }, [id]);

  console.log("SUCCESS", success);

  if (success) {
    return (
      <div>
        <Alert>Note deleted successfully</Alert>
        <Button onClick={() => navigate("/notes")}>Back</Button>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <div>
        <h3 style={{ color: "blue" }}>NOTE DETAILS</h3>
        <Card sx={{ maxWidth: 600, minWidth: 500, marginTop: 2 }}>
          <CardActionArea>
            <CardContent>
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    By
                  </Typography>{" "}
                  <Typography
                    style={{ marginLeft: 10 }}
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    {note?.owner_email}
                  </Typography>
                </div>
                <Divider />
              </div>

              <div>
                <Typography gutterBottom variant="h6" component="div">
                  Title
                </Typography>{" "}
                <Typography
                  style={{ marginLeft: 10 }}
                  gutterBottom
                  variant="p"
                  component="div"
                >
                  {note?.title}
                </Typography>
                <Divider />
              </div>
              <div>
                <Typography gutterBottom variant="h6" component="div">
                  Content
                </Typography>{" "}
                <Typography
                  style={{ marginLeft: 64 }}
                  gutterBottom
                  variant="p"
                  component="div"
                >
                  {note?.content}
                </Typography>
                <Divider />
              </div>
              <div>
                <Typography gutterBottom variant="h6" component="div">
                  Category
                </Typography>{" "}
                <Typography
                  style={{ marginLeft: 64 }}
                  gutterBottom
                  variant="p"
                  component="div"
                >
                  {note?.category}
                </Typography>
                <Divider />
              </div>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                onClick={() => navigate(-1)}
                variant="outlined"
                size="small"
                color="primary"
              >
                Back
              </Button>
              <Button
                onClick={() => navigate(`/update-note/${note.id}`)}
                variant="outlined"
                size="small"
                color="yellow"
              >
                UPDATE
              </Button>
              <Button
                onClick={handleDeleteNoteById}
                variant="outlined"
                size="small"
                color="error"
              >
                DELETE
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default NoteDetails;
