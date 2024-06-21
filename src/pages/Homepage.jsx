import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GetAPI from "../utilities/GetAPI";
import { PostAPI } from "../utilities/PostAPI";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BASE_URL } from "../utilities/URL";
import {
  error_toaster,
  info_toaster,
  success_toaster,
  warning_toaster,
} from "../utilities/Toaster";
import Loader from "../components/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useMediaQuery } from "@chakra-ui/react";

export default function Homepage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const products = GetAPI("tailor/all_products");
  const getFeaturedData = GetAPI("tailor/featured_products");
  const [isLargerThan430] = useMediaQuery("(min-width: 430px)");
  const tabData = products?.data?.data?.data?.filter(
    (prod) => prod.ProductCategory?.title === activeTab
  );

  if (!localStorage.getItem("cartItems")) {
    localStorage.setItem("cartItems", "[]");
  }
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const [search, setSearch] = useState();
  const searchFunc = async (e) => {
    e.preventDefault();
    if (search === "") {
      info_toaster("Please Search Some Text");
    } else {
      let res = await PostAPI("tailor/search_products", {
        title: search,
      });
      if (res?.data?.status === "1") {
        success_toaster("Search Data");
        localStorage.setItem(
          "searchData",
          JSON.stringify(res?.data?.data?.data)
        );
        navigate("/search");
      } else {
        error_toaster(res?.data?.mesage);
      }
    }
  };

  const addToCart = (data) => {
    const findIndex = cartItems.findIndex((ele) => ele.productId === data?.id);
    if (findIndex !== -1) {
      warning_toaster("Product already in cart");
    } else {
      info_toaster("Product Added In Cart");
      let newCart = {
        productId: data?.id,
        image: data?.image,
        title: data?.title,
        qty: 1,
        price: data?.price,
      };
      cartItems.push(newCart);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <section>
        <div>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper relative h-screen lg:h-[80vh] [&>div>div>img]:object-cover [&>div>div>img]:h-full [&>div>div>img]:w-full"
          >
            <SwiperSlide>
              <img src="/images/hero1.jpg" alt="banner_1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/hero2.jpg" alt="banner_2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/hero4.jpg" alt="banner_3" />
            </SwiperSlide>
            <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-50 z-10"></div>
            <div className="absolute top-[40%] md:top-1/2 left-1/2 -translate-x-1/2 w-11/12 md:w-1/2 z-20">
              <div className="space-y-6 mx-auto">
                <h2 className="text-4xl text-white text-center font-medium">
                  Find the best Tailors
                </h2>
                <form onSubmit={searchFunc} className="relative">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search the world best Tailors"
                    className="w-full mx-auto h-14 bg-black rounded-full pl-6 outline-none border-none text-white"
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-full bg-white w-28 h-10 absolute top-2 right-2 hover:font-semibold duration-200"
                  >
                    <IoIosSearch />
                    <span>Search</span>
                  </button>
                </form>
              </div>
            </div>
          </Swiper>
        </div>

        <div className="py-5">
          <div className="text-4xl font-medium w-[85%] m-auto">
            <h2 className="text-black text-4xl font-medium">Main Product's</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
              {getFeaturedData?.data?.data?.data?.map((prod, index) => (
                <>
                  <article className="relative flex flex-col overflow-hidden rounded-lg border">
                    <div className="aspect-square overflow-hidden">
                      <img
                        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                        src={`${BASE_URL}${prod?.image}`}
                        alt=""
                      />
                    </div>
                   
                    <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                      <div className="mb-2 flex">
                        <p className="mr-3 text-sm font-semibold">$99.00</p>
                        <del className="text-xs text-gray-400"> $79.00 </del>
                      </div>
                      <h3 className="mb-2 text-sm text-gray-400">Fresh Apples</h3>
                    </div>
                    <button className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                      <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">
                        Buy Now
                      </div>
                      <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-emerald-500 group-hover:text-white">
                        +
                      </div>
                    </button>
                  </article>
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Section start here  */}
        <div className="bg-gray-200 py-5">
          <div className="text-4xl font-medium w-[85%] m-auto">
            <h2 className="text-black text-4xl font-medium">
              Featured Product's
            </h2>
            <div>
              <Swiper
                slidesPerView={isLargerThan430 ? 4 : 1}
                spaceBetween={10}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper py-10"
              >
                {getFeaturedData?.data?.data?.data?.map((prod, index) => (
                  <SwiperSlide>
                    <div
                      key={index}
                      className="relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                    >
                      <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                        <img
                          className="object-cover"
                          src={`${BASE_URL}${prod?.image}`}
                          alt={prod?.title}
                        />
                      </a>
                      <div className="mt-4 px-5 pb-5">
                        <a href="#">
                          <h5 className="text-xl tracking-tight text-slate-900">
                            {prod?.title}
                          </h5>
                        </a>
                        <div className="mt-2 mb-5 flex items-center justify-between">
                          <p>
                            <span className="text-3xl font-bold text-slate-900">
                              {prod?.price}
                            </span>
                            {/* <span className="text-sm text-slate-900 line-through">
                                $699
                              </span> */}
                          </p>
                        </div>
                        <button
                          onClick={() => addToCart(prod)}
                          className="flex items-center justify-center w-full rounded-md bg-black border-2 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-transparent hover:text-black hover:border-2 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                          <MdOutlineShoppingCart />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        {/* Features Section End Here  */}

        <div className="bg-[#f5f4f2]">
          <div className="w-[75%] m-auto pt-5 pb-2 flex justify-center flex-wrap items-center gap-x-10 gap-y-5 border-b border-gray-400">
            <button
              className={`text-xl font-semibold ${
                activeTab === "all"
                  ? "text-black underline decoration-wavy border-black"
                  : "text-yellow-900"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            {products?.data?.data?.categories?.map((cat, index) => (
              <button
                className={`text-xl font-semibold ${
                  activeTab === cat.title
                    ? "text-black underline decoration-wavy border-black"
                    : "text-yellow-900"
                }`}
                onClick={() => setActiveTab(cat?.title)}
              >
                {cat?.title}
              </button>
            ))}
          </div>

          <div className="pt-10 pb-20 w-[85%] m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 cursor-pointer">
            {activeTab === "all" ? (
              <>
                {products?.data?.data?.data?.map((prod, index) => (
                  <Link
                    className="relative shadow-xl hover:scale-105 duration-500"
                    to={`/shop-details/${prod?.id}`}
                    key={index}
                  >
                    <div className="h-32 bg-white border border-transparent cursor-pointer">
                      <img
                        src={`${BASE_URL}${prod?.image}`}
                        alt={prod?.title}
                        className="h-full w-full object-cover object-top mx-auto"
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
                      <h4 className="text-xl font-semibold">{prod?.title}</h4>
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
                      <div className="bg-black uppercase text-center py-2 text-white w-full">
                        Buy Now
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <>
                {tabData && tabData.length > 0 ? (
                  tabData?.map((prod, index) => (
                    <Link
                      className="relative shadow-xl hover:scale-105 duration-500"
                      to={`/shop-details/${prod?.id}`}
                      key={index}
                    >
                      <div className="h-32 bg-white border border-transparent cursor-pointer">
                        <img
                          src={`${BASE_URL}${prod?.image}`}
                          alt={prod?.title}
                          className="h-full w-full object-cover object-top mx-auto"
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
                        <h4 className="text-xl font-semibold">{prod?.title}</h4>
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
                        <div className="bg-black uppercase text-center py-2 text-white w-full">
                          Buy Now
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div>No data available in {activeTab}</div>
                )}
              </>
            )}
          </div>

          <div className="bg-[#082835] py-5">
            <h2 className="text-white text-4xl font-medium w-[85%] m-auto">
              Complete Confidence
            </h2>

            <div className="pt-10 pb-10 lg:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 w-[90%] lg:w-[80%] m-auto">
              <div className="flex items-center gap-5 lg:gap-10">
                <div className="bg-white bg-opacity-10 w-32 h-32 flex items-center justify-center rounded-full">
                  <img
                    src="/images/price.webp"
                    alt="price"
                    className="w-14 h-14"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl text-white font-medium">
                    Best Price Guarantee
                  </h4>
                  <p className="text-gray-400 max-w-md">
                    Buy with confidence - we guarantee that you won't find any
                    model on our site selling for a lower price on any other
                    marketplace.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 lg:gap-10">
                <div className="bg-white bg-opacity-10 w-32 h-32 flex items-center justify-center rounded-full">
                  <img
                    src="/images/return.webp"
                    alt="price"
                    className="w-14 h-14"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl text-white font-medium">
                    Simple Returns
                  </h4>
                  <p className="text-gray-400 max-w-md">
                    Did you purchase a model that doesn’t work for you? No
                    problem, we’ll give you a quick refund or store credit so
                    you can find a model that works for your project.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 lg:gap-10">
                <div className="bg-white bg-opacity-10 w-32 h-32 flex items-center justify-center rounded-full">
                  <img
                    src="/images/support.webp"
                    alt="price"
                    className="w-14 h-14"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl text-white font-medium">
                    24/7 Support
                  </h4>
                  <p className="text-gray-400 max-w-md">
                    We’re here to help when you need us. Professionals are ready
                    to assist you every hour of every day with your 3D model
                    purchase via chat or support ticket.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 lg:gap-10">
                <div className="bg-white bg-opacity-10 w-32 h-32 flex items-center justify-center rounded-full">
                  <img
                    src="/images/protection.webp"
                    alt="price"
                    className="w-14 h-14"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl text-white font-medium">
                    World Class Protection
                  </h4>
                  <p className="text-gray-400 max-w-md">
                    TurboSquid leads the industry with up to $1,000,000 in
                    indemnification available on your 3D model purchases. If
                    there’s ever any problem with the purchase, we’ll be there
                    to help.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
