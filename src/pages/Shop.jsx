import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import GetAPI from "../utilities/GetAPI";
import { BASE_URL } from "../utilities/URL";
import axios from "axios";
import { error_toaster, info_toaster } from "../utilities/Toaster";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { IoEyeOutline } from "react-icons/io5";
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import Card from "../components/Card";

export default function Shop() {
  const { pathname } = useLocation();
  const { slug } = useParams();
  const [active, setActive] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    window.scrollTo(0, 0);
  };
  const [activeCat, setActiveCat] = useState(null);
  const [prodByCatData, setProdByCatData] = useState([]);
  const { data } = GetAPI("category/view");
  const products = GetAPI("item/view-all");

  const prodByCat = async (catId) => {
    setActiveCat(catId);
    setActive(true);
    var config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    try {
      axios
        .get(BASE_URL + `item/category/${catId.toString()}`, config)
        .then((dat) => {
          if (dat.data?.status === "1") {
            info_toaster(dat?.data?.message);
            setProdByCatData(dat?.data?.data);
          } else {
            error_toaster(dat?.data?.message);
          }
        });
    } catch (err) {}
  };
  return data.length === 0 ? (
    <Loader />
  ) : (
    <>
      <Header />
      <section>
        <div>
          <div className="bg-exteriorHeroBg bg-cover bg-center bg-no-repeat w-full h-80 flex justify-center items-center">
            <h2 className="text-2xl md:text-3xl lg:text-6xl text-white font-semibold uppercase">
              {slug}
            </h2>
          </div>

          <div className="py-10 lg:w-[90%] w-[95%] mx-auto grid md:grid-cols-12 gap-x-6 md:gap-x-14">
            <div className="md:col-span-2">
              <div className="cat-section hidden md:block">
                <div className="py-4 lg:py-8 border-gray-400 border-b-[1px] space-y-6">
                  <h2 className="uppercase font-medium">Nearby {slug}</h2>
                  { slug === "shops" ? (<><div className="space-y-2">
                    <button
                      onClick={() => prodByCat("suit")}
                      className="w-full bg-black text-white text-xl font-semibold rounded-full border hover:border hover:text-black hover:bg-white py-3 px-5"
                    >
                      Fabrics
                    </button>
                    <button
                      onClick={() => prodByCat("suit")}
                      className="w-full bg-black text-white text-xl font-semibold rounded-full border hover:border hover:text-black hover:bg-white py-3 px-5"
                    >
                      Clothing
                    </button>
                  </div></>) : (<> <div className="space-y-2">
                    <button
                      onClick={() => prodByCat("suit")}
                      className="w-full bg-black text-white text-xl font-semibold rounded-full border hover:border hover:text-black hover:bg-white py-3 px-5"
                    >
                      Suit
                    </button>
                    <button
                      onClick={() => prodByCat("suit")}
                      className="w-full bg-black text-white text-xl font-semibold rounded-full border hover:border hover:text-black hover:bg-white py-3 px-5"
                    >
                      Traditional
                    </button>
                  </div></>)}
                  
                 
                </div>
              </div>
            </div>
            <div className="md:col-span-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="my-3">
                    Home / &nbsp;
                    <span className="text-medium uppercase font-semibold">
                      {slug}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-2 md:gap-x-3 gap-y-2 md:gap-y-3">
                {active === true ? (
                  prodByCatData?.length ? (
                    prodByCatData
                      ?.slice(first, first + rows)
                      .map((prod, index) => (
                        <Link
                          className="relative shadow-xl rounded-2xl hover:scale-105 duration-500"
                          to={`/product-details/${prod?.slug}`}
                          key={index}
                        >
                          <div className="border border-transparent cursor-pointer">
                            <img
                              src={`${BASE_URL}${prod?.thumbnail}`}
                              alt="cable"
                              className="h-full w-full object-cover rounded-t-2xl mx-auto "
                            />
                          </div>
                          <div className="space-y-2 p-3">
                            <h4 className="text-sm">{prod?.name}</h4>
                            <p className="hidden lg:block  text-gray-400 text-sm">
                              {(prod?.description).toString().substring(0, 42)}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <p className="text-blue-600 font font-semibold">
                                ${prod?.price}
                              </p>
                              
                            </div>
                            <div className="bg-blue-400 uppercase text-center py-2 text-white rounded-b-md w-full">
                              Download
                            </div>
                          </div>
                        </Link>
                      ))
                  ) : (
                    <div className="col-span-full">
                      No data Available for {slug}
                    </div>
                  )
                ) : (
                  products?.data?.data
                    ?.slice(first, first + rows)
                    .map((prod, index) => (
                      <Card
                        index={index}
                        id={prod?.id}
                        name={prod?.name}
                        thumbnail={prod?.thumbnail}
                        slug={prod?.slug}
                        description={prod?.description}
                        price={prod?.price}
                        discount={prod?.discount}
                        itemAttributes={prod?.itemAttributes}
                      />
                    ))
                )}
              </div>

              <div className="p-3 my-5 rounded-lg">
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={products?.data?.data?.length}
                  rowsPerPageOptions={[10, 20, 30]}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
