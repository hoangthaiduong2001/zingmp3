import React from 'react'
import icons from '../ultis/icons'
import { Search } from './'
const {HiArrowNarrowLeft, HiArrowNarrowRight } = icons

const Header = () => {
  return (
    <div className='flex justify-between w-full'>
        <div className='flex gap-6 w-full items-center'>
            <div className='flex text-gray-400 gap-6'>
                <span><HiArrowNarrowLeft size={24}/></span>
                <span><HiArrowNarrowRight size={24}/></span>
            </div>
            <div className='w-1/2'>
                <Search />
            </div>
        </div>
        <div>
            login
        </div>
    </div>
  )
}

export default Header