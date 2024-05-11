import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function ServicesMenu() {
  const location = useLocation().pathname;
  return (
    <div className="lg:grid grid-cols-7">
      <div className="bg-themeLightGray col-span-2 rounded-l-lg">
        <img src="/images/menu.webp" alt="menu" className="w-40" />

        <div className="px-5 pb-5 space-y-1">
          <h2 className="text-xl md:tex-2xl font-bold text-themeBlue uppercase">
            Services
          </h2>
          <p className="text-themeSlate text-sm">
            Explore our comprehensive range of development services designed to
            bring your digital products to life, from ideation to launch and
            beyond.
          </p>
        </div>
      </div>

      <div className="col-span-5 py-5 px-5 space-y-5 flex flex-col justify-between">
        <div className="lg:flex gap-5 2xl:gap-40 space-y-5 lg:space-y-0">
          <div className=" space-y-2">
            <h3 className="text-base text-themeLightSlate uppercase">
              Custom Software Development
            </h3>
            <ul className="space-y-3">
              <li
                className={`text-sm ${
                  location === "/services/custom-software-development"
                    ? "text-themeBlue underline"
                    : "text-themeDarkBlue"
                } `}
              >
                <Link to="/services/custom-software-development">
                  Custom Software Development
                </Link>
              </li>
              <li className="text-sm text-themeDarkBlue">Web Development</li>
              <li className="text-sm text-themeDarkBlue">
                Startup MVP Development
              </li>
              <li className="text-sm text-themeDarkBlue">
                WordPress Development Services
              </li>
              <li className="text-sm text-themeDarkBlue">Mobile Development</li>
              <li className="text-sm text-themeDarkBlue">
                E-Commerce App Development Services
              </li>
              <li className="text-sm text-themeDarkBlue">
                <Link
                  to="/services/ui-ux"
                  className={`text-sm ${
                    location === "/services/ui-ux"
                      ? "text-themeBlue underline"
                      : "text-themeDarkBlue"
                  } `}
                >
                  UI/UX Design
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-base text-themeLightSlate uppercase">
              Intelligent Automation
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-themeDarkBlue">
                AI & ML Development
              </li>
              <li className="text-sm text-themeDarkBlue">
                AI Chatbot Development
              </li>
              <li className="text-sm text-themeDarkBlue">
                Blockchain Development
              </li>
              <li className="text-sm text-themeDarkBlue">
                Machine Learning Consulting
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <h3 className="text-base text-themeLightSlate uppercase">
                Staff Augmentation
              </h3>
              <ul>
                <li className="text-sm text-themeDarkBlue">
                  Staff Augmentation
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-base text-themeLightSlate uppercase">
                IT Consulting
              </h3>
              <ul>
                <li className="text-sm text-themeDarkBlue">Discovery Phase</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-base text-themeLightSlate uppercase">
                Managed IT Services
              </h3>
              <ul>
                <li className="text-sm text-themeDarkBlue">
                  Cloud & DevOps Consulting
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-themeGray rounded-lg p-4">
          <div className="bg-white p-2 rounded-lg">
            <img
              src="/images/services.webp"
              alt="services"
              className="w-6 h-7 object-contain"
            />
          </div>

          <div>
            <h4 className="uppercase text-themeDarkBlue text-sm font-bold">
              All Services
            </h4>
            <Link
              to="/services"
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
