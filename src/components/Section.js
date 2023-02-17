import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Section = () => {
  const { autoTheme } = useSelector(state => state.app)
  const navigate = useNavigate()
  console.log(autoTheme)
  return (
    <div className='mt-12 px-[59px] flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-bold'>{autoTheme?.title}</h3>
        <span className='text-xs'>TAT CA</span>
      </div>
      <div className='flex items-center justify-between gap-[28px]'>
        {autoTheme && autoTheme?.items?.length > 0 && autoTheme?.items.map(item => (
          <div 
          onClick={() => {
            navigate(item?.link?.split('.')[0])
          }}
          key={item.encodeId} 
          className='flex flex-col gap-3 flex-auto w-1/5 text-sm cursor-pointer'>
            <img src={item.thumbnailM} className='w-full h-auto rounded-lg'/>
            <span className='flex flex-col'>
              <span className='font-semibold'>{`${item.title.slice(0,15)}...`}</span>
              <span>{`${item.sortDescription.slice(0,35)}...`}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Section