import React, { useEffect, useRef, useState } from "react";
import { ImOffice } from "react-icons/im";
import { FaDoorOpen } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { GrMapLocation } from "react-icons/gr";
import { MdEditCalendar } from "react-icons/md";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { MdApartment, MdOutlinePayment } from "react-icons/md";
import { IoArrowBackOutline, IoClose, IoHome } from "react-icons/io5";
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

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const paymentFunc = async (e) => {
    e.preventDefault();
    
      setLoading(true);
      let res = await PostAPI("stripe/attach-card", {
        cardName: "",
        cardExpYear: "",
        cardExpMonth: "",
        cardNumber: "",
        cardCVC: "",
      });

      if (res?.data?.data?.stripePaymentId.length > 0) {
        success_toaster(res?.data?.message);
        localStorage.setItem("payment", res?.data?.data?.stripePaymentId);
        
        setLoading(false);
      } else {
        error_toaster(res?.data?.error);
        setLoading(false);
      }
    
  };

  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const handleDelete = (id) => {
    const updatedCartItems = cartData.filter(item => item.id !== id);
    alert(updatedCartItems)
    setCartData(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    navigate(location);
};
  const calculateTotalAmount = () => {
    let total = 0;
    const data = JSON.parse(localStorage.getItem("cartItems"));
    data?.forEach((item) => {
      total += parseFloat(item.amount);
    });
    return total.toFixed(2);
  };

  const createOrder = async (e) => {
    e.preventDefault();
    if (paymentDetails.cardName === "") {
      info_toaster("Please Enter Payment Details");
    } else {
      setLoading(true);
      let res = await PostAPI("item/purchase", {
        paymentMethod: "stripe",
        stripeCardId: localStorage.getItem("payment"),
        total: cartData[0]?.amount,
        items: cartData,
      });
      if (res?.data?.status === "1") {
        setLoading(false);
        success_toaster("Product Buy Sucessfully");
        localStorage.removeItem("cartItems");
        const NewLink = res?.data?.data?.downloadLinks[0]?.downloadLink;
        const downloadLink = NewLink
        if (downloadLink) {
          const anchorElement = document.createElement("a");
          anchorElement.href = downloadLink;
          anchorElement.download = "filename"; 
          anchorElement.setAttribute("target", "_blank");
          document.body.appendChild(anchorElement);
          anchorElement.click();
          document.body.removeChild(anchorElement);
        }
        navigate("/");
      } else {
        setLoading(false);
        error_toaster(res?.data?.mesage);
      }
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <section className="grid lg:grid-cols-3 gap-x-5 gap-y-5 w-11/12 mx-auto py-28 font-switzer">
        <div className="sm:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-5 my-4">
            <div className="flex items-center text-2xl gap-x-2">
              <FaDoorOpen />
              <h3>Your Order</h3>
            </div>
            {cartData?.map((cart, index) => (
              <div className="flex items-center justify-between gap-x-2">
                <div className="flex items-center gap-x-3 my-2">
                  <div className="border-2 border-gray-100 rounded-xl p-2">
                    <img
                      className="sm:w-20 sm:h-20 w-6 h-6 object-contain rounded-md"
                      src={`${BASE_URL}${cart?.image}`}
                      alt={cart?.title}
                    />
                  </div>
                  <h5>
                    <b>{cart?.title}</b>
                  </h5>
                </div>

                <div>
                  <h5>{cart?.price} $</h5>
                </div>
                <div>
                    <button onClick={() => handleDelete(cart?.id)}> X</button>
                  </div>
              </div>
            ))}
          </div>
         
          
        </div>
        <div className="">
          <div className="bg-white rounded-lg shadow-lg p-5">
            <div className="flex items-center text-2xl gap-x-2">
              <h3 className="font-semibold ">Prices in EUR, incl. taxes</h3>
            </div>
            <div className="space-y-3 my-4">
              <div className="flex items-center justify-between gap-x-2">
                <h5 className="text-lg font-semibold text-black text-opacity-50">
                  Subtotal
                </h5>
                <h6>${calculateTotalAmount()}</h6>
              </div>

              <div className="flex items-center justify-between gap-x-2">
                <h5 className="font-semibold text-2xl">Total</h5>
                <h6>${calculateTotalAmount()}</h6>
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
