import axios from 'axios';

export const fetchStockData = async (ticker) => {
  try {
    const url = `https://api.example.com/stock/${ticker}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stock data: ${error}`);
    return null;
  }
};

export const fetchNewsData = async (companyName) => {
  try {
    const url = `https://api.example.com/news/${companyName}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching news data: ${error}`);
    return null;
  }
};

export const fetchSocialMediaData = async (companyName) => {
  try {
    const url = `https://api.example.com/social/${companyName}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching social media data: ${error}`);
    return null;
  }
};