import React, { useState } from "react";
import { Box, TextField, InputAdornment, IconButton, Badge } from "@mui/material";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import Profile from "./Profile";

export const SearchAndProfile = ({ navigate, user, cart, handleLogout, isMobile }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const displayCartCount = cart?.items?.length || 0;
  const firstName = user?.name?.split(" ")[0] || "User";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, position: "relative" }}>
      <form onSubmit={handleSearch} style={{ width: isMobile ? 140 : 300 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px", "& fieldset": { border: "none" } }}
          InputProps={{ endAdornment: <InputAdornment position="end"><FiSearch size={18} /></InputAdornment> }}
        />
      </form>

      {!isMobile && (
        <IconButton>
          <Badge badgeContent={displayCartCount} color="error">
            <FaRegHeart size={20} />
          </Badge>
        </IconButton>
      )}

      {!isMobile && (
        <IconButton onClick={() => navigate("/cart")}>
          <Badge badgeContent={displayCartCount} color="error">
            <FiShoppingCart size={22} />
          </Badge>
        </IconButton>
      )}

      <Profile user={user} firstName={firstName} handleLogout={handleLogout} />
    </Box>
  );
};