import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="w-full h-full flex">
      <AiOutlineLoading className="w-7 h-7 animate-spin m-auto" />
    </div>
  );
};

export default Loader;
