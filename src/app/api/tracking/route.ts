import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "@/app/lib/db"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const number = searchParams.get('number')

  if (!number) {
    return NextResponse.json({ error: 'Invalid tracking number' }, { status: 400 })
  }

  try {
    const shipment = await prisma.shipment.findUnique({
      where: {
        trackingNumber: number
      }
    })

    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })
    }

    return NextResponse.json(shipment)
  } catch (error) {
    console.error('Error fetching shipment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}