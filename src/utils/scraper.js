const axios = require('axios');
const cheerio = require('cheerio');

export const scrapeCompanyWebsite = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const aboutUs = $('#about-us').text() || 'No About Us information found.';
    const careers = $('#careers').text() || 'No Careers information found.';
    const news = $('#news').text() || 'No News information found.';

    return {
      aboutUs,
      careers,
      news
    };
  } catch (error) {
    console.error(`Error scraping website ${url}: ${error}`);
    return {
      aboutUs: 'Error fetching About Us information.',
      careers: 'Error fetching Careers information.',
      news: 'Error fetching News information.'
    };
  }
};

