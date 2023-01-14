import React, { useState, useEffect } from "react";

const Header = () => (
  <header className="bg-[#032541] text-white h-16 z-10 flex items-center fixed top-0 w-full transition-all duration-300">
    <div className="md:mx-5 flex items-center justify-between p-4  w-full">
      <h1 className="font-bold tracking-widest md:text-lg text-sm " >MoviesFlix</h1>

      <h2 className="font-thin tracking-widest md:text-base text-sm ">Hello' Subham</h2>
    </div>
  </header>
);

export default Header;
