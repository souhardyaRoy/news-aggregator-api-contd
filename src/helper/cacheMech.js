const { fetchNews } = require("./fetchNews");

const newsCache = new Map();

async function fetchAndCacheNews(userPreferences) {
  const newsArticles = await fetchNews(userPreferences);
  newsArticles.forEach(article => {
    const expirationTime = Date.now() + 3600000; 
    newsCache.set(article.id, { article, expirationTime });
  });
  return newsArticles;
}

async function getCachedNews() {
  const currentTime = Date.now();
  const cachedNews = Array.from(newsCache.values()).filter(article => article.expirationTime > currentTime);
  return cachedNews;
}

setInterval(() => {
  fetchAndCacheNews(userPreferences); 
}, 3600000); 

module.exports = {getCachedNews}