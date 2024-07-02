import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/images/logo.png";
import { BsCart3 } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import {
  DrawerCloseButton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";
import { info_toaster } from "../utilities/Toaster";
import { PiTShirtDuotone } from "react-icons/pi";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { BASE_URL } from "../utilities/URL";
import secureLocalStorage from "react-secure-storage";

export default function Header() {
  const data = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Tailors", link: "/tailor" },
    { name: "Shops", link: "/page/shops" },
    { name: "Contact", link: "/contact" },
  ];
  const [cartItems, setCartItems] = useState(
    JSON.parse(secureLocalStorage.getItem("cartItems")) || []
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [addShadow, setAddShadow] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [screenWidth] = useMediaQuery("(min-width: 1024px)");
  const prevSize = JSON.parse(secureLocalStorage.getItem("Size"));
  const [size, setSize] = useState({
    chest: prevSize !== "" ? prevSize?.chest : "",
    waist: prevSize !== "" ? prevSize?.waist : "",
    hips: prevSize !== "" ? prevSize?.hips : "",
    sleeveLenght: prevSize !== "" ? prevSize?.sleeveLenght : "",
    shoulderWidth: prevSize !== "" ? prevSize?.shoulderWidth : "",
    inseam: prevSize !== "" ? prevSize?.inseam : "",
    outseam: prevSize !== "" ? prevSize?.outseam : "",
    neck: prevSize !== "" ? prevSize?.neck : "",
    jacketLenght: prevSize !== "" ? prevSize?.jacketLenght : "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setSize({ ...size, [name]: value });
    secureLocalStorage.setItem("Size", JSON.stringify({ ...size, [name]: value }));
  };

  const handleDelete = (id) => {
    const updatedCartItems = cartItems.filter((item) => item?.productId !== id);
    setCartItems(updatedCartItems);
    secureLocalStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    navigate(location.pathname);
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
      secureLocalStorage.removeItem("senderId");
      secureLocalStorage.removeItem("name");
      secureLocalStorage.clear();
      navigate("/auth/signin");
      info_toaster("Successfully Logged out!");
    }, 400);
  };
  return (
    <>
      <Modal isOpen={openModel}>
        <ModalOverlay />
        <ModalContent>
          <div className="flex items-center justify-between w-full px-5 py-2">
            <h2 className="text-2xl font-semibold">Add Size</h2>
            <button onClick={() => setOpenModel(false)}> X </button>
          </div>
          <ModalBody>
            <div className="grid grid-cols-2 gap-2">
              <input
                value={size.chest}
                onChange={onChange}
                name="chest"
                type="text"
                placeholder="Chest"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-red-400 dark:focus:border-primary"
              />
              <input
                value={size.waist}
                onChange={onChange}
                name="waist"
                type="text"
                placeholder="Waist"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-red-400 dark:focus:border-primary"
              />
              <input
                value={size.hips}
                onChange={onChange}
                name="hips"
                type="text"
                placeholder="Hips"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-red-400 dark:focus:border-primary"
              />
              <input
                value={size.sleeveLenght}
                onChange={onChange}
                name="sleeveLenght"
                type="text"
                placeholder="Sleeve Lenght"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-red-400 dark:focus:border-primary"
              />
              <input
                value={size.shoulderWidth}
                onChange={onChange}
                name="shoulderWidth"
                type="text"
                placeholder="Shoulder Width"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-red-400 dark:focus:border-primary"
              />
              <input
                value={size.inseam}
                onChange={onChange}
                name="inseam"
                type="text"
                placeholder="Inseam"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-red-400 dark:focus:border-primary"
              />
              <input
                value={size.outseam}
                onChange={onChange}
                name="outseam"
                type="text"
                placeholder="Outseam"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-red-400 dark:focus:border-primary"
              />
              <input
                value={size.neck}
                onChange={onChange}
                name="neck"
                type="text"
                placeholder="Neck"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-red-400 dark:focus:border-primary"
              />
              <input
                value={size.jacketLenght}
                onChange={onChange}
                name="jacketLenght"
                type="text"
                placeholder="Jacket Lenght"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-red-400 dark:focus:border-primary"
              />
            </div>
          </ModalBody>
          <ModalFooter className="flex gap-x-2">
            <button
              className="text-white bg-gray-400 rounded-md py-2 px-3"
              onClick={() => setOpenModel(false)}
            >
              Submit
            </button>
            <button
              className="text-white bg-blue-400 rounded-md py-2 px-3"
              onClick={() => {
                setOpenModel(false);
              }}
            >
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <div className="flex items-center justify-between px-5 py-2">
            <h2 className="text-2xl font-semibold">Cart</h2>
            <DrawerCloseButton />
          </div>
          <DrawerBody>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((cart, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-x-2"
                >
                  <div className="flex items-center gap-x-3 my-2">
                    <div className="w-20 h-20 border-2 border-gray-100 rounded-xl p-2">
                      <img
                        className="h-full w-full object-cover rounded-md"
                        src={`${BASE_URL}${cart?.image}`}
                        alt={cart?.title}
                      />
                    </div>
                    <div>
                      <b>{cart?.title}</b>
                      <h5>{cart?.price} PKR</h5>
                    </div>
                  </div>

                  <div>
                    <button onClick={() => handleDelete(cart?.productId)}>
                      {" "}
                      X
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No data in cart</div>
            )}
          </DrawerBody>
          <div className="px-5 py-2">
            <button
              onClick={() => navigate("/cart")}
              className="bg-black text-white rounded-3xl px-5 py-2 my-5 w-full"
            >
              Go To Checkout
            </button>
          </div>
        </DrawerContent>
      </Drawer>
      <header
        className={`relative w-full z-50 py-1 md:py-3  ${
          addShadow ? "shadow-lg" : "shadow-none"
        }`}
      >
        <nav className="lg:w-[93%] xl:w-5/6 mx-auto relative flex justify-between items-center border-gray-700 border-b-2 px-4 lg:px-0 py-2">
          <Link to="/">
            <img src={Logo} alt="logo" className="w-36 2xl:w-40" />
          </Link>

          <div>
            <ul
              className={`lg:flex gap-4 xl:gap-5 justify-between items-center absolute lg:static
              transition-all ease-in left-0 lg:opacity-100 w-full ${
                open
                  ? "top-[100px] bg-black bg-opacity-70 z-[999] h-screen py-4 px-5 text-white text-2xl"
                  : "top-[-400px]"
              }`}
            >
              {data?.map((menu, index) => (
                <>
                  <li className="px-2 lg:text-xl capitalize" key={index}>
                    <Link
                      to={`${(menu?.link).toString().toLowerCase()}`}
                      className="capitalize border-b-4 border-transparent  hover:border-b-black"
                    >
                      {menu?.name}
                    </Link>
                  </li>
                </>
              ))}
              {/* <li className="block md:hidden px-2 lg:text-xl capitalize">
                <button onClick={logoutFunc} className="text-center">
                  Logout
                </button>
              </li> */}
              <li className="hidden md:flex items-center">
                <button
                  onClick={onOpen}
                  className="text-2xl hover:text-[#fe8133] [&>div]:hover:text-black relative"
                >
                  <BsCart3 size={24} />

                  <div className="w-4 h-4 bg-[#fe8133] text-xs rounded-full absolute top-0 -right-2">
                    <span>
                      {cartItems?.length > 0 ? cartItems.length : "0"}
                    </span>
                  </div>
                </button>
              </li>
              <li className="hidden md:flex items-center">
                <button onClick={() => setOpenModel(true)}>
                  <PiTShirtDuotone size={24} />
                </button>
              </li>
              {!secureLocalStorage.getItem("senderId") ? (
                <>
                  <li className="px-2">
                    <Link
                      to={"/auth/signin"}
                      className="text-center rounded-3xl text-2xl"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="px-2">
                    <Link
                      to={"/auth/signup"}
                      className="text-center w-20 rounded-3xl text-2xl"
                    >
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="px-2">
                  <button
                    onClick={logoutFunc}
                    className="text-center w-20 rounded-3xl text-2xl"
                  >
                    {/* <RxAvatar size={34} /> */}
                    Logout
                  </button>
                </li>
              )}
            </ul>

            <div>
              <button
                className="text-black text-4xl lg:hidden block"
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
