import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

import {
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import {
  AdminPanelSettings,
  Group,
  Message,
  NotificationAdd,
  Person,
  Widgets,
} from "@mui/icons-material";
import moment from "moment";
import { DoughnutChart, LineChart } from "../../components/spicific/chart";

const DashBoard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        margin: "2rem 0",
        borderRadius: "1rem",
        bgcolor: "#fff",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <AdminPanelSettings sx={{ fontSize: "2.5rem", color: "#1976d2" }} />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Admin Dashboard
          </Typography>
        </Stack>
        <Typography>{moment().format("dddd ,Do MMMM YYYY")}</Typography>

        {/* Example Form Inputs */}
        <Stack direction="row" spacing={2}>
          <TextField size="small" variant="outlined" placeholder="Search..." />
          <Button variant="contained" color="primary">
            Search
          </Button>
        </Stack>
        <NotificationAdd />
      </Stack>
    </Paper>
  );
  const widgets=<Stack
  direction={
    { xs: "column", sm: "row" }
  }
  justifyContent={"space-between"}
    alignItems={"center"}
    margin={"2rem 0"}
  >
<Widget title={"Users"} value={32} Icon={<Person/>}/>
<Widget title={"Chats"} value={32} Icon={<Group/>}/>
<Widget title={"Messages"} value={322} Icon={<Message/>}/>

  </Stack>

  return (
    <AdminLayout>
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {Appbar}

        <Stack
          direction={"row"}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          flexWrap={"wrap"}
          sx={{ mt: 4 }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              width: "100%",
              maxWidth: "70rem",
              borderRadius: "1rem",
               height: "25rem",
            }}
          >
            <Typography>Last Message</Typography>
       <LineChart/>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              maxWidth: "25rem",
              borderRadius: "1rem",
              height: "25rem",
            }}
          >
           <DoughnutChart/>
            <Stack
              direction="row"
              position={"absolute"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              spacing={"1rem"}
              width={"100%"}
              height={"100%"}
              sx={{ bottom: 10, right: 10 }}
            >
              <Group sx={{ fontSize: "2.5rem", color: "#1976d2" }} />
              <Typography>Vs</Typography>
            </Stack>
          </Paper>
        </Stack>
        {widgets}
      </Container>
    </AdminLayout>
  );
};
const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: 2,
      width: 200,
      borderRadius: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    }}
  >
  
    

    
    <Typography
      sx={{
        fontWeight: "bold",
        fontSize: "1.5rem",
        color: "#1976d2",
        borderRadius:"50%",
        border: `5px solid #1976d2`,
        width: "5rem",
        height: "5rem",
        display: "flex",
        justifyContent: "center",
        
        alignItems: "center",
      }}
    >
      {value}
    </Typography>

<Stack alignItems="center">
      {Icon}
    </Stack>
    <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
      {title}
    </Typography>
  </Paper>
);

export default DashBoard;
