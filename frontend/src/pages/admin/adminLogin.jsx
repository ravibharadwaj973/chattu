import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const AdminLogin = () => {
  const password = useInputValidation("");
  const [isAdmin, setIsAdmin] = useState(false); // Use state

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 25 }}>
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
          Login to Admin Panel
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            required
            label="Secret Password"
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
