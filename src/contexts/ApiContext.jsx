import { createContext, useEffect, useState } from "react";
import { getCustomers, getProducts } from "../api/products";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const userLogin = localStorage.getItem("userLogin") || "";

  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [spiner, setSpiner] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(100);

  const loadedCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  console.log(cartCount)

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const customer = customers?.find(
    (customer) =>
      customer.email.trim().toLowerCase() === userLogin.trim().toLowerCase(),
  );

  useEffect(() => {
    const loadData = async () => {
      setSpiner(true);
      await Promise.all([loadProducts(), loadedCustomers()]);
      setSpiner(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if(cartCount > 0){
      loadedCustomers()
    }
    setCartCount(customer?.productTotal)
  },[cartCount])

  return (
    <ApiContext.Provider
      value={{
        products,
        loadProducts,
        show,
        setShow,
        itemId,
        setItemId,
        quantity,
        setQuantity,
        userLogin,
        customers,
        customer,
        setCustomers,
        loadedCustomers,
        cartCount,
        setCartCount,
        search,
        setSearch,
        category,
        setCategory,
        price,
        setPrice,
        spiner,
        setSpiner,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
