import { NextResponse } from 'next/server'
import data from '@/data/data.json'

export async function GET(request: Request, context: any) {
    return NextResponse.json({
        data,
    })
}