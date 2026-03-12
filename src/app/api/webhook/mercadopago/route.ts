import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    if (body.type === "payment") {
      const paymentId = body.data.id

      console.log("Pago Mercado Pago:", paymentId)

      // Aquí luego podemos consultar la API de Mercado Pago
      // y crear la orden real

      await prisma.order.create({
        data: {
          orderNumber: `BT-${Date.now()}`,
          status: "PROCESSING",
          subtotal: 0,
          shipping: 0,
          total: 0,
          paymentMethod: "MercadoPago",
          paymentId: String(paymentId),
          userId: "USER_ID",
          addressId: "ADDRESS_ID"
        }
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Webhook error" }, { status: 500 })
  }
}