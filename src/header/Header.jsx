import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, Outlet } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

export default function Header() {
  return (
    <>
      <Box sx={{ flexGrow: 1, color: "CaptionText" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Кинопоиск 2.0
              </Link>
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/favoritefilmes"
                >
                  <StarIcon />
                </Link>
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/giveToken"
                >
                  <AccountCircleIcon />
                </Link>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              ></Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}
