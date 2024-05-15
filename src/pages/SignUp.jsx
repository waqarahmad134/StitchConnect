import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoIosMail } from "react-icons/io";
import { FaPhoneSquare } from "react-icons/fa";
import { PostAPI } from "../utilities/PostAPI";
import { IoPersonCircle } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { error_toaster, success_toaster } from "../utilities/Toaster";

export default function SignUp() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState({
    avatar: "/images/avatar.jpg",
    name: "",
    email: "",
    password: "",
    phone: "",
    category: "",
    productDisplay: "",
    color: "",
    address: "",
    description: "",
    role: "",
  });
  const [avatarUrl, setAvatarUrl] = useState("/images/avatar.jpg");

  const handleAvatarChange = (e) => {
    const url = e.target.value;
    setAvatarUrl(url);
  };
  const onChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };
  const registerFunc = async (e) => {
    e.preventDefault();
    if (signUp.email === "") {
      info_toaster("Please enter Email");
    } else if (signUp.password === "") {
      info_toaster("Please enter Password");
    } else {
      let res = await PostAPI("user/register", {
        firstName: signUp.firstName,
        lastName: signUp.lastName,
        email: signUp.email,
        password: signUp.password,
        about: signUp.about,
      });
      if (res?.data?.status === "1") {
        success_toaster("Registration Sucessfull , Please login");
        navigate("/auth/signin");
      } else {
        error_toaster(res?.data?.mesage);
      }
    }
  };
  return (
    <div className="">
      <Header />
      <section className="bg-signUpHero bg-no-repeat bg-cover bg-center relative before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:bg-opacity-50 before:top-0 before:left-0 ">
        <div className="h-100 w-10/12 m-auto flex justify-center items-center relative z-20 py-10">
          <div className="text-center bg-white bg-opacity-60 rounded-xl p-5 min-w-96 space-y-12">
            <h1 className="font-semibold">Registeration Form</h1>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2">
                <label htmlFor="avatar">
                  <img
                    className="rounded-full h-32 w-32 m-auto cursor-pointer"
                    src={avatarUrl}
                    alt="avatar"
                  />
                </label>
                <input
                  onChange={(e) => {
                    setSignUp({
                      ...signUp,
                      [e.target.name]: e.target.files[0],
                    });
                    handleAvatarChange;
                  }}
                  name="avatar"
                  type="file"
                  placeholder="Pic"
                  id="avatar"
                  className="hidden w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none placeholder:text-black"
                />
              </div>
              <div className="relative">
                <input
                  value={signUp.name}
                  onChange={onChange}
                  name="name"
                  type="text"
                  placeholder="Name"
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
              <div className="flex justify-center items-center gap-x-2 bg-black text-white rounded-lg py-2 px-3 cursor-pointer">
                <MdOutlinePersonAddAlt size={32} />
                <button className="text-xl font-switzer font-semibold">
                  Register
                </button>
              </div>
            </div>
            <div>
              <p className="text-xl">
                Already Have Account ? <Link to={"/auth/signin"}>Login</Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
