
const API_URL = import.meta.env.VITE_API_URL


export const getProducts = async () => {

    const response = await fetch(`${API_URL}/products`)
    return response.json()
}


// get orders
export const getOrders = async () => {
    const response = await fetch(`${API_URL}/orders`)
    return response.json()
}

// post orders

export const postOrders = async (data) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })

    return response.json()
}

// get cart 
export const getCart = async () => {
    const response = await fetch(`${API_URL}/cart`)
    return response.json()
}

// post Cart 
export const postCart = async (data) => {
    const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })

    return response.json()
}

// get customers
export const getCustomers = async () => {
    const response = await fetch(`${API_URL}/customers`)
    return response.json()
}

// post customers 
export const postCustomer = async (data) => {
    const response = await fetch(`${API_URL}/customers`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    return  response.json()
}


// update customers
export const updateCustomer = async (id,data) => {
    return fetch(`${API_URL}/customers/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
}

// delete cart 

export const deleteCusomerCart = async (id) => {
    return fetch(`${API_URL}/customers/${id}`,{
        method: "DELETE"
    })
}

export const postPaymentInfo = async (data) => {
    return fetch(`${API_URL}/paymentInfo`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
}