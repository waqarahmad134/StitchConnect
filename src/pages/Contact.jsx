import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import GetAPI from "../utilities/GetAPI";
import { PostAPI } from "../utilities/PostAPI";
import { BASE_URL } from "../utilities/URL";

export default function Contact() {
  const { data } = GetAPI("tailor/get_users");
  const [message, setMessage] = useState(null);
  const [incoming, setIncoming] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    axios
      .get(
        BASE_URL +
          `tailor/get_chat_get/${parseInt(
            localStorage.getItem("senderId")
          )}/${parseInt(localStorage.getItem("recieverId"))}/`
      )
      .then((dat) => {
        setIncoming(dat?.data?.data?.data);
      });
  }, [status]);

  const handleClick = async (id) => {
    const recieverId = id;
    localStorage.setItem("recieverId", recieverId);
    let res = await PostAPI("tailor/get_chat", {
      senderId: parseInt(localStorage.getItem("senderId")),
      recieverId: id,
    });
    if (res?.data?.status === "1") {
      setIncoming(res?.data?.data?.data);
    } else {
      error_toaster(res?.data?.mesage);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setStatus(1);
    if (message === "") {
      info_toaster("Please enter Message");
    } else {
      let res = await PostAPI("tailor/send_message", {
        message: message,
        senderId: parseInt(localStorage.getItem("senderId")),
        recieverId: parseInt(localStorage.getItem("recieverId")),
      });
      if (res?.data?.status === "1") {
        setStatus(0);
        setMessage("");
      } else {
        error_toaster(res?.data?.mesage);
      }
    }
  };
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
              {data?.data?.data?.map((data, index) => (
                <button
                  onClick={() => handleClick(data?.id)}
                  key={index}
                  className="flex justify-start items-center border-b-2 py-4 px-5"
                >
                  <div className="w-1/4">
                    <img
                      src="../images/avatar.jpg"
                      className="object-cover h-12 w-12 rounded-full border"
                      alt={data.name}
                    />
                  </div>
                  <div className="w-full text-start">
                    <div className="text-lg font-semibold">
                      {data?.name} {data?.id}
                    </div>
                    <span className="text-gray-500">{data?.email}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="w-full px-5 flex flex-col justify-between">
              <div className="flex flex-col mt-5 px-5 overflow-auto">
                {incoming.map((data, index) =>
                  data.senderId ===
                  parseInt(localStorage.getItem("senderId")) ? (
                    <div key={index} className="flex justify-end mb-4">
                      <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                        {data.message}
                      </div>
                      <img
                        src="../images/avatar.jpg"
                        className="object-cover h-8 w-8 rounded-full border border-black"
                        alt=""
                      />
                    </div>
                  ) : (
                    <div key={index} className="flex justify-start mb-4">
                      <img
                        src="../images/avatar.jpg"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                      />
                      <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                        {data.message}
                      </div>
                    </div>
                  )
                )}
              </div>

              <form onSubmit={sendMessage} className="py-5 relative">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="message"
                  name="message"
                  placeholder="Type your message here..."
                  className="w-full mx-auto h-14 bg-[#082835] rounded-full pl-6 outline-none border-none text-white"
                />
                <button className="absolute right-3 top-8 px-3 py-2 bg-blue-400 text-white rounded-md">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
