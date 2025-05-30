import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Grid container height="calc(95vh)" spacing={1}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{ display: { xs: "none", sm: "block" }, height: "100%" }}
      >
        <Skeleton variant="rectangular" height="100%" />
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          height: "100%",
          bgcolor: "primary.main",
          overflowY: "auto",
          p: 1,
        }}
      >
        <Stack spacing={"1rem"}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height="4rem"
              sx={{ mb: 1, borderRadius: 2 }}
            />
          ))}
        </Stack>
      </Grid>

      {/* Right Panel Skeleton */}
      <Grid
        item
        sm={4}
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", sm: "block" },
          height: "100%",
          bgcolor: "rgba(0,0,0,0.85)",
        }}
      >
        <Skeleton variant="rectangular" height="100%" />
      </Grid>
    </Grid>
  );
};

export default Loader;
