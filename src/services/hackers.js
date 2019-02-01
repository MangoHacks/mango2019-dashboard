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

const read = (limit = 500) =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await hi.get(`/application?limit=${limit}`);

      resolve(data);
    } catch (e) {
      // reject(e.response.data.error);
    }
  });

const search = query =>
  new Promise(async (resolve, reject) => {
    try {
      let encodedQuery = encodeURI(query);
      const { data } = await hi.get(`/application?q=${encodedQuery}`);
      resolve(data);
    } catch (e) {
      reject(e.response.data.error);
    }
  });

const checkIn = email => {
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await hi.post(`/checkin`, {
        email: email
      });
      resolve(data);
    } catch (e) {
      reject(e.response.data.error);
    }
  });
};

const register = fields =>
  new Promise(async (resolve, reject) => {
    let formData = new FormData();

    Object.keys(fields).forEach(key => formData.append(key, fields[key]));

    try {
      const { data } = await hi.post("/walkin", fields);
      resolve(data);
    } catch (e) {
      reject(e.response.data.error);
    }
  });

export default { read, search, checkIn, register };
