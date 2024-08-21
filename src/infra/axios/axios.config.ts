import axios from "axios";

const api = axios.create({
  baseURL: "http://172.20.68.243:8000"
})

export { api }
