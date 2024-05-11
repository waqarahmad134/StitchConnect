import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
import "primereact/resources/primereact.min.css"; //core css
import Card from "../components/Card";
import { TfiViewGrid } from "react-icons/tfi";
import { TfiLayoutGrid3 } from "react-icons/tfi";

export default function Exterior() {
  const { pathname } = useLocation();
  const [active, setActive] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    window.scrollTo(0, 0);
  };
  const [activeCat, setActiveCat] = useState(null);
  const [activeSubCat, setActiveSubCat] = useState(null);
  const [prodByCatData, setProdByCatData] = useState([]);
  const { data } = GetAPI("category/view");
  const subCatData = GetAPI("category/sub/view");
  const products = GetAPI("item/view-all");
  const relatedData = GetAPI("item/related/1");
  var randomNumber = Math.floor(Math.random() * (1000 - 401)) + 401;

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
        // .get(BASE_URL + `item/category/${catId.toString()}`, config)
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
              {pathname}
            </h2>
          </div>

          <div className="py-10 lg:w-[90%] w-[95%] mx-auto grid md:grid-cols-12 gap-x-3 md:gap-x-4">
            <div className="md:col-span-2">
              <div className="cat-section hidden md:block">
                <div className="py-4 lg:py-8 border-gray-400 border-b-[1px] space-y-6">
                  <h2 className="uppercase font-medium">Filter By Brand</h2>
                  <div className="space-y-2">
                    {data?.data?.map((cat, index) => (
                      <>
                        <button
                          onClick={() => prodByCat(cat?.id)}
                          className={`flex w-full  text-sm  ${
                            activeCat === cat?.id ? "font-semibold" : ""
                          }`}
                          key={index}
                        >
                          {cat?.name} &nbsp;{" "}
                          <div class="bg-yellow-100 text-yellow-800 text-[10px] md:text-xs font-medium px-2 py-1 rounded-full">
                            0
                          </div>
                        </button>
                        <div className="ml-4 space-y-2">
                          {subCatData?.data?.data?.map((subCat, index) => (
                            <div key={index}>
                              {subCat?.category?.name === cat?.name && (
                                <button
                                  onClick={() => prodByCat(subCat?.id)}
                                  className={`text-sm block ${
                                    activeSubCat === subCat?.id
                                      ? "font-semibold"
                                      : ""
                                  }`}
                                >
                                  {subCat?.name}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="hidden md:block py-4 lg:py-8 border-gray-400 border-b-[1px] space-y-6">
                  <h2 className="uppercase font-medium">Top Rated Products</h2>
                  {relatedData?.data?.data?.slice(0, 5).map((data, index) => (
                    <Link to={`/product-details/${data?.slug}`} key={index}>
                      <div
                        key={index}
                        className="flex gap-x-2 items-center my-4"
                      >
                        <img
                          src={`${BASE_URL}${data?.thumbnail}`}
                          alt={data?.name}
                          className="md:w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="text-sm text-gray-500">
                            {data?.name}
                          </h4>
                          <p className="text-sm text-blue-600 font-semibold">
                            $ {data?.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="my-3">
                    Home
                    <span className="text-medium uppercase font-semibold">
                      {pathname}
                    </span>
                  </h2>
                </div>
                {/* <div className="flex gap-x-3 ">
                  <TfiViewGrid />
                  <TfiLayoutGrid3 />
                </div> */}
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
                          <div
                            class="absolute top-3 left-4 z-10 flex flex-wrap items-center gap-3"
                            key={index}
                          >
                            {prod?.itemAttributes?.map((attr, index) => (
                              <span class="capitalize bg-yellow-100 text-yellow-800 text-[10px] md:text-xs font-medium px-1 md:px-2.5 py-0.5 rounded">
                                {attr?.value}
                              </span>
                            ))}
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
                              <div className="flex items-center text-black text-opacity-50">
                                <IoEyeOutline /> &nbsp;
                                {randomNumber}
                              </div>
                            </div>
                            <div className="bg-blue-400 uppercase text-center py-2 text-white rounded-b-md w-full">
                              Download
                            </div>
                          </div>
                        </Link>
                      ))
                  ) : (
                    <div className="col-span-full">
                      No Products Available for this Category
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
