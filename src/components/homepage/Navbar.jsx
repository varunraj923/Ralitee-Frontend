// NavBar.jsx

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  useTheme,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Import Location Icon
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import UserMenu from "../common/UserMenu";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData, setLocation } from "../../redux/slices/authSlice"; // Import setLocation
import { logoutApi } from "../../api/auth";


const NavBar = ({ cartCount = 0, mode, toggleColorMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const { user, location } = useSelector((state) => state.auth); // Destructure location
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculate cart count from Redux store if not passed as prop (or prefer Redux)
  // Assuming cart.items is the array of items
  const displayCartCount = cart?.items?.length || 0;

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(clearAuthData());
      navigate("/login");
    }
  };

  // Fetch Location Effect
  useEffect(() => {
    if (user && !location) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();
              const city =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.county ||
                "Current Location";

              dispatch(setLocation({ latitude, longitude, city }));
            } catch (error) {
              console.error("Error fetching location name:", error);
              // Save coordinates even if address fetch fails
              dispatch(setLocation({ latitude, longitude, city: "Unknown Location" }));
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            // Optional: Handle permission denied state if needed
          }
        );
      }
    }
  }, [user, location, dispatch]);


  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.homePage?.navbarBackground || theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.homePage?.navbarBorder || theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo + Name */}
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <img
                src="/favicon-transparent.png"
                alt="Ralitee"
                style={{ height: 36, width: 36 }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  color:
                    theme.palette.homePage?.buttonPrimaryHover ||
                    theme.palette.primary.main,
                }}
              >
                Ralitee
              </Typography>
            </Box>


            {isMobile ? (
              // Mobile menu
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {/* Mobile Location Icon (User Logged In) */}
                {user && location && (
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1, color: theme.palette.text.secondary }}>
                    <LocationOnIcon fontSize="small" />
                  </Box>
                )}

                <IconButton
                  onClick={toggleColorMode}
                  aria-label="toggle theme"
                  sx={{ color: theme.palette.homePage?.textPrimary || theme.palette.text.primary }}
                >
                  {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                <IconButton onClick={() => setOpen(true)} aria-label="open menu">
                  <MenuIcon />
                </IconButton>
              </Box>
            ) : (
              // Desktop menu
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {/* Desktop Location Display (User Logged In) */}
                {user && location && (
                  <Button
                    startIcon={<LocationOnIcon />}
                    sx={{
                      color: theme.palette.text.secondary,
                      textTransform: 'none',
                      minWidth: 'auto',
                      mr: 1
                    }}
                  >
                    {location.city}
                  </Button>
                )}

                <Button onClick={() => navigate("/user/dashboard")} sx={{ color: theme.palette.text.primary }}>
                  Shop
                </Button>
                {/* <Button
                  onClick={() => (window.location.hash = "#categories")}
                  sx={{ color: theme.palette.text.primary }}
                >
                  Categories
                </Button> */}
                <Button onClick={() => navigate("/offers")} sx={{ color: theme.palette.text.primary }}>
                  Offers
                </Button>

                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <IconButton onClick={() => navigate("/search")} sx={{ color: theme.palette.text.primary }}>
                    <SearchIcon />
                  </IconButton>

                  <IconButton onClick={toggleColorMode} sx={{ color: theme.palette.text.primary }}>
                    {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>

                  <IconButton onClick={() => navigate("/cart")} sx={{ color: theme.palette.text.primary }}>
                    <Badge badgeContent={displayCartCount} color="primary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>

                  {/* <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": { backgroundColor: theme.palette.primary.dark },
                    }}
                    startIcon={<AccountCircleIcon />}
                  >
                    Sign in
                  </Button> */}
                  <UserMenu
                    theme={theme}
                    isLoggedIn={!!user}
                    username={user?.name}
                    onLogin={() => navigate("/login")}
                    onLogout={handleLogout}
                  />




                </Box>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 260,
            p: 2,
            background: theme.palette.homePage?.navbarBackground || theme.palette.background.paper,
            minHeight: "100%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              Cultivated Harvest
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {/* Mobile Drawer Location Display */}
            {user && location && (
              <>
                <ListItemButton>
                  <LocationOnIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                  <ListItemText primary={location.city} secondary="Current Location" />
                </ListItemButton>
                <Divider sx={{ my: 1 }} />
              </>
            )}

            <ListItemButton onClick={() => { navigate("/user/dashboard"); setOpen(false); }}>
              <ListItemText primary="Shop" />
            </ListItemButton>
            {/* <ListItemButton onClick={() => { window.location.hash = "#categories"; setOpen(false); }}>
              <ListItemText primary="Categories" />
            </ListItemButton> */}
            <ListItemButton onClick={() => { navigate("/offers"); setOpen(false); }}>
              <ListItemText primary="Offers" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={() => { navigate("/cart"); setOpen(false); }}>
              <ListItemText primary={`Cart (${displayCartCount})`} />
            </ListItemButton>
            <Box sx={{ mt: 1 }}>
              <UserMenu
                theme={theme}
                isLoggedIn={!!user}
                username={user?.name}
                onLogin={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                onLogout={() => {
                  handleLogout();
                  setOpen(false);
                }}
              />
            </Box>

          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
