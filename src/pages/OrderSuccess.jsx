import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import GetAPI from "../utilities/GetAPI";

export default function OrderSuccess() {
  const { orderId } = useParams();
  console.log("🚀 ~ OrderSuccess ~ orderId:", orderId)
  const {data} = GetAPI(`tailor/after_payment/${orderId}`);
  console.log("🚀 ~ OrderSuccess ~ data:", data)

  return (
    <>
      <Header />
      <div className="w-3/4 mx-auto py-20">
        <h1 className="text-4xl font-switzer font-semibold">Order Placed Sucessfully : Order ID {orderId}</h1>
      </div>
      <Footer />
    </>
  );
}
