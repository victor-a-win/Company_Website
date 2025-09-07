import {
  BACKENDLESS_API_KEY,
  BACKENDLESS_API_URL,
  BACKENDLESS_APP_ID,
} from "@/config/app.config";
import axios from "axios";

const backendlessAPI = axios.create({
  baseURL: `${BACKENDLESS_API_URL}/${BACKENDLESS_APP_ID}/${BACKENDLESS_API_KEY}`,
  headers: { "Content-Type": "application/json" },
});

export default backendlessAPI;
