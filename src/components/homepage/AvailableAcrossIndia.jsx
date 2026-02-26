import React from "react";
import { Box, Typography, styled } from "@mui/material";

const SectionContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(6, 2),
    backgroundColor: "#f5f0e1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}));

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: "700",
    fontSize: "1.75rem",
    color: "#3a1318", // Dark red matching the theme
    marginBottom: theme.spacing(1),
    fontFamily: "'Inter', sans-serif",
}));

const SubTitle = styled(Typography)(({ theme }) => ({
    fontSize: "1rem",
    color: "#5c4033",
    marginBottom: theme.spacing(5),
    fontFamily: "'Inter', sans-serif",
}));

const LogosContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexwrap: "wrap",
    justifyContent: "center",
    gap: theme.spacing(3),
    width: "100%",
    maxWidth: "900px",

    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
    },
}));

const LogoCard = styled(Box)(({ theme }) => ({
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: theme.spacing(3, 4),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "250px",
    height: "100px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",

    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    },
}));

// Embedded SVGs for the logos to ensure they match and load quickly
const AmazonLogo = () => (
    <svg viewBox="0 0 100 100" width="60" height="60">
        <circle cx="50" cy="50" r="48" fill="#000000" />
        <path d="M66.4,61.9c-4.8,3.3-11.4,5.2-18.4,5.2c-10.4,0-20.2-4.1-27-11.3c-1.1-1.1-0.9-2.7,0.4-3.5c1.1-0.7,2.7-0.4,3.5,0.7 c5.6,6.1,13.8,9.5,22.6,9.5c6,0,11.7-1.6,16.1-4.4C64.6,57.5,67.6,60.8,66.4,61.9z" fill="#FF9900" />
        <path d="M68.7,56.1c-0.6-0.6-1.5-0.7-2.1-0.2c-2.3,2.2-5.4,4-8.9,5c-0.8,0.2-1.3,1.1-1,1.9c0.2,0.8,1.1,1.3,1.9,1c4.1-1.1,7.8-3.3,10.6-6 C69.7,57.3,69.5,56.5,68.7,56.1z" fill="#FF9900" />
        <text x="50" y="52" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="bold" fill="#ffffff" textAnchor="middle">amazon</text>
    </svg>
);

const FlipkartLogo = () => (
    <svg viewBox="0 0 100 100" width="60" height="60">
        <circle cx="50" cy="50" r="48" fill="#FFD000" />
        <path d="M45.5,25.4h11.2c2.1,0,3.6,1.4,3.6,3.3v4.6c0,1.9-1.5,3.3-3.6,3.3H49.1v8.8h5.3c2.1,0,3.6,1.4,3.6,3.3v4.6 c0,1.9-1.5,3.3-3.6,3.3H49.1v15.8c0,1.9-1.5,3.3-3.6,3.3h-7.1c-2.1,0-3.6-1.4-3.6-3.3V28.7C34.8,26.8,36.4,25.4,38.5,25.4h7L45.5,25.4z" fill="#0046E8" />
        <path d="M57.4,59.3l10.1-4c1.2-0.5,2.7-0.1,3.4,1.1c0.7,1.2,0.3,2.8-0.9,3.3L59.9,63.7c-1.2,0.5-2.7,0.1-3.4-1.1 C55.8,61.4,56.2,59.8,57.4,59.3z" fill="#0046E8" />
    </svg>
);

const BlinkitLogo = () => (
    <svg viewBox="0 0 100 100" width="120" height="40">
        <text x="50" y="30" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="900" fill="#F8CB46" textAnchor="middle" letterSpacing="-1">blinkit</text>
    </svg>
);

const AvailableAcrossIndia = () => {
    return (
        <SectionContainer>
            <Title>Available Across India</Title>
            <SubTitle>Trusted marketplaces where you can buy Ralitee Products</SubTitle>

            <LogosContainer>
                <LogoCard onClick={() => window.open("https://amazon.in", "_blank")}>
                    <AmazonLogo />
                </LogoCard>

                <LogoCard onClick={() => window.open("https://flipkart.com", "_blank")}>
                    <FlipkartLogo />
                </LogoCard>

                <LogoCard onClick={() => window.open("https://blinkit.com", "_blank")}>
                    <BlinkitLogo />
                </LogoCard>
            </LogosContainer>
        </SectionContainer>
    );
};

export default AvailableAcrossIndia;
