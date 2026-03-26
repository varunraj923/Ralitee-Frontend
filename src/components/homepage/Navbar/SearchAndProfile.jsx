import React, { useState } from "react";
import { Box, TextField, InputAdornment, IconButton, Badge } from "@mui/material";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import Profile from "./Profile";

export const SearchAndProfile = ({ navigate, user, cart, handleLogout, isMobile,wishlistlength }) => {
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
      <form onSubmit={handleSearch} style={{ width: isMobile ? '40vw' : '21vw' }}>
        <TextField
          size="small"
          fullWidth
          placeholder={!isMobile ? 'What are you looking for . .' : 'Search...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px", // Exact pill shape
              backgroundColor: "#fff",
              paddingLeft: "10px", // Breathing room on the far left
              
              // CSS trick for gradient borders with border-radius
              border: "2.5px solid transparent",
              background: `
                linear-gradient(#fff, #fff) padding-box, 
                linear-gradient(to right, #8eb4e1, #da94b6) border-box
              `,
              
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": { border: "none" },
            },
            
            // Text and Placeholder styling
            "& .MuiInputBase-input": {
              paddingLeft: "0px", // Handled by the adornment margin
              color: "#333",
              fontSize: "14px", // Crisper text size
              "&::placeholder": {
                color: "#a0a0a0", // Soft grey like the image
                opacity: 1,
                fontWeight: 400,
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }}>
                {/* Search Icon */}
                <FiSearch size={18} color="#444" style={{ strokeWidth: 1.5 }} />
                
                {/* Vertical Separator Line */}
                <Box 
                  sx={{ 
                    height: '16px', // Slightly shorter line to match image
                    width: '1px', 
                    backgroundColor: '#e0e0e0', // Very soft grey
                    ml: '10px', // Space between icon and line
                  }} 
                />
              </InputAdornment>
            )
          }}
        />
      </form>

      {!isMobile && (
        <IconButton onClick={()=> navigate("/wishlist")}>
          <Badge badgeContent={wishlistlength} color="error">
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