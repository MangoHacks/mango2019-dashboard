import axios from "axios";

import config from "./config";

const hi = axios.create({ baseURL: config.API_URL });

const read = () =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await hi.get("/application");
      resolve(data);
    } catch (e) {
      reject(e.response.data.error);
    }
  });

export default { read };
