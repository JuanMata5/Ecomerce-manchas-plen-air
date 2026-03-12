import MercadoPago from "mercadopago";

export const mercadopago = new MercadoPago({
  accessToken: process.env.MP_ACCESS_TOKEN || "",
  clientId: process.env.MP_CLIENT_ID,
});