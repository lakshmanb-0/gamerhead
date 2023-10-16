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
  baseURL: `https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/?key=${process.env.REACT_APP_STEAM_KEY}/`,
});
const GetNews = axios.create({
  baseURL: `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=${process.env.REACT_APP_STEAM_KEY}&cc=IND&l=english`,
});
const GetReviews = axios.create({
  baseURL: `https://store.steampowered.com/appreviews/`,
});
const GetPlayer = axios.create({
  baseURL: `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.REACT_APP_STEAM_KEY}`,
});
const SearchApi = axios.create({
  baseURL: `https://steamcommunity.com/actions/SearchApps/`,
});
const GetDlc = axios.create({
  baseURL: `https://store.steampowered.com/api/dlcforapp/`,
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
  GetDlc
};
