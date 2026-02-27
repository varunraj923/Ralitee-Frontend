import React, { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  IconButton,
  useMediaQuery,
  Drawer,
  Divider,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../../assets/images/Ralitee-Transparent.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData } from "../../../redux/slices/authSlice";
import { logoutApi } from "../../../api/auth";
import { NavLinks } from "./NavLinks";
import { SearchAndProfile } from "./SearchAndProfile";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const displayCartCount = cart?.items?.length || 0;

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(clearAuthData());
      navigate("/login");
    }
  };

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "#fefdfa" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", alignItems: "center", height: { xs: 56, md: 68 } }}>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {isMobile && <IconButton onClick={() => setDrawerOpen(true)}><MenuIcon /></IconButton>}
              <Box component="img" src={logo} alt="Ralitee Logo" onClick={() => navigate("/")} sx={{ height: { xs: 35, sm: 40, md: 50 }, cursor: "pointer" }} />
              {!isMobile && <NavLinks navigate={navigate} isMobile={false} displayCartCount={displayCartCount} />}
            </Box>

            <SearchAndProfile navigate={navigate} user={user} cart={cart} handleLogout={handleLogout} isMobile={isMobile} />
          </Toolbar>
        </Container>
      </AppBar>

      {isMobile && (
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 260, p: 2, background: "#fefdfa", minHeight: "100%" }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>Menu</Typography>
            <Divider sx={{ mb: 2 }} />
            <NavLinks navigate={navigate} isMobile={true} displayCartCount={displayCartCount} closeDrawer={() => setDrawerOpen(false)} />
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default NavBar;