import { strapiBaseURl } from "@/api/axios";
import axios from "axios";

export const getNewsBanner = async () => {
  let newsBannerLoading = true;
  let error = null;
  let newsBanner = null;
  try {
    const response = await axios.get(
      `${strapiBaseURl}/api/newsses?filters[isOnCarousel]=true&populate=*&sort[0][createdAt]=desc`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    newsBanner = data.data;
  } catch (err) {
    error = err;
  } finally {
    newsBannerLoading = false;
  }
  return { newsBannerLoading, error, newsBanner };
};

export const getNewsCategories = async () => {
  let newsBannerLoading = true;
  let error = null;
  let newsCategories = null;
  try {
    const response = await axios.get(`${strapiBaseURl}/api/categories`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    newsCategories = data.data;
  } catch (err) {
    error = err;
  } finally {
    newsBannerLoading = false;
  }
  return { newsBannerLoading, error, newsCategories };
};

export const getNews = async (slug) => {
  let newsBannerLoading = true;
  let error = null;
  let news = null;
  try {
    const response = await axios.get(
      `${strapiBaseURl}/api/newsses/${parseInt(
        slug
      )}?populate=thumbnail&sort[0][createdAt]=desc`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    news = data.data;
  } catch (err) {
    error = err;
  } finally {
    newsBannerLoading = false;
  }
  return { newsBannerLoading, error, news };
};

export const getLatestNews = async () => {
  try {
    const response = await axios.get(
      `${strapiBaseURl}/api/newsses?sort[0][createdAt]=desc`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    throw err;
  }
};
