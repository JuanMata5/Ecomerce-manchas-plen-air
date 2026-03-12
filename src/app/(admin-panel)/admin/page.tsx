"use client";

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Category = { id: number; name: string; slug: string };
type Brand = { id: number; name: string; slug: string };

export default function AdminProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");

  // Fetch categories y brands desde tu API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCategories = await fetch("/api/categories");
        const dataCategories = await resCategories.json();
        setCategories(Array.isArray(dataCategories) ? dataCategories : []);

        const resBrands = await fetch("/api/brands");
        const dataBrands = await resBrands.json();
        setBrands(Array.isArray(dataBrands) ? dataBrands : []);
      } catch (err) {
        console.error("Error al cargar categorías o marcas:", err);
        setCategories([]);
        setBrands([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>

      {/* Selector de Categorías */}
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Seleccionar categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {(categories || []).length > 0 ? (
            categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="none" disabled>
              No hay categorías
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Selector de Marcas */}
      <Select value={selectedBrand} onValueChange={setSelectedBrand}>
        <SelectTrigger className="w-60 mt-4">
          <SelectValue placeholder="Seleccionar marca" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {(brands || []).length > 0 ? (
            brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.slug}>
                {brand.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="none" disabled>
              No hay marcas
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Aquí puedes agregar tu tabla de productos filtrados */}
    </div>
  );
}