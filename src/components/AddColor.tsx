import React, { useEffect, useState } from 'react';
import { hexToRgb, type RGB } from '@/utils/colors';
/* import { useAppKitAccount  } from '@reown/appkit/react' */
import { useWriteContract } from 'wagmi'
import { abi } from '../abi/PeaceColor.json'

const AddColor = () => {
  const { data: hash, writeContract, isPending } = useWriteContract();
  const [color, setColor] = useState<RGB | undefined>(undefined); 

  const handleColor = (color: string) => {
    const rgb = hexToRgb(color);
    if (rgb) {
      setColor(rgb);
    }
  };

  const handleAddColor = async (color:RGB) => {
    console.log('color', color);
    // TODO: generate a IA description API !
    const response = await fetch('/api/nameColorAI', {
      method: 'POST',
      body: JSON.stringify(color)
    });
    const data = await response.json();
    console.log('data', data);
    // TODO: only one color per address

    // TODO: add color to the contract
    // addColor(uint8 red, uint8 green, uint8 blue, string memory description)

    console.log('data.name', data.name);
    writeContract({
      address: "0x6Ef1196F1b34Bf79A9d8DCB2AF6ef6A5EaC0CaD2",
      abi,
      functionName: 'addColor',
      args: [color.red, color.green, color.blue, data.name]
    })
  };
useEffect(() => {
  console.log('hash', hash);
  console.log('isPending', isPending);
}, [hash, isPending]);
  return (
    <div className="min-w-[300px] bg-gray-800 border border-gray-600 rounded-lg p-2 text-base flex flex-col gap-3">
      <p>Choose a color for the PEACE!</p>
      <input type="color" className="w-full border border-gray-500" onChange={(e) => handleColor(e.target.value)} />
      <button
        disabled={color === undefined}
        className={
          color === undefined
            ? 'bg-gray-500 p-1 w-full rounded'
            : 'bg-green-500 p-1 w-full rounded hover:bg-green-700 transition duration-200'
        }
        onClick={() => color && handleAddColor(color)} 
      >
        Add color {hash==undefined ? '' : (isPending ? '...' : '✅')}
      </button>
    </div>
  );
};

export default AddColor;
