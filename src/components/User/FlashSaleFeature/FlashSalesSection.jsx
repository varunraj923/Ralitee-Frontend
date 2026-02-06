import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";

const flashSaleProducts = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 120,
    originalPrice: 160,
    discount: 40,
    rating: 4.5,
    reviews: 88,
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    image:
      "https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 370,
    originalPrice: 400,
    discount: 30,
    rating: 5,
    reviews: 99,
  },
  {
    id: 4,
    name: "S-Series Comfort Chair",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99,
  },
  {
    id: 5,
    name: "Gaming Headset Pro",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 150,
    originalPrice: 200,
    discount: 25,
    rating: 5,
    reviews: 120,
  },
  {
    id: 6,
    name: "Gaming Headset Pro",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 150,
    originalPrice: 200,
    discount: 25,
    rating: 5,
    reviews: 120,
  },
];

const FlashSalesSection = () => {
  const scrollRef = useRef(null);

const endDate = new Date(Date.now() + 60 * 60 * 1000);


  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      setTimeLeft({
        days: String(
          Math.floor(diff / (1000 * 60 * 60 * 24))
        ).padStart(2, "0"),
        hours: String(
          Math.floor((diff / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        minutes: String(
          Math.floor((diff / (1000 * 60)) % 60)
        ).padStart(2, "0"),
        seconds: String(
          Math.floor((diff / 1000) % 60)
        ).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-[1170px] mx-auto px-4 py-16 font-sans ">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 md:gap-0">
        <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-20">
          {/* Title */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-5 h-10 bg-[#DB4444] rounded-[4px]" />
              <span className="text-[#DB4444] font-semibold">Today's</span>
            </div>
            <h2 className="text-4xl font-semibold tracking-[0.04em]">
              Flash Sales
            </h2>
          </div>

         
          <div className="flex items-center gap-4 md:gap-6">
            <TimeBox label="Days" value={timeLeft.days} />
            <Colon />
            <TimeBox label="Hours" value={timeLeft.hours} />
            <Colon />
            <TimeBox label="Minutes" value={timeLeft.minutes} />
            <Colon />
            <TimeBox label="Seconds" value={timeLeft.seconds} />
          </div>
        </div>

       
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scroll-smooth pb-8 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {flashSaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-center mt-10 border-b border-gray-200 pb-16">
        <button className="bg-[#DB4444] text-white px-12 py-4 rounded-[4px] font-medium hover:bg-red-600 transition">
          View All Products
        </button>
      </div>
    </section>
  );
};


const TimeBox = ({ label, value }) => (
  <div>
    <span className="text-xs font-medium">{label}</span>
    <div className="text-3xl font-bold leading-none mt-1">{value}</div>
  </div>
);

const Colon = () => (
  <span className="text-3xl text-[#E07575] leading-none mt-5">:</span>
);

export default FlashSalesSection;
