import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoIosMail } from "react-icons/io";
import {
  FaAddressBook,
  FaCat,
  FaNotesMedical,
  FaPhoneSquare,
} from "react-icons/fa";
import { PostAPI } from "../utilities/PostAPI";
import { IoPersonCircle } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdNotes, MdOutlinePersonAddAlt } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  error_toaster,
  info_toaster,
  success_toaster,
  warning_toaster,
} from "../utilities/Toaster";
import { BsBoxes, BsCircle } from "react-icons/bs";
import { PiRectangle } from "react-icons/pi";
import { HiColorSwatch, HiOutlineArrowNarrowLeft } from "react-icons/hi";

export default function SignUp() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user");
  const [signUp, setSignUp] = useState({
    image: "",
    name: "",
    userName: "",
    email: "",
    password: "",
    phone: "",
    category: "1",
    productDisplay: "",
    color: "",
    address: "",
    description: "",
    role: "",
  });

  const onChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };
  const registerUserFunc = async (e) => {
    e.preventDefault();
    if (signUp.email === "") {
      info_toaster("Please enter Email");
    } else {
      const formData = new FormData();
      formData.append("image", signUp.image);
      formData.append("name", signUp.userName);
      formData.append("email", signUp.email);
      formData.append("password", signUp.password);
      formData.append("address", signUp.address);

      let res = await PostAPI("user/register", formData);
      console.log(res?.data?.status);
      if (res?.data?.status === "1") {
        success_toaster("Registration Sucessfull , Please login");
        navigate("/auth/signin");
      } else {
        alert(res?.data?.message);
      }
    }
  };
  const registerShopFunc = async (e) => {
    e.preventDefault();
    if (signUp.email === "") {
      info_toaster("Please enter Email");
    } else {
      const formData = new FormData();
      formData.append("image", signUp.image);
      formData.append("name", signUp.userName);
      formData.append("email", signUp.email);
      formData.append("ShopCategoryId", signUp.category);
      formData.append("address", signUp.address);
      formData.append("backgroundColor", signUp.color);
      formData.append("productDisplay", signUp.productDisplay);
      formData.append("description", signUp.description);

      let res = await PostAPI("shop/registration", formData);
      console.log(res?.data);
      if (res?.data?.status === "1") {
        success_toaster("Registration Sucessfull");
        setSignUp({
          userName: "",
          email: "",
          category: "1",
          address: "",
          description: ""
        });
        navigate("/");
      } else {
        alert(res?.data?.message);
      }
    }
  };

  const registerTailorFunc = async (e) => {
    e.preventDefault();
    if (signUp.email === "") {
      info_toaster("Please enter Email");
    } else {
      const formData = new FormData();
      formData.append("image", signUp.image);
      formData.append("name", signUp.userName);
      formData.append("email", signUp.email);
      formData.append("TailorCategoryId", signUp.category);
      formData.append("address", signUp.address);
      formData.append("description", signUp.description);

      let res = await PostAPI("tailor/registration", formData);
      if (res?.data?.status === "1") {
        success_toaster("Registration Sucessfull");
        navigate("/");
        setSignUp({
          userName: "",
          email: "",
          category: "1",
          address: "",
          description: ""
        });
      } else {
        alert(res?.data?.message);
      }
    }
  };
  return (
    <div className="">
      <Header />
      <section className="bg-signUpHero bg-no-repeat bg-cover bg-center relative before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:bg-opacity-50 before:top-0 before:left-0 ">
        <div className="h-100 w-10/12 m-auto flex justify-center items-center relative z-20 py-10">
          <div className="">
            <div className="text-center bg-white bg-opacity-60 rounded-xl p-5 min-w-96 space-y-12">
              <h1 className="text-3xl font-semibold">Registeration Form</h1>
              <div className="grid grid-cols-3 gap-5">
                <button
                  className={`${
                    userType === "user" && "animate-pulse"
                  } text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
                  onClick={() => setUserType("user")}
                >
                  User
                </button>
                <button
                  className={`${
                    userType === "shop" && "animate-pulse"
                  } focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
                  onClick={() => setUserType("shop")}
                >
                  Shop
                </button>
                <button
                  className={`${
                    userType === "tailor" && "animate-pulse"
                  } focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
                  onClick={() => setUserType("tailor")}
                >
                  Tailor
                </button>
              </div>
              {userType === "user" ? (
                <form onSubmit={registerUserFunc}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        value={signUp.userName}
                        onChange={onChange}
                        name="userName"
                        type="text"
                        placeholder="User Name"
                        className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <IoPersonCircle size={32} />
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        value={signUp.email}
                        onChange={onChange}
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <IoIosMail size={32} />
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        value={signUp.password}
                        onChange={onChange}
                        name="password"
                        id="password"
                        type="text"
                        placeholder="Password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <RiLockPasswordFill size={32} />
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        onChange={(e) => {
                          setSignUp({
                            ...signUp,
                            [e.target.name]: e.target.files[0],
                          });
                        }}
                        name="image"
                        type="file"
                        placeholder="Pic"
                        className="w-full h-[58px] rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                    </div>
                    <div className="relative col-span-2">
                      <input
                        value={signUp.address}
                        onChange={onChange}
                        name="address"
                        type="text"
                        placeholder="Address"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <FaAddressBook size={32} />
                      </span>
                    </div>
                  </div>
                  <div className="mx-auto mt-5">
                    <button
                      type="submit"
                      className="flex justify-center items-center gap-x-2 bg-black text-white rounded-lg py-2 px-3 cursor-pointer"
                    >
                      <MdOutlinePersonAddAlt size={32} />
                      <p className="text-xl font-switzer font-semibold">
                        Register
                      </p>
                    </button>
                  </div>
                </form>
              ) : userType === "shop" ? (
                <form onSubmit={registerShopFunc}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        value={signUp.userName}
                        onChange={onChange}
                        name="userName"
                        type="text"
                        placeholder="Shop Name"
                        className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <IoPersonCircle size={32} />
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        value={signUp.email}
                        onChange={onChange}
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <IoIosMail size={32} />
                      </span>
                    </div>
                    <div className="relative">
                      <select
                        value={signUp.category}
                        onChange={onChange}
                        name="category"
                        type="text"
                        placeholder="category"
                        className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      >
                        <option value="1">Stitched</option>
                        <option value="2">Unsticthed</option>
                      </select>
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <BsBoxes size={32} />
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        onChange={(e) => {
                          setSignUp({
                            ...signUp,
                            [e.target.name]: e.target.files[0],
                          });
                        }}
                        name="image"
                        type="file"
                        placeholder="Pic"
                        className="w-full h-[58px] rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                    </div>
                    <div className="relative col-span-2">
                      <input
                        value={signUp.address}
                        onChange={onChange}
                        name="address"
                        type="text"
                        placeholder="Address"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <FaAddressBook size={32} />
                      </span>
                    </div>
                    <div className="relative col-span-2">
                      <input
                        value={signUp.description}
                        onChange={onChange}
                        name="description"
                        type="text"
                        placeholder="Note for address"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <MdNotes size={32} />
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        value={signUp.productDisplay}
                        onChange={onChange}
                        name="productDisplay"
                        type="text"
                        placeholder="circle"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <div className="flex items-center">
                          <PiRectangle size={28} />
                          <span className="text-4xl">/</span>
                          <BsCircle size={24} />
                        </div>
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        value={signUp.color}
                        onChange={onChange}
                        name="color"
                        type="text"
                        placeholder="color"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <HiColorSwatch size={32} />
                      </span>
                    </div>
                  </div>
                  <div className="mx-auto mt-5">
                    <button
                      type="submit"
                      className="flex justify-center items-center gap-x-2 bg-black text-white rounded-lg py-2 px-3 cursor-pointer"
                    >
                      <MdOutlinePersonAddAlt size={32} />
                      <p className="text-xl font-switzer font-semibold">
                        Register
                      </p>
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={registerTailorFunc}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        value={signUp.userName}
                        onChange={onChange}
                        name="userName"
                        type="text"
                        placeholder="Tailor Shop Name"
                        className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <IoPersonCircle size={32} />
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        value={signUp.email}
                        onChange={onChange}
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <IoIosMail size={32} />
                      </span>
                    </div>
                    <div className="relative">
                      <select
                        value={signUp.category}
                        onChange={onChange}
                        name="category"
                        type="text"
                        placeholder="category"
                        className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      >
                        <option value="1">Traditional</option>
                        <option value="2">Western</option>
                      </select>
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <BsBoxes size={32} />
                      </span>
                    </div>
                    
                    <div className="relative">
                      <input
                        onChange={(e) => {
                          setSignUp({
                            ...signUp,
                            [e.target.name]: e.target.files[0],
                          });
                        }}
                        name="image"
                        type="file"
                        placeholder="Pic"
                        className="w-full h-[58px] rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                    </div>
                    <div className="relative col-span-2">
                      <input
                        value={signUp.address}
                        onChange={onChange}
                        name="address"
                        type="text"
                        placeholder="Address"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <FaAddressBook size={32} />
                      </span>
                    </div>
                    <div className="relative hidden">
                      <input
                        value={signUp.phone}
                        onChange={onChange}
                        name="phone"
                        type="text"
                        placeholder="+128179812"
                        className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                      />
                      <span className="absolute right-4 top-4 -translate-y-[4px]">
                        <FaPhoneSquare size={32} />
                      </span>
                    </div>
                  </div>
                  <div className="mx-auto mt-5">
                    <button
                      type="submit"
                      className="flex justify-center items-center gap-x-2 bg-black text-white rounded-lg py-2 px-3 cursor-pointer"
                    >
                      <MdOutlinePersonAddAlt size={32} />
                      <p className="text-xl font-switzer font-semibold">
                        Register
                      </p>
                    </button>
                  </div>
                </form>
              )}

              <div>
                <p className="text-xl">
                  Already Have Account ? <Link to={"/auth/signin"}>Login</Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
