import { useContext } from "react"
import { ApiContext } from "../contexts/ApiContext"



const CategoryFilter = () => {
    const {category, setCategory} = useContext(ApiContext)
  return (
    <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        className="w-full md:w-80 lg:w-100 bg-white py-2 px-4 rounded-lg border-none outline-none text-xl text-gray-700 font-medium">
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="miscellaneous">Miscellaneous</option>
            <option value="shoes">Shoes</option>
            <option value="furniture">Furniture</option>
            <option value="clothes">Clothes</option>
        </select>
    </div>
  )
}

export default CategoryFilter