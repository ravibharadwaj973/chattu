import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { sampleUsers } from '../../constants/sample';
import Username from '../shared/Username';

const AddMember = ({ addMember, isLoadingAdMember, ChatId, onClose }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addMember(selectedMembers, ChatId);
    console.log("Members added to chat:", selectedMembers, "Chat ID:", ChatId);
    handleClose(); // Optionally close after submit
  };

  const handleClose = () => {
    setSelectedMembers([]);
    setMembers([]);
    if (onClose) onClose();
  };

  return (
    <Dialog open onClose={handleClose} maxWidth="md" fullWidth>
      <Stack spacing={2} p={2}>
        <DialogTitle>Add Member</DialogTitle>
        <Stack spacing={1}>
          {members.length > 0 ? (
            members.map((user) => (
              <Username
                key={user._id}
                user={user}
                handlerLoading={isLoadingAdMember}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          ) : (
            <Typography>No users found</Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-evenly" mt={2} alignItems="center">
          <Button color="error" onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            disabled={isLoadingAdMember || selectedMembers.length === 0}
            onClick={addMemberSubmitHandler}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMember;
