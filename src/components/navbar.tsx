"use client";

import Image from "next/image";
import hp from "../../public/images/hpp.png";
import Search from "./search";
import { useEffect,useState } from "react";

export default function NavBar() {

 
  
    return (
      <nav className="absolute top-0 mb-6 flex flex-row justify-between">
         <div className=" animate-pulse-slow ease-in-out duration-0 transition-shadow m-4">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={hp}
          alt="Logo"
          width={260}
          height={70}
          priority
        />
      </div>
      
    
      
      </nav>
    )
  }