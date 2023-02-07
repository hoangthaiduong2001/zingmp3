import React, { memo } from 'react'
import icons from '../ultis/icons'
import moment from 'moment/moment'

const { FiMusic } = icons

const List = ({ songData }) => {
    console.log(songData)
  return (
    <div className='flex justify-between items-center p-[10px]'>
        <div className='flex gap-3 items-center flex-1'>
            <span><FiMusic /></span>
            <img src={songData?.thumbnail} className="w-10 h-10 object-cover rounded-md"/>
            <span className='flex flex-col text-xs w-full'>
                <span className='w-full font-semibold whitespace-nowrap'>{songData?.title?.length > 20 ? `${songData?.title?.slice(0, 20)}...` : songData?.title}</span>
                <span>{songData?.artistsNames?.length > 20 ? `${songData?.artistsNames?.slice(0, 20)}...` : songData?.artistsNames}</span>
            </span>
        </div>
        <div className='flex-1 pl-[100px] flex items-center text-center justify-start p-[10px] whitespace-nowrap'>
            {songData?.album?.title?.length > 30 ? `${songData?.album?.title?.slice(0, 30)}...` : songData?.album?.title}
        </div>
        <div className='flex-1 flex justify-end'>
            {moment.utc(songData?.duration * 1000).format('mm:ss')}
        </div>
    </div>
  )
}

export default memo(List)