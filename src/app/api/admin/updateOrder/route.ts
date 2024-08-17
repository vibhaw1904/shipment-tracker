import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/db"
import { getServerSession } from "next-auth/next"
import { options } from "@/app/lib/auth"
export async function PUT(request: Request) {
    try {
        const session = await getServerSession(options)

        if (!session ||session.user?.role!=='ADMIN') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const{orderId,updates}=await request.json()
       const updateOrder=await prisma.shipment.update({
        where:{id:orderId},
        data:updates
       })

        return NextResponse.json(updateOrder)
    } catch (error) {
        console.error("Error updating orders:", error)
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }
}