import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { CheckCircle2, Award, Heart, Users } from "lucide-react";

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
    color: "#3a1318",
    marginBottom: theme.spacing(1),
    fontFamily: "'Inter', sans-serif",
}));

const SubTitle = styled(Typography)(({ theme }) => ({
    fontSize: "0.95rem",
    color: "#5c4033",
    marginBottom: theme.spacing(6),
    fontFamily: "'Inter', sans-serif",
    textAlign: "center",
}));

const CardsContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: theme.spacing(3),
    width: "100%",
    maxWidth: "1200px",

    [theme.breakpoints.down("md")]: {
        gap: theme.spacing(2),
    },
}));

const ValueCard = styled(Box)(({ theme }) => ({
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: theme.spacing(4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: "calc(25% - 24px)", // 4 cards per row
    minWidth: "220px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",

    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    },

    [theme.breakpoints.down("md")]: {
        width: "calc(50% - 16px)", // 2 cards per row on tablets
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%", // 1 card per row on mobile
    },
}));

const IconWrapper = styled(Box)({
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#fefdfa",
    border: "1px solid #f0e6d2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
});

const CardTitle = styled(Typography)(({ theme }) => ({
    fontWeight: "600",
    fontSize: "1.1rem",
    color: "#3e2723",
    marginBottom: theme.spacing(1.5),
}));

const CardDesc = styled(Typography)({
    fontSize: "0.85rem",
    color: "#795548",
    lineHeight: 1.5,
});

const valuesData = [
    {
        icon: <CheckCircle2 color="#10b981" size={28} strokeWidth={2.5} />,
        title: "Sustainability",
        desc: "Responsibly sourced ingredients and eco-friendly packaging.",
    },
    {
        icon: <Award color="#f59e0b" size={28} strokeWidth={2.5} />,
        title: "Uncompromised Quality",
        desc: "Premium ingredients with strict quality checks.",
    },
    {
        icon: <Heart color="#ef4444" size={28} strokeWidth={2.5} />,
        title: "Health First",
        desc: "No artificial colors, flavors, or preservatives.",
    },
    {
        icon: <Users color="#3b82f6" size={28} strokeWidth={2.5} />,
        title: "Community Driven",
        desc: "Supporting farmers and growing together.",
    },
];

const OurCoreValues = () => {
    return (
        <SectionContainer>
            <Title>Our Core Values</Title>
            <SubTitle>The principles that guide everything we create at Ralitee.</SubTitle>

            <CardsContainer>
                {valuesData.map((val, idx) => (
                    <ValueCard key={idx}>
                        <IconWrapper>{val.icon}</IconWrapper>
                        <CardTitle>{val.title}</CardTitle>
                        <CardDesc>{val.desc}</CardDesc>
                    </ValueCard>
                ))}
            </CardsContainer>
        </SectionContainer>
    );
};

export default OurCoreValues;
