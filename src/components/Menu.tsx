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
      
      { <ConnectButton />}
      {isConnected && <><AddColor colors={colors} /></>}
      <div>
        
        <p>Links:</p>
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
