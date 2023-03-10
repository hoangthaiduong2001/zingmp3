import React from 'react'
import { Outlet } from 'react-router-dom';

const Search = () => {
  return (
    <div>
        <div className='flex h-[50px] mb-7 items-center text-sm border-b border-gray-400 pl-[60px] pb-1'>
          <span className='text-[24px] font-bold pr-6  border-r border-gray-400'>Kết quả tìm kiếm</span>
          <div className='flex items-center'>
            <span className='px-4 hover:text-main-500 font-semibold cursor-pointer'>TẤT CẢ</span>
            <span className='px-4 hover:text-main-500 font-semibold cursor-pointer'>BÀI HÁT</span>
            <span className='px-4 hover:text-main-500 font-semibold cursor-pointer'>PLAYLIST/ALBUM</span>
            <span className='px-4 hover:text-main-500 font-semibold cursor-pointer'>NGHỆ SĨ/OA</span>
          </div>
        </div>
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default Search