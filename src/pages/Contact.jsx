import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import GetAPI from "../utilities/GetAPI";
import { PostAPI } from "../utilities/PostAPI";
import { BASE_URL } from "../utilities/URL";
import Loader from "../components/Loader";
import secureLocalStorage from "react-secure-storage";

export default function Contact() {
  const { data } = GetAPI("tailor/get_users");
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState("");
  const [incoming, setIncoming] = useState([]);
  console.log("🚀 ~ Contact ~ incoming:", incoming)
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  const chatContainerRef = useRef(null);

  const handleSize = () => {
    const sizeValue = secureLocalStorage.getItem("Size");
    if (sizeValue) {
      const sizeObject = JSON.parse(sizeValue);
      const formattedSize = `
        Chest: ${sizeObject.chest}
        Waist: ${sizeObject.waist}
        Hips: ${sizeObject.hips}
        Sleeve Length: ${sizeObject.sleeveLenght}
        Shoulder Width: ${sizeObject.shoulderWidth}
        Inseam: ${sizeObject.inseam}
        Outseam: ${sizeObject.outseam}
        Neck: ${sizeObject.neck}
        Jacket Length: ${sizeObject.jacketLenght}
      `;
      setMessage(formattedSize);
    } else {
      alert("No size set till now");
    }
  };

  const fetchChatData = () => {
    axios
      .get(
        BASE_URL +
          `tailor/get_chat_get/${parseInt(secureLocalStorage.getItem("senderId"))}/${parseInt(secureLocalStorage.getItem("recieverId"))}/`
      )
      
      .then((dat) => {
        setIncoming(dat?.data?.data?.data);
      });

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    fetchChatData();
  }, [status]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchChatData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleClick = async (id) => {
    const recieverId = id;
    secureLocalStorage.setItem("recieverId", recieverId);
    let res = await PostAPI("tailor/get_chat", {
      senderId: parseInt(secureLocalStorage.getItem("senderId")),
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
        senderId: parseInt(secureLocalStorage.getItem("senderId")),
        recieverId: parseInt(secureLocalStorage.getItem("recieverId")),
      });
      if (res?.data?.status === "1") {
        setStatus(0);
        setMessage("");
      } else {
        error_toaster(res?.data?.mesage);
      }
    }
  };

  const [initial, setInitial] = useState("");

  useEffect(() => {
    const name = secureLocalStorage.getItem("name");
    if (name) {
      setInitial(name.charAt(0));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <div className="lg:w-[93%] xl:w-5/6 mx-auto">
        <div className="container mx-auto shadow-lg rounded-lg">
          <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
            <div className="font-semibold text-2xl">Chat</div>
            <div className="flex gap-3">
              <button
                className="bg-blue-300 rounded-md px-4 py-2"
                onClick={handleSize}
              >
                Get Size
              </button>
              <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                {initial}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between bg-white border h-[450px]">
            <div className="flex flex-col w-2/5 md:w-[400px] border-r-2 overflow-y-auto">
              <div className="border-b-2 py-4 px-5">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  name="search"
                  type="text"
                  placeholder="Search Chatting"
                  className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                />
              </div>
              {data?.data?.data
                ?.filter(
                  (prod) =>
                    prod.id !==
                      parseInt(secureLocalStorage.getItem("senderId")) &&
                    (prod.name.toLowerCase().includes(search.toLowerCase()) ||
                      prod.email.toLowerCase().includes(search.toLowerCase()))
                )
                .map((data, index) => (
                  <button
                    onClick={() => handleClick(data?.id)}
                    key={index}
                    className={`flex flex-col md:flex-row  justify-start items-center border-b-2 py-4 px-5 ${
                      data.id ===
                      parseInt(secureLocalStorage.getItem("recieverId"))
                        ? "bg-gray-400"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="md:w-1/4">
                      <img
                        src="../images/avatar.jpg"
                        className="object-cover h-12 w-12 rounded-full border"
                        alt={data.name}
                      />
                    </div>
                    <div className="w-full text-start">
                      <div className="text-lg font-semibold text-center md:text-left">
                        {data?.name}
                      </div>
                      <span className="hidden md:block text-gray-500">
                        {data?.email}
                      </span>
                    </div>
                  </button>
                ))}
            </div>

            <div className="w-full md:w-[calc(100%-400px)] px-5 flex flex-col justify-between">
              <div
                ref={chatContainerRef}
                className="flex flex-col overflow-auto mt-5 md:px-5"
              >
                {incoming.map((data, index) =>
                  data.senderId ===
                  parseInt(secureLocalStorage.getItem("senderId")) ? (
                    <div key={index} className="flex justify-end mb-4">
                      <div className="md:max-w-[60%] mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                        {data.message}
                      </div>
                      <img
                        src="../images/avatar.jpg"
                        className="object-cover h-8 w-8 rounded-full border border-black"
                        alt="avatar"
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
                  type="text"
                  name="message"
                  placeholder="Type your message here..."
                  className="w-full mx-auto h-14 bg-[#082835] rounded-full pl-6 outline-none border-none text-white"
                />
                <button className="absolute right-3 top-[28px] px-3 py-2 bg-blue-400 text-white rounded-full">
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
