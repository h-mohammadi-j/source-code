import { useContext, useRef, useState } from "react";
import { postCustomer } from "../api/products";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../contexts/ApiContext";

const Login = () => {
  const {setShow} = useContext(ApiContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const loginRef = useRef();
  const navigate = useNavigate()


  const goToRegister = () => {
    loginRef.current.classList.add("rotate-y-180");
  };
  const goToLogin = () => {
    loginRef.current.classList.remove("rotate-y-180");
  };

  const userData = {
    userName: name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: password,
    cart: []
  }


  const registerHandler = async (e) => {
    e.preventDefault()

    if(!name || !email || !password) return
    await postCustomer(userData)
    loginRef.current.classList.remove("rotate-y-180");
    
  }

  const loginHandler = async (e) => {
    e.preventDefault()

    if(!userEmail || !userPassword) return

    localStorage.setItem("userLogin", userEmail.toLowerCase().trim())

    navigate("/")
    setShow(true)
    
  }
  return (
    <div className="w-full h-screen bg-(--main-bg) grid place-items-center px-4 lg:px-0 perspective-[1000px]">
      <div
        ref={loginRef}
        className="w-full md:w-120 h-150 relative transform transition-transform duration-700 transform-3d shadow-[0_0_30px] shadow-orange-400/50 rounded-xl"
      >
        <form onSubmit={loginHandler} className="w-full md:w-120 h-full bg-linear-[45deg] from-orange-800 to-orange-400 flex flex-col gap-6 text-white px-4 py-8 transform translate-z-1 rounded-xl absolute top-0 left-0 z-10 backface-hidden">
          <h2 className="text-3xl font-bold text-center pb-6 border-b-2 border-white/50">
            Login Form
          </h2>

          <label className="w-full flex flex-col mt-6 group">
            <span className="text-lg text-black">Email</span>
            <input
              onChange={(e) => setUserEmail(e.target.value)}
              className=" text-lg py-1.5 px-6  outline-none border-b-2 border-black"
              type="email"
              required
            />
          </label>

          <label className="w-full flex flex-col mt-6">
            <span className="text-lg text-black">Password</span>
            <input
              onChange={(e) => setUserPassword(e.target.value)}
              className=" text-lg py-1.5 px-6  outline-none border-b-2 border-black"
              type="password"
              required
            />
          </label>

          <button className="bg-gray-800 text-xl font-semibold py-2 px-8 rounded-lg block mx-auto hover:bg-gray-950 transition-all duration-250 cursor-pointer mt-10">
            Login
          </button>

          <p className="mt-6">
            Don't have an account?&nbsp;&nbsp;
            <span
              onClick={goToRegister}
              className="text-lg text-gray-950 p-1 border-2 border-dotted rounded-lg  cursor-pointer "
            >
              Click to Register
            </span>
          </p>
        </form>

        <form onSubmit={registerHandler} className="w-full md:w-120 h-full bg-linear-[45deg] from-orange-400 to-orange-800 flex flex-col gap-6 text-white px-4 py-8 transform -translate-z-1 rotate-y-180 rounded-xl absolute top-0 left-0 ">
          <h2 className="text-3xl font-bold text-center pb-6 border-b-2 border-white/50">
            Register Form
          </h2>

          <label className="w-full flex flex-col">
            <span className="text-lg text-black">Name</span>
            <input
              onChange={(e) => setName(e.target.value)}
              className=" text-lg py-1.5 px-6  outline-none border-b-2 border-black"
              type="text"
              required
            />
          </label>

          <label className="w-full flex flex-col mt-4">
            <span className="text-lg text-black">Email</span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className=" text-lg py-1.5 px-6  outline-none border-b-2 border-black"
              type="email"
              required
            />
          </label>

          <label className="w-full flex flex-col mt-4">
            <span className="text-lg text-black">Password</span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className=" text-lg py-1.5 px-6  outline-none border-b-2 border-black"
              type="password"
              required
            />
          </label>

          <button className="bg-gray-800 text-xl font-semibold py-2 px-8 rounded-lg block mx-auto hover:bg-gray-950 transition-all duration-250 cursor-pointer mt-4">
            Register
          </button>

          <p className="mt-4">
            Don you have an account?&nbsp;&nbsp;
            <span
              onClick={goToLogin}
              className="text-lg text-black p-1 border-2 border-dotted rounded-lg  cursor-pointer"
            >
              Click to Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
