import React, { useEffect, useRef, useState } from "react";
import { ImOffice } from "react-icons/im";
import { FaDoorOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GrMapLocation } from "react-icons/gr";
import { MdEditCalendar } from "react-icons/md";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { MdApartment, MdOutlinePayment } from "react-icons/md";
import { IoArrowBackOutline, IoClose, IoHome } from "react-icons/io5";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../utilities/Toaster";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PostAPI } from "../utilities/PostAPI";
import { BASE_URL } from "../utilities/URL";
import Loader from "../components/Loader";

export default function Cart() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardExpYear: "2025",
    cardExpMonth: "01",
    cardNumber: "6200000000000005",
    cardCVC: "222",
  });
  const onChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };
  const [modelManager, setModelManager] = useState("address");
  const [addressTab, setAddressTab] = useState(1);

  const paymentFunc = async (e) => {
    e.preventDefault();
    if (paymentDetails.cardName === "") {
      info_toaster("Please Enter Card Name");
    } else if (paymentDetails.cardNum === "") {
      info_toaster("Please Enter Card Num");
    } else if (paymentDetails.cardExpMonth === "") {
      info_toaster("Please Enter Exp Month");
    } else if (paymentDetails.cardExpYear === "") {
      info_toaster("Please Enter Exp Year");
    } else if (paymentDetails.cardCVC === "") {
      info_toaster("Please Enter CVC");
    } else {
      setLoading(true);
      let res = await PostAPI("stripe/attach-card", {
        cardName: paymentDetails.cardName,
        cardExpYear: paymentDetails.cardExpYear,
        cardExpMonth: paymentDetails.cardExpMonth,
        cardNumber: paymentDetails.cardNumber,
        cardCVC: paymentDetails.cardCVC,
      });

      if (res?.data?.data?.stripePaymentId.length > 0) {
        success_toaster(res?.data?.message);
        localStorage.setItem("payment", res?.data?.data?.stripePaymentId);
        setModal(false);
        setLoading(false);
      } else {
        error_toaster(res?.data?.error);
        setLoading(false);
      }
    }
  };

  const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];

  const calculateTotalAmount = () => {
    let total = 0;
    const data = JSON.parse(localStorage.getItem("cartItems"));
    data?.forEach((item) => {
      total += parseFloat(item.amount);
    });
    return total.toFixed(2);
  };

  const createOrder = async (e) => {
    e.preventDefault();
    if (paymentDetails.cardName === "") {
      info_toaster("Please Enter Payment Details");
    } else {
      setLoading(true);
      let res = await PostAPI("item/purchase", {
        paymentMethod: "stripe",
        stripeCardId: localStorage.getItem("payment"),
        total: cartData[0]?.amount,
        items: cartData,
      });
      if (res?.data?.status === "1") {
        setLoading(false);
        success_toaster("Product Buy Sucessfully");
        localStorage.removeItem("cartItems");
        const NewLink = res?.data?.data?.downloadLinks[0]?.downloadLink;
        const downloadLink = NewLink
        if (downloadLink) {
          const anchorElement = document.createElement("a");
          anchorElement.href = downloadLink;
          anchorElement.download = "filename"; 
          anchorElement.setAttribute("target", "_blank");
          document.body.appendChild(anchorElement);
          anchorElement.click();
          document.body.removeChild(anchorElement);
        }
        navigate("/");
      } else {
        setLoading(false);
        error_toaster(res?.data?.mesage);
      }
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Modal
        onClose={() => setModal(false)}
        isOpen={modal}
        isCentered
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <div className="flex justify-between py-3 px-6">
            <button
              onClick={() =>
                addressTab === 1
                  ? setModal(false)
                  : addressTab === 2
                  ? setAddressTab(1)
                  : setAddressTab(2)
              }
              className="flex justify-center items-center text-end rounded-fullest w-8 h-8 bg-[#F4F5FA]"
            >
              <IoArrowBackOutline />
            </button>
            <div
              onClick={() => setModal(false)}
              className="flex justify-center items-center text-end rounded-fullest cursor-pointer w-8 h-8 bg-[#F4F5FA]"
            >
              <IoClose />
            </div>
          </div>
          {modelManager === "address" ? (
            <ModalBody>
              {addressTab === 1 ? (
                <div>
                  <div>
                    <button
                      className="font-switzer font-semibold text-base py-2 px-5 my-5 w-full bg-theme-red text-white rounded"
                      onClick={() => {
                        setAddressTab(2);
                        calculateRoute();
                      }}
                    >
                      Next
                    </button>
                  </div>
                  <div>
                    <img
                      className="h-40 m-auto"
                      src="images/address.png"
                      alt="address"
                    />
                  </div>
                </div>
              ) : addressTab === 2 ? (
                <div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="capitalize text-3xl text-black font-switzer font-semibold">
                        What kind of location is this?
                      </h4>
                      <p className="text-sm font-normal">
                        Help us find you faster by identifying the type of
                        location this is.
                      </p>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <button className="flex justify-center items-center text-end rounded-fullest w-12 h-12 flex-shrink-0 bg-[#F4F5FA]">
                        <IoHome size={28} />
                      </button>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-lg font-semibold">House</p>
                        <button
                          onClick={() => {
                            setCountry({
                              ...country,
                              locationType: "House",
                            });
                            setAddressTab(3);
                          }}
                          className="text-[#379465] flex justify-center items-center text-end rounded-md py-1 px-3 bg-[#37946524]"
                        >
                          Choose
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="flex items-center gap-x-3">
                      <button className="flex justify-center items-center text-end rounded-fullest w-12 h-12 flex-shrink-0 bg-[#F4F5FA]">
                        <MdApartment size={28} />
                      </button>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-lg font-semibold">Apartment</p>
                        <button
                          onClick={() => {
                            setCountry({
                              ...country,
                              locationType: "Apartment",
                            });
                            setAddressTab(3);
                          }}
                          className="text-[#379465] flex justify-center items-center text-end rounded-md py-1 px-3 bg-[#37946524]"
                        >
                          Choose
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="flex items-center gap-x-3">
                      <button className="flex justify-center items-center text-end rounded-fullest w-12 h-12 flex-shrink-0 bg-[#F4F5FA]">
                        <ImOffice size={24} />
                      </button>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-lg font-semibold">Office</p>
                        <button
                          onClick={() => {
                            setCountry({
                              ...country,
                              locationType: "Office",
                            });
                            setAddressTab(3);
                          }}
                          className="text-[#379465] flex justify-center items-center text-end rounded-md py-1 px-3 bg-[#37946524]"
                        >
                          Choose
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="flex items-center gap-x-3">
                      <button className="flex justify-center items-center text-end rounded-fullest w-12 h-12 flex-shrink-0 bg-[#F4F5FA]">
                        <MdEditCalendar size={24} />
                      </button>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-lg font-semibold">Others</p>
                        <button
                          onClick={() => {
                            setCountry({
                              ...country,
                              locationType: "Others",
                            });
                            setAddressTab(3);
                          }}
                          className="text-[#379465] flex justify-center items-center text-end rounded-md py-1 px-3 bg-[#37946524]"
                        >
                          Choose
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div>
                    <button
                      className="font-switzer font-semibold text-base py-2 px-5 my-5 w-full bg-theme-red text-white rounded"
                      onClick={() => setAddressTab(3)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="capitalize text-2xl text-black font-switzer font-semibold">
                        Address details
                      </h4>
                      <p className="text-sm font-normal text-black text-opacity-50">
                        Giving exact address details helps us deliver your order
                        faster.
                      </p>
                    </div>
                    <div>
                      <h4 className="capitalize text-xl text-black font-switzer font-semibold">
                        Address
                      </h4>
                      <p className="text-sm font-normal text-black">
                        {country?.countries?.label} ,
                        <span className="text-black text-opacity-50">
                          {country?.cities?.label}
                        </span>
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        {/* <label className={labelStyle}>Location Type</label> */}
                        <select
                          className="w-full resize-none font-normal text-base text-black rounded py-2.5 px-4 bg-white border-2 border-theme-gray-4 placeholder:text-black placeholder:text-opacity-40 focus:outline-none"
                          value={country.locationType}
                          onChange={(e) =>
                            setCountry({
                              ...country,
                              locationType: e.target.value,
                            })
                          }
                        >
                          <option value="House">House</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Office">Office</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      <div>
                        <input
                          onChange={(e) =>
                            setCountry({
                              ...country,
                              entrance: e.target.value,
                            })
                          }
                          type="text"
                          value={country?.entrance}
                          className="w-full resize-none font-normal text-base text-black rounded py-2.5 px-4 bg-white border-2 border-theme-gray-4 placeholder:text-black placeholder:text-opacity-40 focus:outline-none"
                          placeholder="Entrance / Staircase"
                        />
                      </div>
                      <div>
                        <input
                          onChange={(e) =>
                            setCountry({
                              ...country,
                              door: e.target.value,
                            })
                          }
                          type="text"
                          value={country?.door}
                          className="w-full resize-none font-normal text-base text-black rounded py-2.5 px-4 bg-white border-2 border-theme-gray-4 placeholder:text-black placeholder:text-opacity-40 focus:outline-none"
                          placeholder="Name / No on Door"
                        />
                      </div>
                      <div>
                        <input
                          onChange={(e) =>
                            setCountry({
                              ...country,
                              instructions: e.target.value,
                            })
                          }
                          type="text"
                          value={country?.instructions}
                          className="w-full resize-none font-normal text-base text-black rounded py-2.5 px-4 bg-white border-2 border-theme-gray-4 placeholder:text-black placeholder:text-opacity-40 focus:outline-none"
                          placeholder="Other instructions for the courier"
                        />
                        <p className="text-sm text-black text-opacity-50 ml-3">
                          Optional
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="capitalize text-xl text-black font-switzer font-semibold">
                        Where exactly should we meet you?
                      </h4>
                      <p className="text-sm font-normal text-black text-opacity-50">
                        Pinpointing your exact location on the map helps us find
                        you fast.
                      </p>
                    </div>
                    <button className="flex items-center justify-center gap-x-3 text-[#E13743] bg-[#E1374366] font-semibold w-full rounded-sm px-3 py-2">
                      <GrMapLocation />
                      Add a meeting point on the map
                    </button>
                    <div className="space-y-1">
                      <h4 className="capitalize text-xl text-black font-switzer font-semibold">
                        Address label
                      </h4>
                      <p className="text-sm font-normal text-black text-opacity-50">
                        Pinpointing your exact location on the map helps us find
                        you fast.
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="font-switzer font-semibold text-base py-2 px-5 my-5 w-full bg-theme-red text-white rounded"
                      onClick={() => {
                        setAddressTab(1);
                        setModal(false);
                      }}
                    >
                      Save address
                    </button>
                  </div>
                </div>
              )}
            </ModalBody>
          ) : modelManager === "delivery" ? (
            <ModalBody>
              <div className="font-switzer">
                <div>
                  <h4 className="text-lg text-black font-medium capitalize my-3">
                    Select Order Details
                  </h4>
                </div>
                <div className="my-8">
                  <h2 className="text-xl font-semibold">How ??</h2>
                  <div>
                    <div className="flex items-center">
                      <input
                        onChange={() => setDelivery({ ...delivery, how: 1 })}
                        type="radio"
                        name="how"
                        id="how-1"
                      />
                      <label htmlFor="how-1" className="flex flex-col p-3">
                        <span className="font-medium text-lg">Delivery</span>
                        <span className="font-sm text-black text-opacity-50">
                          0.2 km delivery distance
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        onChange={() => setDelivery({ ...delivery, how: 2 })}
                        type="radio"
                        name="how"
                        id="how-2"
                      />
                      <label htmlFor="how-2" className="flex flex-col p-3">
                        <span className="font-medium text-lg">Takeaway</span>
                        <span className="font-sm text-black text-opacity-50">
                          I'll pick it up myself
                        </span>
                      </label>
                    </div>
                  </div>
                  <hr />
                  <h2 className="text-xl font-semibold mt-4">When ??</h2>
                  <div>
                    <div className="flex items-center">
                      <input
                        onChange={() => setDelivery({ ...delivery, when: 1 })}
                        type="radio"
                        name="when"
                        id="when-1"
                      />
                      <label htmlFor="when-1" className="flex flex-col p-3">
                        <b>As soon as possible</b>
                        <span>You'll get your order in 0 to 5 minute</span>
                      </label>
                    </div>
                    {/* <div className="flex items-center">
                          <input name="orderModeId" type="radio" id="later" />
                          <label htmlFor="later" className="flex flex-col p-3">
                            <b>Schedule for later</b>
                            <input type="datetime-local" />
                          </label>
                        </div> */}
                  </div>
                </div>

                <div className="mb-8">
                  <button
                    onClick={() => setModal(false)}
                    className="bg-[#E13743] text-white rounded-sm w-full py-2 px-3"
                  >
                    Done
                  </button>
                </div>
              </div>
            </ModalBody>
          ) : (
            <form onSubmit={paymentFunc}>
              <ModalBody>
                <div className="text-white">
                  <h4 className="text-2xl text-black font-switzer font-bold capitalize my-3">
                    Add payment method
                  </h4>
                  <div className="text-white bg-blue-400 bg-payment-bg bg-cover rounded-sm shadow-md p-5">
                    <div className="flex justify-end">
                      <h5>Credit/Debit</h5>
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <label htmlFor="cardName">Card Name</label>
                      <input
                        value={paymentDetails.cardName}
                        onChange={onChange}
                        type="text"
                        name="cardName"
                        id="cardName"
                        className="w-full resize-none font-normal text-base text-black rounded py-2.5 px-4 bg-theme-gray-4 border-none placeholder:text-black placeholder:text-opacity-40 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        value={paymentDetails.cardNumber}
                        onChange={onChange}
                        type="text"
                        name="cardNumber"
                        id="cardNumber"
                        className="w-full resize-none font-normal text-base text-black rounded py-2.5 px-4 bg-theme-gray-4 border-none placeholder:text-black placeholder:text-opacity-40 focus:outline-none"
                        maxLength="16"
                      />
                    </div>
                    <div className="flex justify-between items-center gap-y-2 gap-x-3 my-3">
                      <div>
                        <label htmlFor="cardExpMonth">Expiration Month</label>
                        <input
                          value={paymentDetails.cardExpMonth}
                          onChange={onChange}
                          type="text"
                          name="cardExpMonth"
                          id="cardExpMonth"
                          className="w-full resize-none font-normal text-base text-black rounded py-2.5 px-4 bg-theme-gray-4 border-none placeholder:text-black placeholder:text-opacity-40 focus:outline-none"
                          maxLength="2"
                        />
                      </div>
                      <div>
                        <label htmlFor="cardExpYear">Expiration Year</label>
                        <input
                          value={paymentDetails.cardExpYear}
                          onChange={onChange}
                          type="text"
                          name="cardExpYear"
                          id="cardExpYear"
                          className="w-full resize-none font-normal text-base text-black rounded py-2.5 px-4 bg-theme-gray-4 border-none placeholder:text-black placeholder:text-opacity-40 focus:outline-none"
                          maxLength="4"
                        />
                      </div>
                      <div>
                        <label htmlFor="cardCVC">Security code</label>
                        <input
                          value={paymentDetails.cardCVC}
                          onChange={onChange}
                          type="text"
                          name="cardCVC"
                          id="cardCVC"
                          className="w-full resize-none font-normal text-base text-black rounded py-2.5 px-4 bg-theme-gray-4 border-none placeholder:text-black placeholder:text-opacity-40 focus:outline-none"
                          maxLength="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  type="submit"
                  disabled={loading === true ? true : false}
                  className="bg-[#E13743] text-white text-lg rounded-sm border border-[#E13743] py-2 px-5 w-full hover:bg-transparent hover:text-[#E13743]"
                >
                  Save
                </button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <Header />
      <section className="grid lg:grid-cols-3 gap-x-5 gap-y-5 w-11/12 mx-auto py-28 font-switzer">
        <div className="sm:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-5 my-4">
            <div className="flex items-center text-2xl gap-x-2">
              <FaDoorOpen />
              <h3>Your Order</h3>
            </div>
            {cartData?.map((cart, index) => (
              <div className="flex items-center justify-between gap-x-2">
                <div className="flex items-center gap-x-3 my-2">
                  <div className="border-2 border-gray-100 rounded-xl p-2">
                    <img
                      className="sm:w-20 sm:h-20 w-6 h-6 object-contain rounded-md"
                      src={`${BASE_URL}${cart?.img}`}
                      alt={cart?.name}
                    />
                  </div>
                  <h5>
                    <b>{cart?.name}</b>
                  </h5>
                </div>

                <div className="">
                  <h5>{cart?.amount} $</h5>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-x-2">
            <MdOutlinePayment size={24} className="text-2xl" />
            <h3 className="text-2xl font-semibold">Payment Method</h3>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-5 my-4">
            <div className="flex items-center justify-between w-full font-semibold text-lg">
              <div>
                {paymentDetails?.cardNumber === "" ? (
                  <h5>Add a debit/ credit card</h5>
                ) : (
                  <h5>
                    Card Ending with {paymentDetails.cardNumber.slice(-4)}
                  </h5>
                )}
              </div>
              <div>
                {paymentDetails?.cardNum === "" ? (
                  <div className="bg-[#40875D24] rounded-md px-3 py-1">
                    <button
                      onClick={() => {
                        setModal(true);
                        setModelManager("payment");
                      }}
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <div className="text-[#40875D] text-lg font-semibold rounded-md px-3 py-1">
                    <button
                      onClick={() => {
                        setModal(true);
                        setModelManager("payment");
                      }}
                    >
                      Add Card
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-white rounded-lg shadow-lg p-5">
            <div className="flex items-center text-2xl gap-x-2">
              <h3 className="font-semibold ">Prices in EUR, incl. taxes</h3>
            </div>
            <div className="space-y-3 my-4">
              <div className="flex items-center justify-between gap-x-2">
                <h5 className="text-lg font-semibold text-black text-opacity-50">
                  Subtotal
                </h5>
                <h6>${calculateTotalAmount()}</h6>
              </div>

              <div className="flex items-center justify-between gap-x-2">
                <h5 className="font-semibold text-2xl">Total</h5>
                <h6>${calculateTotalAmount()}</h6>
              </div>
              <div className="border-dashed border" />
            </div>
            <div>
              <button
                onClick={createOrder}
                className="bg-black w-full text-xl font-semibold text-white rounded-md px-3 py-2"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
