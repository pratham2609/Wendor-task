import React from 'react'
import { AuthContextProvider } from '../../context/AuthContext'
import { Toaster } from 'react-hot-toast'

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthContextProvider>
                <Toaster />
                {children}
            </AuthContextProvider>
        </>
    )
}
