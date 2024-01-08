//import styled from '@emotion/styled';
import { Mail, Notifications, Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Search = styled("div")(({ theme }) => ({
  background: "white",
  borderRadius: theme.shape.borderRadius,
  padding: "0 10px",
  width: "40%",
}));
const Icons = styled("div")(({ theme }) => ({
  // border:'1px solid'
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
function Header() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          CrUX Dashboard
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        {/* <Search><InputBase placeholder='search....'/></Search> */}
        <Icons>
          <Badge badgeContent={4} color={"error"}>
            <Mail />
          </Badge>
          <Badge badgeContent={4} color={"error"}>
            <Notifications />
          </Badge>
          <Avatar
            sx={{ height: "25px", width: "25px" }}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar sx={{ height: "25px", width: "25px" }} />
          <Typography>User</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        //anchorEl={anchorEl}
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Header;
