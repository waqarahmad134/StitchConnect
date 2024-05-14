import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../utilities/URL";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BsCart3 } from "react-icons/bs";
export default function Search() {
  const { pathname } = useLocation();
  const prodByCatData = JSON.parse(localStorage.getItem("searchData"));

  return (
    <>
      <Header />
      <section>
        <div>
          <div className="bg-exteriorHeroBg bg-cover bg-center bg-no-repeat w-full h-80  flex justify-center items-center">
            <h2 className="text-2xl md:text-3xl lg:text-6xl text-white font-semibold uppercase">
              {pathname}
            </h2>
          </div>
          <div className="py-10 w-[70%] mx-auto grid grid-cols-12 gap-x-5">
            <div className="col-span-12">
              <div>
                <h2 className="my-3">
                  Home
                  <span className="text-medium uppercase font-semibold">
                    {pathname}
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-4 gap-x-5 gap-y-5">
                {prodByCatData?.length ? (
                  prodByCatData?.map((prod, index) => (
                    <Link
                        className="relative shadow-xl rounded-2xl hover:scale-105 duration-500"
                        to={`/product-details/${prod?.id}`}
                        key={index}
                      >
                        <div className="border border-transparent cursor-pointer">
                          <img
                            src={`${BASE_URL}${prod?.image}`}
                            alt="prod?.title"
                            className="min-h-48 w-full object-cover rounded-t-2xl mx-auto "
                          />
                        </div>
                        <div
                          class="absolute top-3 left-4 z-10 flex flex-wrap items-center gap-3"
                          key={index}
                        >
                          {prod?.Colors?.map((data, index) => (
                            <span key={index} class="capitalize bg-yellow-100 text-yellow-800 text-[10px] md:text-xs font-medium px-1 md:px-2.5 py-0.5 rounded">
                              {data?.color}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-2 p-3">
                          <h4 className="text-xl font-semibold">{prod?.title}</h4>
                          <p className="hidden lg:block  text-gray-400 text-sm">
                            {(prod?.description).toString().substring(0, 42)}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <p className="text-blue-600 font font-semibold">
                              ${prod?.price}
                            </p>
                            <div className="flex items-center text-black font-mono font-semibold">
                              {prod?.type}                            
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-x-3 bg-blue-400 uppercase text-center py-2 text-white rounded-b-md w-full">
                            <BsCart3 size={28} /> Add To Cart
                          </div>
                        </div>
                      </Link>
                  ))
                ) : (
                  <div className="col-span-full">
                    No Products Available 
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
