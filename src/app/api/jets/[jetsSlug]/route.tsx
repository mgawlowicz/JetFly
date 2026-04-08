import { NextResponse } from 'next/server'
import data from '@/data/data.json'

export async function GET(request: Request, { params }: { params: Promise<{ jetsSlug: string }> }) {
    const { jetsSlug } = await params
    const jet = data.filter((x) => jetsSlug === x.slug.toString())

    return NextResponse.json({
        jet,
    })
}