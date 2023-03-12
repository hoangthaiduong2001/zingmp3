import React, {useState, useEffect} from 'react'
import icons from '../ultis/icons'
import { apiSearch } from '../apis'

const { AiOutlineSearch }= icons
const Search = () => {
  const [keyword, setKeyword] = useState('')
  const handleSearch = async (e) => {
    if(e.keyCode === 13){
      const response = await apiSearch(keyword)
      console.log(response)
      console.log(keyword)
    }
  }
  return (
    <div className='w-full flex items-center'>
        <span className='h-10 pl-4 bg-[#DDE4E4] flex items-center justify-center rounded-l-[20px] text-gray-500'>
            <AiOutlineSearch size={24}/>
        </span>
        <input
           type="text"
           className='outline-none bg-[#DDE4E4] px-4 py-2 w-full rounded-r-[20px] h-10 text-gray-500'
           placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
           value={keyword}
           onChange={e => setKeyword(e.target.value)}
           onKeyUp={handleSearch}
        />
    </div>
  )
}

export default Search