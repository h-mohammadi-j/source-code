import { Link, NavLink } from "react-router-dom";
import navigation from "../navigation/Navigation";

const Mobile = () => {
  return (
    <nav className="flex w-full h-[70px] fixed bg-[var(--main-bg)] text-white left-0 bottom-0 items-center justify-around lg:hidden z-50">
      {navigation.map((link) => {
        return (
          <NavLink
            key={link.to}
            to={link.to}
            className={({isActive}) =>
              `${isActive ? "text-orange-500" : "text-white"} flex items-center ps-8 gap-2 text-2xl font-semibold py-3 hover:text-orange-500 transition-all duration-250 `
            }
          >
            {link.icon}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Mobile;
