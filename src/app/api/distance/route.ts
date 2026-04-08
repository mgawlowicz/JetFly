import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const departureCode = searchParams.get('departureCode')
  const arrivalCode = searchParams.get('arrivalCode')

  if (!departureCode || !arrivalCode) {
    return NextResponse.json(
      { error: 'Missing departureCode or arrivalCode' },
      { status: 400 }
    )
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

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${departureCode}/distance?distanceUnit=KM&toCityId=${arrivalCode}`;
    const res = await fetch(url, { headers });
    const data = await res.json();

    if (!res.ok) {
        return NextResponse.json({ error: data.message || 'Distance fetch failed' }, { status: res.status });
    }

    return NextResponse.json({
      data: data.data || 0
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch distance data' },
      { status: 500 }
    )
  }
}
