import axios from "axios";
import { BASE_URL } from "../utilities/URL";

export const PutAPI = async (url, putData) => {
  let config = {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  };
  try {
    const res = await axios.put(BASE_URL + url, putData, config);
    return res;
  } catch (err) {}
};
