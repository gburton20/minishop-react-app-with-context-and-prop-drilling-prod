import React from 'react'
import ProductCard from './ProductCardsList/ProductCard'

const BannerAdContainer = () => {
return (
    <>
        <div 
            className='banner-ad-div' 
            style={{ position: 'relative' }}>
            <h1 className='banner-h1'>
                Minishop's deals of the day!
            </h1>
        </div>
    </>
)
}

export default BannerAdContainer