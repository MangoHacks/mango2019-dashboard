import axios from "axios";

import config from "./config";

const ti = axios.create({ baseURL: config.API_URL });

const create = password =>
  new Promise(async (resolve, reject) => {
    try {
      const { data } = await ti.post("/token", { password });

      resolve(data.data.token);
    } catch (e) {
      console.log(e);
      // reject(e.response.data.error);
    }
  });

export default { create };
