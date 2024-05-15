import { stringify } from "postcss";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import GetAPI from "../utilities/GetAPI";

export default function Profile() {
  const {data} = GetAPI(`tailor/get_profile/4`);
  
  console.log("🚀 ~ Profile ~ data:", data)
  return (
    <div>
      <Header />
      {JSON.stringify(data)}
      <Footer />
    </div>
  );
}
