'use server'

export const getCategory = async () => {
    const result = await fetch(`http://store.steampowered.com/api/featuredcategories/?cc=IN&l=english&json=1`)
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log(error))
    return result;
}
export const getTopReleases = async () => {
    const result = await fetch(`https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/?key=${process.env.REACT_APP_STEAM_KEY}&cc=IN&l=english&json=1`)
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log(error))
    return result
}
export const getDlc = async (params: number) => {
    const result = await fetch(`https://store.steampowered.com/api/dlcforapp/?appid=${params}&cc=IN&l=english&json=1`)
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.log(error))
    return result
}
export const getAppDetails = async (params: number) => {
    const result = await fetch(`http://store.steampowered.com/api/appdetails/?appids=${params}&cc=IN&l=english&json=1`)
        .then(res => res.json())
        .then(data => data?.[params]?.data)
        .catch(error => console.log(error))
    console.log(result)
    return result || []
}
export const getPlayer = async (params: string) => {
    const result = await fetch(`https://steamcommunity.com/actions/ajaxresolveusers?steamids=${params}&cc=IN&l=english&json=1`)
        .then(res => res.json())
        .catch(error => console.log(error))
    return result
}
export const getNews = async (params: number) => {
    const result = await fetch(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=${process.env.REACT_APP_STEAM_KEY}&appid=${params}&cc=IN&l=english&json=1`)
        .then(res => res.json())
        .then(data => data.appnews.newsitems)
        .catch(error => console.log(error))
    return result || []
}
export const getReviews = async (params: number) => {
    const result = await fetch(`https://store.steampowered.com/appreviews/${params}?cc=IN&l=english&json=1`)
        .then(res => res.json())
        .catch(error => console.log(error))
    return result
}
export const getSearch = async (params: string) => {
    const result = await fetch(`https://steamcommunity.com/actions/SearchApps/${params}?cc=IN&l=english&json=1`)
        .then(res => res.json())
        .catch(error => console.log(error))
    return result
}