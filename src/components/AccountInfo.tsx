'use client'
import {  useAppKitAccount  } from '@reown/appkit/react'
export const AccountInfo = () => {
  const { address, isConnected } = useAppKitAccount();
  return (
    <div >
        {address}
    </div>
  )
}