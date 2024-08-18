import React from 'react'
import { AuthContextProvider } from '../../context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import GlobalLayout from '../Layout/GlobalLayout.tsx'
import { NextUIProvider } from '@nextui-org/react'
import { ModalsContextProvider } from '../../context/ModalsContext.tsx'
import { InventoryContextProvider } from '../../context/InventoryContext.tsx'
import { CartContextProvider } from '../../context/CartContext.tsx'

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
    return (
        <BrowserRouter>
            <NextUIProvider>
                <AuthContextProvider>
                    <ModalsContextProvider>
                        <InventoryContextProvider>
                            <CartContextProvider>
                                <GlobalLayout>
                                    <Toaster />
                                    {children}
                                </GlobalLayout>
                            </CartContextProvider>
                        </InventoryContextProvider>
                    </ModalsContextProvider>
                </AuthContextProvider>
            </NextUIProvider>
        </BrowserRouter>
    )
}
