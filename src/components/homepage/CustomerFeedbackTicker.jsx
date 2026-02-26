import React, { useState, useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import Marquee from "react-fast-marquee";

const TickerContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(4, 0),
    backgroundColor: "#f5f0e1",
    overflow: "hidden",
}));

const Title = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    fontWeight: "600",
    fontSize: "1.5rem",
    color: "#2e2e2e",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
        fontSize: "2rem",
    },
}));

const ScriptText = styled("span")({
    fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
    color: "#b07d35", // A golden/brownish red matching the screenshot's 'love' text
    fontSize: "2rem",
    margin: "0 8px",
    fontWeight: "bold",
});

const FeedbackCard = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: "50px",
    padding: "8px 24px 8px 8px",
    margin: "0 16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    border: "1px solid #f0e6d2",
    minWidth: "250px",
    transition: "transform 0.3s ease",
    "&:hover": {
        transform: "scale(1.02)",
    },
}));

const Avatar = styled("img")({
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "16px",
    border: "2px solid #cd9141",
});

const FeedbackText = styled(Typography)({
    fontSize: "0.95rem",
    color: "#5c4033",
    fontWeight: "500",
});

const feedbackData = [
    { text: "My parents loved it", avatar: "https://i.pravatar.cc/150?img=47" },
    { text: "Perfect sweetness and crunchy texture", avatar: "https://i.pravatar.cc/150?img=12" },
    { text: "Fresh, aromatic and not oily at all", avatar: "https://i.pravatar.cc/150?img=5" },
    { text: "Reminded me of my village festivals", avatar: "https://i.pravatar.cc/150?img=8" },
    { text: "Absolutely like homemade!", avatar: "https://i.pravatar.cc/150?img=32" },
    { text: "Best quality I have found online", avatar: "https://i.pravatar.cc/150?img=68" },
    { text: "So authentic and tasty", avatar: "https://i.pravatar.cc/150?img=44" },
    { text: "Will definitely order again", avatar: "https://i.pravatar.cc/150?img=59" },
];

const productsList = ["Thekua", "Aata", "Makhana", "Rice", "Sattu", "Pickles"];

const CustomerFeedbackTicker = () => {
    const [currentProductIndex, setCurrentProductIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProductIndex((prev) => (prev + 1) % productsList.length);
        }, 3000); // Change product name every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <TickerContainer>
            <Title>
                Our customers <ScriptText>love</ScriptText> our {productsList[currentProductIndex]}
            </Title>

            <Marquee speed={40} gradient={true} gradientColor={[245, 240, 225]} pauseOnHover={true}>
                {feedbackData.map((item, index) => (
                    <FeedbackCard key={index}>
                        <Avatar src={item.avatar} alt="Customer Avatar" />
                        <FeedbackText>{item.text}</FeedbackText>
                    </FeedbackCard>
                ))}
            </Marquee>
        </TickerContainer>
    );
};

export default CustomerFeedbackTicker;
