import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Card from "../components/Card";
import GetAPI from "../utilities/GetAPI";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";

export default function ShopDetails() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);
  const [activeCat, setActiveCat] = useState("all");
  const products = GetAPI(`tailor/shop_details/${slug}`);
  console.log("🚀 ~ ShopDetails ~ products:", products?.data)
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
              Shop Details
            </h2>
          </div>

          <div className="py-10 lg:w-[90%] w-[95%] mx-auto grid md:grid-cols-12 gap-x-6 md:gap-x-14">
            <div className="md:col-span-3">
              <div className="cat-section hidden md:block">
                <div className="py-4 lg:py-8 border-gray-400 border-b-[1px] space-y-6">
                  <h2 className="uppercase font-medium">Nearby Shop Details</h2>

                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveCat("all")}
                      className={`w-full text-xl font-semibold rounded-full border ${
                        activeCat === "all"
                          ? "bg-black text-white"
                          : "text-gray-600 bg-transparent"
                      } hover:border hover:text-white hover:bg-gray-500 py-3 px-5`}
                      >
                      All
                    </button>
                    {products?.data?.data?.categories?.map((data, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveCat(data.id)}
                        className={`w-full text-xl font-semibold rounded-full border ${
                          activeCat === data.id
                            ? "bg-black text-white"
                            : "text-gray-600 bg-transparent"
                        } hover:border hover:text-white hover:bg-gray-500 py-3 px-5`}
                       >
                        {data?.title}
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
                    Home /&nbsp;
                    <span className="text-medium uppercase font-semibold">
                      Shop Details
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
                ) : (
                  <>
                    {products?.data?.data?.data?.filter((prod) => prod.ProductCategoryId === parseInt(activeCat))
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
