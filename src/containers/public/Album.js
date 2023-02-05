import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment/moment'

const Album = () => {
    const {title, pid} = useParams()
    const [playlistData, setplaylistData] = useState({})
    useEffect(() => {
      const fetchDetailPlaylist = async () => {
        const response = await apis.apiGetDetailPlaylist(pid)
        if(response?.data.err === 0){
          setplaylistData(response.data?.data)
        }
      }
      fetchDetailPlaylist()
    }, [pid])
  return (
    <div className='flex gap-8 w-full px-[59px]'>
      <div className='flex-none w-1/4 border border-red-500 flex flex-col items-center gap-2'>
        <img src={playlistData?.thumbnailM} className='w-full object-contain rounded-md shadow-md'/>
        <div className='flex flex-col items-center gap-1'>
          <h3 className='text-[18px] font-bold text-gray-800'>{playlistData?.title}</h3>
          <span className='flex gap-2 items-center text-gray-500 text-[13px]'>
            <span>Cập nhật:</span>
            <span>{moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
          </span>
          <span className='flex gap-2 items-center justify-center text-gray-500 text-[13px]'>{playlistData?.artistsNames}</span>
          <sapn className='flex gap-2 items-center text-gray-500 text-[13px]'>{`${Math.round(playlistData?.like / 1000)}K người yêu thích`}</sapn>
        </div>
      </div>
      <div className='flex-auto border border-blue-500'>
        playlist
      </div>
    </div>
  )
}

export default Album