const axios = require('axios');
const cheerio = require('cheerio');

export const scrapeCompanyWebsite = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const aboutUs = $('#about-us').text().trim();
    const careers = $('#careers').text().trim();
    const news = $('#news').text().trim();

    return {
      aboutUs,
      careers,
      news
    };
  } catch (error) {
    console.error(`Error scraping website: ${error.message}`);
    return {};
  }
};

