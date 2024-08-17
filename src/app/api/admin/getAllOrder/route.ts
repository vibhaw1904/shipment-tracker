import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/db"
import { getServerSession } from "next-auth/next"
import { options } from "@/app/lib/auth"
export async function GET(request: Request) {
    try {
        const session = await getServerSession(options)

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        
        const userEmail = session.user.email

        // Fetch  all  the order of all users
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