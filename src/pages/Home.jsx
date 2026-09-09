import { useContext, useEffect } from "react";
import { ApiContext } from "../contexts/ApiContext";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import Spiner from "../components/Spiner";

const Home = () => {
  const { products, show, setShow, setItemId, search, category, price, spiner } = useContext(ApiContext);

  const openModal = (id) => {
    setShow(true);
    setItemId(id);

    console.log(id);
  };

  const productsFilter = products.filter((product) => {
    const matchName =
      product.category.name.toLowerCase().includes(search.trim().toLowerCase()) ;

    const matchCategory = category === "all" || product.category.slug === category 
    
    const matchPrice = product.price === 0 || product.price <= price


    return matchName && matchCategory && matchPrice;
  });


  
  return (
    <div className="w-full h-screen flex">
      <Sidebar />

      <div className="relative w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 cursor-pointer overflow-y-auto text-white p-4 scrollbar-thin scrollbar-track-transparent">

        {spiner && <Spiner />}
        {productsFilter?.map((product) => (
          <div
            onClick={() => openModal(product.id)}
            key={product.id}
            className="text-white p-2"
          >
            <img src={product?.category?.image?.[0]} alt="" />
            {/* <img src={`${import.meta.env.BASE_URL}${product?.category?.image?.[0]}`} alt="" /> */}
            <h2>{product?.title}</h2>
            <h3>{product?.slug}</h3>
            <p>{product?.description}</p>
          </div>
        ))}

        {show && <Modal />}
      </div>
    </div>
  );
};

export default Home;
