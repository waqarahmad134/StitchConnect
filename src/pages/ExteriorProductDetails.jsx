// @ts-nocheck
import React, { useEffect } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GetAPI from "../utilities/GetAPI";
import { BASE_URL } from "../utilities/URL";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { info_toaster, warning_toaster } from "../utilities/Toaster";
import Loader from "../components/Loader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IoEyeOutline } from "react-icons/io5";

export default function ExteriorProductDetails() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const shareUrl = "https://3dbreakout.com" + pathname;
  const title = encodeURIComponent("Check out this product!");
  if (!localStorage.getItem("cartItems")) {
    localStorage.setItem("cartItems", "[]");
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const slug = useLocation().pathname.substring(17);
  const { data } = GetAPI(`item/detail/${slug}`);
  const relatedData = GetAPI(`item/related/1`);
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const addToCart = () => {
    const findIndex = cartItems.findIndex(
      (ele) => ele.itemId === data?.data?.id
    );
    if (findIndex !== -1) {
      warning_toaster("Product already in cart");
    } else {
      info_toaster("Product Added In Cart");
      let newCart = {
        itemId: data?.data?.id,
        img: data?.data?.thumbnail,
        name: data?.data?.name,
        amount: data?.data?.price,
        discount: data?.data?.discount,
        owner: "vendor",
        vendorId: parseInt(localStorage.getItem("vendorId")),
      };
      cartItems.push(newCart);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      navigate("/cart");
    }
  };
  return data.length === 0 ? (
    <Loader />
  ) : (
    <>
      <Header />
      <section>
        <div className="w-[70%] m-auto pt-28">
          <h2 className="text-gray-400 text-sm space-x-2">
            <span className="">Home</span>
            <span className="uppercase"> {pathname}</span>
            <span className="text-black font-semibold">{data?.data?.name}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-x-4 mt-4 mb-20">
            {/* <div>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                slidesPerView={1}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                modules={[FreeMode, Thumbs]}
                className="mySwiper2 w-screen md:w-auto"
              >
                {data?.data?.itemImages?.length > 0 &&
                  data?.data?.itemImages?.map((item, index) => (
                    <SwiperSlide className={`${index}`}>
                      <img
                        src={`${BASE_URL}${data?.data?.thumbnail}`}
                        alt={item?.name}
                        className="w-72 md:w-4/5 h-72 max-h-72 md:h-[350px] object-cover hover:cursor-zoom-in hover:duration-150 cursor-pointer"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="mySwiper my-3 cursor-pointer"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1440: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
              >
                <div>
                  {data?.data?.itemImages?.map((item, index) => (
                    <SwiperSlide>
                      <img
                       
                        alt="cable-1"
                        className="w-80 h-20 object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </div>

              </Swiper>
            </div> */}
            <Carousel>
              <div>
                <img src={`${BASE_URL}${data?.data?.thumbnail}`} />
              </div>
              {data?.data?.itemImages?.map((item, index) => (
                <div key={index}>
                  <img src={`${BASE_URL}${item?.image}`} />
                </div>
              ))}
            </Carousel>
            <div className="space-y-6 flex flex-col justify-start">
              <h2 className="text-2xl lg:text-4xl ">{data?.data?.name}</h2>
              <div className="space-y-8">
                <p className="space-y-4">{data?.data?.description}</p>
                <div className="text-2xl text-gray-400">
                  {/* <s>${data?.data?.price}</s>{" "} */}
                  <span className="text-blue-500 font-semibold">
                    ${data?.data?.price}
                  </span>
                </div>
                <div className="flex gap-x-2">
                  <button
                    onClick={addToCart}
                    className="uppercase w-60 h-12 bg-blue-500 rounded-md text-white text-sm font-semibold hover:bg-opacity-90"
                  >
                    Download
                  </button>
                  {/* <button className="uppercase w-60 h-12 bg-black rounded-md text-white text-sm font-semibold hover:bg-opacity-90">
                    Buy Now
                  </button> */}
                </div>

                <div className="flex gap-x-2">
                  <h2 className="text-sm">Share:</h2>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF color="gray" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter color="gray" />
                  </a>
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaPinterest color="gray" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn color="gray" />
                  </a>
                  <a
                    href={`mailto:?body=${title}%0A${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RiSendPlaneFill color="gray" />
                  </a>
                </div>

                <div className="grid gap-x-6 border-t border-b py-4">
                  <div className="grid grid-cols-4">
                    {data?.data?.itemAttributes?.map((attr, index) => (
                      <>
                        <h2 key={index} className="text-sm font-semibold">
                          {attr?.arttribute || `Attribute ${index + 1}`}
                        </h2>
                        <p className="text-sm text-gray-400 font-semibold">
                          {attr?.value}
                        </p>
                      </>
                    ))}
                  </div>
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
              {relatedData?.data?.data?.length > 2
                ? relatedData?.data?.data?.slice(0, 3).map((prod, index) => (
                    // <button
                    //   onClick={() => {
                    //     navigate(`/product-details/${item?.slug}`);
                    //     window.scrollTo(0, 0);
                    //   }}
                    //   key={index}
                    // >
                    //   <div className="cursor-pointer">
                    //     <img
                    //       src={`${BASE_URL}${item?.thumbnail}`}
                    //       alt={item?.name}
                    //       className="w-80 h-60 object-cover rounded-md"
                    //     />
                    //   </div>
                    // </button>
                    <Link
                      className="relative shadow-xl rounded-2xl hover:scale-105 duration-500"
                      to={`/product-details/${prod?.slug}`}
                      key={index}
                    >
                      <div className="bg-white rounded-md border border-transparent cursor-pointer">
                        <img
                          src={`${BASE_URL}${prod?.thumbnail}`}
                          alt={prod?.name}
                          className="h-full w-full object-cover rounded-t-2xl mx-auto "
                        />
                      </div>
                      <div
                        class="absolute top-3 left-4 z-10 flex flex-wrap items-center gap-3"
                        key={index}
                      >
                        {prod?.itemAttributes?.map((attr, index) => (
                          <span
                            key={index}
                            class="capitalize bg-yellow-100 text-yellow-800 text-[10px] md:text-xs font-medium px-1 md:px-2.5 py-0.5 rounded"
                          >
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
                            <IoEyeOutline /> &nbsp; 379
                          </div>
                        </div>
                        <div className="bg-blue-400 uppercase text-center py-2 text-white rounded-b-md w-full">
                          Download
                        </div>
                      </div>
                    </Link>
                  ))
                : "No Related Products Found"}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
