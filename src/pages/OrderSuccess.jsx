import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { slug } = useParams();
  return (
    <>
      <Header />
      <div className="w-3/4 mx-auto py-20">
        <h1 className="text-4xl font-switzer font-semibold">Order Placed Sucessfully : Order ID {slug}</h1>
      </div>
      <Footer />
    </>
  );
}
