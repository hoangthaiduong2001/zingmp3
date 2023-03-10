import React, { memo } from 'react'
import icons from '../ultis/icons'
import moment from 'moment/moment'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'
import { AudioLoading } from './'
import { useSelector } from 'react-redux'

const { FiMusic, BsFillPlayFill } = icons
const List = ({ songData }) => {
  const { isPlaying } = useSelector(state => state.music)
  const dispatch = useDispatch()
  return (
    <div 
    onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId))
        dispatch(actions.play('true'))
        dispatch(actions.playAlbum(true))
        dispatch(actions.setRecent({ thumbnail: songData?.thumbnail, title: songData?.title, artists: songData?.artistsNames, sid: songData?.encodeId}))
    }}
    className='flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer'
    >
        <div className='flex gap-3 items-center flex-1'>
            <span><FiMusic /></span>
            <img src={songData?.thumbnail} className="relative w-10 h-10 object-cover rounded-md"/>
            <span className='absolute items-center justify-end'>             
                {/* { isPlaying ? <AudioLoading /> : <BsFillPlayFill />} */}
            </span>
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