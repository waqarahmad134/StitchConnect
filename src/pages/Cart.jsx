import React, { useState } from "react";
import { FaDoorOpen } from "react-icons/fa";
import {  useLocation, useNavigate } from "react-router-dom";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../utilities/Toaster";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PostAPI } from "../utilities/PostAPI";
import { BASE_URL } from "../utilities/URL";
import Loader from "../components/Loader";
import secureLocalStorage from "react-secure-storage";

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState(
    JSON.parse(secureLocalStorage.getItem("cartItems")) || []
  );

  const handleDelete = (id) => {
    const updatedCartItems = cartData.filter((item) => item?.productId !== id);
    setCartData(updatedCartItems);
    secureLocalStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    navigate(location.pathname);
  };

  const calculateTotalAmount = () => {
    let total = 0;
    const data = JSON.parse(secureLocalStorage.getItem("cartItems"));
    data?.forEach((item) => {
      total += parseFloat(item.price);
    });
    return total.toFixed(2);
  };


  const createOrder = async (e) => {
    e.preventDefault();
    if (!secureLocalStorage.getItem("senderId")) {
      info_toaster("Please Login First");
      navigate("/auth/signin");
    } else {
      setLoading(true);
      let res = await PostAPI("tailor/place_order", {
        price: calculateTotalAmount(),
        userId: parseInt(secureLocalStorage.getItem("senderId")),
        products: JSON.parse(secureLocalStorage.getItem("cartItems")),
      });
      if (res?.data?.status === "1") {
        setLoading(false);
        success_toaster("Order Placed Sucessfully");
        secureLocalStorage.removeItem("cartItems");
        const downloadLink = res?.data?.data?.sessionUrl;
        if (downloadLink) {
          const anchorElement = document.createElement("a");
          anchorElement.href = downloadLink;
          anchorElement.download = "filename";
          anchorElement.setAttribute("target", "_blank");
          document.body.appendChild(anchorElement);
          anchorElement.click();
          document.body.removeChild(anchorElement);
        } else {
          setLoading(false);
          error_toaster(res?.data?.mesage);
        }
      }
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <section className="grid lg:grid-cols-3 gap-x-5 gap-y-5 w-11/12 mx-auto py-6 md:py-28 font-switzer">
        <div className="sm:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-5 my-4">
            <div className="flex items-center text-2xl gap-x-2">
              <FaDoorOpen />
              <h3>Your Order</h3>
            </div>
            {cartData?.map((cart, index) => (
              <div className="flex items-center justify-between gap-x-2">
                <div className="flex items-center gap-x-3 my-2">
                  <div className="w-20 h-20 border-2 border-gray-100 rounded-xl p-2">
                    <img
                      className="h-full w-full object-cover rounded-md"
                      src={`${BASE_URL}${cart?.image}`}
                      alt={cart?.title}
                    />
                  </div>
                  <h5>
                    <b>{cart?.title}</b>
                  </h5>
                </div>

                <div>
                  <h5>{cart?.price} PKR</h5>
                </div>
                <div>
                  <button onClick={() => handleDelete(cart?.productId)}>
                    {" "}
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-lg p-5">
            <div className="flex items-center text-2xl gap-x-2">
              <h3 className="font-semibold ">Prices in EUR, incl. taxes</h3>
            </div>
            <div className="space-y-3 my-4">
              <div className="flex items-center justify-between gap-x-2">
                <h5 className="text-lg font-semibold text-black text-opacity-50">
                  Subtotal
                </h5>
                <h6>PKR{calculateTotalAmount()}</h6>
              </div>

              <div className="flex items-center justify-between gap-x-2">
                <h5 className="font-semibold text-2xl">Total</h5>
                <h6>PKR{calculateTotalAmount()}</h6>
              </div>
              <div className="border-dashed border" />
            </div>
            <div>
              <button
                onClick={createOrder}
                className="bg-black w-full text-xl font-semibold text-white rounded-md px-3 py-2"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
