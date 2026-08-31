import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginUser } from "../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("LOGIN ERROR: ", error);
    }
  };

  const handleGetAllNotes = async () => {
    try {
      const data = await getAllNotes();
      console.log("NOTES: ", data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h3>LOGIN PAGE</h3>

      <Box
        component="section"
        sx={{ p: 2, border: "1px dashed grey", width: "30%", borderRadius: 5 }}
      >
        <h4>Login Form</h4>
        <div>
          <div style={{ marginBottom: 10 }}>
            <TextField
              id="outlined-basic"
              label="Email"
              size="small"
              variant="outlined"
              onChange={handleChangeEmail}
            />
          </div>
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            size="small"
            variant="outlined"
            onChange={handleChangePassword}
          />
        </div>
        <div style={{ margin: 5 }}>
          <Button variant="outlined" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default LoginPage;
