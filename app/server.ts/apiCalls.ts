'use server'

export const getCategory = async () => {
    const result = await fetch(`https://store.steampowered.com/api/featuredcategories/?cc=IND&l=english`, { cache: 'no-store' }).then(result => result.json()).then(data => data)
    return result;
}
export const getFeature = async () => {
    const result = await fetch(`https://store.steampowered.com/api/featured/?cc=IND&l=english/`, { cache: 'no-store' }).then(result => result.json()).then(data => data)
    return result;
}
export const getTopReleases = async () => {
    const result = await fetch(`https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/?key=${process.env.REACT_APP_STEAM_KEY}/`, { cache: 'no-store' }).then(res => res.json()).then(data => data)
    return result
}
export const getDlc = async (params: string) => {
    const result = await fetch(`https://store.steampowered.com/api/dlcforapp/${params}`, { cache: 'no-store' }).then(res => res.json()).then(data => data)
    return result
}
export const getAppDetails = async (params: string) => {
    const result = await fetch(`https://store.steampowered.com/api/appdetails/${params}`, { cache: 'no-store' }).then(res => res.json()).then(data => data)
    return result
}
export const getPlayer = async (params: string) => {
    const result = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.REACT_APP_STEAM_KEY}&${params}`, { cache: 'no-store' }).then(res => res.json())
    return result
}
export const getNews = async (params: string) => {
    const result = await fetch(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=${process.env.REACT_APP_STEAM_KEY}&cc=IND&l=english&${params}`, { cache: 'no-store' }).then(res => res.json())
    return result
}
export const getReviews = async (params: string) => {
    const result = await fetch(`https://store.steampowered.com/appreviews/${params}`, { cache: 'no-store' }).then(res => res.json())
    return result
}
export const getSearch = async (params: string) => {
    const result = await fetch(`https://steamcommunity.com/actions/SearchApps/${params}`, { cache: 'no-store' }).then(res => res.json())
    return result
}