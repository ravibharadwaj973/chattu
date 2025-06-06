import { Add ,Remove} from '@mui/icons-material';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';


const Username = ({user,handler,handlerLoading,isAdded=false,styling={}}) => {
    const {name,_id,avater}=user
    return (
        <ListItem>
        <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} width={'100%'} {...styling}>
            <Avatar/>
            <Typography
            variant='body1'
            sx={{
                flexGrow:1,
                display:'-webkit-box',
                WebkitLineClamp:1,
                WebkitBoxOrient:"vertical",
                overflow:'hidden',
                textOverflow:'ellipsis'

            }}
            >{name}</Typography>
            <IconButton 
            size='small'
            sx={{
                bgcolor:isAdded?'error.main': 'primary.main',
                color:'white',
                '&:hover':{
                    bgcolor:isAdded?'error.dark': 'primary.dark'
                }
            }}
             onClick={()=>handler(_id)} disabled={handlerLoading}>
             {
                isAdded?<Remove/>: <Add/>
             }
               
            </IconButton>
        </Stack>

            
        </ListItem>
    );
}

export default memo(Username);
