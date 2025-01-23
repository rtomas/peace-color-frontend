'use client'

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

export const ConnectButton = () => {
  const { open } = useAppKit();
  const {  isConnected, status } = useAppKitAccount()
  

  const buttonStyle = {
    background: "url('reown.png') 12px center/37px no-repeat #202020",
    paddingLeft: "46px",
    borderRadius: "30px",
    color: "white",
    padding: "7px 17px 7px 54px",
    fontWeight: "500"
  };
  return (
    <div className="flex justify-center">
      
        {isConnected ? <appkit-button balance={"hide"} /> : status === "connecting" ? <p>Connecting...</p> : <button style={buttonStyle} onClick={() => open()}>
          Connect Wallet
        </button>}
      </div>
    )
}