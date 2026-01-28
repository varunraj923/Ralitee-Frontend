import React from 'react'
import FlashSalesSection from './FlashSaleFeature/FlashSalesSection'
import BestSelling from './BestSellingProductFeature/BestSelling'
import ExploreProduct from './ExploreFeature/ExploreProduct'
import Footer from './Footer/Footer'

const UserDashboard = () => {
  return (
    <div>
    <FlashSalesSection/>
    <BestSelling/>
    <ExploreProduct/>
    <Footer/>
    </div>
  )
}

export default UserDashboard
