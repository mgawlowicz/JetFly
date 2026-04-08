import { NextRequest, NextResponse } from 'next/server'
import cityCoords from '@/data/city-coords.json'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const cityCode = searchParams.get('cityCode')

  if (!cityCode) {
    return NextResponse.json(
      { error: 'Missing cityCode' },
      { status: 400 }
    )
  }

  
  const cached = (cityCoords as Record<string, any>)[cityCode];
  if (cached) {
    return NextResponse.json(cached);
  }

  const apiKey = process.env.RAPIDAPI_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  try {
    const headers = {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    };

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityCode}`;
    const res = await fetch(url, { headers });
    const data = await res.json();

    if (!res.ok) {
        return NextResponse.json({ error: data.message || 'City fetch failed' }, { status: res.status });
    }

    return NextResponse.json({
      lat: data.data?.latitude || 0,
      lng: data.data?.longitude || 0,
      name: data.data?.city || 'Unknown'
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch city data' },
      { status: 500 }
    )
  }
}
