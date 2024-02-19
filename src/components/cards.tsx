"use client";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import AnimatedText from "./AnimatedText";
import axios from "axios";
import Search from "./search";
import { Jim_Nightshade} from "next/font/google";

const jim = Jim_Nightshade({
  subsets: ["latin"],
  weight: "400",
});

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

interface Wand {
  wood: string;
  core: string;
  length: string;
}


// {name, alternate, species, gender, house, wand,dob,yob, wizard, ancestry, hair_color, eye_color, patronous,actor,alive }: any

const Card = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchApi = async (query: any) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hp-api.herokuapp.com/api/characters?name=${query}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial data load or any other side effect
    // For example, load some initial data when the component mounts.
    searchApi("initialQuery");
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery) {
          const response = await fetch(`/api/characters?name=${searchQuery}`);
          const searchData = await response.json();
          setCharacters(searchData);
        } else {
          const data = await getData();
          setCharacters(data);
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
  
    fetchData();
  }, [searchQuery]);
  

  const [characters, setCharacters] = useState<Character[]>([]);

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
    <main className="w-full h-full overflow-auto">
      <div className=" float-right">
        <Search/>
      </div>
    <div
      className={`grid grid-cols-3
      gap-1 w-full p-4 mt-10 ${jim.className} md:grid-cols-2 md:col-span-2 sm:grid-cols-1 sm:col-span-1 sm:justify-around items-center justify-evenly`}
    >
  
      {characters.map((character, index) => (
        <motion.div
          className="relative p-10 my-10 w-96 sm:w-fit mx-20 sm:mx-0 sm:my-10 md:mx-10 md:my-10 text-center items-center justify-center backdrop-blur rounded-full"
          // onClick={() => setIsOpen(!isOpen)}
          key={character.id}
          onClick={() => toggleCard(index)}
          whileHover={{ scale: 0.9 }}
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
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
              alt={""}
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
              <ul className=" text-xl text-white font-light">
                <li>
                  actor:
                  <span className=" text-white font-medium">
                    {character.actor ? character.actor : "unknown"}
                  </span>
                </li>
                <li>
                  alternate_name:
                  <span className=" text-white font-medium">
                    {character.alternate_names
                      ? character.alternate_names
                      : "unknown"}
                  </span>
                </li>
                <li>
                  species:
                  <span className=" text-white font-medium">
                    {character.species ? character.species : "unknown"}
                  </span>
                </li>
                <li>
                  gender:
                  <span className=" text-white font-medium">
                    {character.gender ? character.gender : "unknown"}
                  </span>
                </li>
                <li>
                  house:
                  <span className=" text-white font-medium">
                    {character.house ? character.house : "unknown"}
                  </span>
                </li>
                <li>
                  birthDay:
                  <span className=" text-white font-medium">
                    {character.dateOfBirth ? character.dateOfBirth : "unknown"}:{" "}
                    {character.yearOfBirth ? character.yearOfBirth : "unknown"}
                  </span>
                </li>
                <li>
                  wizard:
                  <span className=" text-white font-medium">
                    {character.wizard ? character.wizard : "unknown"}
                  </span>
                </li>
                <li>
                  ancestry:
                  <span className=" text-white font-medium">
                    {character.ancestry ? character.ancestry : "unknown"}
                  </span>
                </li>

                <li>
                  patronous:
                  <span className=" text-white font-medium">
                    {character.patronous ? character.patronous : "unknown"}
                  </span>
                </li>
                <li>
                  eyeColor:
                  <span className=" text-white font-medium">
                    {character.eyeColor ? character.eyeColor : "unknown"}{" "}
                  </span>
                </li>
                <li>
                  hairColor:
                  <span className=" text-white font-medium">
                    {character.hairColor ? character.hairColor : "unknown"}
                  </span>
                </li>
                <li>
                  <span className=" text-white font-medium">
                    {character.alive ? character.alive : "unknown"}
                  </span>
                </li>
              </ul>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
    </main>
  );
};

export default Card;
