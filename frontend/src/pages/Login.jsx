import React, { useRef, useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Box,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyleComponents";
import { useFileHandler, useInputValidation } from "6pp";
import { usernameValidator } from "../lib/validator";

function Login() {
  const [login, setLogin] = useState(true);

  
  const fileInputRef = useRef();

 

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const password = useInputValidation('');
  const username = useInputValidation("", usernameValidator);
  const avatar=useFileHandler('single')

  const handleToggle = () => {
    setLogin(!login);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${login ? "Logging in" : "Registering"}...`);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {login ? "Login" : "Register"}
        </Typography>

        <Stack position="relative" width="10rem" margin="auto">
          <Avatar
            src={avatar.preview}
            sx={{
              width: "10rem",
              height: "10rem",
              objectFit: "cover",
            }}
          />
           {avatar.error && (
                <Typography color="error" variant="caption">
                  {avatar.error}
                </Typography>
              )}
          <IconButton
            sx={{ position: "absolute", bottom: 0, right: 0 }}
            onClick={() => fileInputRef.current.click()}
          >
            <CameraAltIcon />
          </IconButton>
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={avatar.changeHandler}
          />
        </Stack>
        <form component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            required
            label="Name"
            margin="normal"
            fullWidth
            variant="outlined"
            value={name.value}
            onChange={name.changeHandler}
          />
          <TextField
            required
            label="Password"
            type="password"
            margin="normal"
            fullWidth
            variant="outlined"
            value={password.value}
            onChange={password.changeHandler}
          />
           {password.error && (
                <Typography color="error" variant="caption">
                  {password.error}
                </Typography>
              )}

          {!login && (
            <>
              <TextField
                required
                label="Username"
                margin="normal"
                fullWidth
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />

              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )}
              <TextField
                required
                label="Bio"
                margin="normal"
                fullWidth
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              />
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {login ? "Login" : "Register"}
          </Button>

          <Typography sx={{ mt: 2, textAlign: "center" }}>or</Typography>

          <Button onClick={handleToggle} fullWidth sx={{ mt: 1 }}>
            {login ? "Go to Register" : "Go to Login"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
