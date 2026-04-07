import React from "react";
import { Box, Typography, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    "&:hover": {
        transform: "translateY(-5px)",
    },
}));

const ImageBox = styled(Box)(({ theme }) => ({
    width: "100%",
    paddingTop: "100%", // 1:1 Aspect Ratio
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: "#3a1318", // dark red fallback
    marginBottom: theme.spacing(2),
}));

const StyledImage = styled("img")({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
});

const SaleBadge = styled(Box)({
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: "#d32f2f",
    color: "white",
    fontWeight: "bold",
    fontSize: "0.75rem",
    padding: "4px 12px",
    borderRadius: "16px",
    zIndex: 2,
});

const AddToCartButton = styled(Button)({
    marginTop: "12px",
    borderRadius: "24px",
    border: "2px solid #5a1820",
    color: "#5a1820",
    fontWeight: "bold",
    padding: "8px 0",
    width: "100%",
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#5a1820",
        color: "white",
    },
});

const HomepageProductCard = ({ product }) => {
    const navigate = useNavigate();

    const discount = product.discountPercentage || 0;
    const image = product.images?.[0] || product.image || "/placeholder.png";

    const originalPrice = product.price;
    const currentPrice = discount > 0 ? product.discountPrice || Math.round((originalPrice * (100 - discount)) / 100) : originalPrice;

    return (
        <CardContainer onClick={() => navigate(`/product/${product._id}`)}>
            <ImageBox>
                {discount > 0 && <SaleBadge>SALE</SaleBadge>}
                <StyledImage src={image} alt={product.name} />
            </ImageBox>

            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333", mb: 0.5, textAlign: "center" }}>
                {product.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {discount > 0 && (
                    <Typography variant="body2" sx={{ color: "#888", textDecoration: "line-through" }}>
                        Rs. {originalPrice.toFixed(2)}
                    </Typography>
                )}
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", fontSize: "1.1rem" }}>
                    Rs. {currentPrice.toFixed(2)}
                </Typography>
            </Box>

            <AddToCartButton
                variant="outlined"
                onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart logic here if available, else navigate to product page
                    navigate(`/product/${product._id}`);
                }}
            >
                Add to cart
            </AddToCartButton>
        </CardContainer>
    );
};

export default HomepageProductCard;
