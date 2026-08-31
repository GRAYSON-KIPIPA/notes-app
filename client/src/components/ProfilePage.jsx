import React, { useEffect, useState } from "react";
import { getMyProfile } from "../services/authService";
import KilimanjaroMT from "../assets/KilimanjaroMT.jpg";
import profilePicture from "../assets/profilePicture.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const style = {
  py: 0,
  width: "100%",
  maxWidth: 560,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};
function ProfilePage() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleGetProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyProfile();
      setUser(data.user);
    } catch (error) {
      console.error(error);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);
  console.log("USER: ", user);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CircularProgress aria-label="Loading…" />
        </Box>
      </div>
    );
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${KilimanjaroMT})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          width: "100%",
          height: "250px",
          display: "flex",
          justifyContent: "right",
          alignItems: "",
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            margin: 10,
          }}
        >
          <img
            //   alt="GM"
            src={profilePicture}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List sx={style}>
          <ListItem>
            <h3 style={{ textAlign: "center" }}>USER PROFILE</h3>
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <h4 style={{ marginRight: "40px" }}>NAME: </h4>{" "}
            <ListItemText primary={user?.name} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <h4 style={{ marginRight: "40px" }}>EMAIL:</h4>{" "}
            <ListItemText primary={user?.email} />
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <h4 style={{ marginRight: "40px" }}>ROLE: </h4>
            <ListItemText primary={user?.role} />
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default ProfilePage;
