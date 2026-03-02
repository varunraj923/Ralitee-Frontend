import React, { useState, useEffect } from "react";
import { Box, styled, IconButton, Typography } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ----------------------------------------------------------------------
// STYLED COMPONENTS
// ----------------------------------------------------------------------

const MainWrapper = styled(Box)(({ theme }) => ({
  width: "95%",            // Use 95% on mobile to leave a tiny gap
  maxWidth: "1200px",      // <--- THIS CONTROLS THE WIDTH ON DESKTOP
  margin: "20px auto",     // Centers the carousel and adds vertical spacing
  borderRadius: "6px",    // Adds modern rounded corners to the container
  overflow: "hidden",      // Ensures images don't bleed past rounded corners
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)", // Adds a soft lift
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",           // Always fills the MainWrapper
  height: "40vh",
  minHeight: "350px", 
  backgroundColor: "#121212", 
  [theme.breakpoints.up("sm")]: { height: "40vh" },
  [theme.breakpoints.up("md")]: { height: "45vh" }, // Adjusted height for smaller width
  "&:hover .nav-arrow": {
    opacity: 1,
    transform: "translateY(-50%) scale(1)",
  },
}));

const PosterImage = styled("img")(({ active }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover", 
  opacity: active ? 1 : 0,
  transform: active ? "scale(1)" : "scale(1.03)", 
  // Consistent 0.8s transition for every single image
  transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
  pointerEvents: active ? "auto" : "none",
}));

const GradientOverlay = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "40%",
  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
  pointerEvents: "none",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  paddingBottom: "40px", 
  paddingLeft: "5%",
  paddingRight: "5%",
});

const ArrowButton = styled(IconButton)(({ theme, direction }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%) scale(0.9)",
  [direction]: "20px", 
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(8px)",
  color: "#fff",
  opacity: 0, 
  transition: "all 0.3s ease",
  zIndex: 10,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  [theme.breakpoints.down("sm")]: {
    opacity: 0.6,
    transform: "translateY(-50%) scale(0.85)",
    [direction]: "10px",
  }
}));

const DotsContainer = styled(Box)({
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "8px",
  zIndex: 10,
});

const Dot = styled("div")(({ active }) => ({
  width: active ? "32px" : "8px", 
  height: "8px",
  borderRadius: "4px",
  backgroundColor: active ? "#fff" : "rgba(255, 255, 255, 0.4)",
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)", 
  "&:hover": {
    backgroundColor: active ? "#fff" : "rgba(255, 255, 255, 0.8)",
  },
}));

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

const HeroSection = ({ posters = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Core Navigation Logic
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);
  };

  // --- THE TIMING FIX ---
  // By including 'currentIndex' in the dependency array, we guarantee that 
  // the 4-second timer perfectly restarts the moment a slide changes.
  useEffect(() => {
    if (posters.length <= 1 || isHovered) return;

    // A strict, consistent 4000ms (4 seconds) interval
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posters.length);
    }, 3000); 

    // Cleanup ensures old timers don't overlap and cause weird fast-forwarding
    return () => clearInterval(interval);
  }, [posters.length, isHovered, currentIndex]);

  // Mobile Swipe Logic
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (!posters || posters.length === 0) {
    return (
      <CarouselContainer>
        <Box sx={{ textAlign: "center", p: 4, bgcolor: "#fff", borderRadius: 2, zIndex: 2 }}>
          <Typography variant="h5" color="textPrimary">Welcome to Ralitee</Typography>
          <Typography color="textSecondary">Admin: Please upload a poster in the dashboard.</Typography>
        </Box>
      </CarouselContainer>
    );
  }

  return (
    <MainWrapper>
      <CarouselContainer 
        {...handlers}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
      >
        
        {/* Render Images */}
        {posters.map((poster, index) => (
          <PosterImage
            key={poster._id} 
            src={poster.image}
            alt={poster.caption || `Slide ${index + 1}`}
            active={index === currentIndex ? 1 : 0}
            loading="eager" // Tells the browser to load these immediately so the first switch isn't delayed
          />
        ))}

        {/* Gradient Overlay & Captions */}
        <GradientOverlay>
          {posters[currentIndex]?.caption && (
            <Typography 
              variant="h4" 
              sx={{ 
                color: "#fff", 
                fontWeight: "bold", 
                textShadow: "0px 2px 10px rgba(0,0,0,0.5)",
                mb: 2,
              }}
            >
              {posters[currentIndex].caption}
            </Typography>
          )}
        </GradientOverlay>

        {/* Edge Arrow Controls */}
        {posters.length > 1 && (
          <>
            <ArrowButton 
              className="nav-arrow" 
              direction="left" 
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} />
            </ArrowButton>

            <ArrowButton 
              className="nav-arrow" 
              direction="right" 
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight size={28} />
            </ArrowButton>

            {/* Bottom Pill Dots */}
            <DotsContainer>
              {posters.map((poster, index) => (
                <Dot
                  key={`dot-${poster._id}`}
                  active={index === currentIndex ? 1 : 0}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </DotsContainer>
          </>
        )}
      </CarouselContainer>
    </MainWrapper>
  );
};

export default HeroSection;