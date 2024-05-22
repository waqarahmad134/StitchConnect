import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import GetAPI from "../utilities/GetAPI";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { BASE_URL } from "../utilities/URL";

export default function Shop() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);
  const [activeCat, setActiveCat] = useState("1");
  const shops = GetAPI("tailor/get_all_shops");
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);
  return loading ? (
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

          <div className="py-10 lg:w-[90%] w-[95%] mx-auto grid md:grid-cols-12 gap-x-6 md:gap-x-14">
            <div className="md:col-span-3">
              <div className="cat-section hidden md:block">
                <div className="py-4 lg:py-8 border-gray-400 border-b-[1px] space-y-6">
                  <h2 className="uppercase font-medium">Nearby {pathname}</h2>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveCat("1")}
                      className="w-full bg-black text-white text-xl font-semibold rounded-full border hover:border hover:text-black hover:bg-white py-3 px-5"
                    >
                      All
                    </button>
                    {shops?.data?.data?.categories.map((data, index) => (
                      <button
                      key={index}
                        onClick={() => setActiveCat(data.id)}
                        className="w-full bg-black text-white text-xl font-semibold rounded-full border hover:border hover:text-black hover:bg-white py-3 px-5"
                      >
                        {data.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-9">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="my-3">
                    Home &nbsp;
                    <span className="text-medium uppercase font-semibold">
                      {pathname}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-2 md:gap-x-3 gap-y-2 md:gap-y-3">
                {activeCat === "1" ? (
                  <>
                    {shops?.data?.data?.data
                      ?.slice(first, first + rows)
                      .map((prod, index) => (
                        <div
                          className="relative shadow-xl hover:scale-105 duration-500"
                          key={index}
                        >
                          <div className="h-32 border border-transparent cursor-pointer">
                            <Link to={`/shop-details/${prod?.id}`}>
                              <img
                                src={`${BASE_URL}${prod?.image}`}
                                alt={prod?.name}
                                className="h-full w-full object-top object-cover mx-auto"
                              />
                            </Link>
                          </div>
                          <div className="space-y-2 p-3">
                            <h4 className="text-2xl font-semibold">{prod?.name}</h4>
                            <p className="hidden lg:block  text-gray-400 text-sm">
                              {(prod?.description).substring(0, 42)}
                            </p>

                            <Link
                              to={`/shop-details/${prod?.id}`}
                              className="block bg-black uppercase text-center py-2 text-white w-full"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))}
                  </>
                ) : (
                  <>
                    {shops?.data?.data?.data.filter((prod) => prod.ShopCategoryId === parseInt(activeCat))
                      ?.slice(first, first + rows)
                      .map((prod, index) => (
                        <div
                          className="relative shadow-xl hover:scale-105 duration-500"
                          key={index}
                        >
                          <div className="h-32 border border-transparent cursor-pointer">
                            <Link to={`/shop-details/${prod?.id}`}>
                              <img
                                src={`${BASE_URL}${prod?.image}`}
                                alt={prod?.name}
                                className="h-full w-full object-top object-cover mx-auto"
                              />
                            </Link>
                          </div>
                          <div className="space-y-2 p-3">
                            <h4 className="text-2xl font-semibold">{prod?.name}</h4>
                            <p className="hidden lg:block  text-gray-400 text-sm">
                              {(prod?.description).substring(0, 42)}
                            </p>

                            <Link
                              to={`/shop-details/${prod?.id}`}
                              className="block bg-black uppercase text-center py-2 text-white w-full"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))}
                  </>
                ) }
              </div>
              {shops?.data?.data?.length > 10 && (
                <div className="p-3 my-5 rounded-lg">
                  <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={shops?.data?.data?.length}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onPageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}