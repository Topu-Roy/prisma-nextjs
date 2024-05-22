import { CartProduct } from "@prisma/client";
import { create } from 'zustand'


type CartState = {
    products: CartProduct[],
}

type CartAction = {
    setProducts: (products: CartProduct[]) => void,
    removeProductById: (productId: string) => void,
}

export type CartStoreType = CartState & CartAction

const defaultInitState: CartState = {
    products: []
}

export const useCartStore = create<CartStoreType>((set) => ({
    ...defaultInitState,
    setProducts: (products) => set(() => ({ products: products })),
    removeProductById: (productId) =>
        set((state) => ({
            products: state.products.filter(product => product.id !== productId)
        }))
}))