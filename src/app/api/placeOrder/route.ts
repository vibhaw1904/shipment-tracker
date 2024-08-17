import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { productName, address, note, userEmail } = await request.json();
  
  const trackingNumber = uuidv4();
  
  try {
    const newShipment = await prisma.shipment.create({
      data: {
        productName,
        userEmail,
        address,
        note,
        trackingNumber,
        status: "processing",
        location: "warehouse",
        estimatedDelivery: new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        ),
      },
    });
    return NextResponse.json({ success: true, shipment: newShipment }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}