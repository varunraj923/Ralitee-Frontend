import React from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Badge } from "@mui/material";
import { FiHome, FiShoppingCart, FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";

const buttonstyle =
  "relative text-[#707070] font-semibold text-lg tracking-wide after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full";

export const NavLinks = ({ navigate, isMobile, displayCartCount, closeDrawer }) => {
  if (isMobile) {
    return (
      <List>
        <ListItemButton onClick={() => { navigate("/"); closeDrawer(); }}>
          <ListItemIcon><FiHome /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton onClick={() => { navigate("/user/dashboard"); closeDrawer(); }}>
          <ListItemIcon><FiShoppingCart /></ListItemIcon>
          <ListItemText primary="Shop" />
        </ListItemButton>

        <ListItemButton onClick={() => { navigate("/contact"); closeDrawer(); }}>
          <ListItemIcon><FiUser /></ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <Badge badgeContent={displayCartCount} color="error">
              <FaRegHeart />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Wishlist" />
        </ListItemButton>

        <ListItemButton onClick={() => { navigate("/cart"); closeDrawer(); }}>
          <ListItemIcon>
            <Badge badgeContent={displayCartCount} color="error">
              <FiShoppingCart />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItemButton>
      </List>
    );
  }

  // Desktop links
  return (
    <Box className="flex items-center gap-8 ml-6">
      <button onClick={() => navigate("/")} className={buttonstyle}>Home</button>
      <button onClick={() => navigate("/user/dashboard")} className={buttonstyle}>Shop</button>
      <button onClick={() => navigate("/contact")} className={buttonstyle}>Contact</button>
    </Box>
  );
};