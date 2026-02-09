import React from "react";
import { ProductCard } from "./ProductCard";

const FlashSalesProducts = React.memo(({ products, loading, error }) => {
  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Something went wrong</p>;
  }
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </>
  );
});

export default FlashSalesProducts;