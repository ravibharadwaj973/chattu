import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Drawer,
  Stack,
  Avatar,
  AvatarGroup,
  Button,
  ButtonGroup,
  Backdrop,
} from "@mui/material";
import { TextField } from "@mui/material"; // Make sure this is imported
import React, { lazy, Suspense, useEffect, useState } from "react";
import { matblack, orange } from "../constants/color";
import {
  Add,
  Delete,
  Done,
  Edit,
  Groups,
  KeyboardBackspace,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { sampleChats, sampleUsers } from "../constants/sample";
import Username from "../components/shared/Username";

const Group = () => {
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("groups");

  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("Group Name");
  const [groupNameUpdated, setGroupNameUpdated] = useState("");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addMember, setAddMember] = useState(false);

  const navigateBack = () => navigate("/");
  // const ConformDeleteDiolog=lazy(() => import("../components/dailogs/ConformDeleteDiolog"));
  const AddMemberdialog = lazy(() => import("../components/dailogs/addMember"));

  const handleMobileToggle = () => setIsMobileMenuOpen((prev) => !prev);

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateUsername = () => {
    setGroupName(groupNameUpdated);
    setIsEdit(false);
    console.log("Group name updated to:", groupNameUpdated);
  };

  const conformDeleteMember = () => {
    setConfirmDelete(true);
    console.log("Conform delete member action triggered");
  };
  const closeconfirmDelete = () => {
    setConfirmDelete(false);
    console.log("Delete confirmation closed");
  };
  const AddMember = () => {
    setAddMember(true);
    console.log("Add member action triggered");
  };
  const deleteHandler = () => {
    console.log("Delete member action triggered");
    closeconfirmDelete();
  };
  const removerMemberHandler = (id) => {
    console.log("Remove member with ID:", id);
    // Implement the logic to remove the member from the group
  };
  const isAddMember = false;
  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdated(`Group Name ${chatId}`);
    }
    return () => {
      setGroupName("Group Name");
      setGroupNameUpdated("");
      setIsEdit(false);
    };
  }, [chatId]);

  const Groupname = (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      p={1}
      borderRadius="8px"
      mt={2}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdated}
            onChange={(e) => setGroupNameUpdated(e.target.value)}
            size="small"
            autoFocus
            sx={{
              bgcolor: "white",
              borderRadius: "8px",
              width: "200px",
            }}
          />
          <IconButton
            onClick={updateUsername}
            sx={{
              bgcolor: matblack,
              color: "white",
              ":hover": {
                bgcolor: "rgba(0,0,0,0.6)",
              },
            }}
          >
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h6" color="text.primary">
            {groupName}
          </Typography>
          <IconButton
            onClick={() => setIsEdit(true)}
            sx={{
              bgcolor: matblack,
              color: "white",
              ":hover": {
                bgcolor: "rgba(0,0,0,0.6)",
              },
            }}
          >
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const IconBtn = (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
          zIndex: 1301,
        }}
      >
        <IconButton onClick={handleMobileToggle}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matblack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.6)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );
  const buttonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      width="100%"
      p={{
        xs: "1rem",
        sm: "0",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        variant="contained"
        startIcon={<Add />}
        onClick={AddMember}
      >
        Add Members
      </Button>
      <Button
        size="large"
        color="error"
        variant="contained"
        startIcon={<Delete />}
        onClick={conformDeleteMember}
      >
        Delete Member
      </Button>
    </Stack>
  );

  return (
    <Grid container height="100vh" width={"100%"} spacing={2}>
      <Grid
        item
        xs={12}
        sm={9}
        sx={{
          display: { xs: "none", sm: "block" },
          width: { sm: "30vw" },
          padding: "1rem",
          bgcolor: orange,
        }}
      >
        <Typography variant="h6">Groups List</Typography>
        <GroupsList myGroups={sampleChats} chatid={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtn}

        <Typography variant="h4" mt={4}>
          Group Details
        </Typography>

        {/* ✅ Editable group name */}
        {Groupname}

        {groupName && (
          <>
            <Typography
              margin={2}
              variant="subtitle1" // ✅ Fixed invalid h8
              color="text.primary"
              alignSelf="flex-start"
            >
              Members
            </Typography>

            <Stack
              width="100%" // ✅ Full width of the container
              maxWidth="100rem" // ✅ Increased from 80rem to 100rem
              boxSizing="border-box"
              spacing={2}
              padding={{
                xs: "1rem",
                sm: "2rem",
                md: "1rem 4rem",
              }}
              bgcolor="bisque"
              height="100%"
              sx={{
                overflowY: "auto",
              }}
            >
              {sampleUsers.map((i) => (
                <Username
                  key={i._id}
                  user={i}
                  isAdded
                  styling={{
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "8px",
                    bgcolor: "white",
                    boxShadow: 1,
                  }}
                  handler={removerMemberHandler}
                />
              ))}
            </Stack>
            {buttonGroup}
          </>
        )}
      </Grid>
      {isAddMember && (
        <Suspense fallback={<Backdrop />}>
          <AddMemberdialog addMember={addMember} />
        </Suspense>
      )}
      {confirmDelete && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            padding: "2rem",
            boxShadow: 24,
            zIndex: 1300,
          }}
        >
          <Typography variant="h6" mb={2}>
            Are you sure you want to delete this member?
          </Typography>
          <ButtonGroup variant="contained" fullWidth>
            <Button color="error" onClick={closeconfirmDelete}>
              Cancel
            </Button>
            <Button color="primary" onClick={deleteHandler}>
              Confirm
            </Button>
          </ButtonGroup>
        </Box>
      )}

      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <Box width="250px" padding="1rem">
          <Typography variant="h6" mb={2}>
            Groups List (Mobile)
          </Typography>
        </Box>
        <GroupsList width="50vw" myGroups={sampleChats} chatid={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ width = "100%", myGroups = [], chatid }) => (
  <Stack width={width} spacing={2}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupsListItem
          key={group._id}
          group={group}
          chatid={chatid}
        ></GroupsListItem>
      ))
    ) : (
      <Typography variant="h6" color="text.secondary">
        No groups available
      </Typography>
    )}
  </Stack>
);
const GroupsListItem = ({ group }) => {
  const { name, avatar, _id, groupchat } = group;
  return (
    <Link to={`?groups=${_id}`} style={{ textDecoration: "none" }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        p={1}
        borderRadius="8px"
      >
        {groupchat ? (
          <AvatarGroup max={3}>
            {avatar.map((url, index) => (
              <Avatar key={index} src={url} />
            ))}
          </AvatarGroup>
        ) : (
          <Avatar src={avatar[0]} />
        )}
        <Typography variant="subtitle1" color="text.primary">
          {name}
        </Typography>
      </Stack>
    </Link>
  );
};

export default Group;
