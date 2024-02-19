import React, { useState, useEffect } from 'react';
import Card from './styledcard';
import Image from 'next/image';



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
  // Add more properties if needed based on the API response
}

interface Wand {
  wood: string;
  core: string;
  length: string;
}


const Search: React.FC = () => {
  useEffect(() => {
    fetch('https://hp-api.onrender.com/api/characters')
      .then(res => res.json())
      .then((data: Character[]) => {
        setFilteredData(data);
      })
      .catch(err => console.log(err));
  }, []);

  const [data, setData] = useState<Character[]>([]);
  const [filteredData, setFilteredData] = useState<Character[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleFilter = (value: string) => {
    setSearchInput(value);
    const res = filteredData.filter(f => f.name.toLowerCase().includes(value.toLowerCase()));
    setData(res);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Seek And You Shall Find"
        value={searchInput}
        className='m-10 z-10 sm:w-fit items-center rounded-full border-0 py-1.5 pl-10 sm:pl-3 sm:m-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-transparent'
        onChange={e => handleFilter(e.target.value)}
      />

      <div className=' w-full flex flex-col p-2 m-5'>
        {searchInput &&
        data.map((d, i) => (
          
          <div key={i}>
            <Card
            img={d.image}
            name={d.name}
            house={d.house}
            alternate_name={d.alternate_names}
            species={d.species}
            />
          
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
