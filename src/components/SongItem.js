import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { NewRelease } from '.';

const SongItem = ({ thumbnail, title, artists, releaseDate }) => {
  return (
    <div className='w-[30%] flex flex-auto p-[10px] gap-[10px] hover:bg-main-200 rounded-md cursor-pointer'>
      <img src={thumbnail} className='w-[60px] h-[60px] object-cover rounded-md'/>
      <div className='flex flex-col'>
        <span className='text-sm font-semibold'>{title}</span>
        <span className='text-xs text-gray-600'>{artists}</span>
        <span className='text-xs text-gray-600'>{moment(releaseDate * 1000).fromNow()}</span>
      </div>
    </div>
  )
}

export default memo(SongItem)