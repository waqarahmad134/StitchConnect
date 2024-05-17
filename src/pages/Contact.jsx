import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Contact() {
  const waqar = [1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      <Header />
      <div className="lg:w-[93%] xl:w-5/6 mx-auto">
        <div className="container mx-auto shadow-lg rounded-lg">
          <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
            <div className="font-semibold text-2xl">Chat</div>

            <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
              RA
            </div>
          </div>
          <div className="flex flex-row justify-between bg-white border h-[450px]">
            <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto ">
              <div className="border-b-2 py-4 px-5">
                <input
                  type="text"
                  placeholder="search chatting"
                  className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                />
              </div>
              {waqar.map((data, index) => (
                <div className=" flex flex-row py-4 px-5 justify-center items-center border-b-2">
                  <div className="w-1/4">
                    <img
                      src="../images/avatar.jpg"
                      className="object-cover h-12 w-12 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="w-full">
                    <div className="text-lg font-semibold">Tailor {data}</div>
                    <span className="text-gray-500">Pick me at 9:00 Am</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full px-5 flex flex-col justify-between">
              <div className="flex flex-col mt-5 px-5 overflow-auto">
                <div className="flex justify-end mb-4">
                  <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    Welcome to group everyone !
                  </div>
                  <img
                    src="../images/avatar.jpg"
                    className="object-cover h-8 w-8 rounded-full border border-black"
                    alt=""
                  />
                </div>
                <div className="flex justify-start mb-4">
                  <img
                    src="../images/avatar.jpg"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat at praesentium, aut ullam delectus odio error sit
                    rem. Architecto nulla doloribus laborum illo rem enim dolor
                    odio saepe, consequatur quas?
                  </div>
                </div>
              </div>
              <div className="py-5 relative">
                <input
                  className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                  type="text"
                  placeholder="type your message here..."
                />
                <button className="absolute right-3 top-8 px-3 py-2 bg-blue-400 text-white rounded-md">Submit</button>
             
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
