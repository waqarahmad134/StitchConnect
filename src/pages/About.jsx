import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function About() {
  return (
    <>
      <Header />
      <div className="w-3/4 mx-auto py-20">
        <div>
          <h1>
            About<b> Stitch Connect</b>
          </h1>
          <p>
            Welcome to <b>Stitch Connect</b> where we share information related
            to service. We're dedicated to providing you the very best
            information and knowledge of the above mentioned topics. Our about
            us page is generated with the help of
            <a>About Us Page Generator</a>
          </p>
          <p>
            We hope you found all of the information on <b>Stitch Connect</b> helpful, as we love to share them with you.
          </p>
          <p>
            If you require any more information or have any questions about our
            site, please feel free to contact us by email at <br />
            <b>info@stitchconnect.com</b>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
