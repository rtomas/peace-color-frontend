import React, { useEffect, useState } from 'react';
import { hexToRgb, type RGB } from '@/utils/colors';
/* import { useAppKitAccount  } from '@reown/appkit/react' */
import { encodeFunctionData } from 'viem'
import { useWriteContract } from 'wagmi'
import { useSendCalls } from 'wagmi/experimental'
import { abi } from '../abi/PeaceColor.json'  

const smartContractAddress = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS || "0x"

const AddColor = ({colors}: {colors: RGB[]}) => {
  //const { data: hash, writeContract, isPending } = useWriteContract();
  const { sendCalls, isPending, data: hash, error } = useSendCalls();
  const [color, setColor] = useState<RGB | undefined>(undefined); 
  const [name, setName] = useState<string>("");

  useEffect(() => {
    console.log("error", error)
  }, [error])

  useEffect(() => {
    handleColor(`#${Math.floor(Math.random()*16777215).toString(16)}`);
    // set input default color
    const input = document.querySelector('input[type="color"]') as HTMLInputElement;
    if (input) {
      input.defaultValue = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }
  }, []); 

  const handleColor = (color: string) => {
    const rgb = hexToRgb(color);
    if (rgb) {
      setColor(rgb);
    }
  };

  const handleAddColor = async (color:RGB) => {
    // send the list of colors to the AI  
    // semd color and colors list
    const colorNames = colors.map((c) => c.name).join(", ");

    const response = await fetch('/api/nameColorAI', {
      method: 'POST',
      body: JSON.stringify({color, colorNames})
    });
    // status <> 200 not to write
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();


    console.log('data', color, data);
/*     writeContract({
      address: smartContractAddress as `0x${string}`,
      abi,
      functionName: 'addColor',
      args: [color.red, color.green, color.blue, data.name]
    }) */
    // sponsoring tx !!

    const addColorCallData = encodeFunctionData({
      abi,
      functionName: 'addColor',
      args: [color.red, color.green, color.blue, data.name]
    })
    
    const SPONSORING_TX = {
      to: smartContractAddress as `0x${string}`,
      data: addColorCallData
    }

    const BICONOMY_PAYMASTER_CONTEXT = {
      mode: 'SPONSORED',
      calculateGasLimits: false,
      expiryDuration: 300,
      sponsorshipInfo: {
        webhookData: {},
        smartAccountInfo: {
          name: 'SAFE',
          version: '1.4.1'
        }
      }
    }

    const context = {
      biconomy: BICONOMY_PAYMASTER_CONTEXT,
      reown: {
        policyId: "9d113f59-71cf-4c66-b7fa-e79b5e34c414"
      }
    }
    
    sendCalls({
      calls: [SPONSORING_TX],
      capabilities: {
        paymasterService: {
          url: "https://paymaster-api.reown.com/11155111/rpc?projectId=07fe00193f4e4938dd3bee5142803995", // for sepolia 
          context
        }
      }
    })
    
    setName(data.name);

  };
useEffect(() => {
  if (hash || !isPending) {
    // disable the button add-color-button
    const button = document.getElementById('add-color-button') as HTMLButtonElement;
    if (button) {
      button.disabled = true;
    }
  }
}, [hash, isPending]);
  return (
    <div className="min-w-[300px] bg-gray-800 border border-gray-600 rounded-lg p-2 text-base flex flex-col gap-3">
      <p>Choose a color for the PEACE. <br />Save it to the blockchain!</p>
      <input 
        type="color" 
        className="w-full border border-gray-500" 
        onChange={(e) => handleColor(e.target.value)} 
      />
      <button
        id="add-color-button"
        disabled={color === undefined}
        className={
          color === undefined
            ? 'bg-gray-500 p-1 w-full rounded'
            : 'bg-green-500 p-1 w-full rounded hover:bg-green-700 transition duration-200'
        }
        onClick={() => color && handleAddColor(color)} 
      >
        {hash==undefined ? 'Add color ' : (isPending ? 'Add color  ...' : `✅ Color added: ${name}`)}
      </button>
    </div>
  );
};

export default AddColor;
