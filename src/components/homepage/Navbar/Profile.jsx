import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, List, ListItemButton, ListItemText, ClickAwayListener, useMediaQuery, ListItemIcon } from "@mui/material";
import { User, ShoppingBag, XCircle, Star, LogOut } from "lucide-react";

const Profile = ({ user, firstName, handleLogout }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClickAway = () => setProfileOpen(false);

  // Define the menu items to keep the JSX clean
  const menuItems = [
    { text: "Manage My Account", icon: <User size={20} />, path: "/profile" },
    { text: "My Order", icon: <ShoppingBag size={20} />, path: "/orders" },
    { text: "Logout", icon: <LogOut size={20} />, action: handleLogout },
  ];

  return (
    <>
      {user ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ position: "relative" }}>
            {/* Trigger Button */}
             <button
              onClick={() => setProfileOpen(prev => !prev)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#e53935",
                color: "white",
                padding: "6px 12px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              <User size={16} />
              {!isMobile && <span>{firstName}</span>}
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  mt: 1.5,
                  width: 240,
                  // Glassmorphism styling
                  background: "linear-gradient(135deg, rgba(107, 86, 116, 0.9) 0%, rgba(34, 34, 34, 0.95) 100%)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "8px",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                  overflow: "hidden",
                  zIndex: 2000,
                  padding: "10px 0",
                }}
              >
                <List sx={{ py: 0 }}>
                  {menuItems.map((item, index) => (
                    <ListItemButton
                      key={index}
                      onClick={() => {
                        if (item.action) item.action();
                        else navigate(item.path);
                        setProfileOpen(false);
                      }}
                      sx={{
                        color: "white",
                        gap: 1,
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: "white", minWidth: 32 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{ fontSize: "14px", fontWeight: 400 }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        </ClickAwayListener>
      ) : (
        <button
          onClick={() => navigate("/login")}
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#db4444",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            color: "white"
          }}
        >
          <User size={20} />
        </button>
      )}
    </>
  );
};

export default Profile;