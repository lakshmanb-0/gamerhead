import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const id = url.searchParams.get("steamId")
    const data = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.REACT_APP_STEAM_KEY}&steamids=${id}`).then(res => res.json())
    return NextResponse.json({ data })
}