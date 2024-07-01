import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function About() {
  return (
    <>
      <Header />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto gap-5 py-12">
        <div className="bg-white border-2 overflow-hidden shadow-xl  sm:rounded-lg p-5 hover:bg-gray-100 transition duration-300">
          <div className="flex justify-between items-center gap-4">
            <div className="h-20 w-20">
              <img
                className="h-full w-full object-contain rounded-full"
                src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                alt=""
              />
            </div>
            <div className="flex-grow">
              <a href="{{route('ride.show',['ride' => $ride])}}">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold">Driver Waqar</h3>
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" id="star"><path fill="#f8b84e" d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z" color="#000" overflow="visible" transform="matrix(.04574 0 0 .04561 68.85 -40.34)"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" id="star"><path fill="#f8b84e" d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z" color="#000" overflow="visible" transform="matrix(.04574 0 0 .04561 68.85 -40.34)"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" id="star"><path fill="#f8b84e" d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z" color="#000" overflow="visible" transform="matrix(.04574 0 0 .04561 68.85 -40.34)"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" id="star"><path fill="#f8b84e" d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z" color="#000" overflow="visible" transform="matrix(.04574 0 0 .04561 68.85 -40.34)"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" id="star"><path fill="" d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z" color="#000" overflow="visible" transform="matrix(.04574 0 0 .04561 68.85 -40.34)"></path></svg>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold">200 PKR</h3>
                </div>
                <hr className="border-2 my-2 mx-5" />
                <p className="text-sm text-gray-600">Pik up time</p>
                <p className="text-sm text-gray-600">Return Time</p>
                <p className="text-sm text-gray-600">Male</p>
                <p className="text-sm text-gray-600">Passenger</p>
                <p className="text-sm text-gray-600">Count</p>
              </a>
            </div>
          </div>
        </div>
      </div>
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
