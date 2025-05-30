import React, { useState } from 'react';
import { useInputValidation } from '6pp';
import {
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 
import Username from '../shared/Username';
import { sampleUsers } from '../../constants/sample';

const Search = () => {
  const search = useInputValidation('');
  const [user,setUser]=useState(sampleUsers)


let isLoadingFriendRequest=false;
  const addFriendHandler=(id)=>{
    console.log(id)
  }

  return (
    <Dialog open>
      <Stack p="2rem" direction="column" width="25rem" spacing={2}>
        <DialogTitle textAlign="center">Find People</DialogTitle>
        <TextField
          label="Search"
          value={search.value}
          onChange={search.changeHandler} // ✅ Fixed: this was missing `=`
          variant="outlined"
          size="small"
          Inputp={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <List>
      {
        user.map((user)=>(
            <ListItem>
                <Username user={user} key={user._id} handler={addFriendHandler}  handlerLoading={isLoadingFriendRequest}/>
            </ListItem>
        ))
      }

      </List>
    </Dialog>
  );
};

export default Search;
