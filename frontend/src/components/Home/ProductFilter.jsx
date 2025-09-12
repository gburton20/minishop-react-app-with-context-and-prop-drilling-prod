import React from 'react'

const ProductFilter = ({onCategoryChange}) => {
  return (
    <>
        <div className='product-filter'>
            <button
                className='product-filter-button-all'
                // Each time the user clicks this button, call the onCategoryChange function in Home.jsx and pass it the string 'all' as an argument:
                onClick={() => onCategoryChange('All')}
                // An aria-label to ensure this button is accessible for screen readers
                aria-label="All categories"
            >
                All 🌎
            </button>
            <button
                className='product-filter-button-clothes'
                onClick={() => onCategoryChange('Clothes')}
                aria-label="Clothes category"
            >
                Clothes 👕
            </button>
            <button
                className='product-filter-button-electronics'
                onClick={() => onCategoryChange('Electronics')}
                aria-label="Electronics category"
            >
                Electronics 💻
            </button>
            <button
                className='product-filter-button-furniture'
                onClick={() => onCategoryChange('Furniture')}
                aria-label="Furniture category"
            >
                Furniture 🪑
            </button>
            <button
                className='product-filter-button-shoes'
                onClick={() => onCategoryChange('Shoes')}
                aria-label="Shoes category"
            >
                Shoes 👟
            </button>
            <button
                className='product-filter-button-miscellaneous'
                onClick={() => onCategoryChange('Miscellaneous')}
                aria-label="Miscellaneous category"
            >
                Miscellaneous ❓
            </button>
        </div>
    </>
  )
}

export default ProductFilter