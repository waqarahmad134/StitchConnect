import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import GetAPI from "../utilities/GetAPI";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";

export default function Tailor() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);
  const [activeCat, setActiveCat] = useState("all");
  const products = GetAPI("tailor/tailor_products");
  console.log("🚀 ~ Tailor ~ products:", products?.data?.data?.data);
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
            <div className="md:col-span-2">
              <div className="cat-section hidden md:block">
                <div className="py-4 lg:py-8 border-gray-400 border-b-[1px] space-y-6">
                  <h2 className="uppercase font-medium">Nearby {pathname}</h2>

                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveCat("all")}
                      className="w-full bg-black text-white text-xl font-semibold rounded-full border hover:border hover:text-black hover:bg-white py-3 px-5"
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveCat("Suit")}
                      className="w-full bg-black text-white text-xl font-semibold rounded-full border hover:border hover:text-black hover:bg-white py-3 px-5"
                    >
                      Suit
                    </button>
                    <button
                      onClick={() => setActiveCat("Tradional")}
                      className="w-full bg-black text-white text-xl font-semibold rounded-full border hover:border hover:text-black hover:bg-white py-3 px-5"
                    >
                      Tradional
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-10">
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
              <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-2 md:gap-x-3 gap-y-2 md:gap-y-3">
                {activeCat === "all" ? (
                  <>
                    {products?.data?.data?.data
                      ?.slice(first, first + rows)
                      .map((prod, index) => (
                        <Card
                          index={index}
                          id={prod?.id}
                          title={prod?.title}
                          image={prod?.image}
                          Images={prod?.Images}
                          description={prod?.description}
                          price={prod?.price}
                          Colors={prod?.Colors}
                        />
                      ))}
                  </>
                ) : activeCat === "Suit" ? (
                  <>
                    {products?.data?.data?.data
                      .filter(
                        (prod) => prod?.ProductCategory?.title === activeCat
                      )
                      ?.slice(first, first + rows)
                      .map((prod, index) => (
                        <Card
                          index={index}
                          id={prod?.id}
                          title={prod?.title}
                          image={prod?.image}
                          Images={prod?.Images}
                          description={prod?.description}
                          price={prod?.price}
                          Colors={prod?.Colors}
                        />
                      ))}
                  </>
                ) : activeCat === "Tradional" ? (
                  <>
                    {products?.data?.data?.data
                      .filter(
                        (prod) => prod?.ProductCategory?.title === activeCat
                      )
                      ?.slice(first, first + rows)
                      .map((prod, index) => (
                        <Card
                          index={index}
                          id={prod?.id}
                          title={prod?.title}
                          image={prod?.image}
                          Images={prod?.Images}
                          description={prod?.description}
                          price={prod?.price}
                          Colors={prod?.Colors}
                        />
                      ))}
                  </>
                ) : (
                  <>No data Available</>
                )}
              </div>
              {products?.data?.data?.length > 10 && (
                <div className="p-3 my-5 rounded-lg">
                  <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={products?.data?.data?.length}
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
