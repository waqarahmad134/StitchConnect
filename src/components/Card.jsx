import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utilities/URL";

export default function Card(props) {
  return (
    <>
      <div
        className="relative shadow-xl rounded-2xl hover:scale-105 duration-500"
        key={props?.index}
      >
        <div className="border border-transparent cursor-pointer">
          <Link to={`/product-details/${props?.id}`}>
            <img
              src={`${BASE_URL}${props?.image}`}
              alt={props?.title}
              className="max-h-96 object-top w-full object-cover rounded-t-2xl mx-auto"
            />
          </Link>
        </div>
        <div className="space-y-2 p-3">
          <h4 className="text-sm">{props?.title}</h4>
          <p className="hidden lg:block  text-gray-400 text-sm">
            {(props?.description).substring(0, 42)}
          </p>
        
          <Link
            to={`/product-details/${props?.id}`}
            className="block bg-blue-400 uppercase text-center py-2 text-white rounded-b-md w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
}
