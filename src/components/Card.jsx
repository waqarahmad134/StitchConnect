import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { info_toaster, warning_toaster } from "../utilities/Toaster";
import { BASE_URL } from "../utilities/URL";

export default function Card(props) {
  const navigate = useNavigate();
  if (!localStorage.getItem("cartItems")) {
    localStorage.setItem("cartItems", "[]");
  }
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const addToCart = () => {
    const findIndex = cartItems.findIndex((ele) => ele.itemId === props?.id);
    if (findIndex !== -1) {
      warning_toaster("Product already in cart");
    } else {
      let newCart = {
        itemId: props?.id,
        img: props?.thumbnail,
        name: props?.name,
        amount: props?.price,
        discount: props?.discount,
        owner: "vendor",
        vendorId: parseInt(localStorage.getItem("vendorId")),
      };
      cartItems.push(newCart);
      console.log(cartItems);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      info_toaster("Product Added In Cart");
      navigate("/cart");
    }
  };
  return (
    <>
      <div
        className="relative shadow-xl rounded-2xl hover:scale-105 duration-500"
        key={props?.index}
      >
        <div className="border border-transparent cursor-pointer">
          <Link to={`/product-details/${props?.slug}`}>
            <img
              src={`${BASE_URL}${props?.thumbnail}`}
              alt={props?.name}
              className="h-full w-full object-cover rounded-t-2xl mx-auto"
            />
          </Link>
        </div>
        <div className="space-y-2 p-3">
          <h4 className="text-sm">{props?.name}</h4>
          <p className="hidden lg:block  text-gray-400 text-sm">
            {(props?.description).substring(0, 42)}
          </p>
        
          <Link
            to={`/product-details/${props?.slug}`}
            className="block bg-blue-400 uppercase text-center py-2 text-white rounded-b-md w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
}
