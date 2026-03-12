"use client"

import { CreditCard, Building2, Wallet } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PaymentFormProps {
  paymentMethod: "card" | "transfer" | "wallet";
  setPaymentMethod: React.Dispatch<React.SetStateAction<"card" | "transfer" | "wallet">>;
}

export function PaymentForm({ paymentMethod, setPaymentMethod }: PaymentFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Método de Pago</h2>

      <RadioGroup
        value={paymentMethod}
        onValueChange={(val: "card" | "transfer" | "wallet") => setPaymentMethod(val)}
        className="space-y-3"
      >
        {/* Tarjeta */}
        <div>
          <RadioGroupItem value="card" id="card" className="peer sr-only" />
          <Label
            htmlFor="card"
            className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
          >
            <CreditCard className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium">Tarjeta de Crédito/Débito</p>
            </div>
          </Label>
        </div>

        {/* Transferencia */}
        <div>
          <RadioGroupItem value="transfer" id="transfer" className="peer sr-only" />
          <Label
            htmlFor="transfer"
            className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
          >
            <Building2 className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium">Transferencia Bancaria</p>
            </div>
          </Label>
        </div>

        {/* Billetera */}
        <div>
          <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
          <Label
            htmlFor="wallet"
            className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
          >
            <Wallet className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium">Billetera Digital</p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}