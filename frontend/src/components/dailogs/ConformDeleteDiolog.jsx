import { Dialog } from '@mui/material'
import React from 'react'

function ConformDeleteDiolog({open ,handleClose, handleDelete}) {
  return (
    <Dialog open={open} onClose={handleClose}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Are you sure you want to delete this member?</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button onClick={handleClose} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px' }}>
                Cancel
            </button>
            <button onClick={handleDelete} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}>
                Confirm
            </button>
            </div>
        </div>
   
      
    </Dialog>
  )
}

export default ConformDeleteDiolog


