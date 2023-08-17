'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { Jim_Nightshade } from "next/font/google";



const jim = Jim_Nightshade({
  subsets: ['latin'],
  weight: "400"
})

const NotFound = () => {
    return (
        <section className={`w-full h-screen items-center bg-fixed bg-center bg-cover harry-img ${jim.className}`}>
            
            <div className=" flex items-center justify-center h-full w-full">
            <motion.div
            animate={{opacity:1, scale:[1,1.4,1.4,1,1] , 
            borderRadius:['20%','20%','50%','50%','20%'],
        rotate:[0,0,270,270,0]}} initial={{opacity:0}} transition={{ duration:2}}
            whileHover={{scale:1.2}} whileInView={{scale:1.1}}
            className=" grid grid-cols-1 col-span-1 w-1/3 place-content-center py-10 px-5 rounded-lg text-center border border-gray-800">
                <motion.h1 className=" text-center flex flex-row gap-3 m-5 my-4" >NO MUGGLES ALLOWED 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-frown-fill" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
</svg>
                </motion.h1>
                <hr className=" w-1/2 mx-auto "/>
                <Link href={'/'} className=" animate-bounce mx-auto border rounded-full border-gray-800 w-1/2 items-center p-4 m-5 hover:bg-slate-600 text-4xl "> Be Gone</Link>
            </motion.div>
            </div>
            
            
        </section>
    );
};

export default NotFound;