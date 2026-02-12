
import React from 'react'

const ProductCategory = ({categories}) => {
const handleShowCategory = () =>{
    
}

  return (
 <>
    {/* Sidebar */}
          <aside className="hidden lg:block w-64">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category._id}>
                  <button className="text-gray-600 hover:text-black" onClick={handleShowCategory}>
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside></>
  )
}

export default ProductCategory
