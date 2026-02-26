import React from "react";
import { ProductCard } from "./ProductCard";

const FlashSalesProducts = React.memo(({ products, setOpenSnackbar}) => {

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product._id} product={product}   setOpenSnackbar={setOpenSnackbar}/>
      ))}
    </>
  );
});

export default FlashSalesProducts;