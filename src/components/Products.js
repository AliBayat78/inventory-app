import { useState } from 'react'

const Products = ({ categories, setProducts }) => {
  const [productsFormData, setProductsFormData] = useState({
    title: '',
    quantity: 0,
    categoryId: '',
  })

  const changeHandler = (e) => {
    const { name, value } = e.target
    setProductsFormData({ ...productsFormData, [name]: value })
  }

  const addNewProduct = (e) => {
    e.preventDefault()
    setProducts((prevState) => [
      ...prevState,
      { ...productsFormData, createdAt: new Date().toISOString(), id: new Date().getTime() },
    ])

    setProductsFormData({ title: '', quantity: 0, categoryId: '' })
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl text-slate-300 font-bold mb-2">Add New Product</h2>
      <form className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4">
        <div>
          <label htmlFor="product-title" className="block mb-1 text-slate-400">
            title
          </label>
          <input
            type="text"
            name="title"
            id="product-title"
            onChange={changeHandler}
            value={productsFormData.title}
            className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
          />
        </div>
        <div>
          <label htmlFor="product-quantity" className="block mb-1 text-slate-400">
            quantity
          </label>
          <input
            className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
            type="number"
            name="quantity"
            id="product-quantity"
            onChange={changeHandler}
            value={productsFormData.quantity}
          />
        </div>
        <div>
          <label htmlFor="product-category" className="block mb-1 text-slate-400">
            category
          </label>
          <select
            onChange={changeHandler}
            value={productsFormData.categoryId}
            name="categoryId"
            id="category"
            className="bg-transparent text-slate-400 rounded-xl w-full"
          >
            <option value="" className="bg-slate-500 text-slate-300">
              select a category
            </option>
            {categories.map((category) => {
              return (
                <option
                  key={category.id}
                  value={category.id}
                  className="bg-slate-500 text-slate-300"
                >
                  {category.title}
                </option>
              )
            })}
          </select>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <button
            id="add-new-product"
            className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2"
            onClick={addNewProduct}
          >
            Add new Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default Products
