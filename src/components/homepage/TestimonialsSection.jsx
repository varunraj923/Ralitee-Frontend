// TestimonialsSection.jsx
import React, { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Avatar, 
  Typography, 
  Rating, 
  Stack, 
  useTheme,
  styled,
  useMediaQuery
} from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const testimonials = [
  { 
    name: "Asha", 
    role: "Home Chef", 
    review: "Freshest produce, always on time! The quality is exceptional and my family loves everything.", 
    rating: 5, 
    avatar: "/avatars/avatar1.png",
    initials: "AS"
  },
  { 
    name: "Vikram", 
    role: "Cafe Owner", 
    review: "Reliable weekly deliveries and great quality. My customers can taste the difference!", 
    rating: 5, 
    avatar: "/avatars/avatar2.png",
    initials: "VK"
  },
  { 
    name: "Neha", 
    role: "Mother", 
    review: "My family loves the subscription boxes — so convenient and always fresh produce!", 
    rating: 4.5, 
    avatar: "/avatars/avatar3.png",
    initials: "NH"
  },
  { 
    name: "Varun Raj", 
    role: "Software Developer", 
    review: "Perfect for my busy lifestyle. Fresh, organic produce delivered right to my door!", 
    rating: 5, 
    avatar: "/avatars/avatar4.png",
    initials: "VR"
  },
];

const Section = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
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
  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
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

const TestimonialsContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  margin: '0 auto',
  
  [theme.breakpoints.down('lg')]: {
    overflow: 'hidden',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginLeft: `-${theme.spacing(3)}`,
    marginRight: `-${theme.spacing(3)}`,
    
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '50px',
      zIndex: 10,
      pointerEvents: 'none',
    },
    '&::before': {
      left: 0,
      background: `linear-gradient(to right, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 40%, transparent 100%)`,
    },
    '&::after': {
      right: 0,
      background: `linear-gradient(to left, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 40%, transparent 100%)`,
    },
  },
}));

const ScrollingGrid = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'shouldScroll',
})(({ theme, shouldScroll }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  position: 'relative',
  zIndex: 1,
  
  [theme.breakpoints.up('lg')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing(3),
    position: 'static',
  },
  
  [theme.breakpoints.down('lg')]: {
    width: 'max-content',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    
    ...(shouldScroll && {
      animation: 'scroll-testimonials 25s linear infinite',
    }),
    
    '&:hover': {
      animationPlayState: 'paused',
    },
    
    '@keyframes scroll-testimonials': {
      '0%': {
        transform: 'translateX(50px)',
      },
      '100%': {
        transform: 'translateX(calc(-50% - 50px))',
      },
    },
  },
  
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(2.5),
    ...(shouldScroll && {
      animation: 'scroll-testimonials 30s linear infinite',
    }),
  },
  
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2.5),
  height: 'auto',
  minHeight: '240px',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
    zIndex: 5,
  },
  
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2.5),
    minHeight: '260px',
  },
  [theme.breakpoints.up('md')]: {
    minHeight: '250px',
  },
  [theme.breakpoints.up('lg')]: {
    position: 'static',
    minHeight: '240px',
    '&:hover': {
      zIndex: 'auto',
      transform: 'translateY(-6px)',
    },
  },
  
  [theme.breakpoints.down('lg')]: {
    flexShrink: 0,
    cursor: 'pointer',
    width: '270px',
    maxWidth: '85vw',
    boxShadow: theme.shadows[2],
  },
  
  [theme.breakpoints.down('sm')]: {
    width: '250px',
    padding: theme.spacing(2),
    minHeight: '220px',
  },
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  fontSize: '2rem',
  color: theme.palette.primary.main,
  opacity: 0.3,
  transform: 'rotate(180deg)',
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  position: 'relative',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  backgroundColor: theme.palette.primary.main,
  fontSize: '1.25rem',
  fontWeight: 600,
  border: `3px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[4],
  
  [theme.breakpoints.up('sm')]: {
    width: 70,
    height: 70,
    fontSize: '1.5rem',
  },
}));

const ReviewText = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  lineHeight: 1.5,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  flex: 1,
  textAlign: 'center',
  fontStyle: 'italic',
  
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.95rem',
    marginBottom: theme.spacing(2.5),
  },
  
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  justifyContent: 'center',
  
  '& .MuiRating-iconFilled': {
    color: '#ffc107',
  },
  '& .MuiRating-iconEmpty': {
    color: theme.palette.grey[300],
  },
  
  [theme.breakpoints.down('sm')]: {
    '& .MuiRating-icon': {
      fontSize: '1.2rem',
    },
  },
}));

const AuthorInfo = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: 'auto',
}));

const AuthorName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1rem',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
  
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.1rem',
  },
}));

const AuthorRole = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  },
}));

const TestimonialsSection = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  
  // Force auto-scroll to be true initially on mount
  useEffect(() => {
    setShouldAutoScroll(true);
  }, []);
  
  // Duplicate testimonials for seamless infinite scroll
  const scrollingTestimonials = !isLargeScreen ? [...testimonials, ...testimonials, ...testimonials] : testimonials;
  
  useEffect(() => {
    const handleUserInteraction = () => {
      setShouldAutoScroll(false);
      // Resume scrolling after 4 seconds
      setTimeout(() => setShouldAutoScroll(true), 4000);
    };
    
    if (!isLargeScreen) {
      document.addEventListener('touchstart', handleUserInteraction, { passive: true });
      document.addEventListener('scroll', handleUserInteraction, { passive: true });
      
      return () => {
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('scroll', handleUserInteraction);
      };
    }
  }, [isLargeScreen]);

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  return (
    <Section component="section" aria-label="Customer Testimonials">
      <Container 
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <SectionTitle variant="h4" component="h2">
          Customer Stories
        </SectionTitle>
        
        <TestimonialsContainer>
          <ScrollingGrid shouldScroll={shouldAutoScroll && !isLargeScreen}>
            {(isLargeScreen ? testimonials : scrollingTestimonials).map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} elevation={2}>
                <QuoteIcon />
                
                <AvatarContainer>
                  <StyledAvatar 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    onError={handleImageError}
                  >
                    {testimonial.initials}
                  </StyledAvatar>
                </AvatarContainer>

                <ReviewText>
                  "{testimonial.review}"
                </ReviewText>

                <Stack alignItems="center" spacing={1.5}>
                  <StyledRating
                    value={testimonial.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                    aria-label={`Rating: ${testimonial.rating} out of 5 stars`}
                  />
                  
                  <AuthorInfo>
                    <AuthorName>
                      {testimonial.name}
                    </AuthorName>
                    <AuthorRole>
                      {testimonial.role}
                    </AuthorRole>
                  </AuthorInfo>
                </Stack>
              </TestimonialCard>
            ))}
          </ScrollingGrid>
        </TestimonialsContainer>
        
        {/* Mobile instruction */}
        {!isLargeScreen && (
          <Box sx={{ textAlign: 'center', mt: 2.5 }}>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                opacity: 0.7,
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
              }}
            >
              {shouldAutoScroll ? 'Auto-scrolling • Touch to pause' : 'Paused • Will resume in 4s'}
            </Typography>
          </Box>
        )}
      </Container>
    </Section>
  );
};

export default TestimonialsSection;