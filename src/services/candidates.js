import axios from "axios";

import config from "./config";

import JSZip from "jszip";
import dwn from "downloadjs";

const ci = axios.create({ baseURL: config.API_URL });

const di = axios.create({ baseURL: config.API_URL, responseType: "blob" });

di.interceptors.request.use(
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

const download = candidates =>
  new Promise((resolve, reject) => {
    try {
      const zip = new JSZip();
      const folder = zip.folder("MangoHacks-2019");
      let arraySize = candidates.length;

      candidates.forEach(async hacker => {
        const url = hacker.resume;

        const resume_id = url.replace("https://drive.google.com/file/d/", "");

        const file_id = resume_id.match(/.*?(?=\/|$)/i)[0];

        const { data } = await di.get(`/cabinet/download?id=${file_id}`);

        const blob = await new Blob([data], { type: data.type });

        if (navigator.userAgent.includes("Chrome")) {
          folder.file(`${hacker.firstName}_${hacker.lastName}.pdf`, blob, {
            binary: true
          });
          arraySize--;
          if (arraySize == 0) {
            const content = await zip.generateAsync({ type: "blob" });
            await dwn(content, `MangoHacks.zip`, "application/zip");
            resolve();
          }
        } else {
          dwn(blob, "MangoHacks", blob.type);
          resolve();
        }
      });
    } catch (e) {
      reject(e.response.data.error);
    }
  });
export default { read, download };
