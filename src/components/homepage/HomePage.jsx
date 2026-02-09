// HomePage.jsx
import React from "react";
import { Box, styled, useTheme } from "@mui/material";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer";

const NAVBAR_HEIGHT = { xs: 56, sm: 64 }; // adjust based on your Navbar

const PageContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  overflowX: "hidden", // prevent horizontal scroll
  position: "relative",
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%",

  paddingTop: {
    xs: NAVBAR_HEIGHT.xs,
    sm: NAVBAR_HEIGHT.sm,
  },

  "& > *": {
    flexShrink: 0,
  },
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "relative",
  paddingInline: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    paddingInline: theme.spacing(4),
  },

  [theme.breakpoints.up("lg")]: {
    paddingInline: theme.spacing(8),
  },
}));

const SectionSpacer = styled(Box)(({ theme }) => ({
  height: theme.spacing(3),

  [theme.breakpoints.up("sm")]: {
    height: theme.spacing(4),
  },
  [theme.breakpoints.up("md")]: {
    height: theme.spacing(6),
  },
}));

const HomePage = () => {
  const theme = useTheme();

  return (
    <PageContainer>
      {/* Navbar */}
      <Box component="header">
        <Navbar />
      </Box>

      {/* Main Content */}
      <MainContent component="main">
        {/* Hero */}
        <SectionWrapper component="section" aria-label="Hero">
          <HeroSection />
        </SectionWrapper>

        <SectionSpacer />

        {/* Stats */}
        <SectionWrapper component="section" aria-label="Statistics">
          <StatsSection />
        </SectionWrapper>

        <SectionSpacer />

        {/* Products Preview (future) */}
        <SectionWrapper component="section" aria-label="Products Preview">
          {/* Product cards here */}
        </SectionWrapper>

        <SectionSpacer />

        {/* Testimonials */}
        <SectionWrapper component="section" aria-label="Testimonials">
          <TestimonialsSection />
        </SectionWrapper>

        <Box sx={{ height: { xs: 24, sm: 40, md: 64 } }} />
      </MainContent>

      {/* Footer */}
      <Box component="footer">
        <Footer />
      </Box>
    </PageContainer>
  );
};

export default HomePage;
