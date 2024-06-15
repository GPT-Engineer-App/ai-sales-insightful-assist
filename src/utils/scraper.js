const axios = require('axios');
const cheerio = require('cheerio');

const scrapeCompanyWebsite = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const aboutUs = $('#about-us').text();
    const careers = $('#careers').text();
    const news = $('#news').text();

    return {
      aboutUs,
      careers,
      news
    };
  } catch (error) {
    console.error(`Error scraping website: ${error}`);
    return {};
  }
};

module.exports = {
  scrapeCompanyWebsite
};