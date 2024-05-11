import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function IndustriesMenu() {
  const location = useLocation().pathname;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 relative h-auto 2xl:h-[350px]">
      <div className="bg-themeLightGray rounded-l-lg">
        <img src="/images/menu.webp" alt="menu" className="w-40" />

        <div className="px-5 pb-5 space-y-1">
          <h2 className="text-xl md:tex-2xl font-bold text-themeBlue uppercase">
            Industries
          </h2>
          <p className="text-themeSlate text-sm">
            Discover industry-specific solutions tailored to meet the unique
            challenges and opportunities of your sector, leveraging our
            extensive cross-industry expertise.
          </p>
        </div>
      </div>

      <div className="lg:col-span-2 py-5 px-5 space-y-5 flex flex-col justify-between">
        <div className="md:grid grid-cols-2 gap-5 space-y-5 md:space-y-0">
          <ul className="space-y-3">
            <li className="text-sm text-themeDarkBlue">Fintech</li>
            <li className="text-sm text-themeDarkBlue">Automotive</li>
            <li
              className={`text-sm ${
                location === "/industries/healthcare"
                  ? "text-themeBlue underline"
                  : "text-themeDarkBlue"
              } `}
            >
              <Link to="/industries/healthcare">Healthcare</Link>
            </li>
            <li className="text-sm text-themeDarkBlue">E-Commerce</li>
          </ul>
          <ul className="space-y-3">
            <li className="text-sm text-themeDarkBlue">
              Media & Entertainment
            </li>
            <li className="text-sm text-themeDarkBlue">Education</li>
            <li className="text-sm text-themeDarkBlue">GIS</li>
          </ul>
        </div>

        <div className=" flex items-center gap-2 bg-themeGray rounded-lg p-4">
          <div className="bg-white p-2 rounded-lg">
            <img
              src="/images/industries.webp"
              alt="services"
              className="w-6 h-7 object-contain"
            />
          </div>

          <div>
            <h4 className="uppercase text-themeDarkBlue text-sm font-bold">
              All industries
            </h4>
            <Link
              to="/industries"
              className="flex items-center gap-2 text-themeLightSlate text-xs"
            >
              Learn more
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
