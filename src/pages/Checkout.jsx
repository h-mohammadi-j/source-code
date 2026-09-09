import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { useContext } from "react";
import { ApiContext } from "../contexts/ApiContext";
import { FaAngleLeft } from "react-icons/fa";

const Checkout = () => {
  const { products, customer } = useContext(ApiContext);

  const discount = (customer?.totalPrice / 100) * 2;

  const shipping = customer?.productTotal * 2;

  const total = customer?.totalPrice - shipping - discount;

  console.log(discount);

  return (
    <div className="w-full h-screen overflow-x-hidden overflow-y-auto scrollbar-none flex flex-col gap-6 bg-(--main-bg) p-10">
      <div className="w-full flex items-center justify-start gap-2 text-white text-xl">
        <Link
          to="/"
          className="hover:text-orange-500 transition-text duration-300"
        >
          Home
        </Link>
        <FaAngleRight size={20} />
        <span>Checkout</span>
      </div>

      <div className="w-full flex gap-6">
        <div className="w-full lg:min-w-3/5 flex flex-col justify-between border-2 border-orange-500 rounded-lg text-white ">
          <table>
            <thead className="border-b-2 border-orange-500 text-2xl ">
              <tr>
                <th className="py-4 px-4 text-left">Product</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Quantity</th>
                <th className="py-4 px-4">Total</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {customer?.cart?.map((cart) => {
                const product = products?.find(
                  (product) => product.id === cart.productId,
                );
                return (
                  <tr className="border-b-2 w-full border-orange-500 text-2xl font-medium text-center">
                    <td className="py-4 px-8">
                      <div className="flex items-center gap-3">
                        <img
                          className="max-w-14 min-w-14  object-contain border-2 border-orange-400 p-0.5 rounded-md"
                          src={product?.category?.image?.[0]}
                          alt=""
                        />
                        <p>{product.title}</p>
                      </div>
                    </td>
                    <td className="py-4 px-8">${cart.price}</td>
                    <td className="py-4 px-8">{cart.quantity}</td>
                    <td className="py-4 px-8">${cart.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link
            to="/"
            className="ml-6 my-6 text-2xl py-2 px-3 text-medium flex items-center gap-3 border-2 border-orange-300 rounded-lg cursor-pointer  w-fit"
          >
            <FaAngleLeft />
            CONTINUE SHOPPING
          </Link>
        </div>

        <div className="text-white h-fit text-2xl w-full border-2 border-orange-500 rounded-lg">
          <p className="py-6 px-4 border-b-2 border-orange-500 font-bold text-3xl text-center">
            Order Summary
          </p>
          <ul className="w-full text-2xl font-medium">
            <li className="py-5 px-4 flex items-center justify-between border-b-2 border-orange-500/20">
              <p>Subtotal</p>
              <p>${customer?.totalPrice}.00</p>
            </li>
            <li className="py-5 px-4 flex items-center justify-between border-b-2 border-orange-500/20">
              <p>Shipping</p>
              <p>${shipping}.00</p>
            </li>
            <li className="py-5 px-4 flex items-center justify-between border-b-2 border-orange-500/20">
              <p>Discount</p>
              <p>${discount}</p>
            </li>
            <li className="py-5 px-4 flex items-center justify-between border-b-2 border-orange-500/20">
              <p>Total</p>
              <p>${total}</p>
            </li>
          </ul>
          <button className=" border-3 border-yellow-300 font-bold rounded-lg cursor-pointer block mx-auto my-10 overflow-hidden py-2">
            <Link to="/payment" className="w-full h-full bg-orange-400 py-2 px-6 text-2xl active:bg-orange-500 transition-bg duration-300">Checkout</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
