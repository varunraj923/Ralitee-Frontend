import React, { useState, useEffect } from "react";
import { Box, styled, IconButton } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const MainWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "40vh",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f0e1",
  [theme.breakpoints.up("sm")]: {
    height: "50vh",
  },
  [theme.breakpoints.up("md")]: {
    height: "60vh",
  },
}));

const PosterImage = styled("img")(({ active }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "fill", // To stretch across full width like a banner
  opacity: active ? 1 : 0,
  transition: "opacity 0.6s ease-in-out",
  pointerEvents: active ? "auto" : "none",
}));

const ControlsBar = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "48px",
  backgroundColor: "#f5f0e1",
  borderTop: "1px solid rgba(0,0,0,0.05)",
  borderBottom: "1px solid #e0dcd3",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(3),
}));

const Dot = styled("div")(({ active, theme }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: active ? "#3e2723" : "transparent",
  border: `2px solid #3e2723`,
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: active ? "#3e2723" : "rgba(62, 39, 35, 0.2)",
  }
}));

const ControlBtn = styled(IconButton)(({ theme }) => ({
  color: "#3e2723",
  padding: "4px",
  "&:hover": {
    backgroundColor: "rgba(62, 39, 35, 0.1)",
  }
}));

const HeroSection = ({ posters = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);
  };

  // Setup auto-play
  useEffect(() => {
    if (posters.length <= 1 || !isPlaying) return;

    const interval = setInterval(nextSlide, 4000);

    return () => clearInterval(interval);
  }, [posters.length, isPlaying, currentIndex]);

  // Setup swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setIsPlaying(false);
      nextSlide();
    },
    onSwipedRight: () => {
      setIsPlaying(false);
      prevSlide();
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!posters || posters.length === 0) {
    return (
      <CarouselContainer>
        <Box sx={{ textAlign: "center", p: 4, bgcolor: "#fff", borderRadius: 2 }}>
          <h2>Welcome to Ralitee</h2>
          <p>Admin: Please upload a poster in the dashboard.</p>
        </Box>
      </CarouselContainer>
    );
  }

  return (
    <MainWrapper>
      {/* Image Carousel */}
      <CarouselContainer {...handlers}>
        {posters.map((poster, index) => (
          <PosterImage
            key={index}
            src={poster.image}
            alt={poster.caption || `Poster ${index}`}
            active={index === currentIndex ? 1 : 0}
          />
        ))}
      </CarouselContainer>

      {/* Dedicated Controls Bar */}
      {posters.length > 1 && (
        <ControlsBar>
          <ControlBtn onClick={() => { setIsPlaying(false); prevSlide(); }} size="small">
            <ChevronLeft size={20} />
          </ControlBtn>

          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {posters.map((_, index) => (
              <Dot
                key={index}
                active={index === currentIndex ? 1 : 0}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentIndex(index);
                }}
              />
            ))}
          </Box>

          <ControlBtn onClick={() => { setIsPlaying(false); nextSlide(); }} size="small">
            <ChevronRight size={20} />
          </ControlBtn>

          <Box sx={{ width: "1px", height: "20px", backgroundColor: "rgba(0,0,0,0.2)", mx: 1 }} />

          <ControlBtn onClick={togglePlayPause} size="small">
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </ControlBtn>
        </ControlsBar>
      )}
    </MainWrapper>
  );
};

export default HeroSection;