import axios from "axios";
import { decryptMessage } from "../hashing";
import { store } from "../store";


const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_BASE_URL||"https://peridotnepal.xyz/api",
   headers: {
      "Content-Type": "application/json",
      Permission: "2021D@T@f@RSt6&%2-D@T@",
   },
});
// Add a request interceptor
api.interceptors.request.use((config) => {
   // Update the Authorization header with the latest access token on each request
   const { auth } = store.getState();
   config.headers.Authorization = `Bearer ${auth?.token}`;
   return config;
});

// Add a response interceptor
api.interceptors.response.use(
   (response) => {
      // Decode the hash repusponse
      const url = response.config.url;
      if (
         url.includes("economy") ||
         url.includes("financial_breakdown/loan/compare") ||
         url.includes("financial_breakdown") ||
         url.includes("report") ||
         url.includes("/screener/") ||
         url.includes("heat-map")
      ) {
         // Perform the desired action when the URL contains the specified string
         try {
            const decodedResponse = decryptMessage(response.data.data);
            response.data.data = decodedResponse;
         } catch (err) {
            console.log("Cannot decode", err);
         }
      }
      return response;
   },
   (error) => {

      if (error?.response?.status === 498) {
         localStorage.removeItem("persist:root");
         document.cookie = `authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; sameSite=Strict`;
      }
      // localStorage.clear()
      return Promise.reject(error);
   }
);

export const newsApi = axios.create({
   baseURL: "https://news.sarallagani.xyz/api",
   headers: {
      "Content-Type": "application/json",
   },
});

export const strapiBaseURl = "https://news.sarallagani.xyz";

export default api;
