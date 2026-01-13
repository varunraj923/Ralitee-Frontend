// Footer.jsx
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  TextField,
  Button,
  useTheme,
  styled,
} from "@mui/material";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

const BrandContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const BrandImage = styled('img')(({ theme }) => ({
  height: 32,
  width: 32,
  
  [theme.breakpoints.up('sm')]: {
    height: 36,
    width: 36,
  },
}));

const BrandTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  fontSize: '1.1rem',
  
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.25rem',
  },
}));

const BrandDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  maxWidth: 360,
  textAlign: 'center',
  
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  fontSize: '0.875rem',
  
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
}));

const SectionLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  opacity: 0.85,
  fontSize: '0.875rem',
  transition: 'opacity 0.2s ease',
  
  '&:hover': {
    opacity: 1,
  },
  
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  },
}));

const NewsletterContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
    marginTop: theme.spacing(3),
  },
}));

const NewsletterForm = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

const EmailInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1),
  },
  
  '& .MuiInputBase-input': {
    fontSize: '0.875rem',
    
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9rem',
    },
  },
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  fontSize: '0.875rem',
  minWidth: 'auto',
  paddingX: theme.spacing(2),
  
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
    paddingX: theme.spacing(3),
  },
}));

const BottomBar = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  flexDirection: 'column',
  textAlign: 'center',
  
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(3),
  },
}));

const BottomLinks = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  spacing: 1,
  
  [theme.breakpoints.up('sm')]: {
    spacing: 2,
  },
}));

const Footer = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();

  const sections = [
    { title: "Shop", links: ["All Products", "Boxes", "Subscriptions", "Gift Cards"] },
    { title: "Company", links: ["About", "Careers", "Sustainability", "Contact"] },
    { title: "Support", links: ["FAQ", "Shipping", "Returns", "Payment"] },
  ];

  return (
    <FooterContainer component="footer">
      <Container 
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3, md: 4 }, // Responsive horizontal padding
        }}
      >
        <Grid container spacing={{ xs: 3, sm: 4 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <BrandContainer>
              <BrandImage
                src="/favicon-transparent.png"
                alt="Cultivated Harvest"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <BrandTitle variant="h6">
                Cultivated Harvest
              </BrandTitle>
            </BrandContainer>
            <BrandDescription
              variant="body2"
              color="text.secondary"
            >
              Fresh organic produce delivered with transparency and care.
            </BrandDescription>
          </Grid>

          {/* Navigation Links */}
          {sections.map((section) => (
            <Grid 
              item 
              xs={6} 
              sm={4} 
              md={2} 
              key={section.title}
              sx={{
                [theme.breakpoints.down('md')]: {
                  textAlign: 'center',
                },
              }}
            >
              <SectionTitle variant="subtitle2">
                {section.title}
              </SectionTitle>
              <Stack 
                spacing={1}
                sx={{
                  alignItems: { xs: 'center', md: 'flex-start' },
                }}
              >
                {section.links.map((link) => (
                  <SectionLink
                    key={link}
                    href="#"
                    underline="hover"
                  >
                    {link}
                  </SectionLink>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Newsletter Section */}
          <Grid item xs={12} md={4}>
            <NewsletterContainer>
              <SectionTitle variant="subtitle2">
                Subscribe
              </SectionTitle>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  mb: { xs: 1.5, sm: 2 },
                }}
              >
                Get updates on seasonal produce and exclusive offers.
              </Typography>
              <NewsletterForm>
                <EmailInput
                  placeholder="Your email"
                  size="small"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: 1,
                    },
                  }}
                />
                <SubscribeButton
                  variant="contained"
                  size="small"
                >
                  Subscribe
                </SubscribeButton>
              </NewsletterForm>
            </NewsletterContainer>
          </Grid>
        </Grid>

        {/* Bottom Copyright Bar */}
        <BottomBar>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              order: { xs: 2, sm: 1 },
            }}
          >
            © {year} Cultivated Harvest. All rights reserved.
          </Typography>
          <BottomLinks 
            direction="row" 
            spacing={{ xs: 1.5, sm: 2 }}
            sx={{
              order: { xs: 1, sm: 2 },
            }}
          >
            <Link 
              href="#" 
              color="text.secondary" 
              variant="body2"
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
              }}
            >
              Terms
            </Link>
            <Link 
              href="#" 
              color="text.secondary" 
              variant="body2"
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
              }}
            >
              Privacy
            </Link>
            <Link 
              href="#" 
              color="text.secondary" 
              variant="body2"
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
              }}
            >
              Cookie
            </Link>
          </BottomLinks>
        </BottomBar>
      </Container>
    </FooterContainer>
  );
};

export default Footer;