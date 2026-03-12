import { create } from "zustand"
import type { Product, Category, Brand, FilterState } from "@/types"
import { categories as mockCategories, products as mockProducts } from "../data/mock-products"  // Add products import

interface ProductsState {
  products: Product[]
  categories: Category[]
  brands: Brand[]
  featuredProducts: Product[]
  filters: FilterState
  loading: boolean
  error: string | null

  // Actions
  fetchProducts: (filters?: Partial<FilterState>) => Promise<void>
  fetchFeaturedProducts: () => Promise<void>
  fetchCategories: () => void
  fetchBrands: () => Promise<void>
  setFilters: (filters: Partial<FilterState>) => void
  resetFilters: () => void
}

const defaultFilters: FilterState = {
  categories: [],
  brands: [],
  priceRange: [0, 10000],
  sortBy: "newest",
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  categories: [],
  brands: [],
  featuredProducts: [],
  filters: defaultFilters,
  loading: false,
  error: null,

  fetchProducts: async (filterOverrides) => {
    set({ loading: true, error: null })
    try {
      const filters = { ...get().filters, ...filterOverrides }
      const params = new URLSearchParams()

      if (filters.categories.length === 1) {
        params.set("category", filters.categories[0])
      }
      if (filters.brands.length === 1) {
        params.set("brand", filters.brands[0])
      }
      if (filters.priceRange[0] > 0) {
        params.set("minPrice", filters.priceRange[0].toString())
      }
      if (filters.priceRange[1] < 10000) {
        params.set("maxPrice", filters.priceRange[1].toString())
      }
      if (filters.sortBy) {
        params.set("sortBy", filters.sortBy)
      }

      const response = await fetch(`/api/products?${params.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch products")

      const data = await response.json()
      set({ products: data.products, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  fetchFeaturedProducts: async () => {
    // Load from mock data instead of fetching
    const featured = mockProducts.filter(p => p.featured).slice(0, 8)
    set({ featuredProducts: featured })
  },

  fetchCategories: () => {
    // Replace async fetch with synchronous mock data load
    set({ categories: mockCategories })
  },

  fetchBrands: async () => {
    try {
      const response = await fetch("/api/brands")
      if (!response.ok) throw new Error("Failed to fetch brands")

      const brands = await response.json()
      set({ brands })
    } catch (error) {
      console.error("Error fetching brands:", error)
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }))
  },

  resetFilters: () => {
    set({ filters: defaultFilters })
  },
}))
