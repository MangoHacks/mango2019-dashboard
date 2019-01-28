import axios from "axios";

import config from "./config";

const hi = axios.create({ baseURL: config.API_URL });

hi.interceptors.request.use(
  config => {
    const token = localStorage.getItem("JWT");
    if (token != null) config.headers = { Authorization: "Bearer " + token };

    return config;
  },
  err => Promise.reject(err)
);

const read = () =>
  new Promise(async (resolve, reject) => {
    try {
      const limit = 500;

      const { data } = await hi.get(`/application?limit=${limit}`);

      resolve(data);
    } catch (e) {
      reject(e.response.data.error);
    }
  });

export default { read };
