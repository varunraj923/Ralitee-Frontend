import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ProductGallery from "./ProductGallery";
import { getProductById } from "../../api/product.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import BackButton from "../../components/common/BackButton.jsx";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;


  return (
    <div className="min-h-screen bg-white font-sans text-black mt-8">
      <main className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT SIDE (Gallery + Back Button) */}
          <div className="lg:col-span-7">

            {/* Back Button aligned with thumbnails */}
            <div className="hidden md:flex gap-4 mb-4">
              
              {/* This width matches thumbnail width (w-24) */}
              
             <BackButton/>

              {/* Spacer to match gallery structure */}
              <div className="flex-1"></div>
            </div>

            <ProductGallery images={product.images} />
          </div>

          {/* RIGHT SIDE (Details) */}
          <div className="lg:col-span-5">
            <ProductDetails product={product} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProductPage;