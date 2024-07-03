import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import GetAPI from "../utilities/GetAPI";
import { PostAPI } from "../utilities/PostAPI";
import { info_toaster, success_toaster } from "../utilities/Toaster";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const allUsers = GetAPI("admin/get_all");
  const productCategories = GetAPI("admin/product_categories");
  console.log(
    "🚀 ~ AddProduct ~ productCategories:",
    productCategories?.data?.data?.data?.[0]?.id
  );
  const [addProduct, setAddProduct] = useState({
    title: "",
    price: "",
    type: "",
    color: "",
    description: "",
    ProductCategoryId: '1',
    UserId: secureLocalStorage.getItem("senderId"),
    isFeatured: "1",
    image: "",
    images: [],
  });

  const catOption = allUsers?.data?.data?.data?.filter(
    (data) => data.id === parseInt(addProduct.UserId)
  )?.[0]?.userType;

  const onChange = (e) => {
    if (e.target.type === "file") {
      if (e.target.name === "image") {
        setAddProduct({ ...addProduct, image: e.target.files[0] });
      } else if (e.target.name === "images") {
        setAddProduct({ ...addProduct, images: [...e.target.files] });
      }
    } else {
      setAddProduct({ ...addProduct, [e.target.name]: e.target.value });
    }
  };
  const addProductFunc = async (e) => {
    e.preventDefault();
    const {
      title,
      price,
      description,
      type,
      color,
      ProductCategoryId,
      UserId,
      isFeatured,
      image,
      images,
    } = addProduct;

    if (title === "") {
      info_toaster("Please Enter Title");
    } else if (price === "") {
      info_toaster("Please Enter Price");
    } else if (description === "") {
      info_toaster("Please Enter Description");
    } else if (ProductCategoryId === "") {
      info_toaster("Please Select Product Category");
    } else if (UserId === "") {
      info_toaster("Please Select User");
    } else if (isFeatured === "") {
      info_toaster("Please Select Feature Status");
    } else if (!image) {
      info_toaster("Please Upload Main Image");
    } else if (images.length === 0) {
      info_toaster("Please Upload At Least One Additional Image");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("color", color);
      formData.append("type", type);
      formData.append("description", description);
      formData.append("ProductCategoryId", ProductCategoryId);
      formData.append("UserId", UserId);
      formData.append("userType", secureLocalStorage.getItem("userType"));
      formData.append("isFeatured", isFeatured);
      formData.append("status", 0);
      formData.append("image", image);
      images.forEach((file) => {
        formData.append("images", file);
      });

      try {
        let res = await PostAPI("admin/addProduct", formData);
        if (res?.data?.status === "1") {
          success_toaster(res?.data?.message);
          navigate("/");
        } else {
          setLoader(false);
          info_toaster(res?.data?.message);
        }
      } catch (error) {
        setLoader(false);
        console.error(error);
        info_toaster("An error occurred while adding the product.");
      }
    }
  };

  const labelStyle = "font-normal text-sm text-black";
  const inputStyle =
    "w-full resize-none font-normal text-base text-black rounded py-2.5 px-4 bg-[#f4f4f4] border-none placeholder:text-black placeholder:text-opacity-40 focus:outline-none";

  return (
    <>
      <Header />
      <div className="lg:w-[93%] xl:w-5/6 mx-auto">
        <h3 className="text-4xl font-semibold my-10">Add Product</h3>
        <div className="container mx-auto rounded-lg">
          <form>
            <div className="space-y-5">
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="title">
                    Product Name
                  </label>
                  <input
                    value={addProduct?.title}
                    onChange={onChange}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Product Name"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="price">
                    Product Price
                  </label>
                  <input
                    value={addProduct?.price}
                    onChange={onChange}
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Product Price"
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="type">
                    Product Type
                  </label>
                  <input
                    value={addProduct?.type}
                    onChange={onChange}
                    type="text"
                    name="type"
                    id="type"
                    placeholder="Product Type"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="color">
                    Product Color
                  </label>
                  <input
                    value={addProduct?.color}
                    onChange={onChange}
                    type="text"
                    name="color"
                    id="color"
                    placeholder="Product Color"
                    className={inputStyle}
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="description">
                    Product Description
                  </label>
                  <input
                    value={addProduct?.description}
                    onChange={onChange}
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Product Name"
                    className={inputStyle}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="isFeatured">
                    Featured Product
                  </label>
                  <select
                    className={inputStyle}
                    onChange={onChange}
                    name="type"
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-x-4">
                {/* <div className="space-y-1 w-full">
                  <label className={labelStyle} htmlFor="description">
                    Select Tailor / Shop
                  </label>
                  <select
                    className={inputStyle}
                    onChange={onChange}
                    name="UserId"
                  >
                    <option>Select Tailor / Shop</option>
                    {allUsers?.data?.data?.data?.map((data, index) => (
                      <option key={index} value={data?.id}>
                        {data?.name}
                      </option>
                    ))}
                  </select>
                </div> */}
                {catOption === "tailor" ? (
                  ""
                ) : (
                  <div className="space-y-1 w-full">
                    <label className={labelStyle} htmlFor="isFeatured">
                      Select Product Category
                    </label>
                    <select
                      className={inputStyle}
                      onChange={onChange}
                      name="ProductCategoryId"
                    >
                      <option>Select Product Category</option>
                      {productCategories?.data?.data?.data?.map(
                        (data, index) => (
                          <option key={index} value={data?.id}>
                            {data?.title}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
              </div>

              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="image">
                  Image
                </label>
                <input
                  onChange={onChange}
                  type="file"
                  name="image"
                  id="image"
                  placeholder="image"
                  className={inputStyle}
                />
              </div>
              <div className="space-y-1 w-full">
                <label className={labelStyle} htmlFor="images">
                  Images
                </label>
                <input
                  onChange={onChange}
                  type="file"
                  name="images"
                  id="images"
                  placeholder="images"
                  className={inputStyle}
                  multiple={true}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={addProductFunc}
              disabled={disabled}
              className="py-2.5 w-24 rounded font-medium text-sm bg-graydark border my-5"
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
