import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../../constants/sample";
import Username from "../shared/Username";
import { useInputValidation } from "6pp";

const NewGroup = () => {
  const groupName = useInputValidation("");
  const [member,setMember] = useState(sampleUsers); // no need to track isAdded separately
  const [selectedmember, setSelectedMember] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMember((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const submithandler = () => {
    console.log("Creating group:", groupName.value, selectedmember);
  };
  const closeHandler=()=>{}

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width="35rem" spacing={2}>
        <DialogTitle>New Group</DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography variant="body1">Members</Typography>

        <Stack spacing={1}>
          {member.map((user) => (
            <ListItem key={user._id}>
              <Username
                user={user}
                handler={selectMemberHandler}
                isAdded={selectedmember.includes(user._id)}
              />
            </ListItem>
          ))}
        </Stack>

        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Button variant="text" color="error" size="large">
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submithandler}
            disabled={!groupName.value.trim() || selectedmember.length === 0}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
