// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import GetAPI from "../utilities/GetAPI";
import { BASE_URL } from "../utilities/URL";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { info_toaster, warning_toaster } from "../utilities/Toaster";
import Loader from "../components/Loader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ProductDetails() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { slug } = useParams();
  const { data } = GetAPI(`tailor/product_details/${slug}`);
  if (!localStorage.getItem("cartItems")) {
    localStorage.setItem("cartItems", "[]");
  }
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const addToCart = () => {
    const findIndex = cartItems.findIndex(
      (ele) => ele.productId === data?.data?.data?.id
    );
    if (findIndex !== -1) {
      warning_toaster("Product already in cart");
    } else {
      info_toaster("Product Added In Cart");
      let newCart = {
        productId: data?.data?.data?.id,
        image: data?.data?.data?.image,
        title: data?.data?.data?.title,
        qty: 1,
        price: data?.data?.data?.price,
      };
      cartItems.push(newCart);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      navigate("/cart");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <section className="">
        <div className="w-[70%] m-auto pt-10">
          <h2 className="text-gray-400 text-sm space-x-2">
            <span className="">Home</span>
            <span className="uppercase"> {pathname}</span>
            <span className="text-black font-semibold">{data?.data?.name}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10 mt-4 mb-20">
            <Carousel>
              
                <img className="aspect-[4/4] object-cover object-top" src={`${BASE_URL}${data?.data?.data.image}`} />
              {data?.data?.data?.Images?.map((item, index) => (
                <div key={index}>
                  <img className="aspect-[4/4] object-cover h-full" src={`${BASE_URL}${item?.image}`} />
                </div>
              ))}
            </Carousel>
            <div className="flex flex-col justify-start gap-5">
              <h2 className="text-4xl italic font-semibold">
                {data?.data?.data?.title}
              </h2>
              <h2 className="text-xl lg:text-2xl ">
                Product Type :  {data?.data?.data?.type}
              </h2>
                <p className="text-xl text-black font-semibold">
                    ${data?.data?.data?.price}
                  
                </p>
              <div className="space-y-8">
                <p className="text-xl">{data?.data?.data?.description}</p>
                <div className="grid gap-x-6 border-t border-b py-4">
                  <div className="grid grid-cols-4 items-center">
                    {data?.data?.data.Colors?.map((data, index) => (
                      <>
                        <h2 key={index} className="text-sm font-semibold capitalize">
                          {data?.color}
                        </h2>
                        <h2 className="text-sm font-semibold h-10 w-10 rounded-full" style={{ backgroundColor: `${data?.color}` }}>
                        </h2>
                      </>
                    ))}
                  </div>
                </div>
                <div className="flex gap-x-2">
                  <button
                    onClick={addToCart}
                    className="uppercase w-60 h-12 bg-black rounded-md text-white text-sm font-semibold hover:bg-opacity-90"
                  >
                    Order Now
                  </button>
                </div>
                <div className="hidden md:block space-y-3">
                  <h2 className="text-sm font-semibold">
                    Guaranteed Safe Checkout
                  </h2>
                  <img src="/images/payment.webp" alt="payment" />
                </div>
              </div>
            </div>
          </div>
          <div className="my-5">
            <h4 className="text-2xl font-semibold my-4">Related Products</h4>
            <div className="grid sm:grid-cols-3 gap-x-5 gap-y-5">
              {data?.data?.related?.filter((prod) => prod.id !== slug).map((prod, index) => (
                <Link
                  className="relative shadow-xl rounded-2xl hover:scale-105 duration-500"
                  to={`/product-details/${prod?.id}`}
                  key={index}
                >
                  <div className="bg-white rounded-md border border-transparent cursor-pointer">
                    <img
                      src={`${BASE_URL}${prod?.image}`}
                      alt={prod?.title}
                      className="min-h-48 w-full object-cover rounded-t-2xl mx-auto "
                    />
                  </div>
                  <div
                    className="absolute top-3 left-4 z-10 flex flex-wrap items-center gap-3"
                    key={index}
                  >
                    {prod?.Colors?.map((data, index) => (
                      <span
                        key={index}
                        className="capitalize bg-yellow-100 text-yellow-800 text-[10px] md:text-xs font-medium px-1 md:px-2.5 py-0.5 rounded"
                      >
                        {data?.color}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 p-3">
                    <h4 className="text-sm">{prod?.name}</h4>
                    <p className="hidden lg:block  text-gray-400 text-sm">
                      {(prod?.description).toString().substring(0, 42)}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-black font font-semibold">
                        ${prod?.price}
                      </p>
                      <div className="flex items-center text-black font-mono font-semibold">
                              {prod?.type}                            
                            </div>
                    </div>
                    <div className="bg-black uppercase text-center py-2 text-white rounded-b-md w-full">
                      Buy Now
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
