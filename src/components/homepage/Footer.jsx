import React from "react";
import { Box, Container, Grid, Typography, Link, Stack, styled } from "@mui/material";
import { Instagram, Youtube, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#333333", // Dark gray background from the mockup
  color: "#f5f5f5",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(4),
  fontFamily: "'Inter', sans-serif",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1rem",
  marginBottom: theme.spacing(3),
  color: "#ffffff",
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#cccccc",
  fontSize: "0.9rem",
  textDecoration: "none",
  transition: "color 0.2s ease",
  display: "block",
  marginBottom: theme.spacing(1.5),
  "&:hover": {
    color: "#ffffff",
  },
}));

const ContactText = styled(Typography)(({ theme }) => ({
  color: "#cccccc",
  fontSize: "0.9rem",
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(1.5),
}));

const SocialIconLink = styled(Link)(({ theme }) => ({
  color: "#cccccc",
  transition: "color 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    color: "#ffffff",
  },
}));

const BottomBar = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  paddingTop: theme.spacing(3),
  borderTop: "1px solid rgba(255,255,255,0.1)",
  textAlign: "center",
}));

const FloatingWhatsappBtn = styled("a")(({ theme }) => ({
  position: "fixed",
  bottom: "24px",
  right: "24px",
  backgroundColor: "#000000",
  color: "#ffffff",
  borderRadius: "30px",
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "1rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  zIndex: 1000,
  transition: "transform 0.3s ease, background-color 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    backgroundColor: "#222222",
  },
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <FooterContainer component="footer">
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            {/* Column 1: Brand Info */}
            <Grid item xs={12} sm={6} md={3}>
              <SectionTitle>Ralitee</SectionTitle>
              <Typography variant="body2" sx={{ color: "#cccccc", mb: 3, lineHeight: 1.6, fontSize: "0.85rem" }}>
                Authentic and pure products delivered to your doorstep. Experience the true taste of tradition.
              </Typography>
              <Stack direction="row" spacing={2.5}>
                <SocialIconLink href="#" target="_blank" rel="noopener">
                  <Instagram size={20} />
                </SocialIconLink>
                <SocialIconLink href="#" target="_blank" rel="noopener">
                  <Youtube size={20} />
                </SocialIconLink>
                <SocialIconLink href="https://wa.me/919304719373" target="_blank" rel="noopener">
                  <FaWhatsapp size={20} />
                </SocialIconLink>
              </Stack>
            </Grid>

            {/* Column 2: Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <SectionTitle>Quick Links</SectionTitle>
              <FooterLink href="#">Track Order</FooterLink>
              <FooterLink href="#">Return & Refund Policy</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </Grid>

            {/* Column 3: Company */}
            <Grid item xs={12} sm={6} md={2}>
              <SectionTitle>Company</SectionTitle>
              <FooterLink href="#">Our Story</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
            </Grid>

            {/* Column 4: Get in Touch */}
            <Grid item xs={12} sm={6} md={4}>
              <SectionTitle>Get in Touch</SectionTitle>

              <ContactText>
                <Box mt={0.3}>📍</Box>
                <Box>
                  Mayur Vihar Extension, Delhi India<br /> India.
                </Box>
              </ContactText>

              <ContactText>
                <Phone size={18} style={{ marginTop: "2px" }} />
                <Box>
                  +91 9304719373<br />
                  <Typography variant="caption" sx={{ color: "#999999", display: "block", mt: 0.5 }}>
                    Mon - Fri, 10am - 6:30pm
                  </Typography>
                </Box>
              </ContactText>

              <ContactText>
                <Mail size={18} style={{ marginTop: "2px" }} />
                <Box>raliteeofficial@gmail.com</Box>
              </ContactText>
            </Grid>
          </Grid>

          {/* Copyright Bar */}
          <BottomBar>
            <Typography variant="caption" sx={{ color: "#999999" }}>
              © {currentYear} Ralitee. All Rights Reserved.
            </Typography>
          </BottomBar>
        </Container>
      </FooterContainer>

      {/* Floating Sticky Chat Button */}
      <FloatingWhatsappBtn href="https://wa.me/919304719373" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp size={24} />
        Chat
      </FloatingWhatsappBtn>
    </>
  );
};

export default Footer;