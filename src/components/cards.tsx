"use client";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import AnimatedText from "./AnimatedText";
import Search from "./search";
import { Jim_Nightshade } from "next/font/google";



const jim = Jim_Nightshade({
  subsets: ['latin'],
  weight: "400"
})


async function getData() {
  const res = await fetch("https://hp-api.onrender.com/api/characters");
  const data = await res.json();

  return data;
}

interface Character {
  id: number;
  name: string;
  alternate_names: string;
  species: string;
  gender: string;
  house: string;
  dateOfBirth: any;
  yearOfBirth: any;
  wizard: string;
  wand: string[];
  ancestry: string;
  eyeColor: string;
  hairColor: string;
  image: string;
  patronous: string;
  alive: string;
  actor: string;
  // Other properties
}

// {name, alternate, species, gender, house, wand,dob,yob, wizard, ancestry, hair_color, eye_color, patronous,actor,alive }: any

const Card = () => {
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const data = await getData();
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    if (searchQuery) {
      // Fetch data with search query
      const fetchSearchData = async () => {
        try {
          const response = await fetch(`/api/characters?name=${searchQuery}`);
          const searchData = await response.json();
          setCharacters(searchData);
        } catch (error) {
          console.error("Error fetching characters:", error);
        }
      };
  
      fetchSearchData();
    } else {

    fetchData();}
  }, [searchQuery,setSearchQuery]); // Empty dependency array ensures this effect runs only once

  const [characters, setCharacters] = useState<Character[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  // Initialize with an empty array
  const [isOpenArray, setIsOpenArray] = useState<boolean[]>([]);

  useEffect(() => {
    // Initialize isOpenArray with the same number of elements as characters, all set to false
    setIsOpenArray(Array(characters.length).fill(false));
  }, [characters]);

  const toggleCard = (index: number) => {
    const updatedIsOpenArray = [...isOpenArray];
    updatedIsOpenArray[index] = !updatedIsOpenArray[index];
    setIsOpenArray(updatedIsOpenArray);
  };

  //   console.log(characters)
  //scroll progress
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center end"],
  });

  return (
    
    <div
      className={`grid grid-cols-3
      gap-1 w-full p-4 mt-10 ${jim.className} md:grid-cols-2 sm:grid-cols-1 sm:col-span-1 items-center justify-evenly`}
    >
      
      {characters.map((character, index) => (
        <motion.div
          className="relative p-10 my-10 w-96 sm:w-fit mx-20 sm:mx-0 sm:my-10 md:mx-10 md:my-10 text-center items-center justify-center backdrop-blur rounded-full"
          // onClick={() => setIsOpen(!isOpen)}
          key={character.id}
          onClick={() => toggleCard(index)}
          whileHover={{ scale: 1.1 }}
          initial={{scale:0.8}}
          whileInView={{scale:1}}
          layout
          transition={{ duration: 2, type: "spring" }}
          style={{ scaleY: scrollYProgress }}
          ref={ref}
        >
          <motion.h1
            layout="position"
            className=" flex flex-row justify-center items-center gap-3 text-3xl font-base capitalize text-center"
            initial="initial"
          >
            <Image
              src={character.image}
              alt={''}
              className=" rounded-full"
              width={"70"}
              height={"60"}
              priority
            />
            {character.name}
          </motion.h1>
          {isOpenArray[index] && (
            <motion.div
              layout="position"
              className=" py-5 w-80 h-96 flex flex-col overflow-auto text-center"
              // style={{ backgroundImage: `url(${character.image})` }}
            >
              <ul className=" text-xl text-black font-light">
                <li>actor:{character.actor ? character.actor : "unknown"}</li>
                <li>
                  alternate_name:
                  {character.alternate_names
                    ? character.alternate_names
                    : "unknown"}
                </li>
                <li>
                  species:{character.species ? character.species : "unknown"}
                </li>
                <li>
                  gender:{character.gender ? character.gender : "unknown"}
                </li>
                <li>house:{character.house ? character.house : "unknown"}</li>
                <li>
                  birthDay:
                  {character.dateOfBirth ? character.dateOfBirth : "unknown"}:{" "}
                  {character.yearOfBirth ? character.yearOfBirth : "unknown"}
                </li>
                <li>
                  wizard:{character.wizard ? character.wizard : "unknown"}
                </li>
                <li>
                  ancestry:{character.ancestry ? character.ancestry : "unknown"}
                </li>

                <li>
                  patronous:
                  {character.patronous ? character.patronous : "unknown"}
                </li>
                <li>
                  eyeColor:{character.eyeColor ? character.eyeColor : "unknown"}
                </li>
                <li>
                  hairColor:
                  {character.hairColor ? character.hairColor : "unknown"}
                </li>
                <li>{character.alive ? character.alive : "unknown"}</li>
              </ul>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Card;
