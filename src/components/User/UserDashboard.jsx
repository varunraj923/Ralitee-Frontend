import React from 'react'
import FlashSalesSection from './FlashSaleFeature/FlashSalesSection'
import BestSelling from './BestSellingProductFeature/BestSelling'
import ExploreProduct from './ExploreFeature/ExploreProduct'

const UserDashboard = () => {
  return (
    <div>
    <FlashSalesSection/>
    <BestSelling/>
    <ExploreProduct/>
    </div>
  )
}

export default UserDashboard
