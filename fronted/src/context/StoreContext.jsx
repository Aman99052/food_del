import { createContext, useEffect, useState } from "react";
import { food_list as static_food_list } from "../assets/assets"; // ✅ Renamed import to avoid clash
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]); // ✅ Changed variable name
    const [token, setToken] = useState("");
    const url = "https://food-del-backend-a2xs.onrender.com";

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCount = (prev[itemId] || 0) - 1;
            if (newCount > 0) {
                return { ...prev, [itemId]: newCount };
            } else {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }
        });
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = foodList.find((product) => String(product._id) === String(item));
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData || {}); // ✅ Fallback to empty object
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    const placeOrder = (deliveryData) => {
        console.log(deliveryData);
    };

    const contextValue = {
        food_list: foodList, // ✅ renamed internally, passed as food_list to match consumers
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        placeOrder,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
