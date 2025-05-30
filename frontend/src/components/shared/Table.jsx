import { Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Table = ({ heading, rows , columns, rowHeight = 52 }) => {
  return (
    <Container sx={{ height: '100vh' }}>
      <Paper
        elevation={3}
        sx={{
          padding: '2rem 4rem',
          margin: 'auto',
          borderRadius: '1rem',
          bgcolor: '#fff',
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }}
      >
        <Typography
          textAlign="center"
          variant="h5"
          sx={{
            marginBottom: '2rem',
            textTransform: 'uppercase',
          }}
        >
          {heading}
        </Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          pageSize={10}
          autoHeight
          sx={{
            border: 'none',
            '& .table-header': {
              backgroundColor: '#1976d2',
              color: '#fff',
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
