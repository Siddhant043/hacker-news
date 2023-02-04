import axios from "axios";

export const fetchNews = async (query = "") => {
  const options = {
    method: "GET",
    url: `http://hn.algolia.com/api/v1/search?query=${query}`,
    headers: {
      accept: "application/json",
    },
  };
  const response = await axios.request(options);
  const data = await response.data.hits;
  return data;
};

export const fetchLatestNews = async () => {
  const options = {
    method: "GET",
    url: `http://hn.algolia.com/api/v1/search?tags=front_page`,
    headers: {
      accept: "application/json",
    },
  };
  const response = await axios.request(options);
  const data = await response.data.hits;
  return data;
};

export const fetchNewsDetails = async (id) => {
  const options = {
    method: "GET",
    url: `http://hn.algolia.com/api/v1/items/${id}`,
    headers: {
      accept: "application/json",
    },
  };
  const response = await axios.request(options);
  const data = await response.data;
  return data;
};
