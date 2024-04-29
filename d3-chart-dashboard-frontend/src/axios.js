import axi from "axios";

const baseUrl = "http://localhost:9500/api/v1";

const axios = axi.create({
  baseURL: baseUrl,
});

export default axios;
