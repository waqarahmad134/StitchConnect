import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import GetAPI from "../utilities/GetAPI";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import { BASE_URL } from "../utilities/URL";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export default function Profile() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const tailorData = GetAPI(`tailor/tailor_details/${slug}`);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);
  const [loading, setLoading] = useState(true);
  // const { data } = GetAPI(`tailor/get_profile/${parseInt(localStorage.getItem('senderId'))}`);
  const handleChatNow = (id) => {
    localStorage.setItem("recieverId", id);
    navigate("/contact");
  };
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <section>
        <div>
          <div className="lg:w-[93%] xl:w-5/6 mx-auto grid md:grid-cols-12 gap-x-6 md:gap-x-14 py-5">
            <div className="md:col-span-3">
              <div className="cat-section hidden md:block">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div>
                      <img
                        className="h-32 w-32 rounded-full"
                        src={`${BASE_URL}${tailorData?.data?.data?.data?.image}`}
                        alt=""
                      />
                    </div>
                    <h1 className="italic text-2xl font-semibold">
                      {tailorData?.data?.data?.data?.name}
                    </h1>
                    {/* <h3>Shop / Traditional</h3> */}
                    <h4>{tailorData?.data?.data?.data?.description}</h4>
                    <div>
                      <button
                        onClick={() =>
                          handleChatNow(tailorData?.data?.data?.data?.id)
                        }
                        className="flex items-center gap-x-2 bg-black text-white px-10 py-2"
                      >
                        <IoChatboxEllipsesOutline size={24} />
                        Chat Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-9">
              <div className="flex justify-end">
                <iframe
                  className="h-64 w-[70%]"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3403.1743953984787!2d74.2409324!3d31.4643885!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919034c755328a9%3A0x328f24b5ddc161fa!2sQanmos%20Trade%20Test%20and%20Technical%20Training%20Center%20(QTTC)!5e0!3m2!1sen!2s!4v1715894364365!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div>
                <div className="flex justify-end items-center">
                  <div>
                    <h2 className="text-4xl font-semibold italic my-3">
                      Portfolio
                    </h2>
                  </div>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-x-2 md:gap-x-3 gap-y-2 md:gap-y-3">
                  {tailorData?.data?.data?.data?.Products?.slice(
                    first,
                    first + rows
                  ).map((prod, index) => (
                    <div
                      className="relative shadow-xl hover:scale-105 duration-500"
                      key={index}
                    >
                      <div className="h-32 border border-transparent cursor-pointer">
                        <Link to={`/product-details/${prod?.id}`}>
                          <img
                            src={`${BASE_URL}${prod?.image}`}
                            alt={prod?.title}
                            className="h-full w-full object-top object-cover"
                          />
                        </Link>
                      </div>
                      <div className="space-y-2 p-3">
                        <h4 className="text-xl font-semibold">{prod?.title}</h4>
                        <Link
                          to={`/product-details/${prod?.id}`}
                          className="block bg-black uppercase text-center py-2 text-white w-full"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
