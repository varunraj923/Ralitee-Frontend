import React from "react";
import { useSearchParams } from "react-router-dom";

const ProductCategory = ({
  categories,
  category,
}) => {
  const [, setSearchParams] = useSearchParams();

  const handleShowCategory = (name = "allproducts", _id = null) => {
    // Reset page to 1 whenever category changes
    setSearchParams({ category: name, id: _id, page: 1 });
  };

  return (
    <aside className="hidden lg:flex pl-4 hover:pl-6 w-64 hover:shadow-xl transition-all ease-in-out duration-500 hover:text-[1.03rem] py-4 ">
      <ul className="space-y-3">
        <h3 className="font-semibold text-lg mb-4 px-3 py-1">Categories</h3>
        <button
          className={`cursor-pointer hover:text-black px-3 py-1 rounded ${
            category === "allproducts"
              ? "bg-gray-200 text-black"
              : "text-gray-600"
          }`}
          onClick={() => handleShowCategory()}
        >
          All Products
        </button>

        {categories.map((currCategory) => (
          <li key={currCategory._id}>
            <button
              className={`hover:text-black px-3 py-1 rounded cursor-pointer ${
                currCategory.name === category
                  ? "bg-gray-200 text-black"
                  : "text-gray-600"
              }`}
              onClick={() =>
                handleShowCategory(currCategory.name, currCategory._id)
              }
            >
              {currCategory.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ProductCategory;
