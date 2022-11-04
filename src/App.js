import { useEffect, useState } from 'react'
import './App.css'
import Category from './components/Category'
import Filter from './components/Filter'
import Navbar from './components/Navbar'
import Products from './components/Products'
import ProductsList from './components/ProductsList'

function App() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [sort, setSort] = useState('latest')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    let result = products
    result = filterSearchTitle(result)
    result = sortDate(result)
    result = filterSelectedCategory(result)
    setFilteredProducts(result)
  }, [products, sort, searchValue, selectedCategory])

  const searchHandler = (e) => {
    setSearchValue(e.target.value.trim().toLowerCase())
  }

  const sortHandler = (e) => {
    setSort(e.target.value)
  }

  const selectCategoryHandler = (e) => {
    setSelectedCategory(e.target.value)
  }

  const filterSelectedCategory = (array) => {
    if (!selectedCategory) return array
    return array.filter((item) => item.categoryId === selectedCategory)
  }

  const filterSearchTitle = (array) => {
    return array.filter((p) => p.title.toLowerCase().includes(searchValue))
  }

  const sortDate = (array) => {
    let sortedProducts = [...array]
    return sortedProducts.sort((a, b) => {
      if (sort === 'latest') {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
      } else if (sort === 'earliest') {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
      }
    })
  }

  // getting data from LocalStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || []
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || []
    setProducts(savedProducts)
    setCategories(savedCategories)
  }, [])

  // Saving data in LocalStorage
  useEffect(() => {
    if (products.length) {
      localStorage.setItem('products', JSON.stringify(products))
    }
  }, [products])

  useEffect(() => {
    if (categories.length) {
      localStorage.setItem('categories', JSON.stringify(categories))
    }
  }, [categories])

  return (
    <div>
      <div className="bg-slate-800 min-h-screen">
        <Navbar />
        <div className="container max-w-screen-sm mx-auto p-4">
          <Category setCategories={setCategories} />
          <Products setProducts={setProducts} categories={categories} />
          <Filter
            categories={categories}
            sort={sort}
            searchValue={searchValue}
            onSort={sortHandler}
            onSearch={searchHandler}
            selectedCategory={selectedCategory}
            onSelectCategory={selectCategoryHandler}
          />
          <ProductsList
            products={filteredProducts}
            setProducts={setProducts}
            categories={categories}
          />
        </div>
      </div>
    </div>
  )
}

export default App
