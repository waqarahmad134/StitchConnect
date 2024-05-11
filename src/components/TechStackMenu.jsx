import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function TeckStackMenu() {
  const location = useLocation().pathname;
  return (
    <div className="lg:grid grid-cols-5">
      <div className="bg-themeLightGray col-span-2 rounded-l-lg">
        <img src="/images/menu.webp" alt="menu" className="w-40" />

        <div className="px-5 pb-5 space-y-1">
          <h2 className="text-xl md:tex-2xl font-bold text-themeBlue uppercase">
            Tech Stack
          </h2>
          <p className="text-themeSlate text-sm">
            Dive into our arsenal of modern technologies, where we combine
            cutting-edge tools and proven frameworks to build scalable, robust,
            and innovative applications.
          </p>
        </div>
      </div>

      <div className="col-span-3 py-5 px-5 space-y-5 flex flex-col justify-between">
        <div className="md:grid grid-cols-3 gap-5 space-y-5 md:space-y-0">
          <div className=" space-y-2">
            <h3 className="text-base text-themeLightSlate uppercase">
              Front-End
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-themeDarkBlue">Angular</li>
              <li className="text-sm text-themeDarkBlue">React</li>
              <li className="text-sm text-themeDarkBlue">Vue</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-base text-themeLightSlate uppercase">
              Back-end
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-themeDarkBlue">.NET</li>
              <li className="text-sm text-themeDarkBlue">Java</li>
              <li className="text-sm text-themeDarkBlue">Laravel</li>
              <li className="text-sm text-themeDarkBlue">Node.js</li>
              <li
                className={`text-sm ${
                  location === "/technologies/php"
                    ? "text-themeBlue underline"
                    : "text-themeDarkBlue"
                } `}
              >
                <Link to="/technologies/php">PHP</Link>
              </li>
              <li className="text-sm text-themeDarkBlue">Python</li>
              <li className="text-sm text-themeDarkBlue">Ruby on Rails</li>
              <li className="text-sm text-themeDarkBlue">Scala</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-base text-themeLightSlate uppercase">Mobile</h3>
            <ul className="space-y-3">
              <li className="text-sm text-themeDarkBlue">Android</li>
              <li className="text-sm text-themeDarkBlue">iOS</li>
              <li className="text-sm text-themeDarkBlue">React Native</li>
              <li className="text-sm text-themeDarkBlue">Flutter</li>
            </ul>
          </div>
        </div>

        <div className=" flex items-center gap-2 bg-themeGray rounded-lg p-4">
          <div className="bg-white p-2 rounded-lg">
            <img
              src="/images/technologies.webp"
              alt="services"
              className="w-6 h-7 object-contain"
            />
          </div>

          <div>
            <h4 className="uppercase text-themeDarkBlue text-sm font-bold">
              All Technologies
            </h4>
            <Link
              to="/technologies"
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
