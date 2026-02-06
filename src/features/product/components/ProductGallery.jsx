import { useState } from "react";

const ProductGallery = ({ images }) => {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 ">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImg(idx)}
            className={`flex-shrink-0 w-24 h-24 bg-gray-100 rounded flex items-center justify-center p-2 border-2 transition-all ${
              activeImg === idx ? 'border-black' : 'border-transparent'
            }`}
          >
             {/* Using a placeholder SVG for demo purposes if no actual image */}
             <img src={img} alt={`Thumbnail ${idx}`} className="object-contain w-full h-full mix-blend-multiply" />
          </button>
        ))}
      </div>

      <div className="flex-1 bg-gray-200 rounded flex items-center justify-center p-8 min-h-[400px] md:min-h-[600px] relative">
         <img 
            src={images[activeImg]} 
            alt="Product Main" 
            className="w-full max-w-md object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105" 
         />
      </div>
    </div>
  );
};
export default ProductGallery