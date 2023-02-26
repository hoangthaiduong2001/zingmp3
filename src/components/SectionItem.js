import React, { memo, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'  


const SectionItem = ({ link, data, thumbnailM, artistsNames, sortDescription, title}) => {
    const [isHover, setIsHover] = useState(false)
    const navigate = useNavigate()
    const imgRef = useRef()

    const handleHover = () => {
        setIsHover(true)
        imgRef.current.classList.add('animate-scale-up-image')
        imgRef.current.classList.remove('animate-scale-down-image')
    }
    const handLeave = () => {
        setIsHover(false)
        imgRef.current.classList.remove('animate-scale-up-image')
        imgRef.current.classList.add('animate-scale-down-image')
    }
  return (
    <div 
    onClick={() => {
      navigate(link?.split('.')[0])
    }}
    className='flex flex-col gap-3 flex-auto w-1/5 text-sm cursor-pointer'>
      <div onMouseEnter={handleHover} onMouseLeave={handLeave} className='w-full relative overflow-hidden rounded-lg'>
        { isHover && <div className='absolute top-0 bottom-0 left-0 right-0 z-40 bg-overplay-30 rounded-lg'></div>}
        <img ref={imgRef} src={thumbnailM} className='w-full h-auto rounded-lg'/>
      </div>
      <span className='flex flex-col'>
        <span>{data?.sectionId === 'hArtistTheme' ? <span></span> : <span className='font-semibold'>{`${title.slice(0,15)}...`}</span>}</span>
        <span>{data?.sectionId === 'h100' ? <span>{artistsNames}</span> : 
          <span>
            {sortDescription.length >= 40 ? `${sortDescription.slice(0,35)}...` : sortDescription}
          </span>}
        </span>
      </span>
    </div>
  )
}

export default memo(SectionItem)