'use server'

const fetchData = async (api: string) => {
    return await fetch(api)
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log(error))
}
export const getCategory = async () => {
    return await fetchData(`http://store.steampowered.com/api/featuredcategories/?cc=IN&l=english&json=1`)
}
export const getFeature = async () => {
    return await fetchData(`https://store.steampowered.com/api/featured/?cc=IN&l=english&json=1`)
}
export const getTopReleases = async () => {
    return await fetchData(`https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/?key=${process.env.REACT_APP_STEAM_KEY}&cc=IN&l=english&json=1`)
}
export const getDlc = async (params: number) => {
    return await fetchData(`https://store.steampowered.com/api/dlcforapp/?appid=${params}&cc=IN&l=english&json=1`)
}
export const getAppDetails = async (params: number) => {
    return await fetchData(`http://store.steampowered.com/api/appdetails/?appids=${params}&cc=IN&l=english&json=1`)
}
export const getPlayer = async (params: string) => {
    return await fetchData(`https://steamcommunity.com/actions/ajaxresolveusers?steamids=${params}&cc=IN&l=english&json=1`)
}
export const getNews = async (params: number) => {
    return await fetchData(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=${process.env.REACT_APP_STEAM_KEY}&appid=${params}&cc=IN&l=english&json=1`)
}
export const getReviews = async (params: number) => {
    return await fetchData(`https://store.steampowered.com/appreviews/${params}?cc=IN&l=english&json=1`)
}
export const getSearch = async (params: string) => {
    return await fetchData(`https://steamcommunity.com/actions/SearchApps/${params}?cc=IN&l=english&json=1`)
}