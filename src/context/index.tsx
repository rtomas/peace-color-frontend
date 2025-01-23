'use client'

import { wagmiAdapter, projectId, networks } from '../config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit, useAppKitAccount } from '@reown/appkit/react'
import React, { useEffect, type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

// Set up metadata
const metadata = {
  name: 'Peace Colors',
  description: 'Peace Colors',
  url: 'https://peace.tomasrawski.com.ar',
  icons: ['https://peace.tomasrawski.com.ar/peace.svg']
}

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  themeMode: 'dark' as const,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    connectMethodsOrder: ['social', 'email'],
  },

})


function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
  const { isConnected } = useAppKitAccount()

  useEffect(() => {
    if (isConnected) {
      modal.setPreferredAccountType('smartAccount', 'eip155');
      console.log("set to smart account");
    }
  }, [isConnected])

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
