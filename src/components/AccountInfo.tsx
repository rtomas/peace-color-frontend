'use client'
import {  useAppKitAccount  } from '@reown/appkit/react'
export const AccountInfo = () => {
  const { address } = useAppKitAccount();
  return (
    <div >
        {address}
    </div>
  )
}