// StatsSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  useTheme, 
  styled,
  useMediaQuery 
} from "@mui/material";

const Section = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  background: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
  
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  fontSize: '1.75rem',
  color: theme.palette.text.primary,
  
  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem',
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.25rem',
    marginBottom: theme.spacing(5),
  },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  margin: '0 auto',
  
  [theme.breakpoints.down('md')]: {
    // Mobile carousel container
    overflow: 'hidden',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginLeft: `-${theme.spacing(2)}`,
    marginRight: `-${theme.spacing(2)}`,
    
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '30px',
      zIndex: 3,
      pointerEvents: 'none',
    },
    '&::before': {
      left: 0,
      background: `linear-gradient(to right, ${theme.palette.background.default} 0%, ${theme.palette.background.default}99 50%, transparent 100%)`,
    },
    '&::after': {
      right: 0,
      background: `linear-gradient(to left, ${theme.palette.background.default} 0%, ${theme.palette.background.default}99 50%, transparent 100%)`,
    },
  },
}));

const ScrollingGrid = styled(Box)(({ theme, shouldScroll }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  position: 'relative',
  zIndex: 1,
  
  [theme.breakpoints.up('md')]: {
    // Desktop: Use CSS Grid
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing(3),
    position: 'static',
  },
  
  // Mobile/Tablet: Scrolling animation
  [theme.breakpoints.down('md')]: {
    animation: shouldScroll ? 'scroll-stats 20s linear infinite' : 'none',
    width: 'max-content',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    
    '&:hover': {
      animationPlayState: 'paused',
    },
    
    '@keyframes scroll-stats': {
      '0%': {
        transform: 'translateX(30px)',
      },
      '100%': {
        transform: 'translateX(calc(-50% - 30px))',
      },
    },
  },
  
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1.5),
    animation: shouldScroll ? 'scroll-stats 25s linear infinite' : 'none',
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  backgroundColor: theme.palette.background.paper,
  minWidth: '140px',
  height: 'auto',
  position: 'relative',
  zIndex: 2,
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
    zIndex: 4, // Higher z-index on hover to prevent overlap
  },
  
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2.5),
    minWidth: '160px',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
    minWidth: 'auto',
    width: '100%',
    position: 'static', // Remove positioning on desktop
    '&:hover': {
      transform: 'translateY(-6px)',
      zIndex: 'auto',
    },
  },
  
  // Special styling for auto-scroll version
  [theme.breakpoints.down('md')]: {
    flexShrink: 0,
    cursor: 'pointer',
    boxShadow: theme.shadows[2], // Consistent shadow
    '&:not(:hover)': {
      boxShadow: theme.shadows[2],
    },
  },
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2rem',
  lineHeight: 1.2,
  marginBottom: theme.spacing(0.5),
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem',
    marginBottom: theme.spacing(1),
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
  
  // Use solid color instead of gradient for better compatibility
  color: theme.palette.primary.main,
  
  // Optional: Add gradient only if browser supports it
  '@supports (background-clip: text)': {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    
    // Fallback for older browsers
    '&:not([style*="background"])': {
      color: theme.palette.primary.main,
    },
  },
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  fontWeight: 500,
  lineHeight: 1.4,
  
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.125rem',
  },
}));

// Counter animation hook
const useCountAnimation = (endValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const numericValue = parseFloat(endValue.replace(/[^\d.]/g, ''));
    if (isNaN(numericValue)) return;
    
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(numericValue * easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, endValue, duration]);
  
  return [count, setIsVisible];
};

const AnimatedStatCard = ({ stat, index }) => {
  const [count, setIsVisible] = useCountAnimation(stat.value);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
        }
      },
      { threshold: 0.5 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [index, setIsVisible]);
  
  const formatValue = (value, originalValue) => {
    if (originalValue.includes('+')) return `${value.toLocaleString()}+`;
    if (originalValue.includes('.')) return value.toFixed(1);
    return value.toLocaleString();
  };
  
  return (
    <StatCard ref={cardRef} elevation={2}>
      <StatValue variant="h3" component="div">
        {formatValue(count, stat.value)}
      </StatValue>
      <StatLabel variant="body2">
        {stat.label}
      </StatLabel>
    </StatCard>
  );
};

const StatsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  
  const stats = [
    { value: "1200", label: "Fresh Products" },
    { value: "45000", label: "Happy Customers" },
    { value: "120", label: "Cities Served" },
    { value: "4.9", label: "Average Rating" },
  ];
  
  // Duplicate stats for seamless infinite scroll
  const scrollingStats = isMobile ? [...stats, ...stats] : stats;
  
  useEffect(() => {
    // Pause auto-scroll when user interacts
    const handleUserInteraction = () => {
      setShouldAutoScroll(false);
      setTimeout(() => setShouldAutoScroll(true), 5000);
    };
    
    if (isMobile) {
      document.addEventListener('touchstart', handleUserInteraction);
      document.addEventListener('scroll', handleUserInteraction);
      
      return () => {
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('scroll', handleUserInteraction);
      };
    }
  }, [isMobile]);
  
  return (
    <Section component="section" aria-label="Company Statistics">
      <Container 
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <SectionTitle variant="h4" component="h2">
          Trusted by Thousands
        </SectionTitle>
        
        <StatsContainer>
          {isMobile ? (
            // Mobile: Auto-scrolling version
            <ScrollingGrid shouldScroll={shouldAutoScroll}>
              {scrollingStats.map((stat, index) => (
                <AnimatedStatCard 
                  key={`${stat.label}-${index}`} 
                  stat={stat} 
                  index={index % stats.length}
                />
              ))}
            </ScrollingGrid>
          ) : (
            // Desktop: Static grid version
            <ScrollingGrid>
              {stats.map((stat, index) => (
                <AnimatedStatCard 
                  key={stat.label} 
                  stat={stat} 
                  index={index}
                />
              ))}
            </ScrollingGrid>
          )}
        </StatsContainer>
        
        {/* Mobile instruction */}
        {isMobile && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ opacity: 0.7 }}
            >
              Tap to pause • Swipe to explore
            </Typography>
          </Box>
        )}
      </Container>
    </Section>
  );
};

export default StatsSection;