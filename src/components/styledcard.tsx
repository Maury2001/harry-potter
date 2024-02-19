"use client"
import React from 'react'
import {motion} from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

export default function Card({img,name,house,species,wand,alternate_name}:any) {
    const [isOpen, setIsOpen]= useState(false)
  return (
    <div className=' text-black flex justify-center items-center'>
        <motion.div transition={{layout:{duration:1}}} layout onClick={()=> setIsOpen(!isOpen)}className='p-5'>
            <Image 
            width={"70"}
            height={"60"}
            priority
            src={img} alt={name} className="rounded-full"/>
            <motion.h2 layout>
                {name}
            </motion.h2>
            {isOpen && (
            <motion.div>
                <ul>
                    <li>alt_name: {alternate_name}</li>
                    <li>house: {house}</li>
                    <li>species: {species}</li>
                </ul>
            </motion.div>
            )}

        </motion.div>
        
    </div>
  )
}