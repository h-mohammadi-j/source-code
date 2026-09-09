import { useContext } from "react"
import { ApiContext } from "../contexts/ApiContext"


const PriceFilter = () => {
    const {price, setPrice} = useContext(ApiContext)
  return (
    <div>
        <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="range" min="0" max="100" className="w-full md:w-80 lg:w-100 bg-white rounded-lg border-none outline-none text-xl text-gray-700 font-medium" />

        <div className="w-full flex items-center justify-between">
            <span>$0</span>
            <span>$50</span>
            <span>$100</span>
        </div>
    </div>
  )
}

export default PriceFilter