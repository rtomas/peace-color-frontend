import React, { useState } from 'react';
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';
import AddColor from './AddColor';
import { ConnectButton } from './ConnectButton';
import { useAppKitAccount } from '@reown/appkit/react';
import { RGB } from '@/utils/colors';

const Menu = ({colors}: {colors: RGB[]}) => {
  const {isConnected} = useAppKitAccount();


  const [showMenu, setShowMenu] = useState<boolean>(false);
  return showMenu ? (
    <div className="absolute mt-[13px] flex flex-col gap-5 md:w-fit h-[97vh] backdrop-blur-3xl bg-black/50 border-r border-t border-b border-white rounded-r-xl p-4">
      <div className="mx-auto w-full h-fit flex">
        <button
          className="p-1 border border-white rounded-full ml-auto text-xl"
          onClick={() => {
            setShowMenu(false);
          }}
        >
          <BiLeftArrowAlt />
        </button>
      </div>
      <div className="text-center text-3xl">🕊️ Inmutable Peace</div>
      
      <ConnectButton />
      {isConnected && <><AddColor colors={colors} /></>}


      <div className="mt-auto">
      <div className="flex flex-col gap-2 text-center">
A contemporary manifesto where technology, <br />
art and the collective desire for peace merge.<br />
<br />
Each participant chooses a color, their personal <br />
interpretation of peace.<br />
<br />
This color, linked to a Smart Contract on the <br />
blockchain, becomes immutable, reflecting the <br />
permanent nature of harmony. <br />
<br />
Peace, as a principle, cannot be erased or altered, <br />
just like these colors inscribed in an eternal record.<br />
<br />
<br />
      </div>
        <p><b>Code and info:</b></p>
        <p>
          *{' '}
          <a target="_blank" href="https://github.com/rtomas/peace-color-frontend" className="underline">
            Frontend Github
          </a>
        </p>
        <p>
          *{' '}
          <a target="_blank" href="https://github.com/rtomas/peace-color-smart-contract" className="underline">
            Smart Contract Github
          </a>
        </p>
 

        <br />
        <div className="text-center">by <a target="_blank" href="https://www.tomasrawski.com.ar" className="underline">Tomás Rawski</a></div>
      </div>
    </div>
  ) : (
    <div className="absolute w-[100px] border-white text-white flex py-4">
      <div className="mx-auto">
        <button
          className="p-1 border border-white text-white rounded-full backdrop-blur-2xl text-xl"
          onClick={() => {
            setShowMenu(true);
          }}
        >
          <BiRightArrowAlt />
        </button>
      </div>
    </div>
  );
};

export default Menu;
