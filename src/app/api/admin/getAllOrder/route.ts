import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/lib/db"
import { getToken } from "next-auth/jwt"

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request })

        if (!token || !token.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const orders = await prisma.shipment.findMany({
            orderBy: {
                placedAt: 'desc'
            }
        })

        return NextResponse.json(orders)
    } catch (error) {
        console.error("Error fetching orders:", error)
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
    }
}