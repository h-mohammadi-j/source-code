import { IoHome } from "react-icons/io5";
import { AiFillDashboard } from "react-icons/ai";
import { TbChartCandleFilled } from "react-icons/tb";
import { IoPeople } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { MdAddCard } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";

const navigation = [
    {
        to:"/",
        name: "Home",
        icon: <IoHome />
    },
    {
        to:"/dashboard",
        name: "Dashboard",
        icon: <AiFillDashboard />
    },
    {
        to:"/products",
        name: "Products",
        icon: <TbChartCandleFilled />
    },
    {
        to:"/customers",
        name: "Customers",
        icon: <IoPeople />
    },
    {
        to:"/orders",
        name: "Orders",
        icon: <TiShoppingCart />
    },
    {
        to:"/cart",
        name: "Cart",
        icon: <MdAddCard />
    },
    {
        to:"/login",
        name: "Login",
        icon: <RiLoginCircleFill />
    }

]

export default navigation