const axios = require('axios');

async function fetchNews(userPreferences) {
  const newsApiUrl = 'http://examplenews.com'; // Replace this with the URL of the news API you want to use

  try {
    const response = await axios.get(newsApiUrl);
    const newsArticles = response.data.articles;

    // Filter news articles based on user preferences
    const filteredNews = newsArticles.filter(article => {
      return userPreferences.includes(article.category); // Assuming user preferences are stored as an array of categories
    });

    return filteredNews;
  } catch (error) {
    throw new Error('Error fetching news articles');
  }
}

module.exports = {
  fetchNews
};
