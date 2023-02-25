import React, { memo } from 'react'
import { List } from './'
import moment from 'moment'
import icons from '../ultis/icons'
import { useSelector } from 'react-redux'

const { BsDot } = icons
const Lists = ({ totalDuration}) => {
  const { songs } = useSelector(state => state.music)
  return (
    <div className='flex flex-col text-xs text-gray-600'>
        <div className='flex justify-between items-center p-[10px] font-semibold'>
            <span>BÀI HÁT</span>
            <span>ALBUM</span>
            <span>THỜI GIAN</span>
        </div>
        <div className='flex flex-col'>
            {songs?.map(item => (
              <List key={item?.encodeId} songData={item}/>
            ))}
            <span className='flex gap-1 items-center py-[10px] border-t border-[rgba(0,0,0,0.05)]'>
              <span>{`${songs?.length} bài hát`}</span>
              <BsDot size={24}/>
              <span>{moment.utc(totalDuration * 1000).format('hh giờ mm pút')}</span>
            </span>
        </div>
        <div className='w-full h-[100px]'></div>
    </div>
  )
}

export default memo(Lists)