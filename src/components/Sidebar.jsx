import { NavLink } from "react-router-dom"
import navigation from "../navigation/Navigation"



const Sidebar = () => {
  
  return (
    <aside className="w-[250px] bg-[var(--main-bg)] h-screen lg:flex flex-col  pt-10 border-r-2 border-white/10 hidden ">
      <h1 className="bg-linear-[45deg] from-orange-600  to-red-300 font-extrabold text-2xl bg-clip-text text-transparent pb-4 ps-6 ">Hassan Shop</h1>
      {navigation.map(link => {

        return (

          <NavLink key={link.to} to={link.to}
            className={({isActive}) =>
              `${isActive ? "text-orange-500" : "text-white"}  flex items-center ps-8 gap-2 text-xl font-semibold py-3 hover:text-orange-500 transition-all duration-250 `
            }
          >
            {link.icon}
            {link.name}
            
          </NavLink>
        )
      })}

      
    </aside>
  )
}

export default Sidebar