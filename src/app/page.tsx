'use client';
import Card from "@/components/cards";
import NavBar from "@/components/navbar";
import Search from "@/components/search";
import Head from "next/head";
import { SetStateAction, useEffect, useState } from "react";







export default function Home() {

  



  const [searchQuery, setSearchQuery] = useState([]);

  useEffect(() => {
    const getCoins = async () => {
      try {
        const response = await fetch(`https://hp-api.onrender.com/api/characters`);
        const characters = await response.json();
        
        setSearchQuery(characters); // Assuming characters is the array directly from API response
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
  
    getCoins();
  }, []);

  return (
    <>
    <Head>
      <title>HarryPotter</title>
      <meta/>
    </Head>
    <section className="w-full h-screen items-center justify-center bg-fixed bg-center bg-cover custom-img sm:mobile-img overflow-auto" >

      <NavBar/>
    
   <main className=" m-4">
   <Card   />
   </main>
     
     
     
  

      
    </section>
    </>
  );
}
