import axios from "axios";

import config from "./config";

const ci = axios.create({ baseURL: config.API_URL });

ci.interceptors.request.use(
  config => {
    let token;
    const carnival = localStorage.getItem("CARNIVAL_JWT");
    const express = localStorage.getItem("EXPRESS_JWT");
    const ge = localStorage.getItem("GE_JWT");

    if (carnival) {
      token = carnival;
    } else if (express) {
      token = express;
    } else if (ge) {
      token = ge;
    }

    if (token != null) config.headers = { Authorization: "Bearer " + token };

    return config;
  },
  err => Promise.reject(err)
);

const read = company =>
  new Promise(async (resolve, reject) => {
    try {
      const limit = 500;

      const { data } = await ci.get(
        `/candidate?limit=${limit}&company=${company}`
      );

      resolve(data);
    } catch (e) {
      reject(e.response.data.error);
    }
  });

export default { read };
