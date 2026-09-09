import { useContext, useRef, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../contexts/ApiContext";
import { deleteCusomerCart, postPaymentInfo, updateCustomer } from "../api/products";

const Payment = () => {
  const { products, customer } = useContext(ApiContext);

  const cardImageRef = useRef();

  const [account, setAccount] = useState(0);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [ccv, setCcv] = useState(0);

  console.log(account)
  const navigate = useNavigate();

  const discount = (customer?.totalPrice / 100) * 2;
  const shipping = customer?.productTotal * 2.5;
  const total = customer?.totalPrice - shipping - discount;

  
  if (account === 1234567890123456) {
    cardImageRef.current.src = "/mastercard.png";
    console.log("master");
  } 
  if (account === 4321567890654321) {
    cardImageRef.current.src = "/visa.png";
    console.log("visa");
  }

  const cardDetailHandler = async (e) => {
    e.preventDefault();

    const data = {
      name: customer.name,
      email: customer.email,
      totalProduct: customer.productTotal,
      totalprice: customer.totalPrice,
      discount: discount,
      shipping: shipping,
      total: total,
    };

    try {
      await postPaymentInfo(data);
    } catch (error) {
      console.log(error.message);
    }

    await updateCustomer(customer.id, {
      ...customer,totalPrice: 0, productTotal: 0, cart:[]
    })

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="w-full h-screen bg-(--main-bg) flex flex-col p-10 text-white">
      <div className="mb-12">
        <div className="w-full flex items-center justify-start gap-2 text-white text-2xl">
          <Link
            to="/"
            className="hover:text-orange-500 transition-text duration-300"
          >
            Home
          </Link>
          <FaAngleRight size={20} />

          <Link
            to="/checkout"
            className="hover:text-orange-500 transition-text duration-300"
          >
            Checkout
          </Link>
          <FaAngleRight size={20} />
          <span>Payment</span>
        </div>
      </div>

      <div className="w-full flex h-screen">
        <form onSubmit={cardDetailHandler} className="w-full h-150 flex  gap-6">
          <div className="border-2 h-full border-white/20 rounded-lg p-6 flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Billing Details</h2>
            <label className="w-full flex flex-col gap-1">
              <span className="text-lg font-medium">Full name</span>
              <input
                className="py-1.5 px-4 border-2 border-white/20 rounded-md text-xl"
                type="text"
                placeholder="Enter your full name"
                
              />
            </label>
            <label className="w-full flex flex-col gap-1">
              <span className="text-lg font-medium">Email Address</span>
              <input
                className="py-1.5 px-4 border-2 border-white/20 rounded-md text-xl"
                type="email"
                placeholder="Enter your email addrees"
                
              />
            </label>
            <label className="w-full flex flex-col gap-1">
              <span className="text-lg font-medium">Phone Number</span>
              <input
                className="py-1.5 px-4 border-2 border-white/20 rounded-md text-xl"
                type="tel"
                placeholder="Enter your phone number"
                
              />
            </label>
            <label className="w-full flex flex-col gap-1">
              <span className="text-lg font-medium">Address</span>
              <input
                className="py-1.5 px-4 border-2 border-white/20 rounded-md text-xl"
                type="text"
                placeholder="Enter your home address"
                
              />
            </label>

            <div className="w-full flex items-center gap-4">
              <label className="w-full flex flex-col gap-1">
                <span className="text-lg font-medium">City</span>
                <input
                  className="py-1.5 px-4 border-2 border-white/20 rounded-md text-xl"
                  type="tel"
                  placeholder="Enter your City"
                  
                />
              </label>
              <label className="w-full flex flex-col gap-1">
                <span className="text-lg font-medium">Postal Code</span>
                <input
                  className="py-1.5 px-4 border-2 border-white/20 rounded-md text-xl"
                  type="text"
                  placeholder="Enter your postal code"
                  
                />
              </label>
            </div>
          </div>

          <div className="border-2 h-full border-white/20 rounded-lg p-6 flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Card Details</h2>

            <div className="w-full h-68 flex items-center justify-center">
              <img
                className="h-full"
                ref={cardImageRef}
                src="/cards.png"
                alt=""
              />
            </div>

            <label className="w-full flex flex-col gap-1">
              <span className="text-lg font-medium">Account Number</span>
              <input
                onChange={(e) => setAccount(e.target.value)}
                className="py-1.5 px-4 border-2 border-white/20 rounded-md text-xl"
                type="number"
                placeholder="Enter your account number"
                
              />
            </label>

            <div className="w-full flex items-center gap-4">
              <label className="w-full flex flex-col gap-1">
                <span className="text-lg font-medium">Expires End</span>

                <div className="py-1.5 px-4 border-2 border-white/20 rounded-md text-xl flex gap-2">
                  <input
                    onChange={(e) => setMonth(e.target.value)}
                    className="text-xl text-white w-12"
                    type="months"
                    placeholder="mm"
                    
                  />
                  <span>/</span>
                  <input
                    onChange={(e) => setYear(e.target.value)}
                    className="text-xl text-white w-14 px-4"
                    type="year"
                    placeholder="yy"
                    
                  />
                </div>
              </label>
              <label className="w-full flex flex-col gap-1">
                <span className="text-lg font-medium">CCV</span>
                <input
                  onChange={(e) => setCcv(e.target.value)}
                  className="py-1.5 px-4 border-2 border-white/20 rounded-md text-xl"
                  type="number"
                  placeholder="Enter your CCV"
                  
                />
              </label>
            </div>
          </div>
          <div className="text-white h-full text-2xl w-full border-2 border-white/20 rounded-lg">
            <p className="py-6 px-4 border-b-2 border-white/20 font-bold text-3xl text-center">
              Order Summary
            </p>
            <ul className="w-full text-2xl font-medium">
              <li className="py-5 px-4 flex items-center justify-between border-b-2 border-white/20">
                <p>Quantity</p>
                <p>{customer?.productTotal}</p>
              </li>
              <li className="py-5 px-4 flex items-center justify-between border-b-2 border-white/20">
                <p>Subtotal</p>
                <p>${customer?.totalPrice}.00</p>
              </li>
              <li className="py-5 px-4 flex items-center justify-between border-b-2 border-white/20">
                <p>Shipping</p>
                <p>${shipping}.00</p>
              </li>
              <li className="py-5 px-4 flex items-center justify-between border-b-2 border-white/20">
                <p>Discount</p>
                <p className="text-orange-400">-${discount}</p>
              </li>
              <li className="py-5 px-4 flex items-center justify-between border-b-2 border-white/20">
                <p>Total</p>
                <p>${total}</p>
              </li>
            </ul>
            <button className="w-62 border-3 border-yellow-300 font-bold rounded-lg cursor-pointer block mx-auto my-10 overflow-hidden py-2 bg-orange-400 px-6 text-2xl active:bg-orange-500 transition-bg duration-300">
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
