import { getNewsFromGNewsTopHeadline, getNewsFromNewsAPI, getNewsFromNewsAPITopHeadline, getNewsFromGNews } from "../lib/news.js"

export const combineTopHeadlines = async () => {
  const topHeadlines1 = await getNewsFromNewsAPITopHeadline();
  const topHeadlines2 = await getNewsFromGNewsTopHeadline();

  const topHeadlines = topHeadlines1.concat(topHeadlines2);

  return topHeadlines
}

export const combinedNewsByPrefrences = async (preference) => {
  // Implement preference logic here

  const prefredNewsFromNewsAPI = await Promise.all(preference.map(async preference => await getNewsFromNewsAPI(preference)));
  const prefredNewsFromGNews = await Promise.all(preference.map(async preference => await getNewsFromGNews(preference)));
  const prefredNews = prefredNewsFromNewsAPI.concat(prefredNewsFromGNews);


  return prefredNews;

}