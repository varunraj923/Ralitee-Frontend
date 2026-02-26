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
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import UserMenu from "../common/UserMenu";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData, setLocation } from "../../redux/slices/authSlice";
import { logoutApi } from "../../api/auth";

const NavBar = ({ cartCount = 0, mode, toggleColorMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, location } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
      setOpen(false); // Close mobile drawer if open
    }
  };

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
              dispatch(setLocation({ latitude, longitude, city: "Unknown Location" }));
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
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
          backgroundColor: "#fefdfa",
          borderBottom: "1px solid #e0dcd3",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", height: "70px" }}>

            {/* Left Box: Menu and Search */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", flex: 1 }}>
              <IconButton onClick={() => setOpen(true)} aria-label="open menu" sx={{ color: "#3e2723" }}>
                <MenuIcon />
              </IconButton>
              <IconButton onClick={() => setShowSearch(!showSearch)} sx={{ color: "#3e2723", display: { xs: "none", sm: "flex" } }}>
                <SearchIcon />
              </IconButton>
            </Box>

            {/* Center Box: Logo / Brand Name OR Search Bar */}
            <Box
              sx={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 2 }}
            >
              {showSearch ? (
                <form onSubmit={handleSearchSubmit} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 20px",
                      borderRadius: "30px",
                      border: "1px solid #e0dcd3",
                      outline: "none",
                      backgroundColor: "#f5f0e1",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem"
                    }}
                  />
                  <IconButton onClick={() => setShowSearch(false)} sx={{ ml: 1, color: "#3e2723" }}>
                    <CloseIcon />
                  </IconButton>
                </form>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: "#8B0000",
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "0.5px"
                    }}
                  >
                    Ralitee
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Right Box: User and Cart */}
            <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 }, alignItems: "center", flex: 1, justifyContent: "flex-end" }}>
              <IconButton onClick={() => setShowSearch(!showSearch)} sx={{ color: "#3e2723", display: { xs: "flex", sm: "none" } }}>
                <SearchIcon />
              </IconButton>

              {!user ? (
                <IconButton onClick={() => navigate("/login")} sx={{ color: "#3e2723" }}>
                  <PersonOutlineOutlinedIcon />
                </IconButton>
              ) : (
                <UserMenu
                  theme={theme}
                  isLoggedIn={!!user}
                  username={user?.name}
                  onLogin={() => navigate("/login")}
                  onLogout={handleLogout}
                />
              )}

              <IconButton onClick={() => navigate("/cart")} sx={{ color: "#3e2723" }}>
                <Badge badgeContent={displayCartCount} color="error" sx={{ '& .MuiBadge-badge': { backgroundColor: '#8B0000', color: 'white' } }}>
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 260,
            p: 2,
            background: "#fefdfa",
            minHeight: "100%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ fontWeight: 800, color: "#8B0000" }}>Ralitee</Typography>
            </Box>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {/* Mobile Search Input in Drawer */}
          <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "1px solid #e0dcd3",
                outline: "none",
                backgroundColor: "#f5f0e1",
                fontFamily: "'Inter', sans-serif",
              }}
            />
            <IconButton type="submit" sx={{ ml: 1, color: "#3e2723", bgcolor: "rgba(0,0,0,0.05)" }}>
              <SearchIcon />
            </IconButton>
          </form>

          <List>
            <ListItemButton onClick={() => { navigate("/user/dashboard"); setOpen(false); }}>
              <ListItemText sx={{ '& .MuiTypography-root': { fontWeight: 500, color: "#3e2723" } }} primary="Shop" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate("/offers"); setOpen(false); }}>
              <ListItemText sx={{ '& .MuiTypography-root': { fontWeight: 500, color: "#3e2723" } }} primary="Offers" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={() => { navigate("/cart"); setOpen(false); }}>
              <ListItemText sx={{ '& .MuiTypography-root': { fontWeight: 500, color: "#3e2723" } }} primary={`Cart (${displayCartCount})`} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
