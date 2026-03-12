// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { mercadopago } from "@/lib/mp";
import { auth } from "@/auth-config";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutBody {
  items: CartItem[];
  metadata?: Record<string, string | number>;
}

export async function POST(request: NextRequest) {
  try {
    // 1️⃣ Verificar usuario autenticado
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Debes iniciar sesión para realizar una compra" },
        { status: 401 }
      );
    }

    // 2️⃣ Obtener items del carrito
    const body: CheckoutBody = await request.json();
    const { items, metadata } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No hay items en el carrito" },
        { status: 400 }
      );
    }

    // 3️⃣ Preparar items para Mercado Pago
    const mpItems = items.map((item) => ({
      title: item.name,
      unit_price: Number(item.price),
      quantity: item.quantity,
      picture_url: item.image || "https://via.placeholder.com/150",
      currency_id: "ARS",
    }));

    // 4️⃣ Calcular subtotal y envío
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const shippingCost = subtotal >= 2000 ? 0 : 1500;

    // 5️⃣ Crear preference para Mercado Pago
    const preference = {
      items: mpItems,

      payer: {
        email: session.user.email,
      },

      shipments: {
        cost: shippingCost,
        mode: "not_specified",
      },

      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending`,
      },

      auto_return: "approved",

      // 🔔 Webhook para recibir notificaciones de Mercado Pago
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhook/mercadopago`,

      metadata: {
        ...Object.fromEntries(
          Object.entries(metadata || {}).map(([k, v]) => [k, String(v)])
        ),
        userId: String(session.user.id),
        items: JSON.stringify(
          items.map((i) => ({
            id: i.id,
            qty: i.quantity,
          }))
        ),
      },
    };

    // 6️⃣ Crear preference en Mercado Pago
    const mpResponse = await mercadopago.preferences.create(preference);

    // 7️⃣ Devolver init_point para redirigir al Checkout Pro
    return NextResponse.json({
      preferenceId: mpResponse.id,
      initPoint: mpResponse.init_point,
    });

  } catch (error) {
    console.error("Error creando la preferencia de Mercado Pago:", error);

    return NextResponse.json(
      { error: "Error creando la sesión de pago" },
      { status: 500 }
    );
  }
}