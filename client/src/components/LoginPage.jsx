import React, { useState } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginUser } from "../services/authService";
import CircularProgress from "@mui/material/CircularProgress";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);

      navigate("/notes");
    } catch (error) {
      console.error("LOGIN ERROR: ", error);

      setError(
        error.response?.data?.message || "Login failed. Please try again",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <Box
          component="section"
          sx={{
            border: "1px solid grey",
            width: "30%",
            borderRadius: 5,
            borderColor: "blue",
            backgroundColor: `rgb(240, 240, 240)`,
            padding: "24px",
            minWidth: 500,
            marginTop: "100px",
          }}
        >
          <div>
            <h2 style={{ textAlign: "center" }}>Login Form</h2>
            <div>
              <div style={{ marginBottom: "32px" }}>
                <TextField
                  style={{}}
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  size="small"
                  variant="outlined"
                  onChange={handleChangeEmail}
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Password"
                  type="password"
                  size="small"
                  variant="outlined"
                  onChange={handleChangePassword}
                />
              </div>
            </div>
            <div style={{ margin: 5 }}>
              <Button
                disabled={loading}
                variant="outlined"
                onClick={handleLogin}
              >
                {loading ? <CircularProgress /> : "Login"}
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default LoginPage;
