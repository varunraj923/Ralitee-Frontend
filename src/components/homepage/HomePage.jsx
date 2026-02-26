// HomePage.jsx
import React from "react";
import { Box, Typography, styled, useTheme } from "@mui/material";
// import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import Footer from "./Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../api/index";
import HomepageProductCard from "./HomepageProductCard";
import CustomerFeedbackTicker from "./CustomerFeedbackTicker";
import AvailableAcrossIndia from "./AvailableAcrossIndia";
import OurCoreValues from "./OurCoreValues";

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
  const [homepageData, setHomepageData] = useState({
    bannerText: "25% Off on Every orders! USE SWAD25 CODE",
    posters: [],
    testimonials: [],
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const res = await api.get("/homepage");
        if (res.data) setHomepageData(res.data);
      } catch (err) {
        console.error("Error fetching homepage", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await api.get("/products?limit=8");
        if (res.data && res.data.products) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchHomepage();
    fetchProducts();
  }, []);

  return (
    <PageContainer>
      {/* Top Banner */}
      {homepageData.bannerText && (
        <Box sx={{ bgcolor: "#cd9141", color: "white", textAlign: "center", py: 1, fontSize: "0.85rem", fontWeight: "bold" }}>
          {homepageData.bannerText}
        </Box>
      )}

      {/* Main Content */}
      <MainContent component="main" sx={{ bgcolor: "#f5f0e1" }}>
        {/* Hero */}
        <SectionWrapper component="section" aria-label="Hero" sx={{ p: '0 !important', mt: 0 }}>
          <HeroSection posters={homepageData.posters} />
        </SectionWrapper>

        <SectionSpacer />

        {/* Our Products */}
        <SectionWrapper component="section" aria-label="Our Products">
          <Typography variant="h3" align="center" sx={{ color: "#5a1820", fontWeight: "bold", mb: 4, fontFamily: "'Georgia', serif" }}>
            Our Products
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3 }}>
            {products.map(product => (
              <HomepageProductCard key={product._id} product={product} />
            ))}
          </Box>
        </SectionWrapper>

        <SectionSpacer />

        {/* Customer Feedback Ticker */}
        <SectionWrapper component="section" aria-label="Customer Feedback" sx={{ p: "0 !important" }}>
          <CustomerFeedbackTicker />
        </SectionWrapper>

        <SectionSpacer />

        {/* Available Across India */}
        <SectionWrapper component="section" aria-label="Available Across India" sx={{ p: "0 !important" }}>
          <AvailableAcrossIndia />
        </SectionWrapper>

        <SectionSpacer />

        {/* Our Core Values */}
        <SectionWrapper component="section" aria-label="Our Core Values" sx={{ p: "0 !important" }}>
          <OurCoreValues />
        </SectionWrapper>

        <SectionSpacer />

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
