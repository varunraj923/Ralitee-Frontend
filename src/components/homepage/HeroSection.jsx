// HeroSection.jsx
import React from "react";
import { Box, Container, Typography, Button, Stack, styled, useTheme } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";

const Hero = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  background: `linear-gradient(120deg, ${theme.palette.primary.main}11 0%, ${theme.palette.primary.main}05 100%)`,
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: '75vh',
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    minHeight: '80vh',
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: '85vh',
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  textAlign: "center",
  maxWidth: '100%',
  
  [theme.breakpoints.up('sm')]: {
    maxWidth: '90%',
    margin: '0 auto',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '85%',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '80%',
  },
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  lineHeight: 1.1,
  fontSize: '2rem',
  
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem',
    lineHeight: 1.15,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
    lineHeight: 1.2,
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '3.5rem',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '4rem',
  },
  
  // Better text wrapping on smaller screens
  wordBreak: 'break-word',
  hyphens: 'auto',
  
  [theme.breakpoints.down('sm')]: {
    // Ensure readability on very small screens
    fontSize: '1.75rem',
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
  maxWidth: 700,
  margin: `0 auto ${theme.spacing(3)}px auto`,
  lineHeight: 1.5,
  fontSize: '1rem',
  padding: `0 ${theme.spacing(2)}`,
  
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.125rem',
    marginBottom: theme.spacing(4),
    margin: `0 auto ${theme.spacing(4)}px auto`,
    padding: `0 ${theme.spacing(3)}`,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.25rem',
    maxWidth: 800,
    padding: 0,
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.375rem',
  },
}));

const ButtonStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  
  [theme.breakpoints.down('sm')]: {
    '& .MuiButton-root': {
      width: '100%',
      maxWidth: '280px',
    },
  },
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2.5),
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: '999px',
  backgroundColor: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: '1rem',
  textTransform: 'none',
  boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 16px ${theme.palette.primary.main}50`,
  },
  
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: '1.1rem',
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: '999px',
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: '1rem',
  textTransform: 'none',
  borderWidth: '2px',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}15`,
    borderColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
    borderWidth: '2px',
  },
  
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: '1.1rem',
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  
  '& .MuiButton-endIcon': {
    marginLeft: theme.spacing(1),
    transition: 'transform 0.3s ease',
  },
  
  '&:hover .MuiButton-endIcon': {
    transform: 'translateX(4px)',
  },
}));

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleShopClick = () => {
    try {
      navigate("/shop");
    } catch (error) {
      console.warn("Navigation not available:", error);
      // Fallback for when router is not available
      window.location.href = "/shop";
    }
  };

  const handleCategoriesClick = () => {
    const categoriesElement = document.getElementById("categories");
    if (categoriesElement) {
      categoriesElement.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    } else {
      window.location.hash = "#categories";
    }
  };

  return (
    <Hero>
      <Container 
        maxWidth="lg" 
        sx={{
          px: { xs: 2, sm: 3, md: 4 }, // Responsive horizontal padding
          width: '100%',
        }}
      >
        <HeroContent>
          <MainTitle
            variant="h1"
            component="h1"
          >
            Ralitee — Fresh produce, straight from trusted farms.
          </MainTitle>

          <Subtitle
            variant="h6"
            component="p"
          >
            Hand-picked, organic selections delivered quickly. Browse seasonal boxes, bundles and weekly subscriptions.
          </Subtitle>

          <ButtonStack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 2.5 }}
          >
            <PrimaryButton
              variant="contained"
              size="large"
              onClick={handleShopClick}
              aria-label="Shop fresh produce now"
            >
              Shop Fresh Now
            </PrimaryButton>

            <SecondaryButton
              variant="outlined"
              size="large"
              endIcon={<ArrowRightAltIcon />}
              onClick={handleCategoriesClick}
              aria-label="Browse product categories"
            >
              Browse Categories
            </SecondaryButton>
          </ButtonStack>
        </HeroContent>
      </Container>
    </Hero>
  );
};

export default HeroSection;