import { MdAccountCircle } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";
import { useContext, useState } from "react";
import { ApiContext } from "../contexts/ApiContext";
import { Link, useNavigate } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import SearchFilter from "./SearchFilter";
import PriceFilter from "./PriceFilter";


const UserNotif = () => {
  const { customer, userLogin } = useContext(ApiContext);
  const navigate = useNavigate();

  const check = () => {
    if (!userLogin) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="w-11/12 bg-(--main-bg) fixed top-0 left-1/2 transform -translate-x-1/2 translate-y-[-90%] opacity-20 z-50 flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-5 px-8 border-2 border-orange-500 rounded-bl-3xl rounded-br-3xl cursor-pointer hover:opacity-100 transition-opacity duration-400 group hover:translate-y-0 overflow-hidden border-t-tranparent">
      <div className="flex items-center flex-wrap xl:flex-nowrap gap-4 px-4 border-r-2 border-white/10">
        <SearchFilter />
        <CategoryFilter />

        <PriceFilter />
        
      </div>

      <div className="flex items-center gap-4">
        <div className="flex item-center gap-2 border-r-2 border-white/20 pe-6 ">
          <p className="text-lg font-semibold">
            {customer?.userName || "Guest"}
          </p>
          <MdAccountCircle size={30} />
        </div>
        <div className="flex items-center gap-2">
          <Link onClick={check}>
            <FaShoppingBasket
              size={30}
              className="hover:text-orange-500 transition-text duration-300"
              title="Go to payment page"
            />
          </Link>
          <div className="text-lg font-semibold bg-orange-400 w-10 h-10 rounded-full grid place-items-center">
            {customer?.productTotal || 0}
          </div>
        </div>
      </div>
      <div className="w-full h-4 bg-white fixed -bottom-1.5 left-0"></div>
    </div>
  );
};

export default UserNotif;
