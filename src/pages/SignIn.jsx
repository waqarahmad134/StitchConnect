import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoPersonCircle } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../utilities/Toaster";
import { PostAPI } from "../utilities/PostAPI";
import secureLocalStorage from "react-secure-storage";

export default function SignIn() {
  const { pathname, location } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigate = useNavigate();
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };
  const loginFunc = async (e) => {
    e.preventDefault();
    if (signUp.email === "") {
      info_toaster("Please enter Email");
    } else if (signUp.password === "") {
      info_toaster("Please enter Password");
    } else {
      let res = await PostAPI("user/login", {
        email: signUp.email,
        password: signUp.password,
      });
      if (res?.data?.status === "1") {
        success_toaster("Login Sucessfull");
        secureLocalStorage.setItem("senderId", res?.data?.data?.id);
        secureLocalStorage.setItem("name", res?.data?.data?.name);
        secureLocalStorage.setItem("userType", res?.data?.data?.userType);
        navigate("/");
      } else if (res?.data?.status === "0") {
        info_toaster(res?.data?.message);
      } else {
        error_toaster("User Not Found");
      }
    }
  };
  return (
    <div className="">
      <Header />
      <section className="bg-signInHero bg-no-repeat bg-cover bg-center">
        <div className="w-10/12 m-auto py-20">
          <div className="text-center bg-white rounded-xl p-5 w-auto md:w-96 space-y-12">
            <h1 className="font-semibold">Login</h1>
            <form onSubmit={loginFunc} className="space-y-5 w-3/4 m-auto">
              <div className="relative">
                <input
                  value={signUp.email}
                  onChange={onChange}
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                />
                <span className="absolute right-4 top-4 -translate-y-[4px]">
                  <IoPersonCircle size={32} />
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
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-red-400 dark:focus:border-primary"
                />
                <span className="absolute right-4 top-4 -translate-y-[4px]">
                  <RiLockPasswordFill size={32} />
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full text-xl bg-black text-white rounded-lg py-2 px-3 font-switzer font-semibold"
                >
                  {" "}
                  Login
                </button>
              </div>
            </form>
            <div>
              <p className="text-xl">
                Can't Have Account ? <Link to={"/auth/signup"}>Register</Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
