import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png"

export default function Footer() {
  return (
    <div>
      <footer className="bg-white text-black pt-10 lg:pt-20 pb-10">
        <div className=" w-[85%] m-auto">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-10">
            <div className="space-y-6">
              <Link to="/">
                <img
                  src={Logo}
                  alt="Stitch Connect"
                  className="w-32 lg:w-60"
                />
              </Link>
            </div>

            <div className="space-y-6">
              <h4 className="  font-switzer font-bold">
                Contact Support
              </h4>
              <ul className="space-y-3">
                <li className="text-sm  font-normal">
                  Open Support Ticket
                </li>
                <li className="text-sm  font-normal">
                  Chat with Support 24/7
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className=" font-switzer font-bold">Legal</h4>
              <ul className="space-y-3">
                <li className="text-sm  font-switzer font-normal">
                  <Link to={"/terms-and-conditions"}>Terms & Conditions</Link>
                </li>
                <li className="text-sm  font-switzer font-normal">
                  <Link to={'/privacy-policy'}>Privacy Policy</Link>
                </li>
                <li className="text-sm  font-switzer font-normal">
                  <Link to={'/about-us'}>About Us</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className=" font-switzer font-bold">About Us</h4>
              <ul className="space-y-3">
                <li className="text-sm  font-switzer font-normal">
                  Company Info
                </li>
                <li className="text-sm  font-switzer font-normal">
                  Our Blog
                </li>
              
              </ul>
            </div>
          </div>

          <div className="flex justify-center pt-10 space-y-4 md:space-y-0">
            <div className="gap-5 flex">
              <a
                href={"https://twitter.com/?lang=en"}
                target="_blank"
                className="border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full"
              >
                <FaTwitter className="text-xl text-gray-400" />
              </a>
              <a
                href={"https://facebook.com/"}
                target="_blank"
                className="border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full"
              >
                <FaFacebookF className="text-xl text-gray-400" />
              </a>
              <a
                href={"https://linkedin.com"}
                target="_blank"
                className="border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full"
              >
                <FaLinkedinIn className="text-xl text-gray-400" />
              </a>
            </div>
          </div>

          <div className="flex justify-center mt-4 ">
            © Stitch Connect 2024
          </div>
        </div>
      </footer>
    </div>
  );
}
