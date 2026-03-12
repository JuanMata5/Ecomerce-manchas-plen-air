"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dispatch, SetStateAction } from "react"

interface ShippingFormProps {
  shippingData: {
    name: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip: string
    notes: string
  }
  setShippingData: Dispatch<
    SetStateAction<{
      name: string
      lastName: string
      email: string
      phone: string
      address: string
      city: string
      state: string
      zip: string
      notes: string
    }>
  >
}

export function ShippingForm({ shippingData, setShippingData }: ShippingFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Información de Envío</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input
            id="firstName"
            placeholder="Juan"
            value={shippingData.name}
            onChange={(e) =>
              setShippingData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input
            id="lastName"
            placeholder="Perez"
            value={shippingData.lastName}
            onChange={(e) =>
              setShippingData((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="juan@ejemplo.com"
          value={shippingData.email}
          onChange={(e) =>
            setShippingData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+51 999 888 777"
          value={shippingData.phone}
          onChange={(e) =>
            setShippingData((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          placeholder="Av. Principal 123"
          value={shippingData.address}
          onChange={(e) =>
            setShippingData((prev) => ({ ...prev, address: e.target.value }))
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input
            id="city"
            placeholder="Lima"
            value={shippingData.city}
            onChange={(e) =>
              setShippingData((prev) => ({ ...prev, city: e.target.value }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">Departamento</Label>
          <Select
            value={shippingData.state}
            onValueChange={(val) =>
              setShippingData((prev) => ({ ...prev, state: val }))
            }
          >
            <SelectTrigger id="state">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lima">Lima</SelectItem>
              <SelectItem value="arequipa">Arequipa</SelectItem>
              <SelectItem value="cusco">Cusco</SelectItem>
              <SelectItem value="trujillo">La Libertad</SelectItem>
              <SelectItem value="piura">Piura</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip">Código Postal</Label>
          <Input
            id="zip"
            placeholder="15001"
            value={shippingData.zip}
            onChange={(e) =>
              setShippingData((prev) => ({ ...prev, zip: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notas adicionales (opcional)</Label>
        <Input
          id="notes"
          placeholder="Instrucciones de entrega, referencias, etc."
          value={shippingData.notes}
          onChange={(e) =>
            setShippingData((prev) => ({ ...prev, notes: e.target.value }))
          }
        />
      </div>
    </div>
  )
}