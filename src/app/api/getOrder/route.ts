import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/db"

export async function GET(request:Request) {
    try {
        const orders=await prisma.shipment.findMany({
            orderBy:{
                placedAt:'desc'
            }
        })
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });

    }
}