'use server'

export const getCategory = async () => {
    const result = await fetch(`https://store.steampowered.com/api/featuredcategories/?cc=IND&l=english`).then(result => result.json()).then(data => data)
    return result;
}
export const getFeature = async () => {
    const result = await fetch(`https://store.steampowered.com/api/featured/?cc=IND&l=english/`).then(result => result.json()).then(data => data)
    return result;
}
export const getTopReleases = async () => {
    const result = await fetch(`https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/?key=${process.env.REACT_APP_STEAM_KEY}/`).then(res => res.json()).then(data => data)
    return result
}
export const getDlc = async () => {
    const result = await fetch(`https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/?key=${process.env.REACT_APP_STEAM_KEY}/`).then(res => res.json()).then(data => data)
    return result
}
