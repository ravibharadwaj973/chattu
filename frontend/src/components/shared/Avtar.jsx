import { Stack, AvatarGroup, Box, Avatar } from "@mui/material"; // Assuming you're using MUI
import { transformImage } from "../../lib/faecture";

const Avtar = ({ avatar = [], max = 4 }) => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      overflow={'auto'} gap={1} height={'100%'}
     
    >
      <AvatarGroup max={max} >
        <Box width="5rem" height="3rem">
          {avatar.map((i, index) => (
            <Avatar
              key={Math.random() * 100}
              src={transformImage(i)}
              alt={`Avatar ${index}`}
              style={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                borderRadius: "50%", // Usually avatars are circular
                objectFit: "cover",
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default Avtar;
