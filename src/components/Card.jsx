import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utilities/URL";

export default function Card(props) {
  return (
    <>
      <div
        className="relative shadow-xl hover:scale-105 duration-500"
        key={props?.index}
      >
        <div className="h-32 border border-transparent cursor-pointer">
          <Link to={`/product-details/${props?.id}`}>
            <img
              src={`${BASE_URL}${props?.image}`}
              alt={props?.title}
              className="h-full w-full object-top object-cover"
            />
          </Link>
        </div>
        <div className="space-y-2 p-3">
          <h4 className="text-xl font-semibold">{props?.title}</h4>
          <p className="hidden lg:block  text-gray-400 text-sm">
            {(props?.description)}
          </p>
        
          <Link
            to={`/product-details/${props?.id}`}
            className="block bg-black uppercase text-center py-2 text-white w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
}
