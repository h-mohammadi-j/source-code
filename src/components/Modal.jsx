import { useContext, useRef } from "react";
import { ApiContext } from "../contexts/ApiContext";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { updateCustomer } from "../api/products";

const Modal = () => {
  const {
    products,
    setShow,
    itemId,
    quantity,
    setQuantity,
    userLogin,
    customers,
    setCustomers,
    setCartCount,
  } = useContext(ApiContext);
  const imageRef = useRef();
  const alertRef = useRef();
  const navigate = useNavigate();

  const product = products.find((product) => product.id === itemId);

  const changeImage = (index) => {
    imageRef.current.src = `${product.category.image[index]}`;
  };

  const addToCart = async () => {
    if (!userLogin) {
      navigate("/login");
      return;
    }

    if (quantity <= 0) {
      alertRef.current.classList.remove("invisible");

      setTimeout(() => {
        alertRef.current.classList.add("invisible");
      }, 2000);
      return;
    }

    const currentCustomer = customers?.find(
      (customer) => customer.email === userLogin
    );

    const cart = [...(currentCustomer.cart || [])];
    const item = cart.find((item) => item.productId === itemId);

    if (item) {
      item.quantity += quantity;
      item.total = item.quantity * item.price

    } else {
      const total = quantity * product.price
      cart.push({ productId: itemId, price: product.price, total: total, quantity });
    }

    const cartCounter = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.total, 0)
    

    await updateCustomer(currentCustomer.id,{totalPrice: totalPrice, productTotal: cartCounter, cart });
    setCustomers((prevCustomers) =>
      prevCustomers.map((c) =>
        c.id === currentCustomer.id ? { ...c, cart, totalPrice: totalPrice, productTotal: cartCounter } : c,
      ),
    );

    setCartCount(cartCounter);

    setQuantity(0);

    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  const quantityCount = () => {
    if (quantity <= 0) return;
    setQuantity(quantity - 1);
  };

  return (
    <div className="w-full h-screen fixed top-0 right-0 bg-[var(--main-bg)] p-6 ">
      <div className="h-screen xl:h-auto flex flex-col items-start  gap-8">
        <div className="flex items-center justify-center gap-4 text-xl">
          <span onClick={() => setShow(false)} className="cursor-pointer">
            Home
          </span>
          <FaAngleRight />
          <span>{product.title}</span>
        </div>

        <div className="h-screen xl:h-auto flex flex-col items-center xl:flex-row xl:items-start xl:justify-center gap-8 overflow-y-scroll">
          <div className="w-full xl:w-1/2 flex flex-col h-screen  gap-6">
            <div className="flex justify-center gap-6">
              <div className="flex flex-col gap-6 justify-start h-[500px]">
                {product.category.image.map((item, index) => (
                  <img
                    onClick={() => changeImage(index)}
                    className="min-w-20  min-h-20 object-contain"
                    key={index}
                    src={item}
                  />
                ))}
              </div>
              <div>
                <img
                  ref={imageRef}
                  className="min-w-[500px] min-h-[500px]"
                  src={product.category.image[0]}
                  alt=""
                />
              </div>
            </div>
            <div>
              <h2>Description</h2>
              <p>{product.description}</p>
            </div>
          </div>

          <div className="w-full xl:h-full flex flex-col items-center justify-start gap-4 p-8 mb-[100px]">
            <h1 className="text-4xl font-semibold">{product.title}</h1>
            <p>${product.price}.00</p>
            <div>
              <p>Select Color</p>
              <div className="flex items-center gap-4">
                <span
                  className="size-10 bg-pink-400 border-2 border-orange-500 rounded-full"
                  title="Pink"
                ></span>
                <span
                  className="size-10 bg-gray-500 border-2 border-orange-500 rounded-full"
                  title="Gray"
                ></span>
                <span
                  className="size-10 bg-red-400 border-2 border-orange-500 rounded-full"
                  title="Red"
                ></span>
                <span
                  className="size-10 bg-black border-2 border-orange-500 rounded-full"
                  title="Black"
                ></span>
                <span
                  className="size-10 bg-orange-400 border-2 border-orange-500 rounded-full"
                  title="Orange"
                ></span>
              </div>
            </div>
            <div>
              <p>Quantity</p>
              <div className="flex items-center ">
                <span
                  onClick={quantityCount}
                  className="w-15 h-15 border-2 font-semibold border-white p-1.5 text-2xl text-center cursor-pointer select-none"
                >
                  -
                </span>
                <span className="w-15 h-15 border-2 font-semibold border-white p-1.5 text-3xl text-center">
                  {quantity}
                </span>
                <span
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-15 h-15 border-2 font-semibold border-white p-1.5 text-2xl text-center cursor-pointer select-none"
                >
                  +
                </span>
              </div>
            </div>
            <button
              onClick={addToCart}
              className="w-4/5 bg-amber-400 text-2xl font-semibold py-2 rounded-md border-4 border-orange-600 cursor-pointer active:bg-orange-500 transition duration-250 relative"
            >
              ADD TO CART
              <span
                ref={alertRef}
                className=" invisible absolute text-gray-800 text-lg py-6 px-4 bg-gray-200 rounded-lg top-0 left-1/2 -translate-x-1/2 -translate-y-25 z-50 transition-all duration-400 "
              >
                Please select quantity!
                <span className="size-8 bg-gray-200 absolute -bottom-4 left-1/2 rotate-45 "></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
