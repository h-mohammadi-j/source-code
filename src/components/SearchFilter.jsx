import { useContext } from "react"
import { ApiContext } from "../contexts/ApiContext"


const SearchFilter = () => {
    const {search, setSearch} = useContext(ApiContext)
  return (
    <div>
        <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 lg:w-100 bg-white py-2 px-4 rounded-lg border-none outline-none text-xl text-gray-700 font-medium" type="text" placeholder="Search product..." />
    </div>
  )
}

export default SearchFilter