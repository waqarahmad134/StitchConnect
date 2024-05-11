import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import { BsCart3, BsCashCoin } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import GetAPI from "../utilities/GetAPI";
import { useMediaQuery } from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";
import { info_toaster } from "../utilities/Toaster";
export default function Header() {
  const data  = [
    {name: "Home"},
    {name:"About"},
    {name:"Tailors"},
    {name:"Shops"},
    {name:"Contact"}
];
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const [addShadow, setAddShadow] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [screenWidth] = useMediaQuery("(min-width: 1024px)");
  const handleDelete = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    navigate(location);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
        setDropDown(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setAddShadow(true);
      } else {
        setAddShadow(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoutFunc = (e) => {
    e.preventDefault();
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      localStorage.clear();
      navigate("/auth/signin");
      info_toaster("Successfully Logged out!");
    }, 400);
  };
  return (
    <>
      <header
        className={`relative w-full z-50 py-1 md:py-3  ${
          addShadow ? "shadow-lg" : ""
        }`}
      >
        <nav className="lg:w-[93%] xl:w-5/6 mx-auto relative flex justify-between items-center px-4 lg:px-0 py-2">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-36 2xl:w-40" />
          </Link>

          <div>
            <ul
              className={`lg:flex gap-4 xl:gap-5 justify-between items-center z-[-1] md:z-50 absolute lg:static
              transition-all ease-in left-0 lg:opacity-100 opacity-0 w-full ${
                open
                  ? "top-[84px] opacity-100 bg-slate-300 z-[999] border-t h-[calc(100vh-84px)] overflow-auto py-4"
                  : "top-[-400px]"
              }`}
            >
              {data?.map((menu, index) => (
                <>
                <li

                  className="px-2 lg:text-xl text-black capitalize"
                  key={index}
                >
                  <Link
                    to={`/category/${(menu?.name).toString().toLowerCase()}`}
                    className="capitalize border-b-4 border-transparent  hover:border-b-black"
                  >
                    {menu?.name}
                  </Link>
                </li>
                </>
              ))}              
                <button className="text-2xl text-black hover:text-[#fe8133] relative">
                  <BsCart3 />
                  <div className="w-4 h-4 bg-[#fe8133] text-xs rounded-full absolute top-0 -right-2">
                    {cartItems?.length > 0 ? cartItems.length : "0"}
                  </div>
                </button>

                {!localStorage.getItem("accessToken") ? (
                  <div>
                    <Link
                      to={"/auth/signup"}
                      className="text-center w-20 rounded-3xl text-2xl"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link
                      to={"/auth/signin"}
                      className="text-center w-20 rounded-3xl text-2xl"
                    >
                      Login
                    </Link>
                  </div>
                )}
                <RxAvatar size={34} />
            </ul>

            <div>
              <button
                className="text-white text-4xl lg:hidden block"
                onClick={handleOpen}
              >
                <HiMenu />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
