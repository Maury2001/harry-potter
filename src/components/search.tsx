'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useDebounce } from 'use-debounce'

const Search = ({ search }: { search?: string },{getSearchResult}:any) => {
  const router = useRouter()
  const initialRender = useRef(true)

  const [text, setText] = useState(search)
  const [query] = useDebounce(text, 750)

  useEffect(() => {

    const fetchData = async () => {
        try {
          const response = await fetch(`https://hp-api.onrender.com/api/characters?query=${query}`);
          const characters = await response.json();
          getSearchResult(characters);
        } catch (error) {
          console.error("Error fetching characters:", error);
        }
      };
  
      fetchData();


    if (initialRender.current) {
      initialRender.current = false
      return
    }

    if (!query) {
      router.push(`/`)
    } else {
      router.push(`/api/characters?query=${query}`)
    }
  }, [query, getSearchResult])
 

  
  const handleSubmit = async (e:React.FormEvent) => {
   e.preventDefault()

   const response = await fetch(`/api/coins/search?query=${query}`)

   const coin = await response.json()

   getSearchResult(coin)

  }


  return (
    <div className='relative rounded-md shadow-sm flex justify-end'>
      <form onSubmit={handleSubmit} >

      <input
        value={text}
        placeholder='Seek and you shall find...'
        onChange={e => setText(e.target.value)}
        className='m-10 sm:w-fit items-center rounded-full border-0 py-1.5 pl-10 sm:pl-3 sm:m-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-transparent'
      />

      </form>
      
    </div>
  )
}

export default Search

function getSearchResult(characters: any) {
    throw new Error('Function not implemented.')
}
