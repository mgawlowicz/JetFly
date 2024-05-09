import { NextResponse } from 'next/server'
import data from '@/data.json'

export async function GET(request: Request, context: any) {
    const { params } = context
    const jet = data.filter((x) => params.jetsSlug === x.slug.toString())

    return NextResponse.json({
        jet,
    })
}