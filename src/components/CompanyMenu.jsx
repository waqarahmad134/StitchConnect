import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function CompanyMenu() {
  const location = useLocation().pathname;
  return (
    <div className="lg:grid grid-cols-2 h-auto 2xl:h-[350px]">
      <div className="bg-themeLightGray rounded-l-lg">
        <img src="/images/menu.webp" alt="menu" className="w-40" />

        <div className="px-5 pb-5 space-y-1">
          <h2 className="text-xl md:tex-2xl font-bold text-themeBlue uppercase">
            Company
          </h2>
          <p className="text-themeSlate text-sm">
            Learn more about our mission, values, and the talented team behind
            our success. See how our commitment to excellence shapes every
            project we undertake.
          </p>
        </div>
      </div>

      <div className="py-5 px-5 space-y-5 flex flex-col justify-between">
        <div className="md:grid grid-cols-1 gap-5 space-y-5 md:space-y-0">
          <ul className="space-y-3">
            <li
              className={`text-sm ${
                location === "/leadership"
                  ? "text-themeBlue underline"
                  : "text-themeDarkBlue"
              } `}
            >
              <Link to="/leadership">Leadership</Link>
            </li>
            <li
              className={`text-sm ${
                location === "/contact-us"
                  ? "text-themeBlue underline"
                  : "text-themeDarkBlue"
              } `}
            >
              <Link to="/contact-us">Contact us</Link>
            </li>
          </ul>
        </div>

        <div className="w-full flex items-center gap-2 bg-themeGray rounded-lg p-4">
          <div className="bg-white p-2 rounded-lg">
            <img
              src="/images/company.webp"
              alt="services"
              className="w-6 h-7 object-contain"
            />
          </div>

          <div>
            <h4 className="uppercase text-themeDarkBlue text-sm font-bold">
              About us
            </h4>
            <Link to="/about-us" className="flex items-center gap-2 text-themeLightSlate text-xs">
              Learn more
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
