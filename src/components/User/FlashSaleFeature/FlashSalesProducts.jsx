import React from "react";
import { ProductCard } from "./ProductCard";

const FlashSalesProducts = React.memo(({ products}) => {

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </>
  );
});

export default FlashSalesProducts;