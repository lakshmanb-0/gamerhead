import axios from "axios";

const featured = axios.create({
  baseURL: `https://store.steampowered.com/api/featured/?cc=IND&l=english/`,
});
const featuredCategories = axios.create({
  baseURL: `https://store.steampowered.com/api/featuredcategories/?cc=IND&l=english/`,
});
const apiDetails = axios.create({
  baseURL: `https://store.steampowered.com/api/appdetails`,
});
const GetTopReleasesPages = axios.create({
  baseURL: `https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/?key=F872433F9AF2F8C7F6BF95ED37998E28/`,
});
const GetNews = axios.create({
  baseURL: `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=F872433F9AF2F8C7F6BF95ED37998E28&cc=IND&l=english`,
});
const GetReviews = axios.create({
  baseURL: `https://store.steampowered.com/appreviews/`,
});
const GetPlayer = axios.create({
  baseURL: `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/`,
});
const SearchApi = axios.create({
  baseURL: `https://steamcommunity.com/actions/SearchApps/`,
});

export {
  featured,
  featuredCategories,
  apiDetails,
  GetTopReleasesPages,
  GetNews,
  GetReviews,
  GetPlayer,
  SearchApi,
};
