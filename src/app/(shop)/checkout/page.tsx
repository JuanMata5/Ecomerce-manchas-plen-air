"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { products } from "@/data/mock-products";
import { CartItem } from "@/types";

// Mock cart data
const cartItems: CartItem[] = [
  { product: products[0], quantity: 1 },
  { product: products[1], quantity: 2 },
  { product: products[2], quantity: 1 },
];

const steps = [
  { id: 1, name: "Envio" },
  { id: 2, name: "Pago" },
  { id: 3, name: "Confirmar" },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "wallet">("card");

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCheckout = async () => {
    // Validaciones básicas
    if (!shippingData.name || !shippingData.address) {
      alert("Por favor completa los datos de envío");
      return;
    }
    if (!paymentMethod) {
      alert("Por favor selecciona un método de pago");
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        metadata: {
          shippingInfo: JSON.stringify(shippingData),
          paymentMethod: paymentMethod,
        },
      }),
    });

    const data = await res.json();
    if (data.initPoint) {
      window.location.href = data.initPoint; // redirige al Checkout Pro
    } else {
      alert("Error al iniciar el pago");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="-ml-2 mb-4">
          <Link href="/cart">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Volver al Carrito
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      {/* Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors ${
                    currentStep > step.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : currentStep === step.id
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <span
                  className={`ml-2 hidden text-sm font-medium sm:block ${
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-4 h-0.5 w-12 sm:w-24 ${
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card p-6">
            {currentStep === 1 && (
              <ShippingForm
                shippingData={shippingData}
                setShippingData={setShippingData}
              />
            )}
            {currentStep === 2 && (
              <PaymentForm
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            )}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Confirmar Pedido</h2>
                <p className="text-sm text-muted-foreground">
                  Por favor revisa los detalles de tu pedido antes de confirmar.
                </p>

                {/* Shipping info */}
                <div className="rounded-lg bg-muted/50 p-4">
                  <h3 className="font-medium">Dirección de Envío</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {shippingData.name} {shippingData.lastName}
                    <br />
                    {shippingData.address}
                    <br />
                    {shippingData.city}, {shippingData.state} {shippingData.zip}
                    <br />
                    {shippingData.email} - {shippingData.phone}
                  </p>
                </div>

                {/* Payment method */}
                <div className="rounded-lg bg-muted/50 p-4">
                  <h3 className="font-medium">Método de Pago</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {paymentMethod === "card"
                      ? "Tarjeta de Crédito/Débito"
                      : paymentMethod === "transfer"
                      ? "Transferencia Bancaria"
                      : "Billetera Digital"}
                  </p>
                </div>
              </div>
            )}

            <Separator className="my-6" />

            {/* Navigation */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                Atrás
              </Button>

              {currentStep < 3 ? (
                <Button onClick={handleNext}>Continuar</Button>
              ) : (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleCheckout}
                >
                  Confirmar y Pagar
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <OrderSummary items={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
}