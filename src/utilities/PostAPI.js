import axios from "axios";
import { BASE_URL } from "../utilities/URL";

export const PostAPI = async (url, postData) => {
  let config = {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
      // 'Content-Type': 'multipart/form-data'
    },
  };
  try {
    const res = await axios.post(
      BASE_URL + url,
      postData,
      config
    );
    return res;
  } catch (err) {}
};

export const loginAPI = async (url, postData) => {
  try {
    const res = await axios.post(BASE_URL + url, postData);
    return res;
  } catch (err) {}
};
